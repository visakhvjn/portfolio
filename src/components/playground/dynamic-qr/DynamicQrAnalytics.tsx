"use client";

import {
  ScanBreakdown,
  ScanUsageChart,
} from "@/components/playground/dynamic-qr/ScanCharts";
import {
  aggregateScansByDay,
  countByField,
  normalizeDestinationUrl,
  type DynamicQrLinkRow,
  type DynamicQrScanRow,
} from "@/lib/dynamic-qr/types";
import { createClient } from "@/lib/supabase/dynamic-qr/client";
import Link from "next/link";
import { useEffect, useEffectEvent, useState } from "react";

type Props = { slug: string };

export function DynamicQrAnalytics({ slug }: Props) {
  const [link, setLink] = useState<DynamicQrLinkRow | null>(null);
  const [scans, setScans] = useState<DynamicQrScanRow[]>([]);
  const [destinationEdit, setDestinationEdit] = useState("");
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const load = useEffectEvent(async () => {
    setLoading(true);
    setError(null);
    try {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("Sign in required.");

      const { data: linkRow, error: linkError } = await supabase
        .from("dynamic_qr_links")
        .select("*")
        .eq("slug", slug)
        .single();

      if (linkError || !linkRow) {
        throw new Error(linkError?.message || "QR not found.");
      }
      if (linkRow.owner_id !== user.id) {
        throw new Error("Only the owner can view analytics.");
      }

      const { data: scanRows, error: scanError } = await supabase
        .from("dynamic_qr_scans")
        .select("*")
        .eq("qr_id", linkRow.id)
        .order("scanned_at", { ascending: false })
        .limit(500);

      if (scanError) throw new Error(scanError.message);

      setLink(linkRow as DynamicQrLinkRow);
      setDestinationEdit(linkRow.destination_url);
      setScans((scanRows ?? []) as DynamicQrScanRow[]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load analytics.");
    } finally {
      setLoading(false);
    }
  });

  useEffect(() => {
    void load();
  }, [slug]);

  const saveDestination = async () => {
    if (!link) return;
    const dest = normalizeDestinationUrl(destinationEdit);
    if (!dest) {
      setError("Invalid destination URL.");
      return;
    }
    setSaving(true);
    setError(null);
    setMessage(null);
    try {
      const supabase = createClient();
      const { error: updateError } = await supabase
        .from("dynamic_qr_links")
        .update({ destination_url: dest, updated_at: new Date().toISOString() })
        .eq("id", link.id);
      if (updateError) throw new Error(updateError.message);
      setLink({ ...link, destination_url: dest });
      setMessage("Destination updated — same QR, new target.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Update failed.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center text-sm text-slate-500">
        Loading analytics…
      </div>
    );
  }

  if (error && !link) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-3 px-4 text-center">
        <p className="text-sm text-rose-300">{error}</p>
        <Link href="/playground/dynamic-qr" className="text-sm text-emerald-400">
          All QRs
        </Link>
      </div>
    );
  }

  if (!link) return null;

  const shortUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/r/${link.slug}`
      : `/r/${link.slug}`;
  const daily = aggregateScansByDay(scans);
  const total = scans.length;

  return (
    <div className="h-full overflow-y-auto px-4 py-6 sm:px-6">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/playground/dynamic-qr"
          className="text-sm text-slate-500 hover:text-emerald-400"
        >
          ← All QRs
        </Link>
        <h1 className="mt-3 text-2xl font-semibold text-white">{link.title}</h1>
        <p className="mt-1 break-all text-sm text-slate-500">{shortUrl}</p>
        <p className="mt-4 text-3xl font-bold text-white">
          {total}{" "}
          <span className="text-lg font-normal text-slate-500">total scans</span>
        </p>

        {error ? (
          <p className="mt-4 text-sm text-rose-300" role="alert">
            {error}
          </p>
        ) : null}
        {message ? (
          <p className="mt-4 text-sm text-emerald-300/90" role="status">
            {message}
          </p>
        ) : null}

        <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
          <label className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
            Destination (editable)
          </label>
          <div className="mt-2 flex flex-col gap-2 sm:flex-row">
            <input
              value={destinationEdit}
              onChange={(e) => setDestinationEdit(e.target.value)}
              className="min-w-0 flex-1 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-100 focus:border-emerald-400/50 focus:outline-none"
            />
            <button
              type="button"
              onClick={() => void saveDestination()}
              disabled={saving}
              className="rounded-xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950 disabled:opacity-50"
            >
              {saving ? "Saving…" : "Update URL"}
            </button>
          </div>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          <ScanUsageChart data={daily} />
          <ScanBreakdown
            title="Devices"
            items={countByField(scans, "device_type")}
            total={total}
          />
          <ScanBreakdown
            title="Countries"
            items={countByField(scans, "country")}
            total={total}
          />
          <ScanBreakdown
            title="Regions"
            items={countByField(scans, "region")}
            total={total}
          />
        </div>

        <section className="mt-8">
          <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
            Recent scans
          </h2>
          {scans.length === 0 ? (
            <p className="mt-4 text-sm text-slate-500">
              No scans yet. Share the short link or print the QR.
            </p>
          ) : (
            <ul className="mt-4 divide-y divide-white/10 rounded-2xl border border-white/10">
              {scans.slice(0, 25).map((scan) => (
                <li
                  key={scan.id}
                  className="flex flex-col gap-1 px-4 py-3 text-sm sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="text-slate-300">
                    {scan.device_type ?? "Unknown"} ·{" "}
                    {[scan.city, scan.region, scan.country]
                      .filter(Boolean)
                      .join(", ") || "Location unknown"}
                  </div>
                  <time className="text-xs text-slate-500">
                    {new Date(scan.scanned_at).toLocaleString()}
                  </time>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}

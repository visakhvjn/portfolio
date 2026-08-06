"use client";

import { createClient } from "@/lib/supabase/dynamic-qr/client";
import type { DynamicQrLinkRow } from "@/lib/dynamic-qr/types";
import Link from "next/link";
import { useEffect, useEffectEvent, useState } from "react";

type ListItem = DynamicQrLinkRow & { scan_count: number };

export function AllDynamicQrList() {
  const [items, setItems] = useState<ListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useEffectEvent(async () => {
    setLoading(true);
    setError(null);
    try {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        setItems([]);
        return;
      }

      const { data, error: listError } = await supabase
        .from("dynamic_qr_links")
        .select("id, owner_id, title, slug, destination_url, created_at, updated_at")
        .eq("owner_id", user.id)
        .order("created_at", { ascending: false });

      if (listError) throw new Error(listError.message);

      const rows = (data ?? []) as DynamicQrLinkRow[];
      const withCounts = await Promise.all(
        rows.map(async (row) => {
          const { count } = await supabase
            .from("dynamic_qr_scans")
            .select("id", { count: "exact", head: true })
            .eq("qr_id", row.id);
          return { ...row, scan_count: count ?? 0 };
        }),
      );
      setItems(withCounts);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load QR codes.");
    } finally {
      setLoading(false);
    }
  });

  useEffect(() => {
    void load();
  }, []);

  const shortUrl = (slug: string) =>
    `${typeof window !== "undefined" ? window.location.origin : ""}/r/${slug}`;

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center text-sm text-slate-500">
        Loading…
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-full items-center justify-center px-4 text-sm text-rose-300">
        {error}
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto px-4 py-6 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <div className="flex items-center justify-between gap-3">
          <h1 className="text-xl font-semibold text-white">All QRs</h1>
          <Link
            href="/playground/dynamic-qr/new"
            className="rounded-lg bg-emerald-500 px-3 py-2 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400"
          >
            New QR
          </Link>
        </div>
        <p className="mt-1 text-sm text-slate-500">
          Open a QR for analytics — scans, devices, and regions.
        </p>

        {items.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-dashed border-white/10 bg-white/[0.02] px-6 py-10 text-center text-sm text-slate-500">
            No dynamic QRs yet. Create one to get a trackable short link.
          </div>
        ) : (
          <ul className="mt-6 space-y-3">
            {items.map((item) => (
              <li key={item.id}>
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <Link
                    href={`/playground/dynamic-qr/${item.slug}`}
                    className="block transition hover:opacity-90"
                  >
                    <h2 className="font-semibold text-white">{item.title}</h2>
                    <p className="mt-1 truncate text-xs text-slate-500">
                      → {item.destination_url}
                    </p>
                    <p className="mt-2 text-xs text-slate-500">
                      {item.scan_count} scan{item.scan_count === 1 ? "" : "s"} ·{" "}
                      {new Date(item.created_at).toLocaleDateString()}
                    </p>
                  </Link>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        void navigator.clipboard.writeText(shortUrl(item.slug))
                      }
                      className="rounded-lg border border-white/10 px-3 py-1.5 text-xs font-medium text-slate-400 transition hover:border-emerald-400/40 hover:text-emerald-300"
                    >
                      Copy short link
                    </button>
                    <Link
                      href={`/playground/dynamic-qr/${item.slug}`}
                      className="rounded-lg border border-white/10 px-3 py-1.5 text-xs font-medium text-slate-300 transition hover:border-white/20"
                    >
                      Analytics
                    </Link>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

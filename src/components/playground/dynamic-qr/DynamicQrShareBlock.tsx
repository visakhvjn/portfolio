"use client";

import { ButtonSpinner } from "@/components/playground/ButtonSpinner";
import QRCode from "qrcode";
import { useEffect, useMemo, useState } from "react";

type DynamicQrShareBlockProps = {
  slug: string;
  /** QR image size in CSS pixels */
  size?: number;
  showUrl?: boolean;
  showActions?: boolean;
};

export function DynamicQrShareBlock({
  slug,
  size = 140,
  showUrl = true,
  showActions = true,
}: DynamicQrShareBlockProps) {
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);
  const [copying, setCopying] = useState(false);
  const [copied, setCopied] = useState(false);

  const shortUrl = useMemo(() => {
    if (typeof window === "undefined") return `/r/${slug}`;
    return `${window.location.origin}/r/${slug}`;
  }, [slug]);

  useEffect(() => {
    void QRCode.toDataURL(shortUrl, {
      width: Math.max(size * 2, 280),
      margin: 2,
      color: { dark: "#141413", light: "#ffffff" },
    })
      .then(setQrDataUrl)
      .catch(() => setQrDataUrl(null));
  }, [shortUrl, size]);

  const copyShortUrl = async () => {
    setCopying(true);
    try {
      await navigator.clipboard.writeText(shortUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1400);
    } finally {
      setCopying(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-3">
      {qrDataUrl ? (
        <div className="rounded-xl border border-line bg-card p-2.5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={qrDataUrl}
            alt={`QR code for ${slug}`}
            width={size}
            height={size}
            className="block"
            style={{ width: size, height: size }}
          />
        </div>
      ) : (
        <div
          className="flex items-center justify-center rounded-xl border border-line bg-surface text-xs text-muted"
          style={{ width: size, height: size }}
        >
          …
        </div>
      )}
      {showUrl ? (
        <p className="max-w-full break-all text-center text-[11px] leading-snug text-muted">
          {shortUrl}
        </p>
      ) : null}
      {showActions ? (
        <div className="flex flex-wrap justify-center gap-2">
          <button
            type="button"
            onClick={() => void copyShortUrl()}
            disabled={copying}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-line px-3 py-1.5 text-xs font-medium text-ink-soft transition-colors hover:bg-surface hover:text-ink disabled:opacity-60"
          >
            {copying ? <ButtonSpinner className="h-3.5 w-3.5" /> : null}
            {copying ? "Copying…" : copied ? "Copied" : "Copy link"}
          </button>
          {qrDataUrl ? (
            <a
              href={qrDataUrl}
              download={`dynamic-qr-${slug}.png`}
              className="rounded-lg border border-line-strong bg-card px-3 py-1.5 text-xs font-medium text-ink transition-colors hover:bg-surface"
            >
              Download PNG
            </a>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

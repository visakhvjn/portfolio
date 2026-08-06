"use client";

import QRCode from "qrcode";
import { useEffect, useMemo, useState } from "react";

type DynamicQrShareBlockProps = {
  slug: string;
  /** QR image size in CSS pixels */
  size?: number;
  showUrl?: boolean;
};

export function DynamicQrShareBlock({
  slug,
  size = 140,
  showUrl = true,
}: DynamicQrShareBlockProps) {
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);

  const shortUrl = useMemo(() => {
    if (typeof window === "undefined") return `/r/${slug}`;
    return `${window.location.origin}/r/${slug}`;
  }, [slug]);

  useEffect(() => {
    void QRCode.toDataURL(shortUrl, {
      width: Math.max(size * 2, 280),
      margin: 2,
      color: { dark: "#0f172a", light: "#ffffff" },
    })
      .then(setQrDataUrl)
      .catch(() => setQrDataUrl(null));
  }, [shortUrl, size]);

  return (
    <div className="flex flex-col items-center gap-3">
      {qrDataUrl ? (
        <div className="rounded-xl bg-white p-2.5">
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
          className="flex items-center justify-center rounded-xl bg-white/10 text-xs text-slate-500"
          style={{ width: size, height: size }}
        >
          …
        </div>
      )}
      {showUrl ? (
        <p className="max-w-full break-all text-center text-[11px] leading-snug text-slate-500">
          {shortUrl}
        </p>
      ) : null}
      <div className="flex flex-wrap justify-center gap-2">
        <button
          type="button"
          onClick={() => void navigator.clipboard.writeText(shortUrl)}
          className="rounded-lg border border-white/10 px-3 py-1.5 text-xs font-medium text-slate-300 transition hover:border-white/20"
        >
          Copy link
        </button>
        {qrDataUrl ? (
          <a
            href={qrDataUrl}
            download={`dynamic-qr-${slug}.png`}
            className="rounded-lg border border-emerald-400/40 bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-300"
          >
            Download PNG
          </a>
        ) : null}
      </div>
    </div>
  );
}

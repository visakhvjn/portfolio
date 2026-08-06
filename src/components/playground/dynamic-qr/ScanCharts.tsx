"use client";

import type { DailyScanCount } from "@/lib/dynamic-qr/types";

type ScanChartProps = {
  data: DailyScanCount[];
};

export function ScanUsageChart({ data }: ScanChartProps) {
  const max = Math.max(1, ...data.map((d) => d.count));

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
      <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
        Scans (last 14 days)
      </h3>
      <div className="mt-6 flex h-40 items-end justify-between gap-1 sm:gap-2">
        {data.map((point) => {
          const height = `${Math.max(4, (point.count / max) * 100)}%`;
          return (
            <div
              key={point.date}
              className="group flex min-w-0 flex-1 flex-col items-center gap-2"
            >
              <div className="relative flex h-full w-full items-end justify-center">
                <div
                  className="w-full max-w-8 rounded-t-md bg-emerald-500/80 transition group-hover:bg-emerald-400"
                  style={{ height }}
                  title={`${point.date}: ${point.count}`}
                />
              </div>
              <span className="hidden text-[10px] text-slate-600 sm:block">
                {point.date.slice(5)}
              </span>
            </div>
          );
        })}
      </div>
      <p className="mt-3 text-center text-xs text-slate-500 sm:hidden">
        Hover bars on desktop for dates
      </p>
    </div>
  );
}

type BreakdownProps = {
  title: string;
  items: Array<{ label: string; count: number }>;
  total: number;
};

export function ScanBreakdown({ title, items, total }: BreakdownProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
      <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
        {title}
      </h3>
      {items.length === 0 ? (
        <p className="mt-4 text-sm text-slate-500">No scans yet.</p>
      ) : (
        <ul className="mt-4 space-y-3">
          {items.map((item) => {
            const pct = total ? Math.round((item.count / total) * 100) : 0;
            return (
              <li key={item.label}>
                <div className="flex items-center justify-between gap-2 text-sm">
                  <span className="truncate text-slate-300">{item.label}</span>
                  <span className="shrink-0 text-slate-500">
                    {item.count} ({pct}%)
                  </span>
                </div>
                <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-white/5">
                  <div
                    className="h-full rounded-full bg-emerald-500/70"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

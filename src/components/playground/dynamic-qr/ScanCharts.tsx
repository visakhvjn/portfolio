"use client";

import type { DailyScanCount } from "@/lib/dynamic-qr/types";

type ScanChartProps = {
  data: DailyScanCount[];
};

export function ScanUsageChart({ data }: ScanChartProps) {
  const width = 100;
  const height = 40;
  const max = Math.max(1, ...data.map((d) => d.count));
  const points = data
    .map((point, index) => {
      const x = data.length > 1 ? (index / (data.length - 1)) * width : width / 2;
      const y = height - (point.count / max) * height;
      return `${x},${y}`;
    })
    .join(" ");
  const area = `0,${height} ${points} ${width},${height}`;

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
      <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
        Scans (last 14 days)
      </h3>
      <div className="mt-5 h-48 rounded-xl border border-white/5 bg-slate-950/30 p-3">
        <svg viewBox={`0 0 ${width} ${height}`} className="h-full w-full">
          <line x1="0" y1={height} x2={width} y2={height} className="stroke-white/10" />
          <polyline points={area} fill="rgb(16 185 129 / 0.10)" />
          <polyline
            points={points}
            fill="none"
            stroke="rgb(16 185 129 / 0.95)"
            strokeWidth="1.2"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
          {data.map((point, index) => {
            const x = data.length > 1 ? (index / (data.length - 1)) * width : width / 2;
            const y = height - (point.count / max) * height;
            return (
              <g key={point.date}>
                <circle cx={x} cy={y} r="0.9" fill="rgb(52 211 153)" />
                <title>{`${point.date}: ${point.count}`}</title>
              </g>
            );
          })}
        </svg>
      </div>
      <div className="mt-3 flex justify-between text-[10px] text-slate-500">
        <span>{data[0]?.date.slice(5) ?? ""}</span>
        <span>{data[data.length - 1]?.date.slice(5) ?? ""}</span>
      </div>
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

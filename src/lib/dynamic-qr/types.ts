export type DynamicQrLinkRow = {
  id: string;
  owner_id: string;
  title: string;
  slug: string;
  destination_url: string;
  created_at: string;
  updated_at: string;
};

export type DynamicQrScanRow = {
  id: string;
  qr_id: string;
  scanned_at: string;
  user_agent: string | null;
  device_type: string | null;
  os_name: string | null;
  browser_name: string | null;
  country: string | null;
  region: string | null;
  city: string | null;
  referrer: string | null;
};

export function slugifyDynamicQrTitle(title: string): string {
  const base = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 32);
  const suffix = Math.random().toString(36).slice(2, 8);
  return `${base || "qr"}-${suffix}`;
}

export function normalizeDestinationUrl(raw: string): string | null {
  const trimmed = raw.trim();
  if (!trimmed) return null;
  const withScheme = /^[a-zA-Z][a-zA-Z\d+\-.]*:/.test(trimmed)
    ? trimmed
    : `https://${trimmed}`;
  try {
    const url = new URL(withScheme);
    if (url.protocol !== "http:" && url.protocol !== "https:") return null;
    return url.toString();
  } catch {
    return null;
  }
}

export function deviceTypeFromUserAgent(ua: string | null): string {
  if (!ua) return "Unknown";
  const lower = ua.toLowerCase();
  if (/ipad|tablet|playbook|silk|(android(?!.*mobile))/.test(lower)) {
    return "Tablet";
  }
  if (/mobile|iphone|ipod|android|blackberry|opera mini|iemobile/.test(lower)) {
    return "Mobile";
  }
  if (/bot|crawler|spider|slurp|facebookexternalhit/.test(lower)) {
    return "Bot";
  }
  return "Desktop";
}

export function osNameFromUserAgent(ua: string | null): string {
  if (!ua) return "Unknown";
  const lower = ua.toLowerCase();
  if (/iphone|ipad|ipod|ios/.test(lower)) return "iOS";
  if (/android/.test(lower)) return "Android";
  if (/windows nt|win64|win32/.test(lower)) return "Windows";
  if (/mac os x|macintosh/.test(lower)) return "macOS";
  if (/linux|x11/.test(lower)) return "Linux";
  if (/cros/.test(lower)) return "ChromeOS";
  return "Unknown";
}

export function browserNameFromUserAgent(ua: string | null): string {
  if (!ua) return "Unknown";
  const lower = ua.toLowerCase();
  if (/edg\//.test(lower)) return "Edge";
  if (/opr\/|opera/.test(lower)) return "Opera";
  if (/firefox\//.test(lower)) return "Firefox";
  if (/samsungbrowser\//.test(lower)) return "Samsung Internet";
  if (/chrome\//.test(lower) && !/edg\//.test(lower)) return "Chrome";
  if (/safari\//.test(lower) && !/chrome\//.test(lower)) return "Safari";
  return "Unknown";
}

export type DailyScanCount = { date: string; count: number };

export function aggregateScansByDay(
  scans: DynamicQrScanRow[],
  days = 14,
): DailyScanCount[] {
  const now = new Date();
  const buckets = new Map<string, number>();

  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const key = d.toISOString().slice(0, 10);
    buckets.set(key, 0);
  }

  for (const scan of scans) {
    const key = scan.scanned_at.slice(0, 10);
    if (buckets.has(key)) {
      buckets.set(key, (buckets.get(key) ?? 0) + 1);
    }
  }

  return [...buckets.entries()].map(([date, count]) => ({ date, count }));
}

export function countByField(
  scans: DynamicQrScanRow[],
  field: keyof Pick<
    DynamicQrScanRow,
    | "device_type"
    | "os_name"
    | "browser_name"
    | "country"
    | "region"
    | "city"
  >,
  limit = 8,
): Array<{ label: string; count: number }> {
  const map = new Map<string, number>();
  for (const scan of scans) {
    const raw = scan[field];
    const label = raw?.trim() || "Unknown";
    map.set(label, (map.get(label) ?? 0) + 1);
  }
  return [...map.entries()]
    .map(([label, count]) => ({ label, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);
}

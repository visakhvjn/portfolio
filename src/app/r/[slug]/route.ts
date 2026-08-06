import {
  deviceTypeFromUserAgent,
  type DynamicQrLinkRow,
} from "@/lib/dynamic-qr/types";
import { createPublicClient } from "@/lib/supabase/dynamic-qr/public";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

type RouteContext = { params: Promise<{ slug: string }> };

function destinationUrl(raw: string): URL | null {
  try {
    const url = new URL(raw);
    if (url.protocol !== "http:" && url.protocol !== "https:") return null;
    return url;
  } catch {
    return null;
  }
}

export async function GET(request: Request, context: RouteContext) {
  const { slug: rawSlug } = await context.params;
  const slug = decodeURIComponent(rawSlug).trim();
  if (!slug) {
    return new NextResponse("Link not found.", { status: 404 });
  }

  let supabase;
  try {
    supabase = createPublicClient();
  } catch {
    return new NextResponse("Dynamic QR is not configured.", { status: 503 });
  }

  const { data: link, error } = await supabase
    .from("dynamic_qr_links")
    .select("id, destination_url, slug")
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    console.error("[dynamic-qr redirect] lookup failed:", error.message);
    return new NextResponse("Could not resolve link.", { status: 502 });
  }

  if (!link) {
    return new NextResponse("Link not found.", { status: 404 });
  }

  const row = link as Pick<DynamicQrLinkRow, "id" | "destination_url" | "slug">;
  const target = destinationUrl(row.destination_url);
  if (!target) {
    return new NextResponse("Invalid destination URL.", { status: 502 });
  }

  const headers = request.headers;
  const userAgent = headers.get("user-agent");
  const referrer = headers.get("referer");

  const country =
    headers.get("x-vercel-ip-country") ??
    headers.get("cf-ipcountry") ??
    null;
  const region =
    headers.get("x-vercel-ip-country-region") ??
    headers.get("cf-region") ??
    null;
  const city =
    headers.get("x-vercel-ip-city") ?? headers.get("cf-ipcity") ?? null;

  const { error: scanError } = await supabase.from("dynamic_qr_scans").insert({
    qr_id: row.id,
    user_agent: userAgent,
    device_type: deviceTypeFromUserAgent(userAgent),
    country,
    region,
    city,
    referrer,
  });

  if (scanError) {
    console.error("[dynamic-qr redirect] scan log failed:", scanError.message);
  }

  return NextResponse.redirect(target, 302);
}

import { createClient } from "@/lib/supabase/dynamic-qr/server";
import {
  deviceTypeFromUserAgent,
  type DynamicQrLinkRow,
} from "@/lib/dynamic-qr/types";
import { NextResponse } from "next/server";

type RouteContext = { params: Promise<{ slug: string }> };

export async function GET(request: Request, context: RouteContext) {
  const { slug } = await context.params;

  const supabase = await createClient();
  const { data: link, error } = await supabase
    .from("dynamic_qr_links")
    .select("id, destination_url, slug")
    .eq("slug", slug)
    .maybeSingle();

  if (error || !link) {
    return NextResponse.redirect(new URL("/playground/dynamic-qr", request.url));
  }

  const row = link as Pick<DynamicQrLinkRow, "id" | "destination_url" | "slug">;
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

  void supabase.from("dynamic_qr_scans").insert({
    qr_id: row.id,
    user_agent: userAgent,
    device_type: deviceTypeFromUserAgent(userAgent),
    country,
    region,
    city,
    referrer,
  });

  return NextResponse.redirect(row.destination_url, 302);
}

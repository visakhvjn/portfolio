import { type NextRequest } from "next/server";
import {
  updateDynamicQrSession,
  updateMcqSession,
} from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  if (
    path.startsWith("/playground/dynamic-qr") ||
    path.startsWith("/auth/callback/dynamic-qr")
  ) {
    return updateDynamicQrSession(request);
  }

  if (
    path.startsWith("/playground/mcq-quiz") ||
    path === "/auth/callback"
  ) {
    return updateMcqSession(request);
  }

  return updateMcqSession(request);
}

export const config = {
  matcher: [
    "/playground/mcq-quiz/:path*",
    "/playground/dynamic-qr/:path*",
    "/auth/callback",
    "/auth/callback/dynamic-qr",
  ],
};

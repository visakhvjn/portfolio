import { site } from "@/data/site";
import { NextResponse } from "next/server";

type ContactBody = {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  website?: string;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactBody;

    if (body.website) {
      return NextResponse.json({ ok: true });
    }

    const name = body.name?.trim();
    const email = body.email?.trim();
    const message = body.message?.trim();
    const subject = body.subject?.trim() || "Portfolio inquiry";

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 },
      );
    }

    if (message.length < 20) {
      return NextResponse.json(
        { error: "Message must be at least 20 characters." },
        { status: 400 },
      );
    }

    const accessKey = process.env.WEB3FORMS_ACCESS_KEY;

    if (!accessKey) {
      return NextResponse.json(
        {
          error:
            "Contact form is not configured yet. Please email directly.",
          mailto: `mailto:${site.email}`,
        },
        { status: 503 },
      );
    }

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: accessKey,
        name,
        email,
        subject: `[Portfolio] ${subject}`,
        message,
        from_name: "Portfolio — Visakh Vijayan",
      }),
    });

    const data = await res.json();

    if (!res.ok || !data.success) {
      return NextResponse.json(
        { error: data.message || "Failed to send message." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Unexpected error. Please try again." },
      { status: 500 },
    );
  }
}

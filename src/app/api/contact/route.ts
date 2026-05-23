import { site } from "@/data/site";
import { NextResponse } from "next/server";
import { Resend } from "resend";

type ContactBody = {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  website?: string;
};

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

async function sendViaResend({
  name,
  email,
  subject,
  message,
}: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return null;

  const resend = new Resend(apiKey);
  const from =
    process.env.RESEND_FROM ?? "Portfolio Contact <onboarding@resend.dev>";

  const { error } = await resend.emails.send({
    from,
    to: site.email,
    replyTo: email,
    subject: `[Portfolio] ${subject}`,
    text: [`Name: ${name}`, `Email: ${email}`, "", message].join("\n"),
    html: [
      `<p><strong>Name:</strong> ${escapeHtml(name)}</p>`,
      `<p><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>`,
      `<p><strong>Subject:</strong> ${escapeHtml(subject)}</p>`,
      "<hr />",
      `<p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>`,
    ].join("\n"),
  });

  if (error) {
    throw new Error(error.message);
  }

  return true;
}

async function sendViaWeb3Forms({
  name,
  email,
  subject,
  message,
}: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  const accessKey = process.env.WEB3FORMS_ACCESS_KEY;
  if (!accessKey) return null;

  const res = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      access_key: accessKey,
      name,
      email,
      subject: `[Portfolio] ${subject}`,
      message,
      from_name: "Portfolio — Visakh Vijayan",
    }),
  });

  const data = (await res.json()) as { success?: boolean; message?: string };

  if (!res.ok || !data.success) {
    throw new Error(data.message || "Failed to send message.");
  }

  return true;
}

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

    const payload = { name, email, subject, message };

    try {
      const sent =
        (await sendViaResend(payload)) ?? (await sendViaWeb3Forms(payload));

      if (!sent) {
        return NextResponse.json(
          {
            error:
              "Contact form is not configured yet. Please email directly.",
            mailto: `mailto:${site.email}`,
          },
          { status: 503 },
        );
      }

      return NextResponse.json({ ok: true });
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to send message.";
      return NextResponse.json({ error: message }, { status: 502 });
    }
  } catch {
    return NextResponse.json(
      { error: "Unexpected error. Please try again." },
      { status: 500 },
    );
  }
}

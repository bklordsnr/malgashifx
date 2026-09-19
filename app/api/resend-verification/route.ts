import { NextResponse } from "next/server";
import crypto from "crypto";
import { Resend } from "resend";

import prisma from "@/lib/prismadb";

export const dynamic = "force-dynamic";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const email = String(body.email ?? "")
      .trim()
      .toLowerCase();

    if (!email) {
      return NextResponse.json(
        { message: "Email is required." },
        { status: 400 },
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        email: true,
        emailVerified: true,
      },
    });

    // Always return the same response for unknown/already-verified emails.
    // This prevents revealing whether an email belongs to an account.
    if (!user || user.emailVerified) {
      return NextResponse.json(
        {
          message:
            "If an unverified account exists with this email, a verification email has been sent.",
        },
        { status: 200 },
      );
    }

    // Remove previous verification tokens.
    await prisma.emailVerificationToken.deleteMany({
      where: {
        userId: user.id,
      },
    });

    const token = crypto.randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

    await prisma.emailVerificationToken.create({
      data: {
        token,
        userId: user.id,
        expiresAt,
      },
    });

    const baseUrl =
      process.env.NEXTAUTH_URL || "https://malgashitraders.xyz";

    const verificationUrl = `${baseUrl}/en/verify-email?token=${token}`;

    await resend.emails.send({
      from: "SOMALIA MALGASHI <noreply@malgashitraders.xyz>",
      to: email,
      subject: "Verify your SOMALIA MALGASHI email",
      html: `
        <div style="margin:0;padding:40px 20px;background:#f8fafc;font-family:Arial,sans-serif;color:#111827;">
          <div style="max-width:520px;margin:0 auto;background:#ffffff;border:1px solid #e5e7eb;border-radius:12px;padding:40px;">
            <h1 style="margin:0 0 24px;font-size:24px;color:#14532d;">
              SOMALIA MALGASHI
            </h1>

            <h2 style="margin:0 0 16px;font-size:20px;color:#111827;">
              Verify your email
            </h2>

            <p style="margin:0 0 24px;font-size:15px;line-height:1.6;color:#4b5563;">
              Please verify your email address to complete your account registration.
            </p>

            <a
              href="${verificationUrl}"
              style="display:inline-block;padding:12px 20px;background:#14532d;color:#ffffff;text-decoration:none;border-radius:6px;font-size:14px;font-weight:600;"
            >
              Verify your email
            </a>

            <p style="margin:24px 0 8px;font-size:13px;color:#6b7280;">
              This link will expire in 24 hours.
            </p>

            <p style="margin:0 0 20px;font-size:13px;color:#6b7280;">
              If you don't see this email in your inbox, please check your Spam or Junk folder.
            </p>

            <p style="margin:0;font-size:12px;line-height:1.5;color:#9ca3af;word-break:break-all;">
              If the button doesn't work, copy and paste this link into your browser:
              <br />
              ${verificationUrl}
            </p>

            <div style="margin-top:32px;padding-top:20px;border-top:1px solid #e5e7eb;">
              <p style="margin:0;font-size:12px;color:#9ca3af;">
                SOMALIA MALGASHI<br />
                This is an automated security email.
              </p>
            </div>
          </div>
        </div>
      `,
      text: `
Welcome to SOMALIA MALGASHI

Please verify your email address to complete your account registration.

Verify your email:
${verificationUrl}

This link will expire in 24 hours.

If you don't see this email in your inbox, please check your Spam or Junk folder.

SOMALIA MALGASHI
This is an automated security email.
      `,
    });

    return NextResponse.json(
      {
        message:
          "If an unverified account exists with this email, a verification email has been sent.",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("RESEND_VERIFICATION_ERROR", error);

    return NextResponse.json(
      { message: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
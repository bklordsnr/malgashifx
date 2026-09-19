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
      where: { email },
      select: {
        id: true,
        email: true,
      },
    });

    // Always return the same response whether the email exists or not.
    if (!user || !user.email) {
      return NextResponse.json(
        {
          message:
            "If an account exists for this email, a password reset link has been sent.",
        },
        { status: 200 },
      );
    }

    // Remove existing reset tokens for this user.
    await prisma.passwordResetToken.deleteMany({
      where: {
        userId: user.id,
      },
    });

    // Generate a cryptographically secure token.
    const token = crypto.randomBytes(32).toString("hex");

    // Token expires after 1 hour.
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000);

    await prisma.passwordResetToken.create({
      data: {
        token,
        userId: user.id,
        expiresAt,
      },
    });

    const baseUrl = process.env.NEXTAUTH_URL || "https://malgashitraders.xyz";

    const resetUrl = `${baseUrl}/en/reset-password?token=${token}`;

    await resend.emails.send({
      from: "SOMALIA MALGASHI <noreply@malgashitraders.xyz>",
      to: user.email,
      subject: "Reset your SOMALIA MALGASHI password",
      html: `
  <div
    style="
      margin: 0;
      padding: 40px 20px;
      background-color: #f6f7f6;
      font-family: Arial, Helvetica, sans-serif;
      color: #171717;
    "
  >
    <div
      style="
        max-width: 560px;
        margin: 0 auto;
        background-color: #ffffff;
        border: 1px solid #e5e7e5;
        border-radius: 12px;
        overflow: hidden;
      "
    >
      <!-- Header -->
      <div
        style="
          padding: 28px 32px;
          border-bottom: 1px solid #e5e7e5;
          text-align: center;
        "
      >
        <div
          style="
            font-size: 20px;
            font-weight: 700;
            letter-spacing: 0.3px;
            color: #175f22;
          "
        >
          SOMALIA MALGASHI
        </div>
      </div>

      <!-- Content -->
      <div style="padding: 36px 32px;">
        <h1
          style="
            margin: 0 0 16px;
            font-size: 24px;
            line-height: 1.3;
            font-weight: 700;
            color: #171717;
          "
        >
          Reset your password
        </h1>

        <p
          style="
            margin: 0 0 16px;
            font-size: 15px;
            line-height: 1.7;
            color: #525252;
          "
        >
          We received a request to reset the password for your
          SOMALIA MALGASHI account.
        </p>

        <p
          style="
            margin: 0 0 28px;
            font-size: 15px;
            line-height: 1.7;
            color: #525252;
          "
        >
          Click the button below to create a new password.
          This link will expire in 1 hour.
        </p>

        <!-- Button -->
        <div style="margin-bottom: 28px;">
          <a
            href="${resetUrl}"
            style="
              display: inline-block;
              padding: 13px 24px;
              background-color: #175f22;
              color: #ffffff;
              text-decoration: none;
              border-radius: 7px;
              font-size: 15px;
              font-weight: 600;
            "
          >
            Reset Password
          </a>
        </div>

        <!-- Fallback link -->
        <p
          style="
            margin: 0 0 8px;
            font-size: 13px;
            line-height: 1.6;
            color: #737373;
          "
        >
          If the button doesn't work, copy and paste this link into your
          browser:
        </p>

        <p
          style="
            margin: 0 0 28px;
            font-size: 13px;
            line-height: 1.6;
            word-break: break-all;
          "
        >
          <a
            href="${resetUrl}"
            style="
              color: #175f22;
              text-decoration: underline;
            "
          >
            ${resetUrl}
          </a>
        </p>

        <!-- Security notice -->
        <div
          style="
            padding: 16px;
            background-color: #f6f7f6;
            border-radius: 8px;
          "
        >
          <p
            style="
              margin: 0;
              font-size: 13px;
              line-height: 1.6;
              color: #666666;
            "
          >
            If you didn't request a password reset, you can safely ignore
            this email. Your password will not be changed.
          </p>
        </div>
      </div>

      <!-- Footer -->
      <div
        style="
          padding: 24px 32px;
          border-top: 1px solid #e5e7e5;
          text-align: center;
        "
      >
        <p
          style="
            margin: 0;
            font-size: 12px;
            line-height: 1.6;
            color: #8a8a8a;
          "
        >
          This is an automated security email from SOMALIA MALGASHI.
        </p>
      </div>
    </div>
  </div>
`,
      text: `
Reset your SOMALIA MALGASHI password

We received a request to reset the password for your SOMALIA MALGASHI account.

Use the link below to create a new password:

${resetUrl}

This link will expire in 1 hour.

If you didn't request a password reset, you can safely ignore this email. Your password will not be changed.

SOMALIA MALGASHI
This is an automated security email.
  `,
    });

    return NextResponse.json(
      {
        message:
          "If an account exists for this email, a password reset link has been sent.",
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("FORGOT_PASSWORD_ERROR", error);

    return NextResponse.json(
      {
        message: "Something went wrong. Please try again.",
      },
      { status: 500 },
    );
  }
}

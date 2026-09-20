import { NextResponse } from "next/server";
import crypto from "crypto";
import { Resend } from "resend";
import site from "@/config/site";
import { verificationEmail } from "@/lib/emails/verificationEmail";

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

    const baseUrl = site.url;

    const verificationUrl = `${baseUrl}/en/verify-email?token=${token}`;

    const verificationEmailContent = verificationEmail({
      verificationUrl,
    });

    await resend.emails.send({
      from: `${site.name} <${site.email}>`,
      to: email,
      subject: verificationEmailContent.subject,
      html: verificationEmailContent.html,
      text: verificationEmailContent.text,
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

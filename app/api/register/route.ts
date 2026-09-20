import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
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

    const name = String(body.name ?? "").trim();
    const email = String(body.email ?? "")
      .trim()
      .toLowerCase();
    const country = String(body.country ?? "")
      .trim()
      .toUpperCase();
    const number = String(body.number ?? "").trim();
    const password = String(body.password ?? "");

    if (!name || !email || !country || !number || !password) {
      return NextResponse.json(
        {
          message:
            "Name, email, country, phone number, and password are required.",
        },
        { status: 400 },
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
      select: { id: true },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "An account with this email already exists." },
        { status: 409 },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        country,
        number,
        hashedPassword,
      },
    });

    // Generate a secure verification token.
    const token = crypto.randomBytes(32).toString("hex");

    // Token expires after 24 hours.
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
          "Account created successfully. Please check your email to verify your account.",
        id: user.id,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("REGISTER_ERROR", error);

    return NextResponse.json(
      { message: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}

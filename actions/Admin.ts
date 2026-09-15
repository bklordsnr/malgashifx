"use server";

import { getServerSession } from "next-auth";

import { authOptions } from "@/pages/api/auth/[...nextauth]";
import prisma from "@/lib/prismadb";

export async function getAdminUser() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
    },
  });

  if (!user || user.role !== "ADMIN") {
    return null;
  }

  return user;
}

export async function requireAdmin() {
  const admin = await getAdminUser();

  if (!admin) {
    throw new Error("Unauthorized");
  }

  return admin;
}
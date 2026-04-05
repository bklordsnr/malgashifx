import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import prisma from "@/lib/prismadb";

export async function getSession() {
  return await getServerSession(authOptions);
}

export async function getCurrentUser() {
  try {
    const session = await getSession();

    if (!session?.user?.email) {
      return null;
    }

    const CurrentUser = await prisma.user.findUnique({
      where: {
        email: session?.user?.email,
      },
    });


    if (!CurrentUser) {
      return null;
    }

    // console.log(CurrentUser)

   

    return {
      ...CurrentUser,

      createdAt: CurrentUser.createdAt.toISOString(),
      updatedAt: CurrentUser.updatedAt.toISOString(),
      emailVerified: CurrentUser.emailVerified?.toISOString() || null,
    };
  } catch (error) {
    console.log(error);
    return null;
  }
}

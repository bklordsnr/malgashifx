import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prismadb";
import bcrypt from "bcrypt";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "email",
          type: "text",
        },
        password: {
          label: "password",
          type: "password",
        },
      },
      async authorize(credentials) {
        //if we dont have an email or pass
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid email or password");
        }

        //if their is an email and pass
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        //check if no user or user with hashpassword
        if (!user || !user?.hashedPassword) {
          throw new Error("Invalid email or password");
        }

        //compare the user password with on in database
        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );

        //if wrong throw error
        if (!isCorrectPassword) {
          throw new Error("Invalid password");
        }

        //if their is user and passwor is fine return it
        return user;
      },
    }),
  ],

  pages: {
    signIn: "/sign-in",
  },
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
export default NextAuth(authOptions);

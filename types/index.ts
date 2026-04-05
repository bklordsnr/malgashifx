import { User } from "@prisma/client";

export type SafeUser = Omit<
  User,
  "createdAt" | "updatedAt" | "emailVerified"
> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
};


export type CartPlanType = {
  id: string;
  name: string;
  price: number;
  profit: number;
  category: string;
  availability: boolean;
  customizedinvestment: boolean;
  personalAccount: boolean;
  swapdiscount: boolean;
};

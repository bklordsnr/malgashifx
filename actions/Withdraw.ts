"use server";

import { getServerSession } from "next-auth";

import { authOptions } from "@/pages/api/auth/[...nextauth]";
import prisma from "@/lib/prismadb";

const MIN_WITHDRAWAL = 5;
const MAX_WITHDRAWAL = 600;

const detectNetwork = (phoneNumber: string) => {
  const number = phoneNumber.replace(/\s/g, "");

  if (number.startsWith("061")) {
    return "EVC";
  }

  if (number.startsWith("063")) {
    return "Telesom";
  }

  if (number.startsWith("09")) {
    return "Golis";
  }

  return null;
};

interface WithdrawInput {
  amount: number;
  phoneNumber: string;
}

interface WithdrawSuccess {
  success: true;
  message: string;
  balance: number;
  withdrawalId: string;
  amount: number;
  phoneNumber: string;
  network: string;
}

interface WithdrawFailure {
  success: false;
  message: string;
}

type WithdrawResult = WithdrawSuccess | WithdrawFailure;

export async function withdraw({
  amount,
  phoneNumber,
}: WithdrawInput): Promise<WithdrawResult> {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return {
        success: false,
        message: "You must be signed in to make a withdrawal.",
      };
    }

    if (!Number.isInteger(amount)) {
      return {
        success: false,
        message: "Withdrawal amount must be a whole number.",
      };
    }

    if (amount < MIN_WITHDRAWAL) {
      return {
        success: false,
        message: `Minimum withdrawal is $${MIN_WITHDRAWAL}.`,
      };
    }

    if (amount > MAX_WITHDRAWAL) {
      return {
        success: false,
        message: `Maximum withdrawal is $${MAX_WITHDRAWAL}.`,
      };
    }

    const normalizedPhoneNumber = phoneNumber.replace(/\s/g, "");
    const network = detectNetwork(normalizedPhoneNumber);

    if (!network) {
      return {
        success: false,
        message: "Enter a valid EVC, Telesom, or Golis number.",
      };
    }

    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
      select: {
        id: true,
        TotalBalance: true,
        clearancestatus: true,
      },
    });

    if (!user) {
      return {
        success: false,
        message: "Account not found.",
      };
    }

    if (!user.clearancestatus) {
      return {
        success: false,
        message:
          "Your account is not cleared for withdrawals at this time.",
      };
    }

    const currentBalance = user.TotalBalance ?? 0;

    if (currentBalance <= 0) {
      return {
        success: false,
        message: "You do not have an available balance.",
      };
    }

    if (amount > currentBalance) {
      return {
        success: false,
        message: "Withdrawal amount exceeds your available balance.",
      };
    }

    const result = await prisma.$transaction(async (tx) => {
      const updatedUser = await tx.user.update({
        where: {
          id: user.id,
        },
        data: {
          TotalBalance: {
            decrement: amount,
          },
        },
        select: {
          TotalBalance: true,
        },
      });

      const withdrawal = await tx.withdrawal.create({
        data: {
          userId: user.id,
          amount,
          phoneNumber: normalizedPhoneNumber,
          network,
          status: "PENDING",
        },
      });

      return {
        balance: updatedUser.TotalBalance ?? 0,
        withdrawalId: withdrawal.id,
      };
    });

    return {
      success: true,
      message: "Withdrawal submitted successfully.",
      balance: result.balance,
      withdrawalId: result.withdrawalId,
      amount,
      phoneNumber: normalizedPhoneNumber,
      network,
    };
  } catch (error) {
    console.error("WITHDRAWAL_ERROR", error);

    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }
}
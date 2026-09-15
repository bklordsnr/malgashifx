"use server";

import { revalidatePath } from "next/cache";

import { requireAdmin } from "@/actions/Admin";
import prisma from "@/lib/prismadb";

type WithdrawalAction = "APPROVE" | "REJECT";

interface ProcessWithdrawalInput {
  withdrawalId: string;
  action: WithdrawalAction;
}

export async function processWithdrawal({
  withdrawalId,
  action,
}: ProcessWithdrawalInput) {
  try {
    await requireAdmin();

    if (!withdrawalId) {
      return {
        success: false,
        message: "Withdrawal ID is required.",
      };
    }

    if (action !== "APPROVE" && action !== "REJECT") {
      return {
        success: false,
        message: "Invalid withdrawal action.",
      };
    }

    const result = await prisma.$transaction(async (tx) => {
      const withdrawal = await tx.withdrawal.findUnique({
        where: {
          id: withdrawalId,
        },
        select: {
          id: true,
          userId: true,
          amount: true,
          status: true,
        },
      });

      if (!withdrawal) {
        throw new Error("Withdrawal not found.");
      }

      if (withdrawal.status !== "PENDING") {
        throw new Error(
          `This withdrawal has already been ${withdrawal.status.toLowerCase()}.`
        );
      }

      if (action === "APPROVE") {
        const updatedWithdrawal = await tx.withdrawal.updateMany({
          where: {
            id: withdrawal.id,
            status: "PENDING",
          },
          data: {
            status: "APPROVED",
          },
        });

        if (updatedWithdrawal.count !== 1) {
          throw new Error("Withdrawal could not be approved.");
        }

        return {
          status: "APPROVED" as const,
          amount: withdrawal.amount,
        };
      }

      const updatedWithdrawal = await tx.withdrawal.updateMany({
        where: {
          id: withdrawal.id,
          status: "PENDING",
        },
        data: {
          status: "REJECTED",
        },
      });

      if (updatedWithdrawal.count !== 1) {
        throw new Error("Withdrawal could not be rejected.");
      }

      await tx.user.update({
        where: {
          id: withdrawal.userId,
        },
        data: {
          TotalBalance: {
            increment: withdrawal.amount,
          },
        },
      });

      return {
        status: "REJECTED" as const,
        amount: withdrawal.amount,
      };
    });

    revalidatePath("/admin");
    revalidatePath("/admin/withdrawals");
    revalidatePath("/account");

    return {
      success: true,
      message:
        result.status === "APPROVED"
          ? "Withdrawal approved successfully."
          : `Withdrawal rejected and $${result.amount.toLocaleString()} returned to the user's balance.`,
    };
  } catch (error) {
    console.error("PROCESS_WITHDRAWAL_ERROR", error);

    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Unable to process withdrawal.",
    };
  }
}
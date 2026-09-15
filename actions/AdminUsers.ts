"use server";

import { revalidatePath } from "next/cache";

import { requireAdmin } from "@/actions/Admin";
import prisma from "@/lib/prismadb";

interface UpdateUserStatusInput {
  userId: string;
  field: "tradingstatus" | "clearancestatus";
  value: boolean;
}

interface UpdateUserFinancialsInput {
  userId: string;
  TotalBalance: number;
  Deposit: number;
  Profit: number;
}

export async function updateUserStatus({
  userId,
  field,
  value,
}: UpdateUserStatusInput) {
  try {
    await requireAdmin();

    if (!userId) {
      return {
        success: false,
        message: "User ID is required.",
      };
    }

    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        [field]: value,
      },
    });

    revalidatePath("/admin/users");
    revalidatePath("/admin");

    return {
      success: true,
      message: "User status updated successfully.",
    };
  } catch (error) {
    console.error("UPDATE_USER_STATUS_ERROR", error);

    return {
      success: false,
      message: "Unable to update user status.",
    };
  }
}

export async function updateUserFinancials({
  userId,
  TotalBalance,
  Deposit,
  Profit,
}: UpdateUserFinancialsInput) {
  try {
    await requireAdmin();

    if (!userId) {
      return {
        success: false,
        message: "User ID is required.",
      };
    }

    if (
      !Number.isFinite(TotalBalance) ||
      !Number.isFinite(Deposit) ||
      !Number.isFinite(Profit)
    ) {
      return {
        success: false,
        message: "Financial values must be valid numbers.",
      };
    }

    if (
      !Number.isInteger(TotalBalance) ||
      !Number.isInteger(Deposit) ||
      !Number.isInteger(Profit)
    ) {
      return {
        success: false,
        message: "Financial values must be whole numbers.",
      };
    }

    if (TotalBalance < 0 || Deposit < 0 || Profit < 0) {
      return {
        success: false,
        message: "Financial values cannot be negative.",
      };
    }

    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        TotalBalance,
        Deposit,
        Profit,
      },
    });

    revalidatePath("/admin/users");
    revalidatePath("/admin");
    revalidatePath("/account");

    return {
      success: true,
      message: "Account information updated successfully.",
    };
  } catch (error) {
    console.error("UPDATE_USER_FINANCIALS_ERROR", error);

    return {
      success: false,
      message: "Unable to update account information.",
    };
  }
}

export async function deleteUser(userId: string) {
  try {
    const admin = await requireAdmin();

    if (!userId) {
      return {
        success: false,
        message: "User ID is required.",
      };
    }

    if (userId === admin.id) {
      return {
        success: false,
        message: "You cannot delete your own admin account.",
      };
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
      },
    });

    if (!user) {
      return {
        success: false,
        message: "User not found.",
      };
    }

    await prisma.user.delete({
      where: {
        id: userId,
      },
    });

    revalidatePath("/admin/users");
    revalidatePath("/admin");
    revalidatePath("/admin/withdrawals");
    revalidatePath("/account");

    return {
      success: true,
      message: "User and related account records deleted successfully.",
    };
  } catch (error) {
    console.error("DELETE_USER_ERROR", error);

    return {
      success: false,
      message: "Unable to delete user.",
    };
  }
}
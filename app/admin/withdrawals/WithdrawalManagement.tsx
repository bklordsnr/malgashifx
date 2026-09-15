"use client";

import { useState } from "react";
import {
  HiOutlineCheckCircle,
  HiOutlineClock,
  HiOutlineXCircle,
} from "react-icons/hi";
import { FiArrowDownLeft } from "react-icons/fi";
import toast from "react-hot-toast";

import { processWithdrawal } from "@/actions/AdminWithdrawals";
import { Button } from "@/components/ui/button";

interface Withdrawal {
  id: string;
  amount: number;
  phoneNumber: string;
  network: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  createdAt: string;
  user: {
    id: string;
    name: string | null;
    email: string | null;
  };
}

interface WithdrawalManagementProps {
  withdrawals: Withdrawal[];
}

const formatDate = (date: string) => {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(date));
};

const WithdrawalManagement = ({
  withdrawals,
}: WithdrawalManagementProps) => {
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const pendingCount = withdrawals.filter(
    (withdrawal) => withdrawal.status === "PENDING"
  ).length;

  const handleAction = async (
    withdrawalId: string,
    action: "APPROVE" | "REJECT"
  ) => {
    const confirmed = window.confirm(
      action === "APPROVE"
        ? "Are you sure you want to approve this withdrawal?"
        : "Are you sure you want to reject this withdrawal and return the amount to the user's balance?"
    );

    if (!confirmed) {
      return;
    }

    setLoadingId(withdrawalId);

    try {
      const result = await processWithdrawal({
        withdrawalId,
        action,
      });

      if (result.success) {
        toast.success(result.message);
        window.location.reload();
        return;
      }

      toast.error(result.message);
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary">
          Administration
        </p>

        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          Withdrawal Management
        </h1>

        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Review and manage user withdrawal requests.
        </p>
      </div>

      <div className="mb-6 grid grid-cols-3 gap-3">
        <div className="rounded-2xl border-custom2 bg-card p-4">
          <p className="text-xs font-medium text-muted-foreground">
            Total
          </p>

          <p className="mt-1 text-xl font-semibold text-foreground">
            {withdrawals.length}
          </p>
        </div>

        <div className="rounded-2xl border-custom2 bg-card p-4">
          <p className="text-xs font-medium text-muted-foreground">
            Pending
          </p>

          <p className="mt-1 text-xl font-semibold text-foreground">
            {pendingCount}
          </p>
        </div>

        <div className="rounded-2xl border-custom2 bg-card p-4">
          <p className="text-xs font-medium text-muted-foreground">
            Processed
          </p>

          <p className="mt-1 text-xl font-semibold text-foreground">
            {withdrawals.length - pendingCount}
          </p>
        </div>
      </div>

      {withdrawals.length === 0 ? (
        <div className="rounded-2xl border-custom2 bg-card px-5 py-12 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-muted">
            <FiArrowDownLeft
              size={24}
              className="text-muted-foreground"
            />
          </div>

          <h2 className="mt-4 text-sm font-semibold text-foreground">
            No withdrawal requests
          </h2>

          <p className="mt-1 text-xs text-muted-foreground">
            Withdrawal requests will appear here when users submit them.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {withdrawals.map((withdrawal) => {
            const isLoading = loadingId === withdrawal.id;
            const isPending = withdrawal.status === "PENDING";

            return (
              <div
                key={withdrawal.id}
                className="rounded-2xl border-custom2 bg-card p-5 sm:p-6"
              >
                <div className="flex flex-col gap-5">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10">
                        <FiArrowDownLeft
                          size={20}
                          className="text-primary"
                        />
                      </div>

                      <div className="min-w-0">
                        <h2 className="text-base font-semibold text-foreground">
                          ${withdrawal.amount.toLocaleString()}
                        </h2>

                        <p className="mt-1 truncate text-sm text-muted-foreground">
                          {withdrawal.user.name || "Unnamed User"}
                        </p>

                        <p className="truncate text-xs text-muted-foreground">
                          {withdrawal.user.email || "No email address"}
                        </p>
                      </div>
                    </div>

                    {withdrawal.status === "PENDING" && (
                      <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-yellow-500/20 bg-yellow-500/10 px-2.5 py-1 text-xs font-medium text-yellow-700">
                        <HiOutlineClock size={14} />
                        Pending
                      </span>
                    )}

                    {withdrawal.status === "APPROVED" && (
                      <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                        <HiOutlineCheckCircle size={14} />
                        Approved
                      </span>
                    )}

                    {withdrawal.status === "REJECTED" && (
                      <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-destructive/20 bg-destructive/10 px-2.5 py-1 text-xs font-medium text-destructive">
                        <HiOutlineXCircle size={14} />
                        Rejected
                      </span>
                    )}
                  </div>

                  <div className="grid gap-3 border-y border-border py-4 sm:grid-cols-3">
                    <div>
                      <p className="text-[11px] font-medium text-muted-foreground">
                        Network
                      </p>

                      <p className="mt-1 text-sm font-medium text-foreground">
                        {withdrawal.network}
                      </p>
                    </div>

                    <div>
                      <p className="text-[11px] font-medium text-muted-foreground">
                        Phone Number
                      </p>

                      <p className="mt-1 text-sm font-medium text-foreground">
                        {withdrawal.phoneNumber}
                      </p>
                    </div>

                    <div>
                      <p className="text-[11px] font-medium text-muted-foreground">
                        Submitted
                      </p>

                      <p className="mt-1 text-sm font-medium text-foreground">
                        {formatDate(withdrawal.createdAt)}
                      </p>
                    </div>
                  </div>

                  {isPending && (
                    <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                      <Button
                        type="button"
                        variant="destructive"
                        onClick={() =>
                          handleAction(
                            withdrawal.id,
                            "REJECT"
                          )
                        }
                        disabled={isLoading}
                        className="h-11 border-custom3"
                      >
                        {isLoading ? "Processing..." : "Reject"}
                      </Button>

                      <Button
                        type="button"
                        onClick={() =>
                          handleAction(
                            withdrawal.id,
                            "APPROVE"
                          )
                        }
                        disabled={isLoading}
                        className="h-11 border-custom"
                      >
                        {isLoading ? "Processing..." : "Approve"}
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default WithdrawalManagement;
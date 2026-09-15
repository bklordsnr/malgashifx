"use client";

import { FiArrowDownLeft } from "react-icons/fi";
import {
  HiOutlineCheckCircle,
  HiOutlineClock,
  HiOutlineXCircle,
} from "react-icons/hi";

interface Withdrawal {
  id: string;
  amount: number;
  phoneNumber: string;
  network: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  createdAt: string;
}

interface WithdrawalHistoryProps {
  withdrawals: Withdrawal[];
}

const statusConfig = {
  PENDING: {
    label: "Pending",
    icon: HiOutlineClock,
    className:
      "border-yellow-500/20 bg-yellow-500/10 text-yellow-700",
  },
  APPROVED: {
    label: "Approved",
    icon: HiOutlineCheckCircle,
    className: "border-primary/20 bg-primary/10 text-primary",
  },
  REJECTED: {
    label: "Rejected",
    icon: HiOutlineXCircle,
    className: "border-destructive/20 bg-destructive/10 text-destructive",
  },
};

const formatDate = (date: string) => {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(date));
};

const WithdrawalHistory = ({
  withdrawals,
}: WithdrawalHistoryProps) => {
  return (
    <section className="mt-8 rounded-2xl border-custom2 bg-card">
      <div className="border-b border-border px-5 py-4 sm:px-6">
        <h2 className="text-sm font-semibold text-foreground">
          Withdrawal History
        </h2>

        <p className="mt-1 text-xs text-muted-foreground">
          View your recent withdrawal requests and their status.
        </p>
      </div>

      {withdrawals.length === 0 ? (
        <div className="flex flex-col items-center justify-center px-5 py-12 text-center sm:px-6">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-muted">
            <FiArrowDownLeft
              size={24}
              className="text-muted-foreground"
            />
          </div>

          <h3 className="mt-4 text-sm font-semibold text-foreground">
            No withdrawals yet
          </h3>

          <p className="mt-1 max-w-sm text-xs leading-5 text-muted-foreground">
            Your withdrawal requests will appear here once you make a
            withdrawal.
          </p>
        </div>
      ) : (
        <div className="divide-y divide-border">
          {withdrawals.map((withdrawal) => {
            const status = statusConfig[withdrawal.status];
            const StatusIcon = status.icon;

            return (
              <div
                key={withdrawal.id}
                className="px-5 py-5 sm:px-6"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <FiArrowDownLeft
                        size={19}
                        className="text-primary"
                      />
                    </div>

                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-foreground">
                        ${withdrawal.amount.toFixed(2)}
                      </p>

                      <p className="mt-1 truncate text-xs text-muted-foreground">
                        {withdrawal.network} · {withdrawal.phoneNumber}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-4 sm:justify-end">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${status.className}`}
                    >
                      <StatusIcon size={14} />
                      {status.label}
                    </span>

                    <span className="text-xs text-muted-foreground">
                      {formatDate(withdrawal.createdAt)}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default WithdrawalHistory;
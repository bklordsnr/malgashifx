"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AiOutlineRise } from "react-icons/ai";
import { GiProfit } from "react-icons/gi";
import { LuBadgeDollarSign, LuCircleDollarSign } from "react-icons/lu";
import { MdOutlineEmail, MdOutlinePhone } from "react-icons/md";
import { HiOutlineCheckCircle, HiOutlineXCircle } from "react-icons/hi";
import { FiArrowDownLeft, FiArrowRight, FiLock } from "react-icons/fi";
import toast from "react-hot-toast";

import { SafeUser } from "@/types";
import { formatPrice } from "@/utils/formatPrice";
import { withdraw } from "@/actions/Withdraw";

import btcimage01 from "@/public/assets/btcimage01.svg";
import btcimage02 from "@/public/assets/btcimage02.svg";

interface AccountProps {
  currentUser: SafeUser | null;
}

type Network = "EVC" | "Telesom" | "Golis";

const MIN_WITHDRAWAL = 5;
const MAX_WITHDRAWAL = 600;

const Account = ({ currentUser }: AccountProps) => {
  const router = useRouter();

  const [amount, setAmount] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [withdrawalComplete, setWithdrawalComplete] = useState(false);
  const [isWithdrawing, setIsWithdrawing] = useState(false);
  const [completedWithdrawal, setCompletedWithdrawal] = useState<{
    amount: number;
    phoneNumber: string;
    network: Network;
    balance: number;
  } | null>(null);

  const isTradingActive = Boolean(currentUser?.tradingstatus);
  const isClearanceApproved = Boolean(currentUser?.clearancestatus);

  const balance = Number(currentUser?.TotalBalance ?? 0);
  const withdrawalAmount = Number(amount);

  const network = useMemo<Network | null>(() => {
    const normalizedNumber = phoneNumber.replace(/\s/g, "");

    if (normalizedNumber.startsWith("061")) {
      return "EVC";
    }

    if (normalizedNumber.startsWith("063")) {
      return "Telesom";
    }

    if (normalizedNumber.startsWith("09")) {
      return "Golis";
    }

    return null;
  }, [phoneNumber]);

  const isPhoneValid = Boolean(network);

  const amountError = useMemo(() => {
    if (!amount) {
      return "";
    }

    if (!Number.isFinite(withdrawalAmount)) {
      return "Enter a valid amount";
    }

    if (withdrawalAmount < MIN_WITHDRAWAL) {
      return `Minimum withdrawal is $${MIN_WITHDRAWAL}`;
    }

    if (withdrawalAmount > MAX_WITHDRAWAL) {
      return `Maximum withdrawal is $${MAX_WITHDRAWAL}`;
    }

    if (withdrawalAmount > balance) {
      return "Amount exceeds your available balance";
    }

    return "";
  }, [amount, balance, withdrawalAmount]);

  const phoneError = useMemo(() => {
    if (!phoneNumber) {
      return "";
    }

    if (!isPhoneValid) {
      return "Enter a valid EVC, Telesom, or Golis number";
    }

    return "";
  }, [phoneNumber, isPhoneValid]);

  const canWithdraw =
    balance > 0 &&
    isClearanceApproved &&
    withdrawalAmount >= MIN_WITHDRAWAL &&
    withdrawalAmount <= MAX_WITHDRAWAL &&
    withdrawalAmount <= balance &&
    isPhoneValid;

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    if (value === "") {
      setAmount("");
      return;
    }

    if (!/^\d*\.?\d*$/.test(value)) {
      return;
    }

    setAmount(value);
  };

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.replace(/\D/g, "");

    setPhoneNumber(value);
  };

  const handleWithdraw = () => {
    if (!canWithdraw) {
      return;
    }

    setShowConfirmation(true);
  };

  const handleConfirmWithdrawal = async () => {
    if (!canWithdraw || !network) {
      return;
    }

    setIsWithdrawing(true);

    try {
      const result = await withdraw({
        amount: withdrawalAmount,
        phoneNumber,
      });

      if (!result.success) {
        toast.error(result.message);
        setShowConfirmation(false);
        return;
      }

      setShowConfirmation(false);

      setCompletedWithdrawal({
        amount: result.amount,
        phoneNumber: result.phoneNumber,
        network: result.network as Network,
        balance: result.balance,
      });

      setWithdrawalComplete(true);

      router.refresh();
    } catch {
      toast.error("Something went wrong. Please try again.");
      setShowConfirmation(false);
    } finally {
      setIsWithdrawing(false);
    }
  };

  const handleCloseSuccess = () => {
    setWithdrawalComplete(false);
    setCompletedWithdrawal(null);
    setAmount("");
    setPhoneNumber("");
  };

  return (
    <div className="w-full">
      <section>
        <div>
          <span className="flex items-center gap-2 text-xl font-semibold tracking-tight text-foreground">
            Welcome 😎
          </span>

          <p className="mt-1 text-sm text-muted-foreground">
            Good to see you, {currentUser?.name}.
          </p>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-[1.4fr_1fr]">
          <div className="relative min-h-[190px] overflow-hidden rounded-2xl border-custom2 bg-card">
            <div className="relative z-10 flex h-full min-h-[190px] flex-col justify-between p-5 sm:p-6">
              <div>
                <span className="text-sm font-medium text-muted-foreground">
                  Total Balance
                </span>

                <p className="mt-2 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                  {formatPrice(currentUser?.TotalBalance)}
                </p>
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <AiOutlineRise size={20} className="text-primary" />
                <span>1:100 M</span>
                <span>Leverage</span>
              </div>
            </div>

            <div className="pointer-events-none absolute right-0 top-0 h-full w-[42%]">
              <div className="absolute right-12 top-5 h-16 w-16 sm:right-16 sm:h-20 sm:w-20">
                <Image
                  src={btcimage01}
                  alt=""
                  fill
                  className="object-contain"
                />
              </div>

              <div className="absolute bottom-[-10px] right-[-5px] h-28 w-28 sm:h-36 sm:w-36">
                <Image
                  src={btcimage02}
                  alt=""
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-1">
            <div className="flex min-h-[92px] items-center justify-between rounded-2xl border-custom2 bg-card px-5 py-4">
              <div>
                <span className="text-sm text-muted-foreground">
                  Invested Value
                </span>

                <p className="mt-1 text-xl font-semibold text-foreground">
                  {formatPrice(currentUser?.Deposit)}
                </p>
              </div>

              <div className="relative flex h-11 w-11 items-center justify-center rounded-full bg-primary/10">
                <span className="absolute right-1 top-1 h-1.5 w-1.5 rounded-full bg-primary" />
                <LuBadgeDollarSign size={26} className="text-primary" />
              </div>
            </div>

            <div className="flex min-h-[92px] items-center justify-between rounded-2xl border-custom2 bg-card px-5 py-4">
              <div>
                <span className="text-sm text-muted-foreground">
                  Target Profit
                </span>

                <p className="mt-1 text-xl font-semibold text-foreground">
                  {formatPrice(currentUser?.Profit)}
                </p>
              </div>

              <div className="relative flex h-11 w-11 items-center justify-center rounded-full bg-primary/10">
                <span className="absolute right-1 top-1 h-1.5 w-1.5 rounded-full bg-destructive" />
                <GiProfit size={26} className="text-primary" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-8 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-2xl border-custom2 bg-card p-5 sm:p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="text-sm font-semibold text-foreground">
                Withdraw Funds
              </span>

              <p className="mt-1 text-xs leading-5 text-muted-foreground">
                Withdraw available funds directly to your mobile wallet.
              </p>
            </div>

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
              <FiArrowDownLeft size={20} className="text-primary" />
            </div>
          </div>

          {!isClearanceApproved ? (
            <div className="mt-6 rounded-xl border border-destructive/20 bg-destructive/5 p-4">
              <div className="flex items-start gap-3">
                <FiLock
                  size={18}
                  className="mt-0.5 shrink-0 text-destructive"
                />

                <div>
                  <p className="text-sm font-medium text-foreground">
                    Withdrawal unavailable
                  </p>

                  <p className="mt-1 text-xs leading-5 text-muted-foreground">
                    Your account currently has a clearance restriction.
                    Withdrawals will become available once your account is
                    approved.
                  </p>
                </div>
              </div>
            </div>
          ) : balance <= 0 ? (
            <div className="mt-6 rounded-xl border border-border bg-muted/40 p-4">
              <div className="flex items-start gap-3">
                <LuCircleDollarSign
                  size={19}
                  className="mt-0.5 shrink-0 text-muted-foreground"
                />

                <div>
                  <p className="text-sm font-medium text-foreground">
                    No available balance
                  </p>

                  <p className="mt-1 text-xs leading-5 text-muted-foreground">
                    You need an available balance before you can make a
                    withdrawal.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="mt-6 space-y-5">
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label
                    htmlFor="withdrawal-amount"
                    className="text-sm font-medium text-foreground"
                  >
                    Withdrawal Amount
                  </label>

                  <span className="text-xs text-muted-foreground">
                    Available: {formatPrice(currentUser?.TotalBalance)}
                  </span>
                </div>

                <div className="relative">
                  <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm font-medium text-muted-foreground">
                    $
                  </span>

                  <input
                    id="withdrawal-amount"
                    type="text"
                    inputMode="decimal"
                    value={amount}
                    onChange={handleAmountChange}
                    placeholder="0.00"
                    disabled={isWithdrawing}
                    className={`w-full rounded-xl border bg-background py-3 pl-9 pr-4 text-sm text-foreground outline-none transition placeholder:text-muted-foreground/60 disabled:cursor-not-allowed disabled:opacity-60 ${
                      amountError
                        ? "border-destructive focus:border-destructive"
                        : "border-border focus:border-primary"
                    }`}
                  />
                </div>

                <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                  <span>Minimum $5</span>
                  <span>Maximum $600</span>
                </div>

                {amountError && (
                  <p className="mt-2 text-xs text-destructive">{amountError}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="withdrawal-phone"
                  className="mb-2 block text-sm font-medium text-foreground"
                >
                  Mobile Number
                </label>

                <input
                  id="withdrawal-phone"
                  type="tel"
                  inputMode="numeric"
                  value={phoneNumber}
                  onChange={handlePhoneChange}
                  placeholder="Enter mobile number"
                  maxLength={10}
                  disabled={isWithdrawing}
                  className={`w-full rounded-xl border bg-background px-4 py-3 text-sm text-foreground outline-none transition placeholder:text-muted-foreground/60 disabled:cursor-not-allowed disabled:opacity-60 ${
                    phoneError
                      ? "border-destructive focus:border-destructive"
                      : "border-border focus:border-primary"
                  }`}
                />

                <div className="mt-2 min-h-5">
                  {network ? (
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                      <span>{network} mobile wallet detected</span>
                    </div>
                  ) : phoneError ? (
                    <p className="text-xs text-destructive">{phoneError}</p>
                  ) : (
                    <p className="text-xs text-muted-foreground">
                      EVC, Telesom, and Golis numbers are supported.
                    </p>
                  )}
                </div>
              </div>

              <button
                type="button"
                onClick={handleWithdraw}
                disabled={!canWithdraw || isWithdrawing}
                className="flex h-12 w-full items-center justify-center gap-2 rounded-xl border-custom bg-primary px-4 text-sm font-semibold text-primary-foreground transition-all hover:opacity-95 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-40"
              >
                Withdraw Funds
                <FiArrowRight size={17} />
              </button>
            </div>
          )}
        </div>

        <div className="rounded-2xl border-custom2 bg-card p-5 sm:p-6">
          <span className="text-sm font-semibold text-foreground">
            Withdrawal Information
          </span>

          <p className="mt-1 text-xs leading-5 text-muted-foreground">
            Keep your withdrawal details accurate to avoid delays.
          </p>

          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between gap-4 border-b border-border pb-4">
              <span className="text-sm text-muted-foreground">
                Available Balance
              </span>

              <span className="text-sm font-semibold text-foreground">
                {formatPrice(currentUser?.TotalBalance)}
              </span>
            </div>

            <div className="flex items-center justify-between gap-4 border-b border-border pb-4">
              <span className="text-sm text-muted-foreground">Minimum</span>

              <span className="text-sm font-medium text-foreground">$5</span>
            </div>

            <div className="flex items-center justify-between gap-4 border-b border-border pb-4">
              <span className="text-sm text-muted-foreground">Maximum</span>

              <span className="text-sm font-medium text-foreground">$600</span>
            </div>

            <div className="flex items-center justify-between gap-4">
              <span className="text-sm text-muted-foreground">
                Supported wallets
              </span>

              <span className="text-right text-sm font-medium text-foreground">
                EVC · Telesom · Golis
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-8 rounded-2xl border-custom2 bg-card">
        <div className="border-b border-border px-5 py-4 sm:px-6">
          <h2 className="text-sm font-semibold text-foreground">
            Account Overview
          </h2>

          <p className="mt-1 text-xs text-muted-foreground">
            Your account and trading status
          </p>
        </div>

        <div className="divide-y divide-border">
          <div className="flex items-center justify-between gap-4 px-5 py-4 sm:px-6">
            <span className="text-sm text-foreground">Trading Status</span>

            {isTradingActive ? (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                <HiOutlineCheckCircle size={15} />
                Active
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-destructive/20 bg-destructive/10 px-2.5 py-1 text-xs font-medium text-destructive">
                <HiOutlineXCircle size={15} />
                Inactive
              </span>
            )}
          </div>

          <div className="flex items-center justify-between gap-4 px-5 py-4 sm:px-6">
            <span className="flex items-center gap-2 text-sm text-foreground">
              <MdOutlineEmail size={18} className="text-muted-foreground" />
              Email
            </span>

            <span className="max-w-[60%] truncate text-right text-sm text-muted-foreground">
              {currentUser?.email || "Not provided"}
            </span>
          </div>

          <div className="flex items-center justify-between gap-4 px-5 py-4 sm:px-6">
            <span className="flex items-center gap-2 text-sm text-foreground">
              <MdOutlinePhone size={18} className="text-muted-foreground" />
              Phone Number
            </span>

            <span className="text-sm text-muted-foreground">
              {currentUser?.number || "Not provided"}
            </span>
          </div>

          <div className="flex items-center justify-between gap-4 px-5 py-4 sm:px-6">
            <span className="text-sm text-foreground">Clearance Status</span>

            {isClearanceApproved ? (
              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                <HiOutlineCheckCircle size={17} />
                Approved
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-destructive">
                <HiOutlineXCircle size={17} />
                Not Approved
              </span>
            )}
          </div>
        </div>
      </section>

      {showConfirmation && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/30 px-5 backdrop-blur-sm">
          <div className="w-full max-w-[400px] rounded-2xl border-custom2 bg-background p-6 shadow-2xl">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <FiArrowDownLeft size={22} className="text-primary" />
            </div>

            <h2 className="mt-5 text-lg font-semibold text-foreground">
              Confirm withdrawal
            </h2>

            <p className="mt-1 text-sm leading-6 text-muted-foreground">
              Please review your withdrawal details before confirming.
            </p>

            <div className="mt-6 rounded-xl border border-border bg-muted/30 p-4">
              <div className="flex items-center justify-between gap-4">
                <span className="text-sm text-muted-foreground">Amount</span>

                <span className="text-lg font-semibold text-foreground">
                  ${withdrawalAmount.toFixed(2)}
                </span>
              </div>

              <div className="mt-4 flex items-center justify-between gap-4">
                <span className="text-sm text-muted-foreground">
                  Mobile number
                </span>

                <span className="text-sm font-medium text-foreground">
                  {phoneNumber}
                </span>
              </div>

              <div className="mt-4 flex items-center justify-between gap-4">
                <span className="text-sm text-muted-foreground">Wallet</span>

                <span className="text-sm font-medium text-primary">
                  {network}
                </span>
              </div>
            </div>

            <div className="mt-5 rounded-xl bg-muted/50 px-4 py-3">
              <p className="text-xs leading-5 text-muted-foreground">
                Make sure the mobile number belongs to your wallet before
                confirming this withdrawal.
              </p>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setShowConfirmation(false)}
                disabled={isWithdrawing}
                className="h-11 rounded-xl border border-border bg-background px-4 text-sm font-medium text-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleConfirmWithdrawal}
                disabled={isWithdrawing}
                className="h-11 rounded-xl border-custom bg-primary px-4 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isWithdrawing ? "Processing..." : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}

      {withdrawalComplete && completedWithdrawal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/30 px-5 backdrop-blur-sm">
          <div className="w-full max-w-[400px] rounded-2xl border-custom2 bg-background p-6 text-center shadow-2xl">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <HiOutlineCheckCircle size={38} className="text-primary" />
            </div>

            <h2 className="mt-5 text-xl font-semibold text-foreground">
              Withdrawal submitted
            </h2>

            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Your withdrawal request has been submitted successfully.
            </p>

            <div className="mt-6 rounded-xl border border-border bg-muted/30 p-4">
              <p className="text-xs text-muted-foreground">Withdrawal amount</p>

              <p className="mt-1 text-2xl font-semibold tracking-tight text-foreground">
                ${completedWithdrawal.amount.toFixed(2)}
              </p>

              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <span>{completedWithdrawal.network}</span>
                <span>•</span>
                <span>{completedWithdrawal.phoneNumber}</span>
              </div>

              <div className="mt-4 border-t border-border pt-4">
                <p className="text-xs text-muted-foreground">
                  Remaining balance
                </p>

                <p className="mt-1 text-sm font-semibold text-foreground">
                  ${completedWithdrawal.balance.toFixed(2)}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleCloseSuccess}
              className="mt-6 h-11 w-full rounded-xl border-custom bg-primary px-4 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-95"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Account;

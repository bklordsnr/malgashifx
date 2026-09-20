"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import toast from "react-hot-toast";

import {
  FiArrowRight,
  FiCheckCircle,
  FiInfo,
  FiShield,
  FiTrendingUp,
  FiCreditCard,
} from "react-icons/fi";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";

import { SafeUser } from "@/types";
import { withdraw } from "@/actions/Withdraw";
import { supportedWallets, type Network } from "@/config/walletConfig";

import WithdrawalHistory from "./WithdrawalHistory";
import { formatPrice } from "@/utils/formatPrice";

interface Withdrawal {
  id: string;
  amount: number;
  phoneNumber: string;
  network: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  createdAt: string;
}

interface AccountProps {
  currentUser: SafeUser | null;
  withdrawals: Withdrawal[];
}

const MIN_WITHDRAWAL = 5;
const MAX_WITHDRAWAL = 600;

const Account = ({ currentUser, withdrawals }: AccountProps) => {
  const t = useTranslations("Account");
  const router = useRouter();

  const [amount, setAmount] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [withdrawalComplete, setWithdrawalComplete] = useState(false);
  const [isWithdrawing, setIsWithdrawing] = useState(false);
  const [completedWithdrawal, setCompletedWithdrawal] =
    useState<Withdrawal | null>(null);

  const isTradingActive = Boolean(currentUser?.tradingstatus);
  const isClearanceApproved = Boolean(currentUser?.clearancestatus);

  const balance = Number(currentUser?.TotalBalance ?? 0);
  const withdrawalAmount = Number(amount);

  const network = useMemo<Network | null>(() => {
    if (!phoneNumber) return null;

    const matchedWallet = supportedWallets.find((wallet) =>
      wallet.prefixes.some((prefix) => phoneNumber.startsWith(prefix)),
    );

    return matchedWallet?.key ?? null;
  }, [phoneNumber]);

  const amountError = useMemo(() => {
    if (!amount) return null;

    if (!Number.isFinite(withdrawalAmount) || withdrawalAmount <= 0) {
      return t("withdrawal.validation.invalidAmount");
    }

    if (withdrawalAmount < MIN_WITHDRAWAL) {
      return t("withdrawal.validation.minimum");
    }

    if (withdrawalAmount > MAX_WITHDRAWAL) {
      return t("withdrawal.validation.maximum");
    }

    if (withdrawalAmount > balance) {
      return t("withdrawal.validation.exceedsBalance");
    }

    return null;
  }, [amount, balance, t, withdrawalAmount]);

  const phoneError = useMemo(() => {
    if (!phoneNumber) return null;

    if (!network) {
      return t("withdrawal.validation.invalidPhone");
    }

    return null;
  }, [network, phoneNumber, t]);

  const canWithdraw =
    balance > 0 &&
    isClearanceApproved &&
    Boolean(amount) &&
    !amountError &&
    withdrawalAmount >= MIN_WITHDRAWAL &&
    withdrawalAmount <= MAX_WITHDRAWAL &&
    withdrawalAmount <= balance &&
    Boolean(phoneNumber) &&
    !phoneError;

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    if (/^\d*\.?\d*$/.test(value)) {
      setAmount(value);
    }
  };

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.replace(/\D/g, "");
    setPhoneNumber(value);
  };

  const handleWithdraw = () => {
    if (!canWithdraw) return;

    setShowConfirmation(true);
  };

  const handleConfirmWithdrawal = async () => {
    if (!canWithdraw || !network) return;

    setIsWithdrawing(true);

    try {
      const result = await withdraw({
        amount: withdrawalAmount,
        phoneNumber,
      });

      if (!result?.success) {
        toast.error(result?.message || t("withdrawal.errors.generic"));
        return;
      }

      const newWithdrawal: Withdrawal = {
        id: result.withdrawalId,
        amount: withdrawalAmount,
        phoneNumber,
        network,
        status: "PENDING",
        createdAt: new Date().toISOString(),
      };

      setCompletedWithdrawal(newWithdrawal);
      setShowConfirmation(false);
      setWithdrawalComplete(true);

      router.refresh();
    } catch {
      toast.error(t("withdrawal.errors.generic"));
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
    <main className="w-full py-8 sm:py-10 lg:py-12">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <p className="text-sm font-medium text-primary">
            {t("welcome")}
          </p>

          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            {t("goodToSeeYou", {
              name: currentUser?.name ?? "",
            })}
          </h1>
        </div>

        {/* Balance Cards */}
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border-custom2 bg-background p-5">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                {t("balance.total")}
              </span>

              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <FiCreditCard size={18} />
              </div>
            </div>

            <p className="mt-4 text-2xl font-semibold tracking-tight text-foreground">
              {formatPrice(balance)}
            </p>
          </div>

          <div className="rounded-2xl border-custom2 bg-background p-5">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                {t("balance.leverage")}
              </span>

              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <FiTrendingUp size={18} />
              </div>
            </div>

            <p className="mt-4 text-2xl font-semibold tracking-tight text-foreground">
              1:100 M
            </p>
          </div>

          <div className="rounded-2xl border-custom2 bg-background p-5">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                {t("balance.investedValue")}
              </span>

              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <MdOutlineAccountBalanceWallet size={19} />
              </div>
            </div>

            <p className="mt-4 text-2xl font-semibold tracking-tight text-foreground">
              {formatPrice(currentUser?.Deposit)}
            </p>
          </div>

          <div className="rounded-2xl border-custom2 bg-background p-5">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                {t("balance.targetProfit")}
              </span>

              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <FiTrendingUp size={18} />
              </div>
            </div>

            <p className="mt-4 text-2xl font-semibold tracking-tight text-foreground">
              {formatPrice(currentUser?.Profit)}
            </p>
          </div>
        </section>

        {/* Withdrawal Section */}
        <section className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[1.4fr_0.6fr]">
          <div className="rounded-2xl border-custom2 bg-background p-5 sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold tracking-tight text-foreground">
                  {t("withdrawal.title")}
                </h2>

                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                  {t("withdrawal.description")}
                </p>
              </div>

              <div className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary sm:flex">
                <FiCreditCard size={21} />
              </div>
            </div>

            {!isClearanceApproved ? (
              <div className="mt-6 rounded-xl border border-border bg-muted/30 p-4">
                <div className="flex items-start gap-3">
                  <FiShield
                    size={19}
                    className="mt-0.5 shrink-0 text-primary"
                  />

                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      {t("withdrawal.unavailable")}
                    </p>

                    <p className="mt-1 text-sm leading-6 text-muted-foreground">
                      {t("withdrawal.clearanceRestriction")}
                    </p>
                  </div>
                </div>
              </div>
            ) : balance <= 0 ? (
              <div className="mt-6 rounded-xl border border-border bg-muted/30 p-4">
                <div className="flex items-start gap-3">
                  <FiInfo
                    size={19}
                    className="mt-0.5 shrink-0 text-primary"
                  />

                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      {t("withdrawal.noBalance")}
                    </p>

                    <p className="mt-1 text-sm leading-6 text-muted-foreground">
                      {t("withdrawal.noBalanceDescription")}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="mt-6 space-y-5">
                {/* Amount */}
                <div>
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <label
                      htmlFor="withdrawal-amount"
                      className="text-sm font-medium text-foreground"
                    >
                      {t("withdrawal.amount")}
                    </label>

                    <span className="text-xs text-muted-foreground">
                      {t("withdrawal.available", {
                        amount: formatPrice(balance),
                      })}
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
                      placeholder={t("withdrawal.placeholder")}
                      className={`h-12 w-full rounded-xl border-custom bg-background pl-8 pr-4 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/10 ${
                        amountError ? "border-destructive" : ""
                      }`}
                    />
                  </div>

                  <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                    <span>{t("withdrawal.minimum")}</span>
                    <span>{t("withdrawal.maximum")}</span>
                  </div>

                  {amountError && (
                    <p className="mt-2 text-xs text-destructive">
                      {amountError}
                    </p>
                  )}
                </div>

                {/* Phone Number */}
                <div>
                  <label
                    htmlFor="withdrawal-phone"
                    className="mb-2 block text-sm font-medium text-foreground"
                  >
                    {t("withdrawal.mobileNumber")}
                  </label>

                  <input
                    id="withdrawal-phone"
                    type="tel"
                    inputMode="numeric"
                    value={phoneNumber}
                    onChange={handlePhoneChange}
                    placeholder={t("withdrawal.mobilePlaceholder")}
                    className={`h-12 w-full rounded-xl border-custom bg-background px-4 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/10 ${
                      phoneError ? "border-destructive" : ""
                    }`}
                  />

                  {network && !phoneError && (
                    <p className="mt-2 flex items-center gap-1.5 text-xs text-primary">
                      <FiCheckCircle size={14} />

                      {t("withdrawal.walletDetected", {
                        network: t(`wallets.${network}`),
                      })}
                    </p>
                  )}

                  {phoneError && (
                    <p className="mt-2 text-xs text-destructive">
                      {phoneError}
                    </p>
                  )}

                  {!phoneError && !network && (
                    <p className="mt-2 text-xs text-muted-foreground">
                      {t("withdrawal.supportedWallets")}
                    </p>
                  )}
                </div>

                {/* Withdraw Button */}
                <button
                  type="button"
                  onClick={handleWithdraw}
                  disabled={!canWithdraw}
                  className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {t("withdrawal.button")}
                  <FiArrowRight size={17} />
                </button>
              </div>
            )}
          </div>

          {/* Withdrawal Information */}
          <div className="rounded-2xl border-custom2 bg-background p-5 sm:p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <FiInfo size={19} />
              </div>

              <div>
                <h2 className="text-base font-semibold text-foreground">
                  {t("withdrawal.information.title")}
                </h2>

                <p className="mt-0.5 text-xs text-muted-foreground">
                  {t("withdrawal.information.description")}
                </p>
              </div>
            </div>

            <div className="mt-6 divide-y divide-border">
              <div className="flex items-center justify-between gap-4 py-4 first:pt-0">
                <span className="text-sm text-muted-foreground">
                  {t("withdrawal.information.availableBalance")}
                </span>

                <span className="text-sm font-semibold text-foreground">
                  {formatPrice(balance)}
                </span>
              </div>

              <div className="flex items-center justify-between gap-4 py-4">
                <span className="text-sm text-muted-foreground">
                  {t("withdrawal.information.minimum")}
                </span>

                <span className="text-sm font-semibold text-foreground">
                  $5
                </span>
              </div>

              <div className="flex items-center justify-between gap-4 py-4">
                <span className="text-sm text-muted-foreground">
                  {t("withdrawal.information.maximum")}
                </span>

                <span className="text-sm font-semibold text-foreground">
                  $600
                </span>
              </div>

              <div className="flex items-center justify-between gap-4 py-4 last:pb-0">
                <span className="text-sm text-muted-foreground">
                  {t("withdrawal.information.supportedWallets")}
                </span>

                <span className="text-right text-sm font-semibold text-foreground">
                  {supportedWallets
                    .map((wallet) => t(`wallets.${wallet.key}`))
                    .join(", ")}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Account Overview */}
        <section className="mt-8 rounded-2xl border-custom2 bg-background p-5 sm:p-6">
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-foreground">
              {t("overview.title")}
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              {t("overview.description")}
            </p>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border-custom bg-muted/20 p-4">
              <span className="text-xs text-muted-foreground">
                {t("overview.tradingStatus")}
              </span>

              <div className="mt-2 flex items-center gap-2">
                <span
                  className={`h-2 w-2 rounded-full ${
                    isTradingActive ? "bg-primary" : "bg-muted-foreground"
                  }`}
                />

                <span className="text-sm font-medium text-foreground">
                  {isTradingActive
                    ? t("overview.active")
                    : t("overview.inactive")}
                </span>
              </div>
            </div>

            <div className="rounded-xl border-custom bg-muted/20 p-4">
              <span className="text-xs text-muted-foreground">
                {t("overview.email")}
              </span>

              <p className="mt-2 truncate text-sm font-medium text-foreground">
                {currentUser?.email || t("overview.notProvided")}
              </p>
            </div>

            <div className="rounded-xl border-custom bg-muted/20 p-4">
              <span className="text-xs text-muted-foreground">
                {t("overview.phoneNumber")}
              </span>

              <p className="mt-2 text-sm font-medium text-foreground">
                {currentUser?.number || t("overview.notProvided")}
              </p>
            </div>

            <div className="rounded-xl border-custom bg-muted/20 p-4">
              <span className="text-xs text-muted-foreground">
                {t("overview.clearanceStatus")}
              </span>

              <div className="mt-2 flex items-center gap-2">
                <span
                  className={`h-2 w-2 rounded-full ${
                    isClearanceApproved
                      ? "bg-primary"
                      : "bg-muted-foreground"
                  }`}
                />

                <span className="text-sm font-medium text-foreground">
                  {isClearanceApproved
                    ? t("overview.approved")
                    : t("overview.notApproved")}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Withdrawal History */}
        <section className="mt-8">
          <WithdrawalHistory withdrawals={withdrawals} />
        </section>
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 px-5 py-8 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-border bg-background p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold tracking-tight text-foreground">
                  {t("withdrawal.confirmation.title")}
                </h2>

                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                  {t("withdrawal.confirmation.description")}
                </p>
              </div>

              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <FiShield size={19} />
              </div>
            </div>

            <div className="mt-6 overflow-hidden rounded-xl border border-border">
              <div className="flex items-center justify-between gap-4 border-b border-border px-4 py-3">
                <span className="text-sm text-muted-foreground">
                  {t("withdrawal.confirmation.amount")}
                </span>

                <span className="text-sm font-semibold text-foreground">
                  {formatPrice(withdrawalAmount)}
                </span>
              </div>

              <div className="flex items-center justify-between gap-4 border-b border-border px-4 py-3">
                <span className="text-sm text-muted-foreground">
                  {t("withdrawal.confirmation.mobileNumber")}
                </span>

                <span className="text-sm font-semibold text-foreground">
                  {phoneNumber}
                </span>
              </div>

              <div className="flex items-center justify-between gap-4 px-4 py-3">
                <span className="text-sm text-muted-foreground">
                  {t("withdrawal.confirmation.wallet")}
                </span>

                <span className="text-sm font-semibold text-foreground">
                  {network ? t(`wallets.${network}`) : ""}
                </span>
              </div>
            </div>

            <div className="mt-4 rounded-xl border border-border bg-muted/30 p-4">
              <div className="flex items-start gap-3">
                <FiInfo
                  size={18}
                  className="mt-0.5 shrink-0 text-primary"
                />

                <p className="text-xs leading-5 text-muted-foreground">
                  {t("withdrawal.confirmation.warning")}
                </p>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setShowConfirmation(false)}
                disabled={isWithdrawing}
                className="h-11 rounded-xl border-custom px-4 text-sm font-medium text-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
              >
                {t("withdrawal.confirmation.cancel")}
              </button>

              <button
                type="button"
                onClick={handleConfirmWithdrawal}
                disabled={isWithdrawing}
                className="h-11 rounded-xl bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isWithdrawing
                  ? t("withdrawal.confirmation.processing")
                  : t("withdrawal.confirmation.confirm")}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {withdrawalComplete && completedWithdrawal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/50 px-5 py-8 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-border bg-background p-6 text-center shadow-2xl">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
              <FiCheckCircle size={31} />
            </div>

            <h2 className="mt-5 text-xl font-semibold tracking-tight text-foreground">
              {t("withdrawal.success.title")}
            </h2>

            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
              {t("withdrawal.success.description")}
            </p>

            <div className="mt-6 overflow-hidden rounded-xl border border-border text-left">
              <div className="flex items-center justify-between gap-4 border-b border-border px-4 py-3">
                <span className="text-sm text-muted-foreground">
                  {t("withdrawal.success.amount")}
                </span>

                <span className="text-sm font-semibold text-foreground">
                  {formatPrice(completedWithdrawal.amount)}
                </span>
              </div>

              <div className="flex items-center justify-between gap-4 border-b border-border px-4 py-3">
                <span className="text-sm text-muted-foreground">
                  {t("withdrawal.confirmation.wallet")}
                </span>

                <span className="text-sm font-semibold text-foreground">
                  {t(`wallets.${completedWithdrawal.network}`)} •{" "}
                  {completedWithdrawal.phoneNumber}
                </span>
              </div>

              <div className="flex items-center justify-between gap-4 px-4 py-3">
                <span className="text-sm text-muted-foreground">
                  {t("withdrawal.success.remainingBalance")}
                </span>

                <span className="text-sm font-semibold text-foreground">
                  {formatPrice(
                    Math.max(0, balance - completedWithdrawal.amount),
                  )}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleCloseSuccess}
              className="mt-6 h-11 w-full rounded-xl bg-primary px-5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              {t("withdrawal.success.done")}
            </button>
          </div>
        </div>
      )}
    </main>
  );
};

export default Account;

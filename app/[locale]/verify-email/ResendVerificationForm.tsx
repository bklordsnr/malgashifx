"use client";

import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";

const ResendVerificationForm = () => {
  const t = useTranslations("VerifyEmail");

  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleResend = async () => {
    if (!email.trim()) {
      toast.error(t("emailRequired"));
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post("/api/resend-verification", {
        email: email.trim().toLowerCase(),
      });

      toast.success(response.data.message);
      setEmail("");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message;

        toast.error(message || t("somethingWentWrong"));
      } else {
        toast.error(t("somethingWentWrong"));
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-3 pt-4">
      <p className="text-sm text-muted-foreground">
        {t("didntReceive")}
      </p>

      <div className="space-y-2">
        <label
          htmlFor="resend-email"
          className="block text-sm font-medium text-secondary-foreground"
        >
          {t("email")}
        </label>

        <input
          id="resend-email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          disabled={isLoading}
          placeholder={t("emailPlaceholder")}
          className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-ring focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
        />
      </div>

      <Button
        type="button"
        onClick={handleResend}
        disabled={isLoading}
        className="w-full border-custom"
      >
        {isLoading ? t("sending") : t("resend")}
      </Button>
    </div>
  );
};

export default ResendVerificationForm;

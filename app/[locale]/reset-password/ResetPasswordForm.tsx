"use client";

import { useState } from "react";
import axios from "axios";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { useForm, type SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";

import Input from "@/components/inputs/Input";
import { Button } from "@/components/ui/button";

type FormData = {
  password: string;
  confirmPassword: string;
};

interface ResetPasswordFormProps {
  token: string;
}

const ResetPasswordForm = ({ token }: ResetPasswordFormProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const t = useTranslations("ResetPassword");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    if (!token) {
      toast.error(t("invalidLink"));
      return;
    }

    if (data.password.length < 6) {
      toast.error(t("passwordTooShort"));
      return;
    }

    if (data.password !== data.confirmPassword) {
      toast.error(t("passwordsDoNotMatch"));
      return;
    }

    setIsLoading(true);

    try {
      await axios.post("/api/reset-password", {
        token,
        password: data.password,
      });

      toast.success(t("success"));
      router.push("/sign-in");
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
    <>
      <Input
        id="password"
        label={t("password")}
        type="password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />

      <Input
        id="confirmPassword"
        label={t("confirmPassword")}
        type="password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />

      <Button
        type="button"
        onClick={handleSubmit(onSubmit)}
        disabled={isLoading}
        className="w-full border-custom"
      >
        {isLoading ? t("resetting") : t("resetPassword")}
      </Button>
    </>
  );
};

export default ResetPasswordForm;

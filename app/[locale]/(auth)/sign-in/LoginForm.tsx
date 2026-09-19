"use client";

import { useState } from "react";
import { z } from "zod";
import {
  useForm,
  type FieldErrors,
  type SubmitHandler,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";

import { createLoginSchema } from "@/lib/loginSchema";
import Input from "@/components/inputs/Input";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const t = useTranslations("SignIn");

  const loginSchema = createLoginSchema({
    invalidEmail: t("validation.invalidEmail"),
    passwordRequired: t("validation.passwordRequired"),
  });

  type FormData = z.infer<typeof loginSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onInvalid = (formErrors: FieldErrors<FormData>) => {
    const firstError = Object.values(formErrors)[0];

    if (firstError?.message) {
      toast.error(String(firstError.message));
    }

    if (typeof navigator !== "undefined" && navigator.vibrate) {
      navigator.vibrate([100, 50, 100]);
    }
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsLoading(true);

    const normalizedData = {
      ...data,
      email: data.email.toLowerCase().trim(),
    };

    try {
      const callback = await signIn("credentials", {
        ...normalizedData,
        redirect: false,
      });

      if (callback?.ok) {
        router.push("/account");
        router.refresh();
        toast.success(t("welcomeBack"));
      }

      if (callback?.error) {
        toast.error(callback.error);
      }
    } catch {
      toast.error(t("somethingWentWrong"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button
        type="button"
        variant="outline"
        onClick={() => signIn("google")}
        className="flex w-full items-center gap-x-3 border-custom2"
      >
        <FcGoogle size={18} />
        {t("continueWithGoogle")}
      </Button>

      <Input
        id="email"
        label={t("email")}
        type="email"
        disabled={isLoading}
        register={register}
        errors={errors}
      />

      <Input
        id="password"
        label={t("password")}
        type="password"
        disabled={isLoading}
        register={register}
        errors={errors}
      />

      <p className="mr-auto text-sm text-muted-foreground">
        {t("noAccount")}

        <Link href="/sign-up" className="ml-1 underline">
          {t("signUp")}
        </Link>
      </p>

      <Button
        type="button"
        onClick={handleSubmit(onSubmit, onInvalid)}
        disabled={isLoading}
        className="w-full border-custom"
      >
        {isLoading ? t("signingIn") : t("signIn")}
      </Button>
    </>
  );
};

export default LoginForm;
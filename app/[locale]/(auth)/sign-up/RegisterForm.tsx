"use client";

import { useState } from "react";
import { z } from "zod";
import { useForm, type FieldErrors, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc"; 

import { createRegisterSchema } from "@/lib/registerSchema";
import Input from "@/components/inputs/Input";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

const RegisterForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const t = useTranslations("SignUp");

  const registerSchema = createRegisterSchema({
    nameTooShort: t("validation.nameTooShort"),
    nameTooLong: t("validation.nameTooLong"),
    nameLettersOnly: t("validation.nameLettersOnly"),
    invalidEmail: t("validation.invalidEmail"),
    passwordTooShort: t("validation.passwordTooShort"),
  });

  type FormData = z.infer<typeof registerSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
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
      name: data.name.trim(),
      email: data.email.toLowerCase().trim(),
    };

    try {
      await axios.post("/api/register", normalizedData);

      toast.success(t("accountCreated"));

      const callback = await signIn("credentials", {
        email: normalizedData.email,
        password: normalizedData.password,
        redirect: false,
      });

      if (callback?.ok) {
        router.push("/account");
        router.refresh();
        toast.success(t("welcome"));
        return;
      }

      if (callback?.error) {
        toast.error(callback.error);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message;

        if (message) {
          toast.error(message);
        } else {
          toast.error(t("somethingWentWrong"));
        }
      } else {
        toast.error(t("somethingWentWrong"));
      }
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
        id="name"
        label={t("name")}
        disabled={isLoading}
        register={register}
        errors={errors}
      />

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
        {t("alreadyHaveAccount")}

        <Link href="/sign-in" className="ml-1 underline">
          {t("signIn")}
        </Link>
      </p>

      <Button
        type="button"
        onClick={handleSubmit(onSubmit, onInvalid)}
        disabled={isLoading}
        className="w-full border-custom"
      >
        {isLoading ? t("creatingAccount") : t("createAccount")}
      </Button>
    </>
  );
};

export default RegisterForm;

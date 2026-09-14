"use client";

import { useState } from "react";
import { z } from "zod";
import { useForm, type FieldErrors, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";

import { loginSchema } from "@/lib/loginSchema";
import Input from "@/components/inputs/Input";
import { Button } from "@/components/ui/button";

type FormData = z.infer<typeof loginSchema>;

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

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
        toast.success("Welcome back! ☺️");
      }

      if (callback?.error) {
        toast.error(callback.error);
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
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
        Continue with Google
      </Button>

      <Input
        id="email"
        label="Enter your email"
        type="email"
        disabled={isLoading}
        register={register}
        errors={errors}
      />

      <Input
        id="password"
        label="Enter your password"
        type="password"
        disabled={isLoading}
        register={register}
        errors={errors}
      />

      <p className="mr-auto text-sm text-muted-foreground">
        Don&apos;t have an account?
        <Link href="/sign-up" className="ml-1 underline">
          Sign Up
        </Link>
      </p>

      <Button
        type="button"
        onClick={handleSubmit(onSubmit, onInvalid)}
        disabled={isLoading}
        className="w-full border-custom"
      >
        {isLoading ? "Signing in..." : "Sign In"}
      </Button>
    </>
  );
};

export default LoginForm;
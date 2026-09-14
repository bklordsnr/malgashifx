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
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";

import { registerSchema } from "@/lib/registerSchema";
import Input from "@/components/inputs/Input";
import { Button } from "@/components/ui/button";

type FormData = z.infer<typeof registerSchema>;

const RegisterForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

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

      toast.success("Account created successfully");

      const callback = await signIn("credentials", {
        email: normalizedData.email,
        password: normalizedData.password,
        redirect: false,
      });

      if (callback?.ok) {
        router.push("/account");
        router.refresh();
        toast.success("Welcome! ☺️");
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
        id="name"
        label="Enter your name"
        disabled={isLoading}
        register={register}
        errors={errors}
      />

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
        Already have an account?
        <Link href="/sign-in" className="ml-1 underline">
          Sign In
        </Link>
      </p>

      <Button
        type="button"
        onClick={handleSubmit(onSubmit, onInvalid)}
        disabled={isLoading}
        className="w-full border-custom"
      >
        {isLoading ? "Creating account..." : "Create Account"}
      </Button>
    </>
  );
};

export default RegisterForm;
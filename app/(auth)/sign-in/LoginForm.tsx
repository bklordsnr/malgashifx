"use client";

import { useState } from "react";
import { useForm, SubmitHandler, FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/lib/loginSchema";
import { z } from "zod";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import Input from "@/components/inputs/Input";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";

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

  const onInvalid = (errors: FieldErrors<FormData>) => {
    const firstError = Object.values(errors)[0];

    if (firstError?.message) {
      toast.error(firstError.message as string);
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
        toast.success("Wanaag Fiican!");
      }

      if (callback?.error) {
        toast.error(callback.error);
      }
    } catch {
      toast.error("kani wuu shaqayn waayay");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button
        className="w-full flex items-center gap-x-3 border-custom2"
        variant="outline"
        onClick={() => signIn("google")}
      >
        <FcGoogle size={18} /> ku gal googleka
      </Button>

      <Input
        id="email"
        label="Geli Emailkaaga"
        disabled={isLoading}
        register={register}
        errors={errors}
      />

      <Input
        id="password"
        label="Geli Passwordkaaga"
        disabled={isLoading}
        register={register}
        errors={errors}
        type="password"
      />

      <p className="mr-auto text-muted-foreground text-sm">
        Ma lihid account
        <Link href="/sign-up" className="underline ml-1">
          Isdiiwaangeli
        </Link>
      </p>

      <Button
        onClick={handleSubmit(onSubmit, onInvalid)}
        className="w-full border-custom"
      >
        {isLoading ? "sooshubaya" : "gal"}
      </Button>
    </>
  );
};

export default LoginForm;

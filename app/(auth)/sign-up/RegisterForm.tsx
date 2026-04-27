"use client";

import { useState } from "react";
import { useForm, SubmitHandler, FieldErrors } from "react-hook-form";
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Input from "@/components/inputs/Input";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";

import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@/lib/registerSchema";
import { z } from "zod";

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

  const onInvalid = (errors: FieldErrors<FormData>) => {
    const firstError = Object.values(errors)[0];

    if (firstError?.message) {
      toast.error(firstError.message as string);
    }

    if (typeof navigator !== "undefined" && navigator.vibrate) {
      navigator.vibrate([100, 50, 100]); // pattern
    }
  };

  const onSubmit: SubmitHandler<FormData> = (data) => {
    setIsLoading(true);

    axios
      .post("/api/register", data)
      .then(() => {
        toast.success("Account Created");

        signIn("credentials", {
          email: data.email,
          password: data.password,
          redirect: false,
        }).then((callback) => {
          if (callback?.ok) {
            router.push("/account");
            router.refresh();
            toast.success("Good Job!");
          }
          if (callback?.error) {
            toast.error(callback.error);
          }
        });
      })
      .catch(() => {
        toast.error("This didn't work.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <Button
        className="w-full flex items-center gap-x-3 border-custom2"
        variant="outline"
        onClick={() => signIn("google")}
      >
        <FcGoogle size={18} /> Sign up with Google
      </Button>

      <Input
        id="name"
        label="Enter Name"
        disabled={isLoading}
        register={register}
        errors={errors}
      />

      <Input
        id="email"
        label="Enter Email"
        disabled={isLoading}
        register={register}
        errors={errors}
      />

      <Input
        id="password"
        label="Enter Password"
        disabled={isLoading}
        register={register}
        errors={errors}
        type="password"
      />

      <p className="mr-auto text-muted-foreground text-sm">
        Do you have an account?{" "}
        <Link href="/sign-in" className="underline">
          Login
        </Link>
      </p>

      <Button
        onClick={handleSubmit(onSubmit, onInvalid)}
        className="w-full border-custom"
      >
        {isLoading ? "Loading.." : "Create account"}
      </Button>
    </>
  );
};

export default RegisterForm;

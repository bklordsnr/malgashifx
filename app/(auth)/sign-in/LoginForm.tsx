"use client";

import { useState } from "react";
import { FieldValues, useForm, SubmitHandler } from "react-hook-form";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Input from "@/components/inputs/Input";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    signIn("credentials", {
      ...data,
      redirect: false,
    })
      .then((callback) => {
        if (callback?.ok) {
          router.push("/account");
          router.refresh();
          toast.success("Good Job!");
        }
        if (callback?.error) {
          toast.error(callback.error);
        }
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
        variant={"outline"}
        onClick={() => signIn("google")}
      >
        <FcGoogle size={18} /> Sign in with Google
      </Button>

      <div className="w-full flex items-center">
        <span className="h-[0.3px] bg-secondary  flex-1" />
        <div className="uppercase text-sm bg-background py-[0.5px] px-1 text-center text-muted-foreground">
          or continue with
        </div>
        <span className="h-[0.3px] bg-secondary  flex-1" />
      </div>
      <Input
        id="email"
        label="Enter Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        label="Enter Password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        type="password"
      />

      <p className="mr-auto text-muted-foreground text-sm">
        Dont have have an account?{" "}
        <Link href={"/sign-up"} className="underline">
          Register
        </Link>
      </p>

      <Button onClick={handleSubmit(onSubmit)} className="w-full border-custom">
        {isLoading ? "Loading.." : "Log In"}
      </Button>
    </>
  );
};

export default LoginForm;

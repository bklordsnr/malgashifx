"use client";

import { useState } from "react";
import { FieldValues, useForm, SubmitHandler } from "react-hook-form";
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Input from "@/components/inputs/Input";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";

const RegisterForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
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
      <Button className="w-full flex items-center gap-x-3" variant={"outline"} onClick={() => signIn('google')}>
        <FcGoogle size={18} /> Sign up with Google
      </Button>
      <Input
        id="name"
        label="Enter Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
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
        Do you have an account?{" "}
        <Link href={"/sign-in"} className="underline">
          Login
        </Link>
      </p>

      <Button onClick={handleSubmit(onSubmit)} className="w-full">
        {isLoading ? "Loading.." : "Create account"}
      </Button>
    </>
  );
};

export default RegisterForm;

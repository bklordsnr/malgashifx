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
        toast.success("Account La Sameeyay");

        signIn("credentials", {
          email: data.email,
          password: data.password,
          redirect: false,
        }).then((callback) => {
          if (callback?.ok) {
            router.push("/account");
            router.refresh();
            toast.success("Wanaag Fiican!");
          }
          if (callback?.error) {
            toast.error(callback.error);
          }
        });
      })
      .catch(() => {
        toast.error("Kani wuu shaqayn waayay");
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
        <FcGoogle size={18} /> Ku isdiiwaangeli googleka
      </Button>

      <Input
        id="name"
        label="Geli Magacaaga"
        disabled={isLoading}
        register={register}
        errors={errors}
      />

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
        Ma leedahay account?{" "}
        <Link href="/sign-in" className="underline">
          Gal
        </Link>
      </p>

      <Button
        onClick={handleSubmit(onSubmit, onInvalid)}
        className="w-full border-custom"
      >
        {isLoading ? "sooshubaya" : "Samee Account"}
      </Button>
    </>
  );
};

export default RegisterForm;

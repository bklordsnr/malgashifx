import React from "react";
import LoginForm from "./LoginForm";
import { getCurrentUser } from "@/actions/GetUser";
import { redirect } from "next/navigation";
import Image from "next/image";
import Container from "@/components/Container";
import FormWrapper from "@/components/FormWrapper";

const page = async () => {
  const currentUser = await getCurrentUser();

  if (currentUser) redirect("/account");

  return (
    <Container>
      <div >
        <div className="h-full w-full py-10">
          <div className="flex justify-center items-center">
            <div className="w-full bg-card rounded-md max-w-[400px] border p-8">
              <div className="space-y-1 mb-8">
                <h1 className="text-secondary-foreground font-semibold text-2xl">
                  Sign in 
                </h1>
                <p className="text-muted-foreground text-sm">
                  Enter your email below to sign in
                </p>
              </div>
              <FormWrapper>
                <LoginForm />
              </FormWrapper>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default page;

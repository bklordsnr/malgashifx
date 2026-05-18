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
      <div>
        <div className="h-full w-full py-10">
          <div className="flex justify-center items-center">
            <div className="w-full bg-card rounded-md max-w-[400px] border-custom2 p-8">
              <div className="space-y-1 mb-8">
                <h1 className="text-secondary-foreground font-medium text-base">
                  Gal Accountka
                </h1>
                <p className="text-muted-foreground text-sm">
                  Geli emailkaaga hoose si aad u gasho accountka
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

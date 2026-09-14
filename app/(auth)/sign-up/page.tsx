import { redirect } from "next/navigation";

import { getCurrentUser } from "@/actions/GetUser";
import Container from "@/components/Container";
import FormWrapper from "@/components/FormWrapper";

import RegisterForm from "./RegisterForm";

const SignUpPage = async () => {
  const currentUser = await getCurrentUser();

  if (currentUser) {
    redirect("/account");
  }

  return (
    <Container>
      <div className="flex min-h-full w-full justify-center py-10">
        <div className="w-full max-w-[400px] rounded-md border-custom2 bg-card p-8">
          <div className="mb-8 space-y-1">
            <h1 className="text-base font-medium text-secondary-foreground">
              Create Your Account
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your details below to create your account.
            </p>
          </div>

          <FormWrapper>
            <RegisterForm />
          </FormWrapper>
        </div>
      </div>
    </Container>
  );
};

export default SignUpPage;
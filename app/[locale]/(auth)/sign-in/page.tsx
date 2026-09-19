import { getTranslations } from "next-intl/server";
import { redirect } from "@/i18n/navigation";

import { getCurrentUser } from "@/actions/GetUser";
import Container from "@/components/Container";
import FormWrapper from "@/components/FormWrapper";

import LoginForm from "./LoginForm";

type SignInPageProps = {
  params: Promise<{
    locale: string;
  }>;
};

const SignInPage = async ({ params }: SignInPageProps) => {
  const { locale } = await params;
  const currentUser = await getCurrentUser();
  const t = await getTranslations("SignIn");

  if (currentUser) {
    redirect({
      href: "/account",
      locale,
    });
  }

  return (
    <Container>
      <div className="flex min-h-full w-full justify-center py-10">
        <div className="w-full max-w-[400px] rounded-md border-custom2 bg-card p-8">
          <div className="mb-8 space-y-1">
            <h1 className="text-base font-medium text-secondary-foreground">
              {t("title")}
            </h1>

            <p className="text-sm text-muted-foreground">
              {t("description")}
            </p>
          </div>

          <FormWrapper>
            <LoginForm />
          </FormWrapper>
        </div>
      </div>
    </Container>
  );
};

export default SignInPage;

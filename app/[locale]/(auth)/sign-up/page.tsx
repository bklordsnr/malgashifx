import { getTranslations } from "next-intl/server";
import { redirect } from "@/i18n/navigation";

import { getCurrentUser } from "@/actions/GetUser";
import Container from "@/components/Container";
import FormWrapper from "@/components/FormWrapper";

import RegisterForm from "./RegisterForm";

type SignUnPageProps = {
  params: Promise<{
    locale: string;
  }>;
};

const SignUpPage = async ({ params }: SignUnPageProps) => {
  const { locale } = await params;
  const currentUser = await getCurrentUser();
  const t = await getTranslations("SignUp");

  redirect({
    href: "/account",
    locale,
  });

  return (
    <Container>
      <div className="flex min-h-full w-full justify-center py-10">
        <div className="w-full max-w-[400px] rounded-md border-custom2 bg-card p-8">
          <div className="mb-8 space-y-1">
            <h1 className="text-base font-medium text-secondary-foreground">
              {t("title")}
            </h1>

            <p className="text-sm text-muted-foreground">{t("description")}</p>
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

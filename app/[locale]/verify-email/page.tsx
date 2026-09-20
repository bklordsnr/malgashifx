import { getTranslations } from "next-intl/server";
import { FiArrowRight } from "react-icons/fi";

import prisma from "@/lib/prismadb";
import Container from "@/components/Container";
import { Link } from "@/i18n/navigation";

import ResendVerificationForm from "./ResendVerificationForm";

type VerifyEmailPageProps = {
  searchParams: Promise<{
    token?: string;
  }>;
};

const VerifyEmailPage = async ({
  searchParams,
}: VerifyEmailPageProps) => {
  const { token } = await searchParams;
  const t = await getTranslations("VerifyEmail");

  let message = t("checkEmail");
  let showSignIn = false;

  if (token) {
    try {
      const verificationToken =
        await prisma.emailVerificationToken.findUnique({
          where: {
            token,
          },
          include: {
            user: true,
          },
        });

      if (!verificationToken) {
        message = t("invalidLink");
      } else if (verificationToken.expiresAt < new Date()) {
        await prisma.emailVerificationToken.delete({
          where: {
            id: verificationToken.id,
          },
        });

        message = t("invalidLink");
      } else if (verificationToken.user.emailVerified) {
        await prisma.emailVerificationToken.delete({
          where: {
            id: verificationToken.id,
          },
        });

        message = t("alreadyVerified");
        showSignIn = true;
      } else {
        await prisma.user.update({
          where: {
            id: verificationToken.userId,
          },
          data: {
            emailVerified: new Date(),
          },
        });

        await prisma.emailVerificationToken.delete({
          where: {
            id: verificationToken.id,
          },
        });

        message = t("success");
        showSignIn = true;
      }
    } catch (error) {
      console.error("VERIFY_EMAIL_ERROR", error);
      message = t("somethingWentWrong");
    }
  }

  return (
    <Container>
      <div className="flex min-h-full w-full justify-center py-10">
        <div className="w-full max-w-[400px] rounded-md border-custom2 bg-card p-8">
          <div className="space-y-2">
            <h1 className="text-base font-medium text-secondary-foreground">
              {t("title")}
            </h1>

            <p className="text-sm leading-6 text-muted-foreground">
              {message}
            </p>

            <ResendVerificationForm />

            {showSignIn && (
              <Link
                href="/sign-in"
                className="group mt-4 flex w-full items-center justify-center gap-2 rounded-md border-custom2 bg-background px-4 py-3 text-sm font-medium text-primary transition-all hover:bg-muted"
              >
                <span>{t("signIn")}</span>

                <FiArrowRight
                  size={17}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
              </Link>
            )}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default VerifyEmailPage;
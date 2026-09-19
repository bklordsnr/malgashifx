"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { FaArrowDownLong } from "react-icons/fa6";

import Container from "@/components/Container";
import { buttonVariants } from "@/components/ui/button";

const AboutCompany = () => {
  const t = useTranslations("AboutCompany");

  return (
    <Container>
      <main className="py-10 sm:py-12 md:py-16 lg:py-20">
        {/* About */}
        <section className="flex flex-col items-center justify-between gap-10 md:flex-row md:gap-14 lg:gap-20">
          <div className="flex w-full max-w-[520px] flex-col items-start gap-5">
            <span className="text-xl font-semibold tracking-tight text-foreground">
              {t("about.label")}
            </span>

            <p className="text-sm leading-7 text-muted-foreground sm:text-base">
              {t("about.description")}
            </p>

            <Link
              href="#ceo"
              className={buttonVariants({
                variant: "link",
                className: "h-auto gap-2 px-0 text-sm font-medium",
              })}
            >
              <FaArrowDownLong size={18} className="text-primary" />
              {t("about.learnMore")}
            </Link>
          </div>

          <div className="flex w-full justify-center md:justify-end">
            <div className="relative aspect-square w-full max-w-[400px] overflow-hidden rounded-2xl border-custom2">
              <Image
                src="/assets/about-us.png"
                alt={t("about.imageAlt")}
                fill
                className="object-cover object-center"
                priority
              />
            </div>
          </div>
        </section>

        {/* CEO Message */}
        <section
          id="ceo"
          className="scroll-mt-24 py-14 sm:py-16 md:py-20"
        >
          <div className="flex flex-col items-center justify-between gap-10 md:flex-row md:gap-14 lg:gap-20">
            <div className="relative aspect-square w-full max-w-[400px] overflow-hidden rounded-2xl border-custom2">
              <Image
                src="/assets/marktebo.png"
                alt={t("leadership.imageAlt")}
                fill
                className="object-cover object-center"
                loading="lazy"
              />
            </div>

            <div className="w-full max-w-[520px]">
              <span className="text-sm font-semibold uppercase tracking-wide text-primary">
                {t("leadership.label")}
              </span>

              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-secondary-foreground sm:text-3xl">
                {t("leadership.title")}
              </h2>

              <p className="mt-5 text-sm leading-7 text-muted-foreground sm:text-base">
                {t("leadership.message")}
              </p>

              <div className="mt-6">
                <span className="block font-semibold text-secondary-foreground">
                  {t("leadership.name")}
                </span>

                <span className="mt-1 block text-sm text-muted-foreground">
                  {t("leadership.role")}
                </span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Container>
  );
};

export default AboutCompany;
import Image from "next/image";
import { useTranslations } from "next-intl";
import { FaTelegramPlane } from "react-icons/fa";
import { FiArrowUpRight } from "react-icons/fi";

import { Link } from "@/i18n/navigation";
import logo from "@/public/logo-image/logo.png";

import Container from "../Container";

const Footer = () => {
  const t = useTranslations("Footer");

  return (
    <footer className="w-full border-t border-border bg-background">
      <Container>
        <div className="py-10 sm:py-12">
          <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr] md:gap-12">
            {/* Brand */}
            <div className="max-w-md">
              <Link
                href="/"
                className="inline-flex items-center"
                aria-label={t("homeAriaLabel")}
              >
                <div className="relative w-[150px] sm:w-[165px]">
                  <Image
                    src={logo}
                    alt={t("logoAlt")}
                    className="h-auto w-full"
                  />
                </div>
              </Link>

              <p className="mt-4 max-w-sm text-sm leading-6 text-muted-foreground">
                {t("description")}
              </p>

              <p className="mt-4 text-sm font-medium text-secondary-foreground">
                {t("tagline")}
              </p>
            </div>

            {/* Company */}
            <div>
              <h3 className="text-sm font-semibold text-foreground">
                {t("company")}
              </h3>

              <div className="mt-4 flex flex-col gap-3">
                <Link
                  href="/terms"
                  className="w-fit text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {t("terms")}
                </Link>

                <Link
                  href="/terms#privacy"
                  className="w-fit text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {t("privacy")}
                </Link>
              </div>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-sm font-semibold text-foreground">
                {t("contact")}
              </h3>

              <p className="mt-4 max-w-xs text-sm leading-6 text-muted-foreground">
                {t("contactDescription")}
              </p>

              <a
                href="https://t.me/malgashiadmin"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 rounded-xl border-custom px-4 py-2.5 text-sm font-medium text-foreground transition-all hover:bg-muted active:scale-[0.98]"
              >
                <FaTelegramPlane className="text-primary" size={17} />

                {t("telegramSupport")}

                <FiArrowUpRight size={15} />
              </a>
            </div>
          </div>

          <div className="my-8 h-px w-full bg-border" />

          <div className="flex flex-col gap-3 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
            <span>
              &copy; {new Date().getFullYear()}: {}
              {t("copyright")}
            </span>

            <span className="max-w-xl leading-5 sm:text-right">
              {t("riskNotice")}
            </span>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
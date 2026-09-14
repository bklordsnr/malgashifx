import Image from "next/image";
import Link from "next/link";
import { FaTelegramPlane } from "react-icons/fa";
import { FiArrowUpRight } from "react-icons/fi";

import logo from "@/public/logo-image/logo.png";

import Container from "../Container";

const Footer = () => {
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
                aria-label="Somalia Malgashi home"
              >
                <div className="relative w-[150px] sm:w-[165px]">
                  <Image
                    src={logo}
                    alt="Somalia Malgashi"
                    className="h-auto w-full"
                  />
                </div>
              </Link>

              <p className="mt-4 max-w-sm text-sm leading-6 text-muted-foreground">
                Simple, accessible investment solutions built for people
                looking to grow their financial future.
              </p>

              <p className="mt-4 text-sm font-medium text-secondary-foreground">
                Invest today. Build tomorrow.
              </p>
            </div>

            {/* Company */}
            <div>
              <h3 className="text-sm font-semibold text-foreground">
                Company
              </h3>

              <div className="mt-4 flex flex-col gap-3">
                <Link
                  href="/terms"
                  className="w-fit text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Terms & Conditions
                </Link>

                <Link
                  href="/terms#privacy"
                  className="w-fit text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Privacy Policy
                </Link>
              </div>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-sm font-semibold text-foreground">
                Get in touch
              </h3>

              <p className="mt-4 max-w-xs text-sm leading-6 text-muted-foreground">
                Have a question or need assistance? Reach out to our support
                team directly.
              </p>

              <a
                href="https://t.me/malgashiadmin"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 rounded-xl border-custom px-4 py-2.5 text-sm font-medium text-foreground transition-all hover:bg-muted active:scale-[0.98]"
              >
                <FaTelegramPlane className="text-primary" size={17} />
                Telegram Support
                <FiArrowUpRight size={15} />
              </a>
            </div>
          </div>

          <div className="my-8 h-px w-full bg-border" />

          <div className="flex flex-col gap-3 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
            <span>
              &copy; {new Date().getFullYear()} Somalia Malgashi. All rights
              reserved.
            </span>

            <span className="max-w-xl leading-5 sm:text-right">
              Investment involves risk. Past performance does not guarantee
              future results.
            </span>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
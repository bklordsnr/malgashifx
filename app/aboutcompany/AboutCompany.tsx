"use client";

import Image from "next/image";
import Link from "next/link";
import Container from "@/components/Container";
import { buttonVariants } from "@/components/ui/button";
import { FaArrowDownLong } from "react-icons/fa6";

const AboutCompany = () => {
  return (
    <Container>
      <main className="py-10 sm:py-12 md:py-16 lg:py-20">
        {/* About */}
        <section className="flex flex-col items-center justify-between gap-10 md:flex-row md:gap-14 lg:gap-20">
          <div className="flex w-full max-w-[520px] flex-col items-start gap-5">
            <span className="text-xl font-semibold tracking-tight text-foreground">
              About Us
            </span>

            <p className="text-sm leading-7 text-muted-foreground sm:text-base">
              We are a Dubai-based company focused on making trading and
              investing simple, accessible, and transparent. Our platform is
              designed for everyone, not only experienced traders, but anyone
              looking to grow their investments with confidence.
            </p>

            <Link
              href="#ceo"
              className={buttonVariants({
                variant: "link",
                className: "h-auto gap-2 px-0 text-sm font-medium",
              })}
            >
              <FaArrowDownLong size={18} className="text-primary" />
              Learn more
            </Link>
          </div>

          <div className="flex w-full justify-center md:justify-end">
            <div className="relative aspect-square w-full max-w-[400px] overflow-hidden rounded-2xl border-custom2">
              <Image
                src="/assets/about-us.png"
                alt="About Somalia Malgashi"
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
                alt="Somalia Malgashi founder"
                fill
                className="object-cover object-center"
                loading="lazy"
              />
            </div>

            <div className="w-full max-w-[520px]">
              <span className="text-sm font-semibold uppercase tracking-wide text-primary">
                Leadership
              </span>

              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-secondary-foreground sm:text-3xl">
                Message from the CEO
              </h2>

              <p className="mt-5 text-sm leading-7 text-muted-foreground sm:text-base">
                Don&apos;t worry if you don&apos;t know everything yet. Start
                where you are, keep learning, and grow along the way. With
                every step you take toward investing, you gain more knowledge
                and confidence in your financial journey.
              </p>

              <div className="mt-6">
                <span className="block font-semibold text-secondary-foreground">
                  Tebo
                </span>
                <span className="mt-1 block text-sm text-muted-foreground">
                  CEO & Founder
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
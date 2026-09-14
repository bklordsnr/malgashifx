"use client";

import Image from "next/image";
import Link from "next/link";
import { IoCheckmarkDone } from "react-icons/io5";
import { TiPlus } from "react-icons/ti";
import { FaArrowRight } from "react-icons/fa6";
import { SlPeople } from "react-icons/sl";
import { MdOutlinePaid, MdOutlineCloudDone, MdAvTimer } from "react-icons/md";

import Container from "../../Container";
import { SectionHeading } from "../../SectionHeading";
import { AboutItem } from "../aboutsection/AboutItem";
import CurrencyItem from "../currencypairs/CurrencyItem";

import { Button } from "@/components/ui/button";

import currencyeur from "@/public/assets/currencyeur.png";
import currencycad from "@/public/assets/currencycad.png";
import currencyyeng from "@/public/assets/currencyyeng.png";
import graphgreen from "@/public/assets/graphgreen.svg";
import graphred from "@/public/assets/graphred.svg";
import Couresel from "./Couresel";

const Hero = () => {
  return (
    <div>
      <Container>
        {/* Hero */}
        <section className="py-10 sm:py-12 md:py-16 lg:py-20">
          <div className="relative z-10">
            <div className="flex flex-col items-center gap-10 md:flex-row md:items-center md:gap-12 lg:gap-16">
              {/* Left */}
              <div className="flex w-full flex-col items-start text-left md:w-1/2">
                <div className="space-y-5 sm:space-y-6">
                  <div className="flex w-fit items-center gap-1.5 rounded-full bg-green-100 px-3 py-1.5">
                    <TiPlus className="text-green-700" size={16} />

                    <span className="text-xs font-semibold uppercase tracking-wide text-green-900 sm:text-sm">
                      Real investment
                    </span>
                  </div>

                  <h1 className="max-w-[650px] text-4xl font-semibold leading-[1.1] tracking-tight text-foreground sm:text-5xl md:text-5xl lg:text-6xl">
                    Don&apos;t wait,
                    <br />
                    <span className="text-foreground">
                      investment means{" "}
                    </span>
                    <span className="text-primary">growth.</span>
                  </h1>
                </div>

                <p className="mt-6 max-w-[580px] text-sm leading-7 text-muted-foreground sm:text-base">
                  Invest with us today and earn returns of 5%–8% with lower
                  risk through binary trading.
                </p>

                <div className="mt-7 w-full max-w-[320px]">
                  <Button
                    asChild
                    className="h-12 w-full gap-3 border-custom text-sm font-semibold sm:text-base"
                  >
                    <Link href="/account">
                      Get Started
                      <FaArrowRight size={15} />
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Right Image */}
              <div className="flex w-full justify-center md:w-1/2 md:justify-end">
                <div className="relative w-[230px] sm:w-[280px] md:w-full md:max-w-[400px] lg:max-w-[440px]">
                  <Image
                    src="/assets/hero.png"
                    width={1024}
                    height={1536}
                    alt="Investment and trading technology"
                    priority
                    className="h-auto w-full"
                  />
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="mt-12 grid w-full grid-cols-2 overflow-hidden rounded-2xl border-custom2 bg-background sm:mt-14 md:grid-cols-4">
              <div className="flex min-w-0 flex-col items-center justify-center px-3 py-5 text-center sm:px-4 sm:py-6">
                <SlPeople size={23} className="text-primary" />

                <span className="mt-2 text-base font-bold text-foreground sm:text-lg">
                  100+
                </span>

                <span className="mt-1 text-xs font-medium text-muted-foreground sm:text-sm">
                  Investors
                </span>
              </div>

              <div className="hidden h-16 w-px self-center bg-border md:block" />

              <div className="flex min-w-0 flex-col items-center justify-center border-t border-border px-3 py-5 text-center sm:px-4 sm:py-6 md:border-t-0">
                <MdOutlinePaid size={23} className="text-primary" />

                <span className="mt-2 text-base font-bold text-foreground sm:text-lg">
                  $50,000+
                </span>

                <span className="mt-1 text-xs font-medium text-muted-foreground sm:text-sm">
                  Paid out
                </span>
              </div>

              <div className="hidden h-16 w-px self-center bg-border md:block" />

              <div className="flex min-w-0 flex-col items-center justify-center border-t border-border px-3 py-5 text-center sm:px-4 sm:py-6 md:border-t-0">
                <MdOutlineCloudDone size={23} className="text-primary" />

                <span className="mt-2 text-base font-bold text-foreground sm:text-lg">
                  98%
                </span>

                <span className="mt-1 text-xs font-medium text-muted-foreground sm:text-sm">
                  Success rate
                </span>
              </div>

              <div className="hidden h-16 w-px self-center bg-border md:block" />

              <div className="flex min-w-0 flex-col items-center justify-center border-t border-border px-3 py-5 text-center sm:px-4 sm:py-6 md:border-t-0">
                <MdAvTimer size={23} className="text-primary" />

                <span className="mt-2 text-base font-bold text-foreground sm:text-lg">
                  24/7
                </span>

                <span className="mt-1 text-xs font-medium text-muted-foreground sm:text-sm">
                  Customer support
                </span>
              </div>
            </div>

            {/* Carousel */}
            <div className="mt-12 sm:mt-14 md:mt-16">
              <Couresel />
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-12 sm:py-14 md:py-16">
          <div className="flex flex-col gap-6">
            <div>
              <Button
                variant="outline"
                className="h-9 border-custom px-4 text-xs font-semibold sm:text-sm"
              >
                About Us
              </Button>
            </div>

            <SectionHeading title="Why Choose Us?" />
          </div>

          <div className="mt-8 flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between lg:gap-14">
            <div className="w-full max-w-[520px] text-sm leading-7 text-muted-foreground">
              <p>
                We provide a transparent, cost-effective service powered by
                modern technology and strong customer support. Our goal is to
                build a dedicated platform for traders and investors at every
                level, from beginners to experienced professionals.
              </p>
            </div>

            <div className="grid w-full grid-cols-2 gap-4 sm:grid-cols-4 lg:max-w-[650px]">
              <AboutItem title="150" subtitle="Trading Products" />

              <AboutItem
                title="$0.00"
                subtitle="Account Maintenance Fees"
              />

              <AboutItem title="1:200" subtitle="Leverage" />

              <AboutItem title="MT4" subtitle="Trading Platform" />
            </div>
          </div>
        </section>

        {/* Currency Pairs */}
        <section className="py-12 sm:py-14 md:py-16">
          <div className="flex flex-col gap-6">
            <div>
              <Button
                variant="outline"
                className="h-9 border-custom px-4 text-xs font-semibold sm:text-sm"
              >
                Markets
              </Button>
            </div>

            <SectionHeading title="Currency Pairs" />
          </div>

          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <CurrencyItem
              image={currencyeur}
              title="eur/usd"
              bprice="5.82"
              avgprice="+1.245%"
              graph={graphgreen}
              green
            />

            <CurrencyItem
              image={currencycad}
              title="eur/cad"
              bprice="6.70"
              avgprice="+0.379%"
              graph={graphred}
              green={false}
            />

            <CurrencyItem
              image={currencyyeng}
              title="eur/jpy"
              bprice="1.83"
              avgprice="+9.289%"
              graph={graphgreen}
              green
            />
          </div>
        </section>

        {/* Account Opening */}
        <section className="py-12 sm:py-14 md:py-16">
          <div className="flex flex-col gap-6">
            <div>
              <Button
                variant="outline"
                className="h-9 border-custom px-4 text-xs font-semibold sm:text-sm"
              >
                Get Started
              </Button>
            </div>

            <SectionHeading title="Let&apos;s Open Your Account" />
          </div>

          <div className="mt-10 flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
            {/* Text */}
            <div className="w-full max-w-[600px]">
              <p className="text-sm leading-7 text-muted-foreground sm:text-base">
                Get started in just a few minutes with a simple and secure
                registration process. Join a trusted Dubai-based platform
                built to make trading and investing simple, transparent, and
                accessible to everyone.
              </p>

              <div className="mt-7 flex flex-col gap-5">
                <div className="flex items-start gap-3">
                  <IoCheckmarkDone
                    size={24}
                    className="mt-0.5 shrink-0 text-primary"
                  />

                  <span className="text-sm leading-6 text-secondary-foreground">
                    First, create your account and choose your investment plan.
                  </span>
                </div>

                <div className="flex items-start gap-3">
                  <IoCheckmarkDone
                    size={24}
                    className="mt-0.5 shrink-0 text-primary"
                  />

                  <span className="text-sm leading-6 text-secondary-foreground">
                    Next, make your payment to begin your investment.
                  </span>
                </div>

                <div className="flex items-start gap-3">
                  <IoCheckmarkDone
                    size={24}
                    className="mt-0.5 shrink-0 text-primary"
                  />

                  <span className="text-sm leading-6 text-secondary-foreground">
                    Once your deposit is confirmed, your investment begins.
                  </span>
                </div>
              </div>
            </div>

            {/* Image */}
            <div className="flex w-full justify-center lg:w-1/2 lg:justify-end">
              <div className="relative aspect-square w-full max-w-[360px]">
                <Image
                  src="/assets/createacc.png"
                  alt="Create an investment account"
                  fill
                  className="object-contain object-center"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="pb-10 pt-8 sm:pb-12">
          <div className="mx-auto flex w-full max-w-[900px] flex-col items-center gap-8 rounded-2xl border-custom2 bg-background px-6 py-8 sm:px-8 sm:py-10 md:flex-row md:justify-between md:gap-10 md:px-10">
            {/* Image */}
            <div className="relative hidden aspect-square w-full max-w-[220px] shrink-0 md:block">
              <Image
                src="/assets/ready.png"
                alt="Ready to start investing"
                fill
                className="object-contain"
                loading="lazy"
              />
            </div>

            {/* Content */}
            <div className="w-full">
              <Button
                variant="outline"
                className="h-9 border-custom px-4 text-xs font-semibold sm:text-sm"
              >
                Get Started
              </Button>

              <h2 className="mt-3 text-xl font-semibold tracking-tight text-secondary-foreground sm:text-2xl">
                Are you ready to start investing?
              </h2>

              <p className="mt-2 max-w-[500px] text-sm leading-6 text-muted-foreground">
                Opening an account takes less than 3 minutes. Start your
                investment journey with us today.
              </p>

              <div className="mt-5">
                <Button
                  asChild
                  className="h-12 w-full border-custom text-sm font-semibold sm:w-[220px]"
                >
                  <Link href="/account">Create Account</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </Container>
    </div>
  );
};

export default Hero;
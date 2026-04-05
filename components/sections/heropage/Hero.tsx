"use client";

import { useRouter } from "next/navigation";
import { FaArrowRightLong } from "react-icons/fa6";
import Container from "../../Container";
import { Couresel } from "./Couresel";
import { SectionHeading } from "../../SectionHeading";
import { AboutItem } from "../aboutsection/AboutItem";
import CurrencyItem from "../currencypairs/CurrencyItem";
import Image from "next/image";
import currencyeur from "@/public/assets/currencyeur.png";
import currencycad from "@/public/assets/currencycad.png";
import currencyyeng from "@/public/assets/currencyyeng.png";
import graphgreen from "@/public/assets/graphgreen.svg";
import graphred from "@/public/assets/graphred.svg";
import InvestmentCard from "../investmentplans/InvestmentCard";
import { MdOutlineCloudDownload } from "react-icons/md";
import { products } from "@/utils/product";
import { TestimonialCard } from "../testimonials/TestimonialCard";
import { IoCheckmarkDone } from "react-icons/io5";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";

const Hero = () => {
  const router = useRouter();
  return (
    <div className="">
      <Container>
        {/* homepage section */}
        <section>
          <div className="h-[calc(100vh-64px)] justify-between flex flex-col z-10">
            <div className="flex flex-col sm:flex-row mt-auto mb-auto justify-between gap-x-2">
              <div className="w-full flex items-center">
                <div className="flex flex-col gap-8 z-10">
                  <h2 className="text-4xl md:text-5xl font-semibold">
                    Don&apos;t be late <br /> investment is great
                  </h2>
                  <p className="text-muted-foreground max-w-[550px]">
                    Invest with us today and enjoy a 5% - 8% yield with low risk
                    through our tokenised treasuries and corporate bonds.
                  </p>
                  <div
                    className=" 
            max-w-[300px]"
                  >
                    <Button className="w-full max-w-[500px]">
                      <Link href="/account">Get Started Now</Link>
                    </Button>
                  </div>
                </div>
              </div>

              <div className="w-full sm:flex hidden   justify-center items-center ">
                <div className="relative aspect-square w-full max-w-[400px]">
                  <Image
                    src="/assets/technology.png"
                    fill
                    alt="technology"
                    className="object-cover object-center"
                  />
                </div>
              </div>
            </div>

            <div className="pb-5">
              <Couresel />
            </div>
          </div>
        </section>

        {/* about section */}

        <section className="py-10">
          <div>
            <div className="flex flex-col gap-6">
              <div>
                <Button>About us</Button>
              </div>
              <SectionHeading title="Why choose us?" />
            </div>

            <div className="flex items-start justify-between gap-10 flex-col lg:flex-row">
              <div className="max-w-[500px] text-muted-foreground text-sm mt-7 mr-auto">
                <p>
                  We focus on offering our customers a transparent and
                  cost-effective service commercial conditions, cutting-edge
                  technology and great support
                </p>

                <p className="mt-4 mb-4 ">
                  We are on a mission to create a unique trading platform
                  Designed to suit traders of all levels, from beginners Who has
                  never negotiated with experienced professionals?
                </p>
              </div>

              <div
                className="flex  flex-wrap justify-between gap-5  mt-5 w-full
               lg:m-0 "
              >
                <AboutItem title="150" subtitle="Commercial Products" />
                <AboutItem
                  title="$0.00"
                  subtitle="Taxes of Account Maintenance"
                />
                <AboutItem title="1:200" subtitle="Leverage" />
                <AboutItem title="MT4" subtitle="Trade Version" />
              </div>
            </div>
          </div>
        </section>

        {/* currency pairs section */}
        <section className="py-10">
          <div className="flex flex-col gap-6">
            <div>
              <Button>Currency</Button>
            </div>
            <SectionHeading title="Currency Pairs" />
          </div>

          <div className="mt-10 flex flex-row justify-between flex-wrap gap-7 md:gap-4">
            <CurrencyItem
              image={currencyeur}
              title="eur/usd"
              bprice="5.82"
              avgprice="+1.245%"
              graph={graphgreen}
              green={true}
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
              title="eur/usd"
              bprice="1.83"
              avgprice="+9.289%"
              graph={graphgreen}
              green={true}
            />
          </div>

          <div className="pt-20 w-full">
            <div className=" border rounded-[15px]  pl-4 pr-4 bg-card w-full md:max-w-[800px]  flex flex-col md:flex-row items-center justify-between m-auto">
              <div className="relative w-full aspect-square max-w-[300px]">
                <Image
                  src="/assets/cartoon.png"
                  alt="cartoon"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="pt-4 pb-3 flex flex-col w-full md:w-auto max-w-[400px]">
                <div>
                  <Button>Prices</Button>
                </div>

                <h2 className="font-semibold text-2xl mt-2 mb-2 text-secondary-foreground">
                  Invest with low prices
                </h2>

                <p className="w-full text-card-foreground my-2 text-sm">
                  With us, you get a transparent pricing structure and a safe,
                  regulated trading environment. As an amateur or professional
                  trader, you can also qualify for lower fees and extra benefits
                </p>

                <div className="w-full">
                  <Button className="w-full mt-4 sm:m-0">
                    <Link href="/investmentplans">Investment Prices</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* investment plans */}

        <section className="py-10">
          <div className="flex flex-col gap-6">
            <div>
              <Button>For investors</Button>
            </div>
            <SectionHeading title="Investment Plans" />
          </div>

          <div className="flex flex-wrap justify-between gap-8 mt-8">
            {products.slice(0, 3).map((product) => {
              return <InvestmentCard product={product} key={product.id} />;
            })}
          </div>

          <div className="mt-5 w-full flex flex-col justify-center items-center">
            <div className="flex items-center justify-center my-3 sm:my-0">
              <Link
                href={"/investmentplans"}
                className={buttonVariants({ variant: "link" })}
              >
                view more plans
              </Link>
              <FaArrowRightLong size={19} className="text-primary" />
            </div>
          </div>
        </section>

        {/* account opening */}

        <section className="py-10">
          <div className="flex flex-col gap-6">
            <div>
              <Button>First steps</Button>
            </div>
            <SectionHeading title="Let's create your account" />
          </div>

          <div className="pt-8 w-full flex flex-col justify-between lg:flex-row">
            <div className=" w-full max-w-[600px]">
              <div>
                <p className="text-muted-foreground text-sm">
                  We are a Fintech trading company located in United Arab Emirates, with a
                  direct objective to make trading simple and accessible to
                  everyone transparently and securely environment. We do not
                  believe in trading just for traders. we believe in trading for
                  everyone.
                </p>
              </div>

              <div className="pt-5 flex flex-col gap-5">
                <div className="flex justify-between">
                  <div className="mr-2">
                    <IoCheckmarkDone size={24} className="text-primary" />
                  </div>
                  <div className="flex flex-col mr-auto">
                    <span className="text-secondary-foreground normal-case text-base mb-1">
                      First start you creating an account followed by choosing
                      an investment package from our plans.
                    </span>
                    <span className="text-muted-foreground text-sm">
                      Can be done by navigating to the account section.
                    </span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="mr-2">
                    <IoCheckmarkDone size={24} className="text-primary" />
                  </div>
                  <div className="flex flex-col mr-auto">
                    <span className="text-secondary-foreground normal-case text-base mb-1">
                      Make payment
                    </span>
                    <span className="text-muted-foreground text-sm">
                      Contact the administrator so you can make payment with
                      your preferred mobile wallet
                    </span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="mr-2">
                    <IoCheckmarkDone size={24} className="text-primary" />
                  </div>
                  <div className="flex flex-col mr-auto">
                    <span className="text-secondary-foreground normal-case text-base mb-1">
                      Investment will start!
                    </span>
                    <span className="text-muted-foreground text-sm">
                      Investment will begin as soon as the payment is made.
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full flex justify-center mt-5 lg:justify-end md:mt-[-50px]">
              <div className="aspect-square relative w-full max-w-[450px]">
                <Image
                  src="/assets/accountcreation.png"
                  alt="account"
                  fill
                  className="object-cover "
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>

        {/* create account */}

        <section className="py-10">

          <div className="w-full">
            <div className="flex flex-col md:flex-row items-center justify-between border rounded-[15px] max-w-[800px] py-7 pr-7 gap-5 pl-7 m-auto ">
              <div className="overflow-hidden relative w-full max-w-[400px] h-[200px] aspect-square rounded-[15px]">
                <Image
                  src="/assets/sample1.jpg"
                  alt="sample1"
                  fill
                  className="object-cover w-full"
                  loading="lazy"
                />
              </div>

              <div className="">
                <div>
                  <Button>Start</Button>
                </div>
                <h2 className="text-secondary-foreground font-semibold text-2xl mt-2 mb-2">
                  Ready to Invest?
                </h2>
                <p className="text-muted-foreground max-w-[400px] text-sm">
                  Opening an account takes less than 3 minutes. Start your
                  investment journey with us today.
                </p>

                <div className="mt-4 pb-2">
                  <Button className="w-full">
                    <a href="/account">Create Account</a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Container>
    </div>
  );
};

export default Hero;

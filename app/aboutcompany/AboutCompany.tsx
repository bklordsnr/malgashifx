"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/Container";
import { buttonVariants } from "@/components/ui/button";
import { FaArrowDownLong } from "react-icons/fa6";

const AboutCompany = () => {
  const router = useRouter();

  return (
    <Container>
      <div className="pt-10 ">
        <div className="h-full flex flex-col sm:flex-row items-center justify-between">
          {/* left */}
          <div className="w-full max-w-[500px] flex flex-col gap-5">
            <h2 className="text-foreground font-semibold text-xl capitalize ">
              ku saabsan
            </h2>
            <p className="text-muted-foreground text-sm">
              waxaan nahay shirkad saldhigeedu yahay dubai oo diiradda saarta
              fududeynta trading iyo maalgashi si hufan oo ammaan ah
              platformkeena waxaa loo dhisay inuu qof walba u fududaado ma ahan
              oo kaliya traders laakiin qof kasta oo raba inuu koriyo
              maalgashigiisa si kalsooni leh
            </p>

            <div className="max-w-[300px] flex items-center gap-1">
              <FaArrowDownLong size={19} className="text-primary" />
              <Link href="#ceo" className={buttonVariants({ variant: "link" })}>
                Wax badan baro
              </Link>
            </div>
          </div>

          {/* right */}
          <div className="w-full flex justify-center items-center md:justify-end">
            <div className="w-full max-w-[400px] relative aspect-square">
              <Image
                src="/assets/about-us.png"
                alt="about"
                fill
                className="object-cover object-center"
              />
            </div>
          </div>
        </div>

        <div id="ceo" className="py-10">
          <div className="flex flex-col sm:flex-row items-center justify-between">
            <div className="w-full max-w-[400px] relative aspect-square overflow-hidden border mb-10 sm:mb-0 border-custom2">
              <Image
                src="/assets/marktebo.png"
                alt="ceo img"
                fill
                className="object-cover object-center"
              />
            </div>

            <div className="w-full max-w-[400px] space-y-3">
              <h1 className="text-base text-secondary-foreground">Message from CEO</h1>
              <p className="text-muted-foreground text-sm">
                ha ka welwelin inaadan wax walba aqoon kaliya bilow markaad
                kobocdo oo aad maalgashato ayaad wax badan baran doontaa
              </p>

              <div className="flex flex-col">
                <span className="text-secondary-foreground">Tebo</span>
                <span className="text-muted-foreground text-sm">
                  Ceo/Founder
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default AboutCompany;

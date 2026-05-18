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
          <div className="h-[calc(100vh-64px)] flex flex-col justify-between z-10">
            <div className="flex flex-col md:flex-row items-center md:items-center justify-center md:justify-between gap-10 flex-1">
              {/* LEFT */}
              <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left gap-8">
                <h2 className="text-4xl md:text-5xl font-semibold">
                  Ha daahin
                  <br />
                  maalgashigu waa faaiido
                </h2>

                <p className="text-muted-foreground max-w-[700px] text-sm">
                  Nala maalgasho maanta oo hel faa’iido 5%–8% ah oo khatar hoose
                  leh adigoo adeegsanaya binary trading.
                </p>

                <div className="max-w-[300px] w-full">
                  <Button className="w-full border-custom">
                    <Link href="/account">Bilow Hadda</Link>
                  </Button>
                </div>
              </div>

              {/* RIGHT IMAGE */}
              <div className="hidden md:flex justify-center md:justify-end w-full md:w-1/2">
                <div className="relative aspect-square w-full max-w-[400px]">
                  <Image
                    src="/assets/money.png"
                    fill
                    alt="technology"
                    className="object-cover object-center"
                  />
                </div>
              </div>
            </div>

            {/* BOTTOM */}
            <div className="pb-5 flex justify-center">
              <Couresel />
            </div>
          </div>
        </section>

        {/* about section */}

        <section className="py-10">
          <div>
            <div className="flex flex-col gap-6">
              <div>
                <Button className="border-custom">Nagu Saabsan</Button>
              </div>
              <SectionHeading title="Maxaa Noo Dooranaysaa?" />
            </div>

            <div className="flex items-start justify-between gap-10 flex-col lg:flex-row">
              <div className="max-w-[500px] text-muted-foreground text-sm mt-7 mr-auto">
                <p>
                  Waxaan bixinnaa adeeg hufan, kharash-yar leh oo ku shaqeeya
                  tiknoolajiyad casri ah iyo taageero xooggan ujeeddadeennu waa
                  inaan dhisno madal u gaar ah traderska iyo maalqashadayaasha
                  heer kasta leh laga bilaabo bilow ilaa xirfadle.
                </p>
              </div>

              <div
                className="flex  flex-wrap justify-between gap-5  mt-5 w-full
               lg:m-0 "
              >
                <AboutItem title="150" subtitle="Alaabo Ganacsi" />
                <AboutItem
                  title="$0.00"
                  subtitle="Kharashaadka Dayactirka Akoonka"
                />
                <AboutItem title="1:200" subtitle="Leverage" />
                <AboutItem title="MT4" subtitle="Nooca Tradeka" />
              </div>
            </div>
          </div>
        </section>

        {/* currency pairs section */}
        <section className="py-10">
          <div className="flex flex-col gap-6">
            <div>
              <Button className="border-custom">Lacagta</Button>
            </div>
            <SectionHeading title="Lammaanaha Lacagaha" />
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
              title="eur/jpy"
              bprice="1.83"
              avgprice="+9.289%"
              graph={graphgreen}
              green={true}
            />
          </div>

          <div className="pt-20 w-full">
            <div className="border-custom2  rounded-[15px]  pl-4 pr-4 bg-card w-full md:max-w-[800px]  flex flex-col md:flex-row items-center justify-between m-auto">
              <div className="relative w-full aspect-square max-w-[300px]">
                <Image
                  src="/assets/prices.png"
                  alt="cartoon"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="pt-4 pb-3 flex flex-col w-full md:w-auto max-w-[400px]">
                <div>
                  <Button className="border-custom">Qiimayaal</Button>
                </div>

                <h2 className="font-semibold text-xl mt-2 mb-2 text-secondary-foreground">
                  Ku maalgasho qiime hoose
                </h2>

                <p className="w-full text-muted-foreground my-3 text-sm">
                  Ku raaxayso qiimeyn cad oo hufan gudaha deegaan ammaan ah oo
                  nidaamsan haddii aad tahay bilow ama trader ama maalgashade
                  khibrad leh waxaad heli kartaa kharashyo hoose tiknoolajiyad
                  lagu kalsoon yahay iyo faaidooyin dheeraad ah markaad kobocdo
                </p>

                <div className="w-full">
                  <Button className="w-full mt-4 sm:m-0 border-custom">
                    <Link href="/investmentplans">Qiimaha Maalgashiga</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* account opening */}

        <section className="py-10">
          <div className="flex flex-col gap-6">
            <div>
              <Button className="border-custom capitalize">
                tallaabooyinka hore
              </Button>
            </div>
            <SectionHeading title="aan kuu furno accountkaaga" />
          </div>

          <div className="pt-8 w-full flex flex-col justify-between lg:flex-row">
            <div className=" w-full max-w-[600px]">
              <div>
                <p className="text-muted-foreground text-sm">
                  ku bilow daqiiqado gudahood adigoo maraya isdiiwaangelin fudud
                  oo ammaan ah ku biir platform lagu kalsoon yahay oo dubai ku
                  salaysan loona dhisay trading iyo maalgashi fudud hufan oo qof
                  walba heli karo
                </p>
              </div>

              <div className="pt-5 flex flex-col gap-5 space-y-1">
                <div className="flex justify-between items-center">
                  <div>
                    <IoCheckmarkDone size={24} className="text-primary mr-1" />
                  </div>
                  <div className="flex flex-col mr-auto">
                    <span className="text-secondary-foreground normal-case text-sm mb-1">
                      Marka hore samee account kadib dooro qorshaha maalgashiga
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <IoCheckmarkDone size={24} className="text-primary mr-1" />
                  </div>
                  <div className="flex flex-col mr-auto">
                    <span className="text-secondary-foreground normal-case text-sm mb-1">
                      Marka xigta samee lacag bixinta si maalgashigu u bilaabmo
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <IoCheckmarkDone size={24} className="text-primary mr-1" />
                  </div>
                  <div className="flex flex-col mr-auto">
                    <span className="text-secondary-foreground normal-case text-sm mb-1">
                      Marka depositka la xaqiijiyo maalgashigu wuu bilaabanayaa
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full flex justify-center items-center mt-5 md:justify-end md:mt-[-50px]">
              <div className="aspect-square relative w-full max-w-[400px] ">
                <Image
                  src="/assets/createacc.png"
                  alt="account"
                  fill
                  className="object-contain object-center"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>

        {/* create account */}

        <section className="pb-8 ">
          <div className="w-full">
            <div className="flex flex-col md:flex-row items-center justify-between border-custom2 rounded-[15px] max-w-[800px] py-7 pr-7 gap-5 pl-7 m-auto ">
              <div className="relative w-full aspect-square rounded-[15px] max-w-[250px] hidden md:flex">
                <Image
                  src="/assets/ready.png"
                  alt="sample1"
                  fill
                  className="object-contain"
                  loading="lazy"
                />
              </div>

              <div className="">
                <div>
                  <Button className="border-custom">Bilow</Button>
                </div>
                <h2 className="text-secondary-foreground font-semibold text-xl mt-2 mb-2">
                  Diyaar ma u tahay maalgashi
                </h2>
                <p className="text-muted-foreground max-w-[400px] text-sm">
                  Furashada accountku waxay qaadataa wax ka yar 3 daqiiqo maanta
                  nala bilow safarkaaga maalgashi
                </p>

                <div className="mt-4 pb-2">
                  <Button className="w-full border-custom">
                    <a href="/account">Samee Account</a>
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

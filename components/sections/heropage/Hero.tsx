"use client";

import { useRouter } from "next/navigation";
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
import { IoCheckmarkDone } from "react-icons/io5";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { TiPlus } from "react-icons/ti";
import { FaArrowRight } from "react-icons/fa6";
import { SlPeople } from "react-icons/sl";
import { MdOutlinePaid } from "react-icons/md";
import { MdOutlineCloudDone } from "react-icons/md";
import { MdAvTimer } from "react-icons/md";

const Hero = () => {
  const router = useRouter();
  return (
    <div className="">
      <Container>
        {/* homepage section */}
        <section className="py-8 md:py-12">
          <div className="flex flex-col justify-between z-10 relative">
            <div className="flex flex-col md:flex-row items-center justify-center md:justify-between gap-8 md:gap-12 flex-1">
              {/* LEFT */}
              <div className="w-full md:w-1/2 flex flex-col items-start text-left gap-6">
                <div className="space-y-5">
                  <div className="bg-green-100 w-fit py-1 px-2 rounded-md space-x-1 flex items-center">
                    <span className="text-green-600">
                      <TiPlus />
                    </span>
                    <span className="text-green-900 uppercase text-sm font-semibold">
                      maalgasho xaqiiq ah
                    </span>
                  </div>

                  <h2 className="text-3xl md:text-4xl font-medium">
                    Ha daahin,
                    <br />
                    Maalgashigu waa{" "}
                    <span className="text-primary">Faaiido.</span>
                  </h2>
                </div>

                <p className="text-muted-foreground max-w-[700px] text-sm">
                  Nala maalgasho maanta oo hel faa’iido 5%–8% ah oo khatar hoose
                  leh adigoo adeegsanaya binary trading.
                </p>

                <div className="max-w-[300px] w-full">
                  <Button className="w-full border-custom space-x-3">
                    <Link href="/account">Bilow Hadda</Link>
                    <FaArrowRight />
                  </Button>
                </div>
              </div>

              {/* RIGHT IMAGE */}
              <div className="flex justify-center md:justify-end w-full md:w-1/2">
                <div className="relative w-52 sm:w-64 md:w-full md:max-w-[400px]">
                  <Image
                    src="/assets/hero.png"
                    width={1024}
                    height={1536}
                    alt="technology"
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>

            {/* BOTTOM */}
            <div className="mt-8 md:mt-12 shadow-md border bg-background rounded-xl py-2 w-full flex items-center justify-evenly">
              <div className="flex min-w-0 flex-1 justify-center flex-col items-center p-4 space-y-1">
                <span className="text-green-800">
                  <SlPeople size={23} />
                </span>
                <span className="font-semibold text-sm md:text-base">100+</span>
                <span className="max-w-full text-center text-muted-foreground capitalize text-sm truncate">
                  maalgashadayaal
                </span>
              </div>

              <span className="h-16 w-[2px] bg-slate-200" />

              <div className="flex min-w-0 flex-1 justify-center flex-col items-center p-4 space-y-1">
                <span className="text-green-800">
                  <MdOutlinePaid size={23} />
                </span>
                <span className="font-semibold text-sm md:text-base">
                  $50,000+
                </span>
                <span className="max-w-full text-center text-muted-foreground capitalize text-sm truncate">
                  lacagta la bixiyey
                </span>
              </div>

              <span className="h-16 w-[2px] bg-slate-200" />

              <div className="flex min-w-0 flex-1 justify-center flex-col items-center p-4 space-y-1">
                <span className="text-green-800">
                  <MdOutlineCloudDone size={23} />
                </span>
                <span className="font-semibold text-sm md:text-base">98%</span>
                <span className="max-w-full text-center text-muted-foreground capitalize text-sm truncate">
                  boqolkiiba guusha
                </span>
              </div>

              <span className="h-16 w-[2px] bg-slate-200" />

              <div className="flex min-w-0 flex-1 justify-center flex-col items-center p-4 space-y-1">
                <span className="text-green-800">
                  <MdAvTimer size={23} />
                </span>
                <span className="font-semibold text-sm md:text-base">24/7</span>
                <span className="max-w-full text-center text-muted-foreground capitalize text-sm truncate">
                  taageerada macaamiisha
                </span>
              </div>
            </div>

            <div className="mt-12 md:mt-16">
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

                <h2 className="font-medium text-base mt-2 mb-2 text-secondary-foreground">
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

              <div>
                <div>
                  <Button className="border-custom">Bilow</Button>
                </div>
                <h2 className="text-secondary-foreground font-medium text-base mt-2 mb-2">
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

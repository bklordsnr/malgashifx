"use client";

import { AiOutlineRise } from "react-icons/ai";
import Image from "next/image";
import btcimage01 from "@/public/assets/btcimage01.svg";
import btcimage02 from "@/public/assets/btcimage02.svg";
import { LuBadgeDollarSign } from "react-icons/lu";
import { GiProfit } from "react-icons/gi";
import Graph from "./Graph";
import { SafeUser } from "@/types";
import ProfitsProgress from "./ProfitsProgress";
import { formatPrice } from "@/utils/formatPrice";

interface AccountProps {
  currentUser: SafeUser | null;
}

const Account: React.FC<AccountProps> = ({ currentUser }) => {
  return (
    <>
      {/* welcome section*/}

      <div className="w-full">
        <div className="flex flex-col items-start justify-start gap-2">
          <span className="text-secondary-foreground capitalize text-xl font-medium flex flex-row items-center gap-2">
            soo laabo
          </span>
          <span className="text-muted-foreground text-sm capitalize">
            ~ {currentUser?.name}
          </span>
        </div>

        {/* total balance section*/}

        <div className="relative mt-10 bg-card border-custom2 rounded-md overflow-hidden w-full md:max-w-[550px] max-h-[200px] h-full px-4 flex justify-between">
          <div className="w-full flex flex-col py-5 justify-between z-10">
            <div className="flex flex-col pt-3 space-y-2">
              <span className="text-muted-foreground text-sm capitalize">
                wadarta balanceka
              </span>
              <span className="text-secondary-foreground font-semibold text-2xl md:text-3xl">
                {formatPrice(currentUser?.TotalBalance)}
              </span>
            </div>
            <div className="flex items-center text-sm gap-2 pb-2">
              <AiOutlineRise size={20} className="text-primary" />
              <span className="text-muted-foreground">1:200 M</span>
              <span className="text-muted-foreground">Leverage</span>
            </div>
          </div>

          <div className="w-full max-w-[40%] flex flex-col justify-between gap-4 z-10 pt-4">
            <div className="relative w-[70px] aspect-square mr-auto ml-auto">
              <Image
                src={btcimage01}
                alt="btc-image-o1"
                fill
                className="object-cover w-full h-full"
              />
            </div>
            <div>
              <div className="relative w-[100px] aspect-square ml-auto">
                <Image
                  src={btcimage02}
                  alt="btc-image-o1"
                  fill
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* invested value section */}
      <div className="mt-10 lg:mt-0">
        <div className="justify-between flex flex-col md:flex-row gap-y-6 md:gap-2 md:gap-x-2">
          <div className=" w-full md:max-w-[300px] bg-card border-custom2 rounded-md px-4 h-[100px] flex justify-between">
            <div className="flex flex-col py-5 justify-between">
              <span className="text-sm capitalize text-muted-foreground">
                qiimaha la maalgashaday
              </span>
              <span className="text-secondary-foreground font-semibold text-xl">
                {formatPrice(currentUser?.Deposit)}
              </span>
            </div>
            <div className="pt-5 relative">
              <div className="w-1 h-1 rounded-full bg-primary absolute top-3 right-0"></div>
              <LuBadgeDollarSign
                size={32}
                className="text-secondary-foreground"
              />
            </div>
          </div>

          {/* targeted profit section */}

          <div className=" w-full md:max-w-[300px] bg-card border-custom2 rounded-md px-4 h-[100px] flex justify-between">
            <div className="flex flex-col py-5 justify-between">
              <span className="text-sm capitalize text-muted-foreground">
                faaidada la bartilmaameedsaday
              </span>
              <span className="text-secondary-foreground font-semibold text-xl">
                {formatPrice(currentUser?.Profit)}
              </span>
            </div>
            <div className="pt-5 relative">
              <div className="w-1 h-1 rounded-full bg-destructive absolute top-3 right-0"></div>
              <GiProfit size={32} className="text-secondary-foreground" />
            </div>
          </div>
        </div>

        {/* investment track section */}

        <div className="my-4 rounded-md w-full bg-card border-custom2 p-5 flex gap-6 justify-between flex-col md:flex-row">
          <div className="w-[100%] md:w-[40%] flex justify-center">
            <ProfitsProgress currentUser={currentUser} />
          </div>

          <div className="w-[100%] md:w-[60%] text-sm">
            <span className="text-muted-foreground capitalize">
              raadraaca maalgashiga
            </span>
            <Graph />
          </div>
        </div>

        {/* account overview section */}

        <div className="border-custom2 w-full flex flex-col px-4 rounded-md">
          <div className="justify-start mb-2 pt-2">
            <span className="capitalize  text-muted-foreground text-sm border border-dotted py-1 px-1 rounded-md">
              dulmar accountka
            </span>
          </div>

          <div className="flex justify-between items-center mb-2">
            <div>
              <span className="capitalize text-sm text-foreground">
                xaaladda tradingka
              </span>
            </div>
            <div>
              {currentUser?.tradingstatus ? (
                <span className="capitalize text-sm text-ring border border-dotted  px-1 border-ring rounded-md">
                  firfircoon
                </span>
              ) : (
                <span className="capitalize text-sm text-destructive border border-dotted  px-1 border-destructive rounded-md">
                  aan firfircoonayn
                </span>
              )}
            </div>
          </div>

          <span className="w-full h-[1px] bg-muted" />

          <div className="flex justify-between items-center mb-2">
            <div>
              <span className="capitalize text-sm text-foreground">email</span>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">
                {currentUser?.email}
              </span>
            </div>
          </div>

          <span className="w-full h-[1px] bg-muted" />

          <div className="flex justify-between items-center mb-2">
            <div>
              <span className="capitalize text-sm text-foreground">
                numberka
              </span>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">
                {currentUser?.number}
              </span>
            </div>
          </div>

          <span className="w-full h-[1px] bg-muted" />

          <div className="flex justify-between items-center mb-2">
            <div>
              <span className="capitalize text-sm text-foreground">fasax</span>
            </div>
            <div>
              {currentUser?.clearancestatus ? (
                <span className="text-sm text-ring">la ansixiyay</span>
              ) : (
                <span className="text-sm text-destructive">eber</span>
              )}
            </div>
          </div>

          <span className="w-full h-[1px] bg-muted " />

          <div className="flex justify-between items-center mb-2">
            <div>
              <span className="capitalize text-sm text-foreground">
                xaaladda lacag bixinta
              </span>
            </div>
            <div>
              {currentUser?.withdrawalstatus ? (
                <span className="text-sm text-ring">la ansixiyay</span>
              ) : (
                <span className="text-sm text-destructive">eber</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Account;

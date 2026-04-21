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
      {/* left side */}
      <div className="w-full">
        <div className="flex flex-row items-center gap-2">
          <span className="text-secondary-foreground text-xl font-medium flex flex-row items-center gap-2">
            Welcome back 
          </span>
          <span className="text-muted-foreground text-base capitalize">
            ~ {currentUser?.name}
          </span>
        </div>

        {/* balance container */}
        <div className="relative mt-10 bg-card border rounded-md overflow-hidden w-full max-w-[450px] max-h-[200px] h-full px-4 flex justify-between">
          <div className="w-full max-w-[60%] flex flex-col py-5 justify-between z-10">
            <div className="flex flex-col pt-3 space-y-2">
              <span className="text-muted-foreground text-sm">
                Total Balance
              </span>
              <span className="text-secondary-foreground font-semibold text-2xl md:text-3xl">
                {formatPrice(currentUser?.TotalBalance)}
              </span>
            </div>
            <div className="flex items-center text-sm gap-2 pb-2 ">
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

      {/* right side */}
      <div className="mt-10 lg:mt-0">
        <div className="justify-between grid grid-cols-1 md:grid-cols-2 gap-y-5 sm:gap-y-0 sm:gap-x-7  ">
          <div className=" w-full md:max-w-[300px] bg-card border rounded-md px-4 h-[100px] flex justify-between">
            <div className="flex flex-col py-5 justify-between">
              <span className="text-sm text-muted-foreground">
                Invested Value
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

          <div className=" w-full md:max-w-[300px] bg-card border rounded-md px-4 h-[100px] flex justify-between">
            <div className="flex flex-col py-5 justify-between">
              <span className="text-sm text-muted-foreground">
                Targeted Profits
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

        <div className="my-4 rounded-md w-full bg-card border p-5 flex gap-6 justify-between flex-col md:flex-row">
          <div className="w-[100%] md:w-[40%] flex justify-center">
            <ProfitsProgress currentUser={currentUser} />
          </div>

          <div className="w-[100%] md:w-[60%] text-sm">
            <span className="text-muted-foreground">Investment Track</span>
            <Graph />
          </div>
        </div>
      </div>
    </>
  );
};

export default Account;

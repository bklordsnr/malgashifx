"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { buttonVariants } from "./ui/button";
import { FaArrowLeftLong } from "react-icons/fa6";

const UnderDevelopment = () => {
  const router = useRouter();
  return (
    <div className="flex items-center justify-center h-full">
      <div className="flex flex-col sm:flex-row justify-between items-center w-full pt-12 sm:pt-0 ">
        <div className="mr-auto text-start">
          <h1 className="text-foreground text-3xl sm:text-4xl font-semibold">
            Oops!
          </h1>
          <p className="text-muted-foreground sm:text-xl">
            Page under development...
          </p>

          <div
            className={`cursor-pointer text-sm m-0 flex flex-row gap-x-2 ${buttonVariants(
              { variant: "link" }
            )}`}
            onClick={() => router.back()}
          >
            <FaArrowLeftLong size={19} />
            Go Back!
          </div>
        </div>

        <div className="w-full max-w-[500px] aspect-square relative">
          <Image
            src="/assets/trade.png"
            alt="space png"
            fill
            className="object-cover object-center"
          />
        </div>
      </div>
    </div>
  );
};

export default UnderDevelopment;

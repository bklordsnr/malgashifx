"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { buttonVariants } from "./ui/button";
import { FaArrowLeftLong } from "react-icons/fa6";

const UnderDevelopment = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center w-full ">
      <div className="w-full max-w-[290px] aspect-square relative">
        <Image
          src="/assets/trade.png"
          alt="space png"
          fill
          className="object-cover object-center"
        />
      </div>

      <div className="flex justify-center text-center flex-col">
        <h1 className="text-foreground text-xl font-medium">Oops!</h1>
        <p className="text-muted-foreground text-sm capitalize">
          boggan wali waa la diyaarinayaa
        </p>

        <div
          className={`cursor-pointer text-sm m-0 flex flex-row gap-x-2 ${buttonVariants(
            { variant: "link" },
          )}`}
          onClick={() => router.back()}
        >
          <FaArrowLeftLong size={19} />
          Dib u noqo
        </div>
      </div>
    </div>
  );
};

export default UnderDevelopment;

export const dynamic = "force-dynamic";

import Container from "@/components/Container";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { FaArrowRightLong } from "react-icons/fa6";

function page() {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="aspect-square relative w-[290px] h-full">
        <Image
          src="/assets/notificationsv3.png"
          fill
          className="object-cover object-center"
          alt="notification image"
        />
      </div>

      <h1 className="text-xl text-foreground font-semibold">Oops!</h1>
      <p className="text-sm capitalize text-muted-foreground">
        ma jiraan ogeysiisyo hadda
      </p>

      <div className="flex items-center text-sm">
        <a href="/account" className={cn(buttonVariants({ variant: "link" }))}>
          U gudub accountka
        </a>

        <FaArrowRightLong size={20} className="text-primary" />
      </div>
    </div>
  );
}

export default page;

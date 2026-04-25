export const dynamic = "force-dynamic";

import Container from "@/components/Container";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { FaArrowRightLong } from "react-icons/fa6";

function page() {
  return (
    <Container>
      <div className="h-[calc(100vh-70px)] pt-10 ">
        <div className="flex flex-col justify-center items-center">
          <div className="aspect-square relative w-[290px] h-full">
            <Image
              src="/assets/notificationsv3.png"
              fill
              className="object-cover object-center"
              alt="notification image"
            />
          </div>

          <h1 className="text-xl text-foreground font-semibold">
            Oops!
          </h1>
          <p className="text-sm text-muted-foreground">
            No notification right now...
          </p>

          <div className="flex items-center text-sm">
            <a
              href="/account"
              className={cn(buttonVariants({ variant: "link" }))}
            >
              Go to account
            </a>

            <FaArrowRightLong size={20} className="text-primary" />
          </div>
        </div>
      </div>
    </Container>
  );
}

export default page;

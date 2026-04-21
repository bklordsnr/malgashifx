"use client";

import Container from "@/components/Container";
import { buttonVariants } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { GoEyeClosed } from "react-icons/go";

const News = () => {
  const [offer, SetOffer] = useState(false);
  useEffect(() => {
    SetOffer(true);
  }, []);

  const handleClose = () => {
    SetOffer(false);
  };

  return (
    <div className="bg-primary w-full">
      <Container>
        {offer ? (
          <div className="flex items-center py-4 justify-center text-primary-foreground">
            <div className="mx-auto text-sm text-start pr-4">
              <a href="https://t.me/malgashiadmin">Invest $500 | Earn $6,000</a>
            </div>
            <div className="cursor-pointer" onClick={handleClose}>
              <GoEyeClosed size={20} />
            </div>
          </div>
        ) : null}
      </Container>
    </div>
  );
};

export default News;

"use client";

import { useEffect, useState } from "react";
import FaqItem from "./FaqItem";
import { Faq } from "@/utils/faq";

const Faqs = () => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const faqData: any = Faq.map((items) => items);
    setData(faqData);
  }, []);

  return (
    <>
      <h1 className="text-foreground text-2xl font-medium">
        Frequently asked questions.
      </h1>

      <div className="mt-8 flex flex-col gap-4 py-4">
        {data.map((data) => (
          <FaqItem data={data} key={data.title} />
        ))}
      </div>
    </>
  );
};

export default Faqs;

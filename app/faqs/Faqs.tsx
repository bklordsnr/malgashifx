"use client";

import FaqItem from "./FaqItem";

interface Faq {
  title: string;
  description: string;
}

const faqData: Faq[] = [
  {
    title: "What is investing?",
    description:
      "Investing is the act of putting money or assets into something with the expectation that it will generate profit or increase in value over time. This can include investing in stocks, bonds, real estate, or businesses to achieve financial growth in the future.",
  },
  {
    title: "What are the different types of investments?",
    description:
      "Common types of investments include stocks, bonds, mutual funds, real estate, commodities, and other investments such as cryptocurrency. Each type has its own level of risk and potential return, and a diversified portfolio may combine several of these assets.",
  },
  {
    title: "How do I start investing?",
    description:
      "First, create an account on the platform. Then choose the investment plan you want and make your payment to begin your investment.",
  },
];

const Faqs = () => {
  return (
    <>
      <span className="text-xl font-medium capitalize text-foreground">
        Frequently Asked Questions
      </span>

      <div className="mt-8 flex flex-col gap-4 py-4">
        {faqData.map((item) => (
          <FaqItem data={item} key={item.title} />
        ))}
      </div>
    </>
  );
};

export default Faqs;
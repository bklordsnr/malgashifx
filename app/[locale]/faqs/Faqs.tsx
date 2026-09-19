"use client";

import { useTranslations } from "next-intl";

import FaqItem from "./FaqItem";

interface Faq {
  title: string;
  description: string;
}

const Faqs = () => {
  const t = useTranslations("Faqs");

  const faqData: Faq[] = [
    {
      title: t("items.whatIsInvesting.title"),
      description: t("items.whatIsInvesting.description"),
    },
    {
      title: t("items.investmentTypes.title"),
      description: t("items.investmentTypes.description"),
    },
    {
      title: t("items.howToStart.title"),
      description: t("items.howToStart.description"),
    },
  ];

  return (
    <>
      <span className="text-xl font-medium capitalize text-foreground">
        {t("title")}
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
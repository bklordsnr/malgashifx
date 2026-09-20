"use client";

import { useEffect, useState } from "react";

import { getCurrencyFromCountry } from "@/lib/currency";

interface CurrencyDisplayProps {
  amount: number;
  country?: string | null;
}

const CurrencyDisplay = ({
  amount,
  country,
}: CurrencyDisplayProps) => {
  const [rate, setRate] = useState<number | null>(null);

  const currency = getCurrencyFromCountry(country);

  useEffect(() => {
    if (currency === "USD") {
      setRate(1);
      return;
    }

    const fetchRate = async () => {
      try {
        const response = await fetch(
          `/api/exchange-rate?currency=${currency}`,
        );

        if (!response.ok) return;

        const data = await response.json();

        if (typeof data.rate === "number") {
          setRate(data.rate);
        }
      } catch (error) {
        console.error("Failed to fetch currency rate:", error);
      }
    };

    fetchRate();
  }, [currency]);

  return (
    <p className="mt-0.5 min-h-4 text-xs font-medium leading-4 text-muted-foreground/80">
      {rate !== null ? (
        <>
          ≈{" "}
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency,
            maximumFractionDigits: 2,
          }).format(amount * rate)}
        </>
      ) : (
        <span className="invisible">≈ 0</span>
      )}
    </p>
  );
};

export default CurrencyDisplay;
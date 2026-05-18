import InvestmentCard from "@/components/sections/investmentplans/InvestmentCard";
import { products } from "@/utils/product";

const getRates = async () => {
  const res = await fetch("https://api.exchangerate.fun/latest?base=USD", {
    next: { revalidate: 3600 },
  });
  const data = await res.json();
  return data.rates;
};

const InvestmentPlans = async () => {
  const rates = await getRates();

  return (
    <>
      <h1 className="text-secondary-foreground font-semibold text-xl mb-8">
        Qorshayaasha Maalgashiga
      </h1>

      <div className="flex flex-wrap justify-between gap-8 pb-8 w-full">
        {products.map((product) => (
          <InvestmentCard
            key={product.id}
            product={product}
            rates={rates}
          />
        ))}
      </div>
    </>
  );
};

export default InvestmentPlans;

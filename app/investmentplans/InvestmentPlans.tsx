import InvestmentCard from "@/components/sections/investmentplans/InvestmentCard";
import { products } from "@/utils/product";

const InvestmentPlans = () => {
  return (
    <>
      <h1 className="text-secondary-foreground font-semibold text-xl mb-8">Investment Plans</h1>

      <div className="flex flex-wrap justify-between gap-8 pb-8 w-full">
        {products.map((product) => {
          return <InvestmentCard product={product} key={product.id} />;
        })}
      </div>
    </>
  );
};

export default InvestmentPlans;

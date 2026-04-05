export const dynamic = "force-dynamic";

import { products } from "@/utils/product";
import InvestmentPlanDetails from "../InvestmentPlanDetails";
import Container from "@/components/Container";

interface IPrams {
  investmentplanid?: string;
}

const page = ({ params } : { params: IPrams }) => {
  const productItem = products.find((product)=> product.id === params.investmentplanid)
  return (
    <div>
      <Container>
        <div className="flex flex-col h-[calc(100vh-70px)]">
          <div className="m-auto">
            <InvestmentPlanDetails product={productItem} />
          </div>
        </div>
      </Container> 
    </div>
  );
};

export default page;

export const dynamic = "force-dynamic";


import Container from "@/components/Container";
import InvestmentPlans from "./InvestmentPlans";

const page = () => {
  return (
    <Container>
      <div className="py-10">
        <InvestmentPlans />
      </div>
    </Container>
  );
};

export default page;

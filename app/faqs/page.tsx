export const dynamic = "force-dynamic";

import Container from "@/components/Container";
import Faqs from "./Faqs";

const page = () => {
  return (
    <div>
      <Container>
        <div className="py-10">
          <Faqs />
        </div>
      </Container>
    </div>
  );
};
export default page;

export const dynamic = "force-dynamic";

import Container from "@/components/Container";
import UnderDevelopment from "@/components/UnderDevelopment";

const page = () => {
  return (
    <Container>
      <div className="h-[calc(100vh-70px)]">
        <UnderDevelopment />
      </div>
    </Container>
  );
};

export default page;

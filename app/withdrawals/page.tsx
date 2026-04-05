export const dynamic = "force-dynamic";

import Container from "@/components/Container";
import Withdraw from "./Withdraw";
import { getCurrentUser } from "@/actions/GetUser";

const page = async () => {
  const currentUser = await getCurrentUser();

  return (
    <Container>
      <div className="h-[calc(100vh-70px)] pt-10">
        <Withdraw currentUser={currentUser} />
      </div>
    </Container>
  );
};

export default page;

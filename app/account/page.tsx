export const dynamic = "force-dynamic";

import { getCurrentUser } from "@/actions/GetUser";
import Account from "./Account";
import Container from "@/components/Container";

const page = async () => {
  const currentUser = await getCurrentUser();
  return (
    <Container>
      <div
        className="flex justify-between py-8 flex-col lg:flex-row"
        suppressHydrationWarning
      >
        <Account currentUser={currentUser} />
      </div>
    </Container>
  );
};

export default page;

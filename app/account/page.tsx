export const dynamic = "force-dynamic";

import { getCurrentUser } from "@/actions/GetUser";
import Container from "@/components/Container";

import Account from "./Account";

const AccountPage = async () => {
  const currentUser = await getCurrentUser();

  return (
    <Container>
      <main className="py-8 sm:py-10">
        <Account currentUser={currentUser} />
      </main>
    </Container>
  );
};

export default AccountPage;
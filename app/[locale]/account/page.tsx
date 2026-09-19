export const dynamic = "force-dynamic";

import { getCurrentUser } from "@/actions/GetUser";
import Container from "@/components/Container";
import prisma from "@/lib/prismadb";

import Account from "./Account";

const AccountPage = async () => {
  const currentUser = await getCurrentUser();

  const withdrawals = currentUser?.id
    ? await prisma.withdrawal.findMany({
        where: {
          userId: currentUser.id,
        },
        orderBy: {
          createdAt: "desc",
        },
        select: {
          id: true,
          amount: true,
          phoneNumber: true,
          network: true,
          status: true,
          createdAt: true,
        },
      })
    : [];

  const serializedWithdrawals = withdrawals.map((withdrawal) => ({
    ...withdrawal,
    createdAt: withdrawal.createdAt.toISOString(),
  }));

  return (
    <Container>
      <main className="py-8 sm:py-10">
        <Account
          currentUser={currentUser}
          withdrawals={serializedWithdrawals}
        />
      </main>
    </Container>
  );
};

export default AccountPage;
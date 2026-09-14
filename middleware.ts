// proxy.ts
import { withAuth } from "next-auth/middleware";
import type { NextRequest } from "next/server";

// Export the proxy as a default function
export default withAuth({
  callbacks: {
    authorized({ token }) {
      // Only allow if the user is logged in
      return !!token;
    },
  },
});

// Protect specific routes
export const config = {
  matcher: ["/account", "/trade", "/withdrawals", "/notifications"],
};
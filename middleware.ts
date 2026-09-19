import createMiddleware from "next-intl/middleware";
import { withAuth, type NextRequestWithAuth } from "next-auth/middleware";
import type { NextFetchEvent } from "next/server";

import { routing } from "@/i18n/routing";

const intlMiddleware = createMiddleware(routing);

const protectedRoutes = [
  "/account",
  "/notifications",
  "/admin",
  "/admin/users",
  "/admin/withdrawals",
];

const isProtectedRoute = (pathname: string) => {
  const locale = routing.locales.find(
    (currentLocale) =>
      pathname === `/${currentLocale}` ||
      pathname.startsWith(`/${currentLocale}/`),
  );

  const pathnameWithoutLocale = locale
    ? pathname.slice(`/${locale}`.length) || "/"
    : pathname;

  return {
    locale,
    protected: protectedRoutes.some(
      (route) =>
        pathnameWithoutLocale === route ||
        pathnameWithoutLocale.startsWith(`${route}/`),
    ),
  };
};

export default function middleware(
  request: NextRequestWithAuth,
  event: NextFetchEvent,
) {
  const pathname = request.nextUrl.pathname;

  const { locale, protected: isProtected } = isProtectedRoute(pathname);

  if (isProtected) {
    const currentLocale = locale ?? routing.defaultLocale;

    const authMiddleware = withAuth(
      (authRequest: NextRequestWithAuth) => {
        return intlMiddleware(authRequest);
      },
      {
        callbacks: {
          authorized({ token }) {
            return !!token;
          },
        },
        pages: {
          signIn: `/${currentLocale}/sign-in`,
        },
      },
    );

    return authMiddleware(request, event);
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ["/", "/(en|am|so|pt|fr|ar)/:path*"],
};
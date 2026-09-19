import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";

import { routing } from "@/i18n/routing";

import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import ThemeProvider from "@/components/providers/ThemeProvider";
import { Toaster } from "react-hot-toast";

const LocaleLayout = async ({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) => {
  const { locale } = await params;

  const isValidLocale = routing.locales.includes(
    locale as (typeof routing.locales)[number],
  );

  if (!isValidLocale) {
    return null;
  }

  const messages = await getMessages();

  const direction = locale === "ar" ? "rtl" : "ltr";

  return (
    <NextIntlClientProvider messages={messages}>
      <div dir={direction} lang={locale}>
        <ThemeProvider>
          <Toaster
            position="bottom-center"
            reverseOrder={false}
            toastOptions={{
              style: {
                background: "#1C1917",
                color: "white",
              },
            }}
          />

          <main className="relative flex min-h-screen flex-col">
            <Navbar />

            <div className="flex-1">{children}</div>

            <Footer />
          </main>
        </ThemeProvider>
      </div>
    </NextIntlClientProvider>
  );
};

export default LocaleLayout;
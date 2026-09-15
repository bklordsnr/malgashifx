export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../components/navbar/Navbar";
import { Toaster } from "react-hot-toast";
import Footer from "../components/footer/Footer";
import { cn } from "@/lib/utils";
import ThemeProvider from "@/components/providers/ThemeProvider";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "SOMALIA MALGASHI",
  description:
    "Somalia Malgashi is an online investment platform designed to provide accessible investment opportunities and trading solutions for individuals looking to grow their finances.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <link rel="icon" href="/favicon.ico" sizes="any" />

      <body className={cn("relative antialiased", inter.className)}>
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
      </body>
    </html>
  );
}
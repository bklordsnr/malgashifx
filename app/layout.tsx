export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../components/navbar/Navbar";
import { CartProvider } from "@/providers/CartProvider";
import { Toaster } from "react-hot-toast";
import Footer from "../components/footer/Footer";
import { cn } from "@/lib/utils";
import News from "./Annoucement";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Trading Platform",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <body className={cn("relative antialiased", inter.className)}>
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
        <CartProvider>
          <main className=" relative flex flex-col min-h-screen">
            <News />
            <Navbar />
            <div className="flex-grow flex-1">{children}</div>
            <Footer />
          </main>
        </CartProvider>
      </body>
    </html>
  );
}

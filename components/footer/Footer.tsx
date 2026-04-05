import Image from "next/image";
import logo from "@/public/logo-image/logo.png";
import FooterList from "./FooterList";
import Link from "next/link";
import Container from "../Container";

const Footer = () => {
  return (
    <footer className="border-t w-full py-10">
      <Container>
        <div>
          <div className="flex gap-5 flex-col md:flex-row">
            <div className="flex flex-col gap-2 w-full max-w-[400px] space-y-3 ">
              <div className="w-[150px] relative">
                <Image src={logo} alt="footerlogo" className="w-full h-auto" />
              </div>

              <p className="text-card-foreground text-sm">
                Convert your money into a source income with the
                best forex traders.
              </p>
            </div>
            <div className="text-muted-foreground text-sm gap-y-8 gap-x-4 flex flex-row justify-between w-full flex-wrap ">
              <FooterList>
                <h3 className="uppercase text-secondary-foreground font-medium text-base">
                  Trade
                </h3>
                <Link href={"/trade"}>Currency Pairs</Link>
                <Link href={"/trade"}>Shares</Link>
              </FooterList>

              <FooterList>
                <h3 className="uppercase text-secondary-foreground font-medium text-base">
                  About Company
                </h3>
                <Link href={"/aboutcompany"}>About us</Link>
                <a href="https://t.me/malgashiadmin">Contact us</a>
              </FooterList>

              <FooterList>
                <h3 className="uppercase text-secondary-foreground font-medium text-base">
                  Faq
                </h3>
                <Link href={"/faqs"}>How to invest</Link>
                <Link href={"/faqs/#regulation"}>Regulation</Link>
              </FooterList>
            </div>
          </div>
          <div className="mt-9 text-muted-foreground text-center text-sm">
            {" "}
            &copy; {new Date().getFullYear()} By MALGASHI FX TRADING
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;

import FooterList from "./FooterList";
import Link from "next/link";
import Container from "../Container";

const Footer = () => {
  return (
    <footer className="border-t w-full py-10">
      <Container>
        <div>
          <div className="flex gap-5 flex-col md:flex-row">
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

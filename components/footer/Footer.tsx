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
                <span className="uppercase text-secondary-foreground  text-sm">
                  Trade
                </span>
                <Link href={"/trade"}>Pairs</Link>
                <Link href={"/trade"}>Shares</Link>
              </FooterList>

              <FooterList>
                <span className="uppercase text-secondary-foreground text-sm">
                  About Company
                </span>
                <Link href={"/aboutcompany"}>About us</Link>
                <a href="https://t.me/malgashiadmin">Telegram</a>
              </FooterList>

              <FooterList>
                <span className="uppercase text-secondary-foreground text-sm">
                  Faq
                </span>
                <Link href={"/faqs"}>How to invest</Link>
              </FooterList>
            </div>
          </div>
          <div className="mt-9 text-muted-foreground text-center text-sm">
            {" "}
            &copy; {new Date().getFullYear()} By Malgashi Traders
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;

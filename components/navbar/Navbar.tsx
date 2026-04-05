import Image from "next/image";
import logo from "@/public/logo-image/logo.png";
import Link from "next/link";
import { IoMdNotifications } from "react-icons/io";
import UserMenu from "./UserMenu";
import { getCurrentUser } from "@/actions/GetUser";
import MobileMenu from "./MobileMenu";
import Container from "../Container";
import { buttonVariants } from "../ui/button";

const Navbar = async () => {
  const currentUser = await getCurrentUser();
  return (
    <nav className="sticky top-0 w-full z-50 inset-x-0 py-2 border-b border-border backdrop-blur-md ">
      <Container>
        <div className="flex justify-between items-center h-16 relative">
          {/* logo */}
          <Link href={"/"} className="cursor-pointer items-center">
            <div className="w-[150px] relative">
              <Image src={logo} alt="logo" className="w-full h-auto" />
            </div>
          </Link>

          {/* middle links*/}
          <div className="hidden lg:flex  items-center ">
            <ul className="flex flex-row items-center gap-5 text-secondary-foreground ">
              <a href="https://t.me/malgashiadmin" target="_blank">
                <li>Telegram</li>
              </a>
              <Link href="/trade">
                <li>Trade</li>
              </Link>
              <Link href="/aboutcompany">
                <li>About Company</li>
              </Link>
              <Link href="/faqs">
                <li>Faqs</li>
              </Link>
            </ul>
          </div>

          {/* right side carticon login n signup */}
          <div className="text-secondary-foreground flex flex-row items-center gap-3 md:gap-5 justify-end">
            <Link href="/notifications" className="flex items-center ">
              <div className="relative cursor-pointer flex items-center">
                <div className="flex items-center">
                  <IoMdNotifications size={24} />
                  <div className="absolute h-[5px] w-[5px] rounded-full bg-card top-[-5px] right-[-5px]" />
                </div>
              </div>
            </Link>

            {currentUser ? null : (
              <div className="hidden md:flex md:items-center md:gap-3 font-light">
                <Link
                  href="/sign-in"
                  className={`${buttonVariants({ variant: "outline" })}`}
                >
                  Log In
                </Link>

                <span className="h-5 w-px bg-card" />

                <Link
                  href="/sign-up"
                  className={`w-36 ${buttonVariants({ variant: "default" })}`}
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* side menu for large devices */}
            <UserMenu currentUser={currentUser} />

            {/* side menu for mobile devices*/}
            <MobileMenu currentUser={currentUser} />
          </div>
        </div>
      </Container>
    </nav>
  );
};

export default Navbar;

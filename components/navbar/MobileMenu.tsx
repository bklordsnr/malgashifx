"use client";
import { LiaTelegramPlane } from "react-icons/lia";
import { MdOutlineSupervisorAccount } from "react-icons/md";
import { GrCircleInformation } from "react-icons/gr";
import { MdWaterfallChart } from "react-icons/md";
import { HiOutlineLogout } from "react-icons/hi";
import { BsPatchQuestion } from "react-icons/bs";
import { LuFileSpreadsheet } from "react-icons/lu";
import { TbLogout2 } from "react-icons/tb";
import { MdOutlineNoAccounts } from "react-icons/md";
import { GiCash } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import { useState } from "react";
import { MdMenu } from "react-icons/md";
import Link from "next/link";
import MenuItem from "./MenuItem";
import { signOut } from "next-auth/react";
import { SafeUser } from "@/types";
import { Button, buttonVariants } from "../ui/button";

interface MobileProps {
  currentUser: SafeUser | null;
}

const MobileMenu: React.FC<MobileProps> = ({ currentUser }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <div className="flex lg:hidden cursor-pointer" onClick={handleMenu}>
        {menuOpen ? (
          <IoMdClose className="text-foreground" size={36} />
        ) : (
          <MdMenu className="text-foreground" size={36} />
        )}
      </div>

      <div
        className={
          menuOpen
            ? "top-[80px] h-screen right-0 fixed  text-secondary-foreground  w-[100%] border bg-background ease-in duration-500 z-30"
            : "top-[80px] h-screen fixed hidden text-secondary-foreground w-[100%] border bg-background ease-in duration-500 z-30"
        }
      >
        {currentUser ? (
          <div className="z-30 px-4 py-3 text-sm">
            <div>
              <div className="px-1 py-2 flex flex-col gap-3 z-30">
                <Link href="/account">
                  <MenuItem
                    url="account"
                    onClick={handleMenu}
                    icon={MdOutlineSupervisorAccount}
                  >
                    Account
                  </MenuItem>
                </Link>

                <span className="w-full h-[1px] bg-secondary" />

                <Link href="/investmentplans">
                  <MenuItem
                    url="platform"
                    onClick={handleMenu}
                    icon={LuFileSpreadsheet}
                  >
                    Investment Plans
                  </MenuItem>
                </Link>

                <span className="w-full h-[1px] bg-secondary" />

                <Link href="/trade">
                  <MenuItem
                    url="trade"
                    onClick={handleMenu}
                    icon={MdWaterfallChart}
                  >
                    Trade
                  </MenuItem>
                </Link>

                <span className="w-full h-[1px] bg-secondary" />

                <Link href="/aboutcompany">
                  <MenuItem
                    url="aboutcompany"
                    onClick={handleMenu}
                    icon={GrCircleInformation}
                  >
                    About company
                  </MenuItem>
                </Link>

                <span className="w-full h-[1px] bg-secondary" />

                <Link href="/faqs">
                  <MenuItem
                    url="faqs"
                    onClick={handleMenu}
                    icon={BsPatchQuestion}
                  >
                    Faqs
                  </MenuItem>
                </Link>

                <span className="w-full h-[1px] bg-secondary" />

                <Button
                  onClick={() => {
                    handleMenu(), signOut();
                  }}
                  className="mt-4"
                  variant="destructive"
                >
                  Logout
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="z-30 px-4 py-3 text-sm">
            <div className="flex flex-col gap-4">
              <Link href="/investmentplans">
                <MenuItem
                  url="platform"
                  onClick={handleMenu}
                  icon={LuFileSpreadsheet}
                >
                  Investment Plans
                </MenuItem>
              </Link>

              <span className="w-full h-[1px] bg-secondary" />

              <Link href="/aboutcompany">
                <MenuItem
                  url="aboutcompany"
                  onClick={handleMenu}
                  icon={GrCircleInformation}
                >
                  About company
                </MenuItem>
              </Link>

              <span className="w-full h-[1px] bg-secondary" />

              <Link href="/faqs">
                <MenuItem
                  url="faqs"
                  onClick={handleMenu}
                  icon={BsPatchQuestion}
                >
                  Faqs
                </MenuItem>
              </Link>

              <span className="w-full h-[1px] bg-secondary" />
            </div>

            <div className="mt-6 flex flex-col space-y-5">
              <Link
                onClick={handleMenu}
                href="/sign-in"
                className={buttonVariants({ variant: "outline" })}
              >
                Log In
              </Link>

              <Link
                onClick={handleMenu}
                href="/sign-up"
                className={buttonVariants({ variant: "default" })}
              >
                Register
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MobileMenu;

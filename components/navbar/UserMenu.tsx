"use client";

import { useCallback, useState } from "react";
import Avatar from "./Avatar";
import { IoChevronDown } from "react-icons/io5";
import Link from "next/link";
import { TbLogout2 } from "react-icons/tb";
import MenuItem from "./MenuItem";
import { signOut } from "next-auth/react";
import { SafeUser } from "@/types";
import { MdOutlineSupervisorAccount } from "react-icons/md";
import { LuFileSpreadsheet } from "react-icons/lu";
import { HiOutlineLogout } from "react-icons/hi";
import { GiCash } from "react-icons/gi";
import { MdOutlineNoAccounts } from "react-icons/md";


interface UserMenuProps {
  currentUser: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return (
    <div>
      {currentUser ? (
        <div className="flex flex-row gap-1 items-center cursor-pointer">
          <Avatar src={currentUser.image} />
          <IoChevronDown
            size={24}
            onClick={toggleOpen}
            className="hidden md:flex"
          />
        </div>
      ) : null}
      {isOpen && (
        <div className="absolute w-[250px] bg-background border overflow-hidden right-0 top-[72px] flex flex-col cursor-pointer z-30">
          {currentUser ? (
            <div className="px-1 py-2 text-sm z-30">
              <Link href="/account">
                <MenuItem
                  url="account"
                  onClick={toggleOpen}
                  icon={MdOutlineSupervisorAccount}
                >
                  Account
                </MenuItem>
              </Link>

              <Link href="/investmentplans">
                <MenuItem
                  url="platform"
                  onClick={toggleOpen}
                  icon={LuFileSpreadsheet}
                >
                  Investment Plans
                </MenuItem>
              </Link>

              <MenuItem
                icon={TbLogout2}
                onClick={() => {
                  toggleOpen(), signOut();
                }}
              >
                Log Out
              </MenuItem>
            </div>
          ) : (
            <div className=" z-30 text-sm">
              <Link href="/sign-in">
                <MenuItem onClick={toggleOpen} icon={HiOutlineLogout}>
                  Log In
                </MenuItem>
              </Link>

              <Link href="/sign-up">
                <MenuItem onClick={toggleOpen} icon={MdOutlineNoAccounts}>
                  Register
                </MenuItem>
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UserMenu;

"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { IoChevronDown } from "react-icons/io5";
import { TbLogout2 } from "react-icons/tb";
import { MdOutlineNoAccounts, MdOutlineSupervisorAccount } from "react-icons/md";
import { HiOutlineLogout } from "react-icons/hi";

import { SafeUser } from "@/types";

import Avatar from "./Avatar";
import MenuItem from "./MenuItem";

interface UserMenuProps {
  currentUser: SafeUser | null;
}

const UserMenu = ({ currentUser }: UserMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const handleSignOut = async () => {
    setIsOpen(false);
    await signOut();
  };

  return (
    <div className="relative">
      {currentUser && (
        <div className="flex cursor-pointer items-center gap-1">
          <Avatar src={currentUser.image} />

          <IoChevronDown
            size={24}
            onClick={toggleOpen}
            className="hidden md:flex"
          />
        </div>
      )}

      {isOpen && (
        <div className="absolute right-0 top-[72px] z-30 flex w-[250px] flex-col overflow-hidden border bg-background">
          {currentUser ? (
            <div className="px-1 py-2 text-sm">
              <Link href="/account">
                <MenuItem
                  url="account"
                  onClick={toggleOpen}
                  icon={MdOutlineSupervisorAccount}
                >
                  Account
                </MenuItem>
              </Link>

              <MenuItem icon={TbLogout2} onClick={handleSignOut}>
                Sign Out
              </MenuItem>
            </div>
          ) : (
            <div className="text-sm">
              <Link href="/sign-in">
                <MenuItem onClick={toggleOpen} icon={HiOutlineLogout}>
                  Sign In
                </MenuItem>
              </Link>

              <Link href="/sign-up">
                <MenuItem onClick={toggleOpen} icon={MdOutlineNoAccounts}>
                  Sign Up
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


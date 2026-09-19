"use client";

import { useCallback, useState } from "react";
import { Link } from "@/i18n/navigation";
import { signOut } from "next-auth/react";
import { IoChevronDown } from "react-icons/io5";
import { TbLogout2 } from "react-icons/tb";
import { MdOutlineSupervisorAccount } from "react-icons/md";
import { MdAdminPanelSettings } from "react-icons/md";
import { HiOutlineLogout } from "react-icons/hi";
import { MdOutlineNoAccounts } from "react-icons/md";

import { SafeUser } from "@/types";

import Avatar from "./Avatar";
import MenuItem from "./MenuItem";
import ThemeToggle from "../ThemeToggle";

interface UserMenuProps {
  currentUser: SafeUser | null;
}

const UserMenu = ({ currentUser }: UserMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const toggleAdmin = useCallback(() => {
    setAdminOpen((prev) => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setIsOpen(false);
    setAdminOpen(false);
  }, []);

  const handleSignOut = async () => {
    closeMenu();
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
        <div className="absolute right-0 top-[72px] z-30 flex w-[250px] flex-col overflow-hidden border border-border bg-background">
          {currentUser ? (
            <div className="px-1 py-2 text-sm">
              <Link href="/account">
                <MenuItem
                  url="account"
                  onClick={closeMenu}
                  icon={MdOutlineSupervisorAccount}
                >
                  Account
                </MenuItem>
              </Link>

              {currentUser.role === "ADMIN" && (
                <div>
                  <button
                    type="button"
                    onClick={toggleAdmin}
                    aria-expanded={adminOpen}
                    className="group flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm font-medium text-secondary-foreground transition-all hover:bg-muted hover:text-foreground"
                  >
                    <span className="flex items-center gap-3">
                      <MdAdminPanelSettings
                        size={21}
                        className="shrink-0 transition-transform duration-200 group-hover:scale-105"
                      />
                      <span>Admin Panel</span>
                    </span>

                    <IoChevronDown
                      size={18}
                      className={`transition-transform duration-200 ${
                        adminOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {adminOpen && (
                    <div className="mb-1 ml-9 border-l border-border pl-2">
                      <Link href="/admin" onClick={closeMenu}>
                        <MenuItem url="admin" onClick={closeMenu}>
                          Dashboard
                        </MenuItem>
                      </Link>

                      <Link href="/admin/users" onClick={closeMenu}>
                        <MenuItem
                          url="admin/users"
                          onClick={closeMenu}
                        >
                          Users
                        </MenuItem>
                      </Link>

                      <Link
                        href="/admin/withdrawals"
                        onClick={closeMenu}
                      >
                        <MenuItem
                          url="admin/withdrawals"
                          onClick={closeMenu}
                        >
                          Withdrawals
                        </MenuItem>
                      </Link>
                    </div>
                  )}
                </div>
              )}

              <div className="my-1 h-px w-full bg-border" />

              <ThemeToggle />

              <MenuItem icon={TbLogout2} onClick={handleSignOut}>
                Sign Out
              </MenuItem>
            </div>
          ) : (
            <div className="text-sm">
              <Link href="/sign-in" onClick={closeMenu}>
                <MenuItem
                  onClick={closeMenu}
                  icon={HiOutlineLogout}
                >
                  Sign In
                </MenuItem>
              </Link>

              <Link href="/sign-up" onClick={closeMenu}>
                <MenuItem
                  onClick={closeMenu}
                  icon={MdOutlineNoAccounts}
                >
                  Sign Up
                </MenuItem>
              </Link>

              <div className="my-1 h-px w-full bg-border" />

              <ThemeToggle />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UserMenu;
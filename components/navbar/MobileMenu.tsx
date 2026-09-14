"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MdOutlineSupervisorAccount } from "react-icons/md";
import { GrCircleInformation } from "react-icons/gr";
import { BsPatchQuestion } from "react-icons/bs";
import { signOut } from "next-auth/react";

import { SafeUser } from "@/types";

import MenuItem from "./MenuItem";
import { Button, buttonVariants } from "../ui/button";

interface MobileProps {
  currentUser: SafeUser | null;
}

const MobileMenu = ({ currentUser }: MobileProps) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleSignOut = async () => {
    closeMenu();
    await signOut();
  };

  useEffect(() => {
    if (!menuOpen) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      {/* Menu Button */}
      <button
        type="button"
        onClick={toggleMenu}
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        aria-expanded={menuOpen}
        className="relative z-[70] flex h-10 w-10 items-center justify-center rounded-full lg:hidden"
      >
        <span className="relative flex h-6 w-6 items-center justify-center">
          <span
            className={`absolute h-[2px] w-6 rounded-full bg-foreground transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${
              menuOpen ? "rotate-45" : "-translate-y-[5px]"
            }`}
          />

          <span
            className={`absolute h-[2px] w-6 rounded-full bg-foreground transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${
              menuOpen ? "-rotate-45" : "translate-y-[5px]"
            }`}
          />
        </span>
      </button>

      {/* Mobile Menu */}
      <div
        className={`absolute left-1/2 top-full z-40 h-[calc(100dvh-4rem)] w-screen -translate-x-1/2 overflow-hidden lg:hidden ${
          menuOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <button
          type="button"
          aria-label="Close menu"
          onClick={closeMenu}
          className={`absolute inset-0 bg-black/20 backdrop-blur-md transition-opacity duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
            menuOpen ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Drawer */}
        <aside
          className={`absolute bottom-0 right-0 top-0 flex w-[82%] max-w-[420px] flex-col border-l border-border bg-background shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Navigation */}
          <div className="flex-1 overflow-y-auto px-4 py-6">
            <div className="flex flex-col gap-2">
              {currentUser && (
                <>
                  <Link href="/account" onClick={closeMenu}>
                    <MenuItem
                      url="account"
                      onClick={closeMenu}
                      icon={MdOutlineSupervisorAccount}
                    >
                      Account
                    </MenuItem>
                  </Link>

                  <div className="my-2 h-px w-full bg-border" />
                </>
              )}

              <Link href="/aboutcompany" onClick={closeMenu}>
                <MenuItem
                  url="aboutcompany"
                  onClick={closeMenu}
                  icon={GrCircleInformation}
                >
                  About Company
                </MenuItem>
              </Link>

              <div className="my-2 h-px w-full bg-border" />

              <Link href="/faqs" onClick={closeMenu}>
                <MenuItem
                  url="faqs"
                  onClick={closeMenu}
                  icon={BsPatchQuestion}
                >
                  FAQs
                </MenuItem>
              </Link>
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="border-t border-border bg-background px-4 pb-6 pt-5">
            {currentUser ? (
              <Button
                type="button"
                onClick={handleSignOut}
                variant="destructive"
                className="h-12 w-full rounded-xl border-custom3 text-sm font-medium"
              >
                Sign Out
              </Button>
            ) : (
              <div className="flex flex-col gap-3">
                <Link
                  href="/sign-in"
                  onClick={closeMenu}
                  className={`h-12 w-full rounded-xl border-custom2 ${buttonVariants(
                    {
                      variant: "outline",
                    }
                  )}`}
                >
                  Sign In
                </Link>

                <Link
                  href="/sign-up"
                  onClick={closeMenu}
                  className={`h-12 w-full rounded-xl border-custom ${buttonVariants(
                    {
                      variant: "default",
                    }
                  )}`}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </aside>
      </div>
    </>
  );
};

export default MobileMenu;
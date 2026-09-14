"use client";

import { IconType } from "react-icons";
import { usePathname } from "next/navigation";

interface MenuItemProps {
  children: React.ReactNode;
  url?: string;
  icon?: IconType;
  onClick: () => void;
}

const MenuItem = ({
  children,
  onClick,
  icon: Icon,
  url,
}: MenuItemProps) => {
  const pathname = usePathname();
  const isActive = Boolean(url && pathname?.startsWith(`/${url}`));

  return (
    <div
      onClick={onClick}
      className={`group flex min-h-12 cursor-pointer items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 active:scale-[0.98] ${
        isActive
          ? "bg-primary/10 text-primary"
          : "text-secondary-foreground hover:bg-muted hover:text-foreground"
      }`}
    >
      {Icon && (
        <Icon
          size={21}
          className="shrink-0 transition-transform duration-200 group-hover:scale-105"
        />
      )}

      <span>{children}</span>
    </div>
  );
};

export default MenuItem;
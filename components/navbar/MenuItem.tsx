import { IconType } from "react-icons";
import { usePathname } from "next/navigation";

interface MenuItemProps {
  children: React.ReactNode;
  url?: string | undefined
  icon?: IconType;
  onClick: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({
  children,
  onClick,
  icon: Icon,
  url,
}) => {



  return (
    <div onClick={onClick} className={`px-3 py-2 transition font-light flex items-center gap-2 text-secondary-foreground-foreground text-sm  hover:bg-primary-foreground`}>
     {Icon && <Icon size={24} />}
      {children}
    </div>
  );
};

export default MenuItem
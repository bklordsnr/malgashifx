import { IconType } from "react-icons";

interface ButtonProps {
  label: string;
  disabled?: undefined | boolean;
  outline?: boolean;
  small?: boolean;
  custom?: string;
  icon?: IconType;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button: React.FC<ButtonProps> = ({
  label,
  disabled,
  outline,
  small,
  custom,
  icon: Icon,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`disabled:opacity-70
      disabled:cursor-not-allowed
      rounded-[7px]
      transition
      w-full
      flex
      items-center
      justify-center
      gap-2
      ${
        outline
          ? "bg-transparent border-[#FFFF6F] text-[#FFFF6F] border"
          : "bg-[#0E91C9] border-transparent text-white border-none"
      }
      ${
        small ? "text-sm font-light px-2 py-1" : "text-md font-normal px-3 py-2"
      }
      ${custom ? custom : ""}
  `}
      disabled={disabled}
    >
      {Icon && <Icon size={24} />}
      {label}
    </button>
  );
};

export default Button;

interface AboutItemProps {
  title: string;
  subtitle: string;
}

export const AboutItem: React.FC<AboutItemProps> = ({ title, subtitle }) => {
  return (
    <div className="border  rounded-[15px] w-full lg:max-w-[300px] h-[150px] p-4 text-center flex flex-col justify-center">
      <span className="bg-gradient-to-r from-[#FFFF6F]   to-[#0E91C9]  
      text-3xl mb-2 
      bg-clip-text text-transparent
      font-semibold
      ">{title}</span>
      <span className="text-base text-card-foreground">{subtitle}</span>
    </div>
  );
};

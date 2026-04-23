interface AboutItemProps {
  title: string;
  subtitle: string;
}

export const AboutItem: React.FC<AboutItemProps> = ({ title, subtitle }) => {
  return (
    <div className="border border-custom2 rounded-[15px] w-full lg:max-w-[300px] h-[150px] p-4 text-center flex flex-col justify-center">
      <span className="bg-gradient-to-r from-[#FFFF6F]   to-[#124d1c]  
      text-xl mb-2 
      bg-clip-text text-transparent
      font-semibold
      ">{title}</span>
      <span className="text-sm text-muted-foreground">{subtitle}</span>
    </div>
  );
};

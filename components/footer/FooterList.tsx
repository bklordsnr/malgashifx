interface FooterListProps {
  children: React.ReactNode;
}

const FooterList: React.FC<FooterListProps> = ({ children }) => {
  return (
    <div className="flex flex-col gap-2 ">
      {children}
    </div>
  );
};

export default FooterList;

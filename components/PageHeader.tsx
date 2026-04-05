interface PageProps {
  header: string;
}


export const PageHeader: React.FC<PageProps> = ({ header }) => {
  return <div className="text-white rounded-[7px] bg-[#0E91C9] font-normal py-1 px-2" style={{width: "fit-content"}} >{header}</div>;
};

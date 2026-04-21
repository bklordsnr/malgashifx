import Image, { StaticImageData } from "next/image";

interface CurrencyItemProps {
  image: string | StaticImageData;
  title: string;
  bprice: string;
  avgprice: string;
  graph: string;
  green?: boolean;
}

const CurrencyItem: React.FC<CurrencyItemProps> = ({
  image,
  title,
  bprice,
  avgprice,
  graph,
  green,
}) => {
  return (
    <div className="border-custom2  rounded-[15px] p-5 md:max-w-[370px] w-full">
      <div className="flex flex-row  items-center">
        <div className="mr-4 relative w-[80px]">
          <Image src={image} alt="image" className="w-full h-auto"  loading="lazy" />
        </div>
        <span className="uppercase text-card-foreground text-lg font-semibold">
          {title}
        </span>
      </div>
      <div className="mt-5 flex justify-between flex-row">
        <div className="">
          <span className="text-muted-foreground block">Buy Price</span>
          <span className="text-card-foreground">{bprice}</span>
        </div>

        <div className="flex justify-end flex-col ">
          <span className="text-muted-foreground ml-auto">Avg</span>
          <span
            className={
              green
                ? "text-primary"
                : "bg-gradient-to-r from-[#F44D29]   to-[#D52274]  bg-clip-text text-transparent"
            }
          >
            {avgprice}
          </span>
        </div>
      </div>

      <div className="mt-5">
        <div className="w-full">
          <Image src={graph} alt="graph" className="w-full h-auto" />
        </div>
      </div>
    </div>
  );
};

export default CurrencyItem;

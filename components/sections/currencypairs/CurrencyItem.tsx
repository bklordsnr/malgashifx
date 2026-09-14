import Image, { StaticImageData } from "next/image";

interface CurrencyItemProps {
  image: string | StaticImageData;
  title: string;
  bprice: string;
  avgprice: string;
  graph: string | StaticImageData;
  green?: boolean;
}

const CurrencyItem = ({
  image,
  title,
  bprice,
  avgprice,
  graph,
  green = true,
}: CurrencyItemProps) => {
  return (
    <div className="w-full rounded-2xl border-custom2 p-5 sm:p-6 lg:max-w-[370px]">
      <div className="flex items-center">
        <div className="relative mr-4 w-10 shrink-0 sm:w-[50px]">
          <Image
            src={image}
            alt={`${title} currency pair`}
            className="h-auto w-full"
            loading="lazy"
          />
        </div>

        <span className="text-base font-medium capitalize text-card-foreground">
          {title}
        </span>
      </div>

      <div className="mt-6 flex items-end justify-between gap-6">
        <div>
          <span className="block text-xs font-medium text-muted-foreground sm:text-sm">
            Buy Price
          </span>
          <span className="mt-1 block text-sm text-card-foreground">
            {bprice}
          </span>
        </div>

        <div className="text-right">
          <span className="block text-xs font-medium text-muted-foreground sm:text-sm">
            Average
          </span>
          <span
            className={`mt-1 block text-sm font-medium ${
              green
                ? "text-primary"
                : "bg-gradient-to-r from-[#F44D29] to-[#D52274] bg-clip-text text-transparent"
            }`}
          >
            {avgprice}
          </span>
        </div>
      </div>

      <div className="mt-6 w-full">
        <Image
          src={graph}
          alt={`${title} performance graph`}
          className="h-auto w-full"
          loading="lazy"
        />
      </div>
    </div>
  );
};

export default CurrencyItem;
"use client";

import { IoCheckmarkDone } from "react-icons/io5";
import { RiCloseLine } from "react-icons/ri";
import { formatPrice } from "@/utils/formatPrice";
import { Button } from "@/components/ui/button";
import { FaRegClock } from "react-icons/fa6";
import Link from "next/link";
import { useEffect, useState } from "react";

interface InvestmentCardProps {
  product: any;
  rates: any;
}

const InvestmentCard: React.FC<InvestmentCardProps> = ({ product, rates }) => {
  const colorMap: Record<string, { text: string; border: string }> = {
    special: {
      text: "text-green-500",
      border: "border-green-500",
    },
    blue: {
      text: "text-blue-600",
      border: "border-blue-600",
    },
    purple: {
      text: "text-purple-700",
      border: "border-purple-700",
    },
    yellow: {
      text: "text-yellow-500",
      border: "border-yellow-500",
    },
  };

  const usdPrice = Number(product.price);
  const usdprofitPrice = Number(product.profit);

  const mozPrice = usdPrice * rates.MZN;
  const angolaPrice = usdPrice * rates.AOA;

  const mozprofitPrice = usdprofitPrice * rates.MZN;
  const angolaprofitPrice = usdprofitPrice * rates.AOA;

  const [dimPulse, setDimPulse] = useState(false);

  useEffect(() => {
    if (product?.type) {
      setDimPulse(true);
    }
  }, [product?.type]);

  return (
    <div
      className={`rounded-[15px] border w-full md:max-w-[350px] p-4   ${dimPulse ? "border-custom4" : ""} ${product.type ? `dimPulse` : `border-custom2`} `}
    >
      <div className="flex flex-col items-center w-full gap-1 ">
        <div className="flex flex-row items-center justify-between w-full">
          <div
            className={` p-[2px] rounded-[7px] border border-dotted w-fit px-2 ${
              colorMap[product.color]?.border || "border-gray-300"
            }`}
          >
            <div
              className={`text-center text-sm ${colorMap[product.color]?.text}`}
            >
              {product.category}
            </div>
          </div>
          <div>
            {product.type && (
              <div className="bg-destructive rounded-md flex items-center justify-center px-3 py-1">
                <FaRegClock size={10} className="text-white mr-1" />

                <span className="uppercase text-[10px] text-white font-medium">
                  ends soon
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="mr-auto mt-2">
          <span className="text-base font-medium text-secondary-foreground">
            Invest
          </span>

          <div className="flex flex-row justify-center items-center">
            <span className="text-xl text-secondary-foreground font-semibold">
              {formatPrice(product.price)}
            </span>
            <span className="text-muted-foreground mx-1">~</span>
            <span className="text-muted-foreground text-[10px]">
              {mozPrice.toFixed(0)}MT
            </span>
          </div>
        </div>

        <div className="mt-4 w-full">
          {product.swapdiscount ? (
            <div className="flex justify-between">
              <div className="flex items-center">
                <IoCheckmarkDone size={20} className="text-primary mr-2" />
                <span className="text-muted-foreground text-sm">Leverage:</span>
              </div>
              <div className="text-primary text-sm">1:1000</div>
            </div>
          ) : (
            <div className="flex justify-between">
              <div className="flex items-center">
                <IoCheckmarkDone size={20} className="text-primary mr-2" />
                <span className="text-muted-foreground text-sm">Leverage:</span>
              </div>
              <div className="text-primary text-sm">1:500</div>
            </div>
          )}

          {product.swapdiscount ? (
            <div className="flex justify-between mt-2">
              <div className="flex items-center">
                <IoCheckmarkDone size={20} className="text-primary mr-2" />
                <span className="text-muted-foreground text-sm">
                  Holding Period:
                </span>
              </div>
              <div className="text-primary text-sm">48 hrs</div>
            </div>
          ) : (
            <div className="flex justify-between mt-2">
              <div className="flex items-center">
                <IoCheckmarkDone size={20} className="text-primary mr-2" />
                <span className="text-muted-foreground text-sm">
                  Holding Period:
                </span>
              </div>
              <div className="text-primary text-sm">24 hrs</div>
            </div>
          )}

          {product.swapdiscount ? (
            <div className="flex justify-between mt-2">
              <div className="flex items-center">
                <IoCheckmarkDone size={20} className="text-primary mr-2" />
                <span className="text-sm">Swap Discount:</span>
              </div>
              <div className="text-primary">yes</div>
            </div>
          ) : (
            <div className="flex justify-between mt-2">
              <div className="flex items-center">
                <RiCloseLine size={24} className="text-muted mr-2" />
                <span className="text-muted text-sm">Swap Discount:</span>
              </div>
              <div className="text-muted text-sm">No</div>
            </div>
          )}

          {product.customizedinvestment ? (
            <div className="flex justify-between mt-2">
              <div className="flex items-center">
                <IoCheckmarkDone size={20} className="text-primary mr-2" />
                <span className="text-sm">Customized Investment:</span>
              </div>
              <div className="text-primary">yes</div>
            </div>
          ) : (
            <div className="flex justify-between mt-2">
              <div className="flex items-center">
                <RiCloseLine size={24} className="text-muted mr-2" />
                <span className="text-muted text-sm">
                  Customized Investment:
                </span>
              </div>
              <div className="text-muted text-sm">No</div>
            </div>
          )}
        </div>

        <div className="mr-auto mt-2">
          <span className="text-base font-medium text-secondary-foreground">
            Profit
          </span>
          <div className="flex flex-row items-center justify-center">
            <span className="text-xl block text-secondary-foreground font-semibold">
              {formatPrice(product.profit)}
            </span>
            <span className="text-muted-foreground mx-1">~</span>
            <span className="text-muted-foreground text-[10px]">{mozprofitPrice.toFixed(0)}MT</span>
          </div>
        </div>

        <div className="mt-2 w-full">
          <Link href={`/account`}>
            <Button className="w-full border-custom">Invest</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default InvestmentCard;

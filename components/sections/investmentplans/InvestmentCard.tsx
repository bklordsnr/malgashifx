"use client";

import { IoCheckmarkDone } from "react-icons/io5";
import { RiCloseLine } from "react-icons/ri";
import { formatPrice } from "@/utils/formatPrice";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface InvestmentCardProps {
  product: any;
}

const InvestmentCard: React.FC<InvestmentCardProps> = ({ product }) => {
  return (
    <div className="rounded-[15px] border w-full md:max-w-[350px] p-4 border-custom2 ">
      <div className="flex flex-col items-center w-full gap-1 ">
        <div className={`mr-auto p-[2px] rounded-[7px] border w-fit px-2`}>
          <div className={`text-center text-sm ${product.color}`}>
            {product.category}
          </div>
        </div>

        <div className="mr-auto mt-2">
          <span className="text-base font-medium text-secondary-foreground">
            Invest
          </span>
          <div className="font-semibold text-xl flex flex-row">
            <span className=" block mt-2 text-secondary-foreground">
              {formatPrice(product.price)}
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
          <div className="font-semibold text-2xl flex flex-row">
            <span className="text-xl block mt-2 text-secondary-foreground">
              {formatPrice(product.profit)}
            </span>
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

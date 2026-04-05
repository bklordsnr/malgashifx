"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { useCart } from "@/hook/useCart";
import { CartPlanType } from "@/types";
import { formatPrice } from "@/utils/formatPrice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaRegCheckCircle } from "react-icons/fa";
import { FaArrowLeftLong } from "react-icons/fa6";

interface InvestmentPlanDetailsProps {
  product: any;
}

const InvestmentPlanDetails: React.FC<InvestmentPlanDetailsProps> = ({
  product,
}) => {
  const router = useRouter();
  const { handleAddProductToCart, cartProducts } = useCart();
  const [isproductincart, setIsProductInCart] = useState(false);
  const [active, setActive] = useState(true);
  const [cartplan, setCartPlan] = useState<CartPlanType>({
    id: product.id,
    name: product.name,
    price: product.price,
    profit: product.profit,
    category: product.category,
    availability: product.availability,
    swapdiscount: product.swapdiscount,
    customizedinvestment: product.customizedinvestment,
    personalAccount: product.personalAccount,
  });

  useEffect(() => {
    setIsProductInCart(false);

    if (cartProducts) {
      const existingItem = cartProducts.findIndex(
        (item) => item.id === product.id
      );

      if (existingItem > -1) {
        setIsProductInCart(true);
      }
    }
  }, [cartProducts]);

  useEffect(() => {
    if (!cartProducts || cartProducts?.length < 0) {
      setActive(false);
    }
  }, [cartProducts]);

  return (
    <>
      <div className=" flex flex-col gap-1 text-white rounded-[15px] p-5 border bg-card w-full max-w-[600px]">
        <div className="flex flex-row items-center gap-1">
          <span className="text-2xl font-medium flex items-center">
            {product.name}
          </span>{" "}
          -
          <span className="text-base flex items-center">
            {formatPrice(product.price)}
          </span>
        </div>

        <div className="mt-2 mb-2">
          <p className="text-muted-foreground text-sm">{product.description}</p>

          <div className="mt-2 capitalize text-secondary-foreground text-sm flex items-center gap-x-2">
            <span> category :</span>
            <span className="font-normal text-muted-foreground text-sm flex items-center">
              {product.category}
            </span>
          </div>
          <div>
            {product.availability ? (
              <span className="text-primary">Available</span>
            ) : (
              <span className="text-indigo-50">Not Available</span>
            )}
          </div>
        </div>

        {isproductincart ? (
          <div className="mt-2 mb-2 w-full md:max-w-[300px]">
            <p className="flex flex-row gap-2 items-center">
              <FaRegCheckCircle size={20} className="text-primary" />
              <span className="text-muted-foreground text-sm">
                Plan Added to Cart
              </span>
            </p>

            <div className="mt-5">
              <Link href="/cart">
                <Button className="w-full">View Cart</Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="mt-2 mb-2">
            <Button
              className="capitalize w-full"
              onClick={() => {
                handleAddProductToCart(cartplan);
              }}
            >
              add to cart
            </Button>
          </div>
        )}
      </div>

      <div className="flex items-center justify-center  gap-1 text-muted-foreground">
        <FaArrowLeftLong size={19} className="text-primary" />
        <Link
          href={"/investmentplans"}
          className={buttonVariants({ variant: "link" })}
        >
          view plans
        </Link>
      </div>
    </>
  );
};

export default InvestmentPlanDetails;

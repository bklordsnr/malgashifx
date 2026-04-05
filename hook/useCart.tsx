import { CartPlanType } from "@/types";
import { products } from "@/utils/product";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "react-hot-toast";

type CartContextType = {
  cartProducts: CartPlanType[] | null;
  handleAddProductToCart: (product: CartPlanType) => void;
  handleRemoveProductToCart: (product: CartPlanType) => void;
  paymentIntent: string | null;
  requestItem: string | null;
  handleSetPaymentIntent: (val: string | null) => void;
  handleClearCart: () => void;
  handleSetRequest: (val: string | null) => void;
};

export const CartContext = createContext<CartContextType | null>(null);

interface props {
  [propName: string]: any;
}

//cart context provider
export const CartContextProvider = (props: props) => {
  const [cartProducts, setCartProducts] = useState<CartPlanType[] | null>(null);
  const [paymentIntent, setPaymentIntent] = useState<string | null>(null);
  const [requestItem, SetRequestItem] = useState<string | null>(null);

  useEffect(() => {
    const cartItems: any = localStorage.getItem("libertonCartItems");
    const cartLproducts: CartPlanType[] | null = JSON.parse(cartItems);
    const eShopPaymentIntent: any = localStorage.getItem("eShopPaymentIntent");
    const paymentIntent: string | null = JSON.parse(eShopPaymentIntent);
    const requestItems: any = localStorage.getItem("requestitem");
    const requestItem: string | null = JSON.parse(requestItems);

    SetRequestItem(requestItem);

    setCartProducts(cartLproducts);

    setPaymentIntent(paymentIntent);
  }, []);

  //add product to cart func
  const handleAddProductToCart = useCallback((product: CartPlanType) => {
    setCartProducts((prev) => {
      let updateCart;

      if (prev) {
        updateCart = [...prev, product];
      } else {
        updateCart = [product];
      }
      //toast message
      toast.success("plan added to cart");
      //add to localstorage
      localStorage.setItem("libertonCartItems", JSON.stringify(updateCart));

      return updateCart;
    });
  }, []);

  //remove product func
  const handleRemoveProductToCart = useCallback(
    (product: CartPlanType) => {
      if (cartProducts) {
        const filteredProducts = cartProducts.filter((item) => {
          return item.id != product.id;
        });

        setCartProducts(filteredProducts);
        toast.success("plan removed from cart");
        localStorage.setItem(
          "libertonCartItems",
          JSON.stringify(filteredProducts)
        );
      }
    },
    [cartProducts]
  );

  //remove product from cart

  const handleClearCart = useCallback(() => {
    setCartProducts(null);
    localStorage.setItem("libertonCartItems", JSON.stringify(null));
  }, [cartProducts]);

  //add payment intent to local storage
  const handleSetPaymentIntent = useCallback((val: string | null) => {
    SetRequestItem(val);
    localStorage.setItem("requestitem", JSON.stringify(val));
  }, []);

  //add request item on localstorage
  const handleSetRequest = useCallback((val: string | null) => {
    SetRequestItem(val);
    localStorage.setItem("requestitem", JSON.stringify(val));
  }, []);


  //export props
  const value = {
    cartProducts,
    handleAddProductToCart,
    handleRemoveProductToCart,
    paymentIntent,
    handleClearCart,
    handleSetRequest,
    requestItem,
    handleSetPaymentIntent,
  };
  return <CartContext.Provider value={value} {...props} />;
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (context === null) {
    throw new Error("useCart must be used with Cartcontext Provider");
  }

  return context;
};

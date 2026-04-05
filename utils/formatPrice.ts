export const formatPrice: any = (value: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "usd",
  }).format(value);
};

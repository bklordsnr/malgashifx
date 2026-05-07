const Rate = async (any: any) => {
  const res = await fetch("https://api.exchangerate.fun/latest?base=USD", {
    next: { revalidate: 3600 },
  });
  const data = await res.json();
  return (
    <div className="text-sm flex items-center justify-center space-x-1">
      <span>1 USD $ = </span>
      <span>{data.rates.MZN.toFixed(2)} MT</span>
    </div>
  );
};

export default Rate;

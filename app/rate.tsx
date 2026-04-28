import ReactCountryFlag from "react-country-flag";


const Rate = async (any: any) => {
  const res = await fetch("https://api.exchangerate.fun/latest?base=USD", {
    next: { revalidate: 3600 },
  });
  const data = await res.json();
  return <div className="text-sm flex items-center justify-center space-x-1">
    <span>1 USD $ = </span>
    <span>{data.rates.MZN.toFixed(2)} MZ</span>
    <ReactCountryFlag countryCode="mz" svg style={{ width: '14px', height: '14px' }} />

    <span>|</span> 
    <span>{data.rates.AOA.toFixed(2)} KZ</span>

    <ReactCountryFlag countryCode="ao" svg style={{ width: '14px', height: '14px' }} />
  </div>;
};

export default Rate;

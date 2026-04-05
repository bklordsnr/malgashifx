import React, {  useEffect, useMemo, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import axios from "axios";
import Autoplay from "embla-carousel-autoplay";
import { TruncateText } from "../../TruncateText";

export const Couresel = () => {
  const [coins, setcoins] = useState<any[]>([]);
  const [emblaRef] = useEmblaCarousel({ loop: false }, [Autoplay()]);

  useEffect(() => {
    axios
      .get("https://api.coingecko.com/api/v3/exchanges")
      .then((res) => {
        setcoins(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const seriesCoins = useMemo(() => coins, [coins]);

  

  return (
    <div className="embla overflow-hidden" ref={emblaRef}>
      <div className="embla__container flex gap-10">
        {seriesCoins.map((coin) => (
          <div key={coin.id} className="embla__slide  flex-1 w-full">
            <div className="flex flex-row gap-4">
              <span className="text-muted-foreground font-normal">
                {TruncateText(coin.name)}
              </span>
              <span className="bg-primary bg-clip-text text-transparent font-normal">
                {parseFloat(coin.trade_volume_24h_btc).toFixed(2)}
              </span>
            </div>
          </div>
        )) }
      </div>
    </div>
  );
};

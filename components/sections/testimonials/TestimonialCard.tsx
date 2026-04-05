"use client";

import React, { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";

export const TestimonialCard = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div className="embla overflow-hidden relative" ref={emblaRef}>
      <div className="embla__container flex items-start gap-5">
        <div className="embla__slide overflow-hidden rounded-md  border min-w-[250px] max-w-[250px]  h-[350px]  ">
          <video controls className="w-full object-cover h-full">
            <source src="/reviews/client1.mp4" />
          </video>
        </div>

        <div className="embla__slide overflow-hidden rounded-md  border min-w-[250px] max-w-[250px]  h-[350px]  ">
          <video controls className="w-full object-cover h-full">
            <source src="/reviews/client2.mp4" />
          </video>
        </div>

        <div className="embla__slide overflow-hidden rounded-md  border min-w-[250px] max-w-[250px]  h-[350px]  ">
          <video controls className="w-full object-cover h-full">
            <source src="/reviews/client3.mp4" />
          </video>
        </div>
        <div className="embla__slide overflow-hidden rounded-md  border min-w-[250px] max-w-[250px]  h-[350px]  ">
          <video controls className="w-full object-cover h-full">
            <source src="/reviews/client4.mp4" />
          </video>
        </div>
        <div className="embla__slide overflow-hidden rounded-md  border min-w-[250px] max-w-[250px]  h-[350px]  ">
          <video controls className="w-full object-cover h-full">
            <source src="/reviews/client5.mp4" />
          </video>
        </div>
      </div>

      <div className="flex items-center m-auto  mt-10 w-full max-w-[220px] justify-center gap-10">
        <button
          className="embla__prev rounded-full  text-border w-[35px] h-[35px] p-5 border flex items-center justify-center flex-1"
          onClick={scrollPrev}
        >
          <FaChevronLeft size={20} />
        </button>

        <button
          className="embla__next rounded-full w-[35px] text-border h-[35px] p-5 border flex items-center justify-center flex-1  "
          onClick={scrollNext}
        >
          <FaChevronRight size={21} />
        </button>
      </div>
    </div>
  );
};

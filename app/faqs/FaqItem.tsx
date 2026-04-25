"use client";

import { FiPlus } from "react-icons/fi";
import { AiOutlineMinus } from "react-icons/ai";
import { useCallback, useState } from "react";

const FaqItem = ({ data }: { data: any }) => {
  const [Open, setOpen] = useState(false);

  const handleOpen = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  return (
    <div className="w-full flex flex-col border-custom2 rounded-md border gap-y-5 py-2 px-4">
      <div className="flex flex-row items-center justify-between w-full">
        <span className="text-secondary-foreground text-sm block">
          {data.title}
        </span>
        <div className="flex items-center cursor-pointer" onClick={handleOpen}>
          {Open ? (
            <AiOutlineMinus size={19} className="text-primary" />
          ) : (
            <FiPlus size={19} className="text-primary" />
          )}
        </div>
      </div>
      {Open ? (
        <p className="text-sm text-muted-foreground">{data.description}</p>
      ) : null}
    </div>
  );
};

export default FaqItem;

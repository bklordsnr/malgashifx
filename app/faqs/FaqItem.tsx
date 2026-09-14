"use client";

import { useCallback, useState } from "react";
import { AiOutlineMinus } from "react-icons/ai";
import { FiPlus } from "react-icons/fi";

interface FaqItemProps {
  data: {
    title: string;
    description: string;
  };
}

const FaqItem = ({ data }: FaqItemProps) => {
  const [open, setOpen] = useState(false);

  const handleOpen = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  return (
    <div className="flex w-full flex-col gap-y-5 rounded-md border-custom2 border px-4 py-2">
      <button
        type="button"
        onClick={handleOpen}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 text-left"
      >
        <span className="block text-sm text-secondary-foreground">
          {data.title}
        </span>

        {open ? (
          <AiOutlineMinus size={19} className="shrink-0 text-primary" />
        ) : (
          <FiPlus size={19} className="shrink-0 text-primary" />
        )}
      </button>

      {open && (
        <p className="text-sm leading-6 text-muted-foreground">
          {data.description}
        </p>
      )}
    </div>
  );
};

export default FaqItem;
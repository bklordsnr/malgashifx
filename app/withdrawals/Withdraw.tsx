"use client";

import { useEffect, useState } from "react";
import Input from "../../components/inputs/Input";
import { FieldValues, useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SafeUser } from "@/types";

interface AccountProps {
  currentUser: SafeUser | null;
}

const Withdraw: React.FC<AccountProps> = ({ currentUser }) => {
  const [value, SetValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [state, setState] = useState("null");

  const options = [
    { label: "EVC", value: 1 },
    { label: "TELESOM", value: 2 },
  ];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      amount: "",
      account: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    if (currentUser?.withdrawal == "null") {
      setIsLoading(false);
      toast.error("withdrawal unsuccessful please invest first");
    }

    if (currentUser?.withdrawal == "premature") {
      setIsLoading(false);
      toast.error("withdrawal unsuccessful wait for account maturity");
    }

    if (currentUser?.withdrawal == "license") {
      setIsLoading(false);
      toast.error("withdrawal unsuccessful clear license fee");
    }

    if (currentUser?.withdrawal == "withdrawal") {
      setIsLoading(false);
      toast.error("withdrawal unsuccessful clear withdrawal fee");
    }

    if (currentUser?.withdrawal == "proceed") {
      setIsLoading(false);
      toast.success("withdrawal successful");
    }
  };

  return (
    <>
      <h1 className="text-foreground font-semibold text-2xl">
        Withdraw Profits
      </h1>

      <div className="pt-8">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 justify-between gap-5">
          <div className="w-full">
            <Select>
              <SelectTrigger className="py-6 text-muted-foreground">
                <SelectValue placeholder="Select Payment Gateway" />
              </SelectTrigger>

              <SelectContent>
                {options.map((option) => (
                  <SelectItem key={option.label} value={option.label}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="w-full">
            <Input
              id="amount"
              label="Enter Amount (USD)"
              disabled={isLoading}
              register={register}
              errors={errors}
              required
              type="number"
            />
          </div>

          <div className="w-full ">
            <Input
              id="account"
              label="Enter Number"
              disabled={isLoading}
              register={register}
              errors={errors}
              required
              type="number"
            />
          </div>

          <div className="w-full">
            <Button
              className="w-full py-[25px]"
              onClick={handleSubmit(onSubmit)}
            >
              {isLoading ? "please wait..." : "withdraw"}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Withdraw;

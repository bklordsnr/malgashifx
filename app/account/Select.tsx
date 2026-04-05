"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import toast from "react-hot-toast";
import { useCart } from "@/hook/useCart";
import { useEffect, useState } from "react";

const FormSchema = z.object({
  email: z.string({
    required_error: "Please select a plan to continue.",
  }),
});

export function SelectForm() {
  const { handleSetRequest, requestItem } = useCart();
  const [isRequestInStorage, SetIsRequestInStorage] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    handleSetRequest(data.email);
    toast.success("Your request has been sent to the administrator 🏌️");
  }

  useEffect(() => {
    SetIsRequestInStorage(false);

    if (requestItem?.length !== undefined) {
      console.log('true')
      SetIsRequestInStorage(true)
    }
  }, [requestItem]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex items-center flex-col sm:flex-row justify-between gap-5 w-full"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }: any) => (
            <FormItem className="w-full">
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an investment plan" />
                  </SelectTrigger>
                </FormControl>

                <SelectContent>
                  <SelectItem value="3650">
                    Invest $105 profit $474
                  </SelectItem>
                  <SelectItem value="5600">
                    Invest $210 profit $1,021
                  </SelectItem>
                  <SelectItem value="9300">
                    Invest $421 profit $1,578
                  </SelectItem>
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isRequestInStorage}>
          Invest
        </Button>
      </form>
    </Form>
  );
}

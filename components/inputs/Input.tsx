"use client";

import { UseFormRegister, FieldValues, FieldPath } from "react-hook-form";

interface InputProps<T extends FieldValues> {
  id: FieldPath<T>;
  label: string;
  type?: string;
  disabled?: boolean;
  required?: boolean;
  register: UseFormRegister<T>;
  errors: any;
}

const Input = <T extends FieldValues>({
  id,
  label,
  type,
  disabled,
  register,
  required,
  errors,
}: InputProps<T>) => {
  return (
    <div className="w-full relative">
      <input
        autoComplete="off"
        id={String(id)}
        disabled={disabled}
        type={type}
        placeholder=""
        {...register(id, { required })}
        className={`
          peer
          w-full
          pt-6
          px-4 
          py-2
          text-sm
          text-muted-foreground
          font-light
          bg-background
          focus:text-muted-foreground
          rounded-md
          transition
          disabled:opacity-70
          disabled:cursor-not-allowed
          ${
            errors?.[id]
              ? "border border-destructive focus:border-destructive"
              : "border border-border focus:border-border"
          }
        `}
      />

      <label
        htmlFor={String(id)}
        className={`
          absolute
          cursor-text
          text-sm
          duration-150
          transform
          -translate-y-4
          top-4
          z-10
          origin-[0]
          left-4
          peer-placeholder-shown:scale-100
          peer-placeholder-shown:translate-y-0
          peer-focus:scale-75
          peer-focus:-translate-y-4
          ${errors?.[id] ? "text-red-400" : "text-muted-foreground"}
        `}
      >
        {label}
      </label>
    </div>
  );
};

export default Input;
"use client";

import {
  type FieldErrors,
  type FieldPath,
  type FieldValues,
  type UseFormRegister,
} from "react-hook-form";

interface InputProps<T extends FieldValues> {
  id: FieldPath<T>;
  label: string;
  type?: string;
  disabled?: boolean;
  required?: boolean;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
}

const Input = <T extends FieldValues>({
  id,
  label,
  type = "text",
  disabled = false,
  required = false,
  register,
  errors,
}: InputProps<T>) => {
  const hasError = Boolean(errors[id]);

  return (
    <div className="relative w-full">
      <input
        {...register(id, { required })}
        id={String(id)}
        type={type}
        autoComplete="off"
        disabled={disabled}
        placeholder=""
        className={`peer w-full rounded-md border bg-background px-4 py-2 pt-6 text-sm font-light text-muted-foreground transition focus:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-70 ${
          hasError
            ? "border-destructive focus:border-destructive"
            : "border-border focus:border-border"
        }`}
      />

      <label
        htmlFor={String(id)}
        className={`absolute left-4 top-4 z-10 origin-[0] -translate-y-4 transform cursor-text text-sm duration-150 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 ${
          hasError ? "text-destructive" : "text-muted-foreground"
        }`}
      >
        {label}
      </label>
    </div>
  );
};

export default Input;
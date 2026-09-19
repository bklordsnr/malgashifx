"use client";

import { useState } from "react";
import {
  type FieldErrors,
  type FieldPath,
  type FieldValues,
  type UseFormRegister,
} from "react-hook-form";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

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
  const [showPassword, setShowPassword] = useState(false);

  const hasError = Boolean(errors[id]);
  const isPassword = type === "password";
  const inputType = isPassword && showPassword ? "text" : type;

  return (
    <div className="relative w-full">
      <input
        {...register(id, { required })}
        id={String(id)}
        type={inputType}
        autoComplete="off"
        disabled={disabled}
        placeholder=""
        className={`peer w-full rounded-md border bg-background px-4 py-2 pt-6 text-sm font-light text-muted-foreground transition focus:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-70 ${
          isPassword ? "pr-11" : ""
        } ${
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

      {isPassword && (
        <button
          type="button"
          onClick={() => setShowPassword((current) => !current)}
          disabled={disabled}
          aria-label={showPassword ? "Hide password" : "Show password"}
          className="absolute right-3 top-1/2 z-20 -translate-y-1/2 text-muted-foreground transition hover:text-foreground disabled:cursor-not-allowed disabled:opacity-50"
        >
          {showPassword ? (
            <IoEyeOffOutline size={19} />
          ) : (
            <IoEyeOutline size={19} />
          )}
        </button>
      )}
    </div>
  );
};

export default Input;
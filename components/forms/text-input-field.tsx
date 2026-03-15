import type { FieldError, UseFormRegisterReturn } from "react-hook-form";

import { cn } from "@/lib/utils";

import { FieldShell } from "./field-shell";

interface TextInputFieldProps {
  id: string;
  label: string;
  helperText?: string;
  type?: "text" | "number";
  register: UseFormRegisterReturn;
  error?: FieldError;
  placeholder?: string;
}

export function TextInputField({ id, label, helperText, type = "text", register, error, placeholder }: TextInputFieldProps) {
  return (
    <FieldShell id={id} label={label} helperText={helperText} error={error?.message}>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className={cn(
          "w-full rounded-md border bg-white px-3 py-2 text-sm outline-none ring-offset-background transition",
          "focus-visible:ring-2 focus-visible:ring-ring",
          error ? "border-red-500" : "border-input",
        )}
        {...register}
      />
    </FieldShell>
  );
}

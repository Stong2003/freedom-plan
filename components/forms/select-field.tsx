import type { FieldError, UseFormRegisterReturn } from "react-hook-form";

import { cn } from "@/lib/utils";

import { FieldShell } from "./field-shell";

interface SelectFieldProps {
  id: string;
  label: string;
  register: UseFormRegisterReturn;
  options: Array<{ label: string; value: string }>;
  error?: FieldError;
  helperText?: string;
}

export function SelectField({ id, label, register, options, error, helperText }: SelectFieldProps) {
  return (
    <FieldShell id={id} label={label} helperText={helperText} error={error?.message}>
      <select
        id={id}
        className={cn(
          "w-full rounded-md border bg-white px-3 py-2 text-sm outline-none ring-offset-background transition",
          "focus-visible:ring-2 focus-visible:ring-ring",
          error ? "border-red-500" : "border-input",
        )}
        {...register}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </FieldShell>
  );
}

import type { UseFormRegisterReturn } from "react-hook-form";

interface CheckboxFieldProps {
  id: string;
  label: string;
  helperText?: string;
  register: UseFormRegisterReturn;
}

export function CheckboxField({ id, label, helperText, register }: CheckboxFieldProps) {
  return (
    <label htmlFor={id} className="flex items-start gap-3 rounded-md border bg-white p-3">
      <input id={id} type="checkbox" className="mt-0.5 h-4 w-4 rounded border-input" {...register} />
      <span>
        <span className="block text-sm font-medium">{label}</span>
        {helperText ? <span className="block text-xs text-muted-foreground">{helperText}</span> : null}
      </span>
    </label>
  );
}

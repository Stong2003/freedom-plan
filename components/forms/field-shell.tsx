import type { ReactNode } from "react";

interface FieldShellProps {
  id: string;
  label: string;
  helperText?: string;
  error?: string;
  children: ReactNode;
}

export function FieldShell({ id, label, helperText, error, children }: FieldShellProps) {
  return (
    <label htmlFor={id} className="block space-y-2">
      <div className="flex items-center justify-between gap-4">
        <span className="text-sm font-medium text-foreground">{label}</span>
        {helperText ? <span className="text-xs text-muted-foreground">{helperText}</span> : null}
      </div>
      {children}
      {error ? <p className="text-xs text-red-600">{error}</p> : null}
    </label>
  );
}

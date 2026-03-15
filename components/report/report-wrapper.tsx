import type { ReactNode } from "react";

export function ReportWrapper({ children }: { children: ReactNode }) {
  return <div className="report-print-root mx-auto w-full max-w-5xl space-y-8 print:max-w-none print:space-y-5">{children}</div>;
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Report",
  description: "View a client-ready FIRE report and export using Print / Save as PDF.",
};

export default function ReportLayout({ children }: { children: React.ReactNode }) {
  return children;
}

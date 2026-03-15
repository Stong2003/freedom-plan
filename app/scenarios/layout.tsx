import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Scenario Comparison",
  description: "Compare deterministic planning scenarios to see how changes in savings, spending, and returns affect FIRE timing.",
};

export default function ScenariosLayout({ children }: { children: React.ReactNode }) {
  return children;
}

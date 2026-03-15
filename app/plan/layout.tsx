import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Plan",
  description: "Build your FIRE Plan step by step with saved local progress and guided assumptions.",
};

export default function PlanLayout({ children }: { children: React.ReactNode }) {
  return children;
}

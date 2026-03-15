import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Results",
  description: "Review deterministic FIRE projection outputs and understand the assumptions driving your timeline.",
};

export default function ResultsLayout({ children }: { children: React.ReactNode }) {
  return children;
}

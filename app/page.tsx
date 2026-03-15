import type { Metadata } from "next";
import Link from "next/link";

import { StepCard } from "@/components/cards/step-card";
import { FireTypesSection } from "@/components/sections/fire-types-section";
import { HeroSection } from "@/components/sections/hero-section";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Start your FIRE Plan with FirePath, then review deterministic results, compare scenarios, and generate a printable report.",
};

const steps = [
  { step: 1, title: "Build your FIRE Plan", details: "Capture income, expenses, assets, liabilities, and retirement assumptions." },
  { step: 2, title: "Review Results", details: "Generate deterministic timeline projections across Coast, Lean, Regular, and Fat FIRE." },
  { step: 3, title: "Compare & Share", details: "Stress test built-in scenarios, then export a polished report via Print / Save as PDF." },
];

export default function HomePage() {
  return (
    <div className="space-y-10">
      <HeroSection />
      <section className="rounded-xl border bg-white p-5 sm:p-6">
        <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">Start quickly</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          New here? Build your plan now, or explore a sample-output demo flow before entering your own inputs.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Link href="/plan" className={cn(buttonVariants())}>Start Plan</Link>
          <Link href="/results" className={cn(buttonVariants({ variant: "outline" }))}>Preview Results</Link>
        </div>
      </section>
      <section>
        <h2 className="mb-4 text-2xl font-semibold tracking-tight">FIRE modes at a glance</h2>
        <FireTypesSection />
      </section>
      <section>
        <h2 className="mb-4 text-2xl font-semibold tracking-tight">How FirePath works</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {steps.map((item) => (
            <StepCard key={item.step} {...item} />
          ))}
        </div>
      </section>
      <section className="rounded-xl border bg-secondary/20 p-5 sm:p-6">
        <h2 className="text-xl font-semibold tracking-tight">MVP status</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Working now: deterministic FIRE projections, scenario comparison, and report export through Print / Save as PDF.
          Coming later: advanced tax-aware modeling, Monte Carlo simulation, and integrated share workflows.
        </p>
      </section>
    </div>
  );
}

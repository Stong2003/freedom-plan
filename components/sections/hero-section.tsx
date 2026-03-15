import Link from "next/link";

import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="rounded-2xl border bg-gradient-to-br from-white to-secondary/70 p-8 md:p-12">
      <p className="mb-4 text-sm uppercase tracking-[0.2em] text-primary">FIRE Retirement Planning</p>
      <h1 className="max-w-3xl text-4xl font-semibold tracking-tight md:text-5xl">
        Plan your path to financial independence with clarity and confidence.
      </h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">
        Model your savings trajectory, compare FIRE milestones, and prepare actionable scenarios in a premium,
        data-first workflow.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/plan">
          <Button size="lg">Start Plan</Button>
        </Link>
        <Link href="/results">
          <Button variant="outline" size="lg">
            Preview Results
          </Button>
        </Link>
      </div>
    </section>
  );
}

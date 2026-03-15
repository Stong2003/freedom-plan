"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { RecommendationCard } from "@/components/cards/recommendation-card";
import { BaseCaseCard } from "@/components/scenarios/base-case-card";
import { ComparisonTable } from "@/components/scenarios/comparison-table";
import { ScenarioCard } from "@/components/scenarios/scenario-card";
import { ScenarioChart } from "@/components/scenarios/scenario-chart";
import { Button, buttonVariants } from "@/components/ui/button";
import { EmptyStateCard } from "@/components/ui/empty-state-card";
import { PageIntro } from "@/components/ui/page-intro";
import { PageLoadingSkeleton } from "@/components/ui/page-loading-skeleton";
import { mockPlanDraft } from "@/data/mock-data";
import { compareScenarios } from "@/lib/fire/scenarios";
import { cn } from "@/lib/utils";
import { usePlannerStore } from "@/store/planner-store";

function isBasePlanUsable(age?: number): boolean {
  return Number.isFinite(age) && (age ?? 0) >= 18;
}

export default function ScenariosPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [feedback, setFeedback] = useState("");
  const {
    planDraft,
    scenarios,
    updateScenario,
    resetScenario,
    removeScenario,
    restoreDefaultScenarios,
  } = usePlannerStore((state) => ({
    planDraft: state.planDraft,
    scenarios: state.scenarios,
    updateScenario: state.updateScenario,
    resetScenario: state.resetScenario,
    removeScenario: state.removeScenario,
    restoreDefaultScenarios: state.restoreDefaultScenarios,
  }));

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 250);
    return () => clearTimeout(timer);
  }, []);

  const hasPlan = isBasePlanUsable(planDraft.age);
  const basePlan = hasPlan ? planDraft : mockPlanDraft;
  const { baseResults, comparisons } = useMemo(() => compareScenarios(basePlan, scenarios), [basePlan, scenarios]);

  const chartData = comparisons.map((item) => ({
    name: item.scenario.name,
    yearsToRegular: item.scenarioResults.yearsToEachFireType.regular ?? 80,
  }));

  return (
    <div className="space-y-6">
      <PageIntro
        badge="FIRE Plan"
        title="Scenario Comparison"
        description="Use deterministic scenario comparisons to stress test your plan assumptions. This is a planning tool, not a market forecast."
        actions={
          <>
            <Link href="/results" className={cn(buttonVariants({ variant: "outline" }))}>
              Return to Results
            </Link>
            <Link href="/report" className={cn(buttonVariants({ variant: "default" }))}>
              View Report
            </Link>
          </>
        }
      />

      {!hasPlan ? (
        <EmptyStateCard
          title="Scenario comparison needs a FIRE Plan"
          description="Your plan appears incomplete, so scenario comparisons are currently based on sample data."
          actions={[
            { label: "Edit Plan", href: "/plan" },
            { label: "View Results", href: "/results", variant: "outline" },
          ]}
        />
      ) : null}

      <RecommendationCard
        title="How to read scenarios"
        description="Each scenario applies deterministic adjustments to savings, spending, returns, or retirement age. Deltas show how much earlier or later milestones move versus your base plan."
      />

      {isLoading ? <PageLoadingSkeleton /> : null}

      <BaseCaseCard results={baseResults} />

      <section className="rounded-lg border bg-white p-4">
        <p className="mb-3 text-sm text-muted-foreground">
          Built-in scenarios: income acceleration (higher savings), market headwind (lower returns), and lifestyle inflation
          (higher retirement spending).
        </p>
        <div className="flex flex-wrap gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              restoreDefaultScenarios();
              setFeedback("Default scenarios restored.");
            }}
          >
            Restore built-in scenarios
          </Button>
          {feedback ? <p className="self-center text-sm text-muted-foreground">{feedback}</p> : null}
        </div>
      </section>

      {comparisons.length > 0 ? (
        <section className="grid gap-4">
          {comparisons.map((comparison) => (
            <ScenarioCard
              key={comparison.scenario.id}
              comparison={comparison}
              onUpdate={updateScenario}
              onReset={(id) => {
                resetScenario(id);
                setFeedback("Scenario reset to defaults.");
              }}
              onRemove={(id) => {
                removeScenario(id);
                setFeedback("Scenario removed.");
              }}
            />
          ))}
        </section>
      ) : (
        <EmptyStateCard
          title="No scenarios available"
          description="There are no scenarios to compare right now. Restore built-in scenarios to continue."
          actions={[{ label: "Restore built-in scenarios", onClick: restoreDefaultScenarios }]}
        />
      )}

      {comparisons.length > 0 ? <ScenarioChart data={chartData} /> : null}
      {comparisons.length > 0 ? <ComparisonTable items={comparisons} /> : null}

      <RecommendationCard
        title="Scenario interpretation"
        description="If a delta says “2 years earlier,” that scenario reaches the milestone two years sooner than your base case. “Later” means additional working years under those assumptions."
      />
    </div>
  );
}

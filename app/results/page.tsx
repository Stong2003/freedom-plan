"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { MetricCard } from "@/components/cards/metric-card";
import { RecommendationCard } from "@/components/cards/recommendation-card";
import { SectionCard } from "@/components/cards/section-card";
import { ChartContainer } from "@/components/charts/chart-container";
import { RecommendationDebug } from "@/components/recommendations/recommendation-debug";
import { RecommendationSummary } from "@/components/recommendations/recommendation-summary";
import { buttonVariants } from "@/components/ui/button";
import { EmptyStateCard } from "@/components/ui/empty-state-card";
import { PageIntro } from "@/components/ui/page-intro";
import { PageLoadingSkeleton } from "@/components/ui/page-loading-skeleton";
import { mockPlanDraft, mockResults, mockScenarios } from "@/data/mock-data";
import { calculateFireResults } from "@/lib/fire/calculate-fire";
import {
  formatCurrency,
  formatMilestoneAge,
  formatMilestoneStatus,
  formatPercent,
  formatYearsRemaining,
  getFastestMilestone,
} from "@/lib/fire/formatters";
import { generateRecommendationArtifacts } from "@/lib/recommendations";
import { cn } from "@/lib/utils";
import { usePlannerStore } from "@/store/planner-store";

function isPlanUsable(age?: number, expenses?: number) {
  return Number.isFinite(age) && (age ?? 0) >= 18 && Number.isFinite(expenses) && (expenses ?? 0) >= 0;
}

const fireTypeGuide = [
  "Coast FIRE: your invested assets can likely compound to your target while new contributions slow down.",
  "Lean FIRE: early retirement with a lower spending target and tighter budget.",
  "Regular FIRE: balanced retirement target aligned to your planned lifestyle.",
  "Fat FIRE: higher-spend retirement target with additional comfort margin.",
];

export default function ResultsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const planDraft = usePlannerStore((state) => state.planDraft);
  const scenarios = usePlannerStore((state) => state.scenarios);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 250);
    return () => clearTimeout(timer);
  }, []);

  const hasUsablePlan = isPlanUsable(planDraft.age, planDraft.expectedRetirementExpenses);
  const usingFallback = !hasUsablePlan;

  const results = useMemo(() => {
    try {
      if (hasUsablePlan) {
        return calculateFireResults(planDraft);
      }
      if (isPlanUsable(mockPlanDraft.age, mockPlanDraft.expectedRetirementExpenses)) {
        return calculateFireResults(mockPlanDraft);
      }
      return mockResults;
    } catch {
      return mockResults;
    }
  }, [hasUsablePlan, planDraft]);

  const artifacts = useMemo(
    () =>
      generateRecommendationArtifacts({
        planDraft: hasUsablePlan ? planDraft : mockPlanDraft,
        results,
        scenarios: scenarios.length > 0 ? scenarios : mockScenarios,
      }),
    [hasUsablePlan, planDraft, results, scenarios],
  );

  const fastest = getFastestMilestone(results.milestones);

  return (
    <div className="space-y-6">
      <PageIntro
        badge="FIRE Plan"
        title="Results"
        description="Review your deterministic FIRE timeline, key assumptions, and strategy guidance from your current plan."
        actions={
          <>
            <Link href="/plan" className={cn(buttonVariants({ variant: "outline" }))}>
              Edit Plan
            </Link>
            <Link href="/scenarios" className={cn(buttonVariants({ variant: "secondary" }))}>
              Compare Scenarios
            </Link>
            <Link href="/report" className={cn(buttonVariants({ variant: "default" }))}>
              View Report
            </Link>
          </>
        }
      />

      {!hasUsablePlan ? (
        <EmptyStateCard
          title="No FIRE Plan found"
          description="Complete your FIRE Plan to generate personalized Results."
          actions={[
            { label: "Start Plan", href: "/plan" },
            { label: "Back to Home", href: "/", variant: "outline" },
          ]}
        />
      ) : null}

      {usingFallback ? (
        <p className="rounded-lg border border-primary/20 bg-primary/5 px-4 py-3 text-sm text-muted-foreground">
          You are viewing sample results because your FIRE Plan is incomplete. Complete your plan for personalized projections.
        </p>
      ) : null}

      {isLoading ? <PageLoadingSkeleton /> : null}

      <section className="grid gap-4 md:grid-cols-3" aria-live="polite">
        <MetricCard label="Current net worth" value={formatCurrency(results.currentNetWorth)} helper="All assets minus debts" />
        <MetricCard
          label="Current invested assets"
          value={formatCurrency(results.currentInvestedAssets)}
          helper="Taxable + retirement + invested cash portion"
        />
        <MetricCard
          label="Fastest projected path"
          value={fastest ? `${fastest.fireType.toUpperCase()} ${formatMilestoneAge(fastest.age)}` : "No milestone by age 80"}
          helper={results.milestoneSummary.note}
        />
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {results.milestones.map((milestone) => (
          <MetricCard
            key={milestone.fireType}
            label={`${milestone.fireType.toUpperCase()} FIRE`}
            value={formatMilestoneAge(milestone.age)}
            helper={`${formatYearsRemaining(milestone.yearsTo)} · ${formatMilestoneStatus(milestone.status)}`}
          />
        ))}
      </section>

      <ChartContainer title="Projected Net Worth Timeline" data={results.projectedNetWorthTimeline} />

      <section className="grid gap-4 lg:grid-cols-2">
        <SectionCard title="FIRE type guide" description="Quick definitions to interpret each milestone.">
          <ul className="space-y-2 text-sm text-muted-foreground">
            {fireTypeGuide.map((item) => (
              <li key={item} className="rounded-md border bg-secondary/40 px-3 py-2">
                {item}
              </li>
            ))}
          </ul>
        </SectionCard>

        <SectionCard title="Timeline explainers" description="What moves your timeline and how to read milestone outcomes.">
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="rounded-md border bg-secondary/40 px-3 py-2">
              Savings rate and retirement spending target have the biggest impact on your projected FIRE age.
            </li>
            <li className="rounded-md border bg-secondary/40 px-3 py-2">
              Real return assumptions matter over time: small percentage changes can shift the timeline by years.
            </li>
            <li className="rounded-md border bg-secondary/40 px-3 py-2">
              “Not reached by 80” means this model does not reach that target by age 80 with current assumptions.
            </li>
          </ul>
        </SectionCard>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <SectionCard title="FIRE targets" description="Annual spending assumptions and implied target amounts.">
          <dl className="space-y-2 text-sm">
            {results.milestones.map((milestone) => (
              <div key={milestone.fireType} className="flex items-center justify-between rounded-md border bg-secondary/40 px-3 py-2">
                <dt className="font-medium uppercase">{milestone.fireType}</dt>
                <dd className="text-right text-muted-foreground">
                  Spend {formatCurrency(milestone.targetSpending)} / FIRE # {formatCurrency(milestone.targetAmount)}
                </dd>
              </div>
            ))}
          </dl>
        </SectionCard>

        <SectionCard title="Assumptions" description="Inputs used for this deterministic FIRE projection.">
          <dl className="space-y-2 text-sm">
            <div className="flex items-center justify-between rounded-md border bg-secondary/40 px-3 py-2">
              <dt>Expected annual return</dt>
              <dd>{formatPercent(results.assumptionsSummary.expectedAnnualReturn)}</dd>
            </div>
            <div className="flex items-center justify-between rounded-md border bg-secondary/40 px-3 py-2">
              <dt>Expected inflation</dt>
              <dd>{formatPercent(results.assumptionsSummary.expectedInflationRate)}</dd>
            </div>
            <div className="flex items-center justify-between rounded-md border bg-secondary/40 px-3 py-2">
              <dt>Real return (derived)</dt>
              <dd>{formatPercent(results.assumptionsSummary.realReturnRate)}</dd>
            </div>
            <div className="flex items-center justify-between rounded-md border bg-secondary/40 px-3 py-2">
              <dt>Safe withdrawal rate</dt>
              <dd>{formatPercent(results.assumptionsSummary.safeWithdrawalRate)}</dd>
            </div>
            <div className="flex items-center justify-between rounded-md border bg-secondary/40 px-3 py-2">
              <dt>Annual savings</dt>
              <dd>{formatCurrency(results.assumptionsSummary.annualSavings)}</dd>
            </div>
          </dl>
        </SectionCard>
      </section>

      <RecommendationSummary recommendations={artifacts.recommendations} />
      <RecommendationDebug payload={artifacts.payload} prompt={artifacts.prompt} />

      <RecommendationCard title="Planning note" description={results.disclaimer} />
    </div>
  );
}

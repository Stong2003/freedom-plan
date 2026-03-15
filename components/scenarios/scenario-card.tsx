"use client";

import type { ChangeEvent } from "react";

import { MetricCard } from "@/components/cards/metric-card";
import { SectionCard } from "@/components/cards/section-card";
import { Button } from "@/components/ui/button";
import { formatAgeDelta, formatMilestoneAge } from "@/lib/fire/formatters";
import type { ScenarioComparisonResult } from "@/lib/fire/scenarios";
import type { ScenarioDefinition } from "@/types/fire";

interface ScenarioCardProps {
  comparison: ScenarioComparisonResult;
  onUpdate: (id: string, values: Partial<ScenarioDefinition["adjustments"]>) => void;
  onReset: (id: string) => void;
  onRemove: (id: string) => void;
}

function readNumber(event: ChangeEvent<HTMLInputElement>): number {
  const parsed = Number(event.target.value);
  return Number.isFinite(parsed) ? parsed : 0;
}

export function ScenarioCard({ comparison, onUpdate, onReset, onRemove }: ScenarioCardProps) {
  const { scenario, scenarioResults, deltas } = comparison;

  return (
    <SectionCard title={scenario.name} description={scenario.description}>
      <div className="space-y-4">
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="text-sm">
            <span className="mb-1 block text-muted-foreground">Annual savings adjustment</span>
            <input
              type="number"
              className="w-full rounded-md border bg-white px-3 py-2 text-sm"
              value={scenario.adjustments.expectedAnnualSavings ?? 0}
              aria-label="Annual savings adjustment"
              onChange={(event) => onUpdate(scenario.id, { expectedAnnualSavings: readNumber(event) })}
            />
          </label>
          <label className="text-sm">
            <span className="mb-1 block text-muted-foreground">Retirement expense adjustment</span>
            <input
              type="number"
              className="w-full rounded-md border bg-white px-3 py-2 text-sm"
              value={scenario.adjustments.expectedRetirementExpenses ?? 0}
              aria-label="Retirement expense adjustment"
              onChange={(event) => onUpdate(scenario.id, { expectedRetirementExpenses: readNumber(event) })}
            />
          </label>
          <label className="text-sm">
            <span className="mb-1 block text-muted-foreground">Annual return adjustment (%)</span>
            <input
              type="number"
              className="w-full rounded-md border bg-white px-3 py-2 text-sm"
              value={scenario.adjustments.expectedAnnualReturn ?? 0}
              aria-label="Annual return adjustment"
              onChange={(event) => onUpdate(scenario.id, { expectedAnnualReturn: readNumber(event) })}
            />
          </label>
          <label className="text-sm">
            <span className="mb-1 block text-muted-foreground">Retirement age adjustment</span>
            <input
              type="number"
              className="w-full rounded-md border bg-white px-3 py-2 text-sm"
              value={scenario.adjustments.targetRetirementAge ?? 0}
              aria-label="Retirement age adjustment"
              onChange={(event) => onUpdate(scenario.id, { targetRetirementAge: readNumber(event) })}
            />
          </label>
        </div>

        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          <MetricCard
            label="Coast FIRE"
            value={formatMilestoneAge(scenarioResults.fireAges.coast)}
            helper={formatAgeDelta(deltas.coastFireAgeDelta)}
          />
          <MetricCard
            label="Lean FIRE"
            value={formatMilestoneAge(scenarioResults.fireAges.lean)}
            helper={formatAgeDelta(deltas.leanFireAgeDelta)}
          />
          <MetricCard
            label="Regular FIRE"
            value={formatMilestoneAge(scenarioResults.fireAges.regular)}
            helper={formatAgeDelta(deltas.regularFireAgeDelta)}
          />
          <MetricCard
            label="Fat FIRE"
            value={formatMilestoneAge(scenarioResults.fireAges.fat)}
            helper={formatAgeDelta(deltas.fatFireAgeDelta)}
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <Button type="button" variant="outline" onClick={() => onReset(scenario.id)}>
            Reset scenario
          </Button>
          <Button type="button" variant="secondary" onClick={() => onRemove(scenario.id)}>
            Remove
          </Button>
        </div>
      </div>
    </SectionCard>
  );
}

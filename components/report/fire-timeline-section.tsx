import { MetricCard } from "@/components/cards/metric-card";
import { SectionCard } from "@/components/cards/section-card";
import { ChartContainer } from "@/components/charts/chart-container";
import { formatMilestoneAge, formatMilestoneStatus, formatYearsRemaining } from "@/lib/fire/formatters";
import type { FireResults } from "@/types/fire";

export function FireTimelineSection({ results }: { results: FireResults }) {
  return (
    <SectionCard className="report-section" title="FIRE Timeline & Milestones" description="Coast, Lean, Regular, and Fat FIRE outcomes under current assumptions.">
      <div className="space-y-4">
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {results.milestones.map((milestone) => (
            <MetricCard
              key={milestone.fireType}
              label={`${milestone.fireType.toUpperCase()} FIRE`}
              value={formatMilestoneAge(milestone.age)}
              helper={`${formatYearsRemaining(milestone.yearsTo)} · ${formatMilestoneStatus(milestone.status)}`}
            />
          ))}
        </div>
        <ChartContainer title="Projected Net Worth Timeline" data={results.projectedNetWorthTimeline} />
      </div>
    </SectionCard>
  );
}

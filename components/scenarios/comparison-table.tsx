import { SectionCard } from "@/components/cards/section-card";
import { formatAgeDelta, formatMilestoneAge, formatYearsRemaining } from "@/lib/fire/formatters";
import type { ScenarioComparisonResult } from "@/lib/fire/scenarios";

interface ComparisonTableProps {
  items: ScenarioComparisonResult[];
}

export function ComparisonTable({ items }: ComparisonTableProps) {
  return (
    <SectionCard title="Scenario comparison table" description="Side-by-side view of regular FIRE outcomes and timeline deltas.">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead>
            <tr className="border-b text-muted-foreground">
              <th className="py-2 pr-4">Scenario</th>
              <th className="py-2 pr-4">Regular FIRE age</th>
              <th className="py-2 pr-4">Change vs base plan</th>
              <th className="py-2 pr-4">Years to regular FIRE</th>
              <th className="py-2 pr-4">Regular status</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => {
              const regular = item.scenarioResults.milestones.find((m) => m.fireType === "regular");
              return (
                <tr key={item.scenario.id} className="border-b">
                  <td className="py-2 pr-4 font-medium">{item.scenario.name}</td>
                  <td className="py-2 pr-4">{formatMilestoneAge(item.scenarioResults.fireAges.regular)}</td>
                  <td className="py-2 pr-4">{formatAgeDelta(item.deltas.regularFireAgeDelta)}</td>
                  <td className="py-2 pr-4">{formatYearsRemaining(item.scenarioResults.yearsToEachFireType.regular)}</td>
                  <td className="py-2 pr-4">{regular?.status ?? "N/A"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </SectionCard>
  );
}

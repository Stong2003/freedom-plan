import { SectionCard } from "@/components/cards/section-card";
import { formatAgeDelta } from "@/lib/fire/formatters";
import type { ScenarioHighlightsData } from "@/lib/report/types";

export function ScenarioHighlightsSection({ data }: { data: ScenarioHighlightsData }) {
  return (
    <SectionCard className="report-section" title="Scenario Comparison Highlights" description="Report-focused summary of scenario leverage and downside sensitivity.">
      <div className="space-y-4">
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4 text-sm">
          <div className="rounded-md border bg-secondary/30 p-3">
            <p className="text-muted-foreground">Best improving scenario</p>
            <p className="font-medium">{data.bestImproverScenario ?? "None identified"}</p>
          </div>
          <div className="rounded-md border bg-secondary/30 p-3">
            <p className="text-muted-foreground">Biggest delaying scenario</p>
            <p className="font-medium">{data.biggestDelayScenario ?? "None identified"}</p>
          </div>
          <div className="rounded-md border bg-secondary/30 p-3">
            <p className="text-muted-foreground">Biggest lever</p>
            <p className="font-medium">{data.biggestLever}</p>
          </div>
          <div className="rounded-md border bg-secondary/30 p-3">
            <p className="text-muted-foreground">Coast/Semi-retire viability</p>
            <p className="font-medium">{data.coastSemiRetireViable ? "Potentially viable" : "Needs caution"}</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="border-b text-muted-foreground">
                <th className="py-2 pr-4">Scenario</th>
                <th className="py-2 pr-4">Regular FIRE delta</th>
                <th className="py-2 pr-4">Years-to-regular delta</th>
              </tr>
            </thead>
            <tbody>
              {data.topDeltas.map((delta) => (
                <tr key={delta.scenarioId} className="border-b">
                  <td className="py-2 pr-4 font-medium">{delta.scenarioName}</td>
                  <td className="py-2 pr-4">{formatAgeDelta(delta.regularFireAgeDelta)}</td>
                  <td className="py-2 pr-4">{formatAgeDelta(delta.yearsToRegularDelta)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </SectionCard>
  );
}

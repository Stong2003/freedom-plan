import { SectionCard } from "@/components/cards/section-card";
import type { ExecutiveSummaryData } from "@/lib/report/types";

export function ExecutiveSummary({ data }: { data: ExecutiveSummaryData }) {
  return (
    <SectionCard className="report-section" title="Executive Summary" description="Advisor-style snapshot of current trajectory.">
      <div className="space-y-3 text-sm">
        <p><span className="font-medium">Current position:</span> {data.currentPosition}</p>
        <p><span className="font-medium">Most realistic path:</span> {data.realisticPath}</p>
        <p><span className="font-medium">Biggest opportunity:</span> {data.biggestOpportunity}</p>
        <p><span className="font-medium">Biggest risk:</span> {data.biggestRisk}</p>
      </div>
    </SectionCard>
  );
}

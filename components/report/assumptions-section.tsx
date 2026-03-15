import { SectionCard } from "@/components/cards/section-card";
import { formatPercent } from "@/lib/fire/formatters";
import type { PlanningAssumptionsData } from "@/lib/report/types";

export function AssumptionsSection({ data }: { data: PlanningAssumptionsData }) {
  return (
    <SectionCard className="report-section" title="Planning Assumptions" description="These assumptions drive the deterministic projection and are not guarantees.">
      <div className="space-y-4 text-sm">
        <dl className="grid gap-2 md:grid-cols-2">
          <div className="rounded-md border bg-secondary/30 px-3 py-2"><dt>Expected annual return</dt><dd>{formatPercent(data.expectedAnnualReturn)}</dd></div>
          <div className="rounded-md border bg-secondary/30 px-3 py-2"><dt>Expected inflation</dt><dd>{formatPercent(data.expectedInflationRate)}</dd></div>
          <div className="rounded-md border bg-secondary/30 px-3 py-2"><dt>Safe withdrawal rate</dt><dd>{formatPercent(data.safeWithdrawalRate)}</dd></div>
          <div className="rounded-md border bg-secondary/30 px-3 py-2"><dt>Target retirement age</dt><dd>{data.targetRetirementAge}</dd></div>
          <div className="rounded-md border bg-secondary/30 px-3 py-2"><dt>Include Social Security</dt><dd>{data.includeSocialSecurity ? `Yes (age ${data.socialSecurityAge})` : "No"}</dd></div>
        </dl>

        <div>
          <h4 className="font-semibold">v1 simplifications</h4>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-muted-foreground">
            {data.simplifications.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </SectionCard>
  );
}

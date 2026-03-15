import { MetricCard } from "@/components/cards/metric-card";
import type { ReportHeaderData } from "@/lib/report/types";

export function ReportHeader({ data }: { data: ReportHeaderData }) {
  return (
    <section className="report-section rounded-2xl border bg-gradient-to-br from-white to-secondary/40 p-8">
      <p className="text-xs uppercase tracking-[0.2em] text-primary">Planning Report</p>
      <h1 className="mt-2 text-4xl font-semibold tracking-tight">{data.title}</h1>
      <p className="mt-2 text-muted-foreground">{data.subtitle}</p>
      <div className="mt-3 flex flex-wrap gap-4 text-sm text-muted-foreground">
        <p>Generated: {data.generatedDateLabel}</p>
        <p>Source: {data.sourceLabel}</p>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <MetricCard label="Estimated Regular FIRE" value={data.topLine.regularFireAgeLabel} />
        <MetricCard label="Current Net Worth" value={data.topLine.currentNetWorthLabel} />
        <MetricCard label="Primary Lever" value={data.topLine.primaryLeverLabel} helper="Derived from scenario deltas" />
      </div>

      <p className="mt-6 text-xs text-muted-foreground">Prepared by FirePath · Ready for Print / Save as PDF export.</p>
    </section>
  );
}

"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { RecommendationDebug } from "@/components/recommendations/recommendation-debug";
import { AssumptionsSection } from "@/components/report/assumptions-section";
import { DisclaimerSection } from "@/components/report/disclaimer-section";
import { ExecutiveSummary } from "@/components/report/executive-summary";
import { ReportExportActions } from "@/components/report/export-actions";
import { ExportPlaceholderSection } from "@/components/report/export-placeholder";
import { FinancialPositionSection } from "@/components/report/financial-position";
import { FireTimelineSection } from "@/components/report/fire-timeline-section";
import { ReportHeader } from "@/components/report/report-header";
import { ReportRecommendationsSection } from "@/components/report/recommendations-section";
import { ReportWrapper } from "@/components/report/report-wrapper";
import { ScenarioHighlightsSection } from "@/components/report/scenario-highlights";
import { buttonVariants } from "@/components/ui/button";
import { EmptyStateCard } from "@/components/ui/empty-state-card";
import { PageIntro } from "@/components/ui/page-intro";
import { PageLoadingSkeleton } from "@/components/ui/page-loading-skeleton";
import { mockPlanDraft, mockScenarios } from "@/data/mock-data";
import { buildReportData } from "@/lib/report/build-report-data";
import { cn } from "@/lib/utils";
import { usePlannerStore } from "@/store/planner-store";

function isPlanUsable(age?: number): boolean {
  return Number.isFinite(age) && (age ?? 0) >= 18;
}

export default function ReportPage() {
  const [isLoading, setIsLoading] = useState(true);
  const planDraft = usePlannerStore((state) => state.planDraft);
  const scenarios = usePlannerStore((state) => state.scenarios);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 250);
    return () => clearTimeout(timer);
  }, []);

  const hasPlan = isPlanUsable(planDraft.age);
  const report = useMemo(
    () =>
      buildReportData({
        planDraft: hasPlan ? planDraft : mockPlanDraft,
        scenarios: scenarios.length > 0 ? scenarios : mockScenarios,
      }),
    [hasPlan, planDraft, scenarios],
  );

  if (!report) {
    return (
      <EmptyStateCard
        title="Report unavailable"
        description="We could not build your report from the current data."
        actions={[
          { label: "Back to Results", href: "/results" },
          { label: "Back to Scenarios", href: "/scenarios", variant: "outline" },
        ]}
      />
    );
  }

  return (
    <div className="space-y-6">
      <PageIntro
        badge="FIRE Plan"
        title="Report"
        description="Client-ready summary of your current FIRE Plan, assumptions, and scenario outcomes."
        actions={
          <>
            <Link href="/results" className={cn(buttonVariants({ variant: "outline" }))}>
              Back to Results
            </Link>
            <Link href="/scenarios" className={cn(buttonVariants({ variant: "secondary" }))}>
              Back to Scenarios
            </Link>
          </>
        }
      />

      {!hasPlan ? (
        <p className="rounded-lg border border-primary/20 bg-primary/5 px-4 py-3 text-sm text-muted-foreground">
          You are viewing a sample report because your FIRE Plan is incomplete.
        </p>
      ) : null}

      {isLoading ? <PageLoadingSkeleton /> : null}

      <ReportWrapper>
        <ReportHeader data={report.header} />
        <ReportExportActions report={report} />
        <ExecutiveSummary data={report.executiveSummary} />
        <FinancialPositionSection data={report.financialPosition} />
        <FireTimelineSection results={report.fireResults} />
        <ScenarioHighlightsSection data={report.scenarioHighlights} />
        <ReportRecommendationsSection recommendations={report.recommendations} />
        <AssumptionsSection data={report.assumptions} />
        <DisclaimerSection disclaimers={report.disclaimers} />
        <ExportPlaceholderSection data={report.exportMetadata} />
        <RecommendationDebug payload={report.recommendationPayload} prompt={report.recommendationPrompt} />
      </ReportWrapper>
    </div>
  );
}

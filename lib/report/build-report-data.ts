import { mockPlanDraft, mockScenarios } from "@/data/mock-data";
import { calculateFireResults } from "@/lib/fire/calculate-fire";
import { formatCurrency, formatMilestoneAge } from "@/lib/fire/formatters";
import { generateRecommendationArtifacts } from "@/lib/recommendations";
import { REPORT_DISCLAIMERS, REPORT_SIMPLIFICATIONS } from "@/lib/report/sections";
import type { BuildReportDataInput, ReportData } from "@/lib/report/types";

function isPlanUsable(age?: number): boolean {
  return Number.isFinite(age) && (age ?? 0) >= 18;
}

export function buildReportData(input: BuildReportDataInput): ReportData {
  const source = isPlanUsable(input.planDraft.age) ? "live-plan" : "mock-fallback";
  const planDraft = source === "live-plan" ? input.planDraft : mockPlanDraft;
  const scenarios = input.scenarios.length > 0 ? input.scenarios : mockScenarios;

  const fireResults = calculateFireResults(planDraft);
  const recommendationArtifacts = generateRecommendationArtifacts({
    planDraft,
    results: fireResults,
    scenarios,
  });

  const regularAge = fireResults.fireAges.regular;
  const biggestRisk = recommendationArtifacts.recommendations.warningFlags[0]?.label ?? "No major risk flags from v1 checks.";

  return {
    source,
    header: {
      title: "FIRE Planning Report",
      subtitle: "A consolidated snapshot of your financial independence trajectory and strategy levers.",
      generatedDateLabel: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
      sourceLabel: source,
      topLine: {
        regularFireAgeLabel: formatMilestoneAge(regularAge),
        currentNetWorthLabel: formatCurrency(fireResults.currentNetWorth),
        primaryLeverLabel: recommendationArtifacts.payload.scenarioSummary.biggestLever,
      },
    },
    profileSnapshot: {
      age: planDraft.age,
      maritalStatus: planDraft.maritalStatus,
      dependents: planDraft.dependents,
      location: planDraft.currentState,
      retirementLocation: planDraft.retirementLocation,
    },
    executiveSummary: {
      currentPosition: `Current net worth is ${formatCurrency(fireResults.currentNetWorth)} with invested assets near ${formatCurrency(fireResults.currentInvestedAssets)}.`,
      realisticPath:
        regularAge === null
          ? "Regular FIRE is not reached by age 80 under current assumptions; Lean FIRE may be the nearer path."
          : `Regular FIRE is projected around ${formatMilestoneAge(regularAge)} based on current assumptions.`,
      biggestOpportunity:
        recommendationArtifacts.payload.scenarioSummary.bestImproverScenario ??
        "Improving annual savings and retirement spending assumptions remains the strongest opportunity.",
      biggestRisk,
    },
    financialPosition: {
      annualGrossIncome: planDraft.annualGrossIncome,
      annualNetIncome: planDraft.annualNetIncome,
      annualSavings: planDraft.expectedAnnualSavings,
      annualExpenses: planDraft.annualExpenses,
      retirementExpenses: planDraft.expectedRetirementExpenses,
      assets: {
        cash: planDraft.cash,
        taxableInvestments: planDraft.taxableInvestments,
        retirementAccounts: planDraft.retirementAccounts,
        businessEquity: planDraft.businessEquity,
        realEstateEquity: planDraft.realEstateEquity,
        investmentPropertyEquity: planDraft.investmentPropertyEquity,
      },
      liabilities: {
        mortgageBalance: planDraft.mortgageBalance,
        otherDebt: planDraft.otherDebt,
        totalDebt: planDraft.mortgageBalance + planDraft.otherDebt,
      },
      currentNetWorth: fireResults.currentNetWorth,
      currentInvestedAssets: fireResults.currentInvestedAssets,
    },
    fireResults,
    scenarioHighlights: {
      bestImproverScenario: recommendationArtifacts.payload.scenarioSummary.bestImproverScenario,
      biggestDelayScenario: recommendationArtifacts.payload.scenarioSummary.biggestDelayScenario,
      biggestLever: recommendationArtifacts.payload.scenarioSummary.biggestLever,
      coastSemiRetireViable: recommendationArtifacts.payload.scenarioSummary.coastSemiRetireViable,
      topDeltas: recommendationArtifacts.payload.scenarioSummary.topDeltas,
    },
    recommendations: recommendationArtifacts.recommendations,
    recommendationPayload: recommendationArtifacts.payload,
    recommendationPrompt: recommendationArtifacts.prompt,
    assumptions: {
      expectedAnnualReturn: fireResults.assumptionsSummary.expectedAnnualReturn,
      expectedInflationRate: fireResults.assumptionsSummary.expectedInflationRate,
      safeWithdrawalRate: fireResults.assumptionsSummary.safeWithdrawalRate,
      targetRetirementAge: fireResults.assumptionsSummary.targetRetirementAge,
      includeSocialSecurity: fireResults.assumptionsSummary.includeSocialSecurity,
      socialSecurityAge: fireResults.assumptionsSummary.socialSecurityAge,
      simplifications: REPORT_SIMPLIFICATIONS,
    },
    warnings: recommendationArtifacts.recommendations.warningFlags,
    disclaimers: REPORT_DISCLAIMERS,
    exportMetadata: {
      reportVersion: "v1",
      exportStatus: "v1-browser-print",
      supportsNow: ["Print / Save as PDF", "Export PDF (browser print flow)", "Copy report summary"],
      futureActions: ["True file-based PDF generation", "Shareable links", "Saved report snapshots"],
    },
    scenarios,
  };
}

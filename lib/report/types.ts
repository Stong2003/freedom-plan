import type { FireResults, ScenarioDefinition } from "@/types/fire";
import type { PlanDraft } from "@/types/plan";

import type { RecommendationPayload, RecommendationSet } from "@/lib/recommendations/types";

export interface ReportHeaderData {
  title: string;
  subtitle: string;
  generatedDateLabel: string;
  sourceLabel: "live-plan" | "mock-fallback";
  topLine: {
    regularFireAgeLabel: string;
    currentNetWorthLabel: string;
    primaryLeverLabel: string;
  };
}

export interface ExecutiveSummaryData {
  currentPosition: string;
  realisticPath: string;
  biggestOpportunity: string;
  biggestRisk: string;
}

export interface FinancialPositionData {
  annualGrossIncome: number;
  annualNetIncome: number;
  annualSavings: number;
  annualExpenses: number;
  retirementExpenses: number;
  assets: {
    cash: number;
    taxableInvestments: number;
    retirementAccounts: number;
    businessEquity: number;
    realEstateEquity: number;
    investmentPropertyEquity: number;
  };
  liabilities: {
    mortgageBalance: number;
    otherDebt: number;
    totalDebt: number;
  };
  currentNetWorth: number;
  currentInvestedAssets: number;
}

export interface ScenarioHighlightsData {
  bestImproverScenario: string | null;
  biggestDelayScenario: string | null;
  biggestLever: string;
  coastSemiRetireViable: boolean;
  topDeltas: RecommendationPayload["scenarioSummary"]["topDeltas"];
}

export interface PlanningAssumptionsData {
  expectedAnnualReturn: number;
  expectedInflationRate: number;
  safeWithdrawalRate: number;
  targetRetirementAge: number;
  includeSocialSecurity: boolean;
  socialSecurityAge: number;
  simplifications: string[];
}

export interface ExportMetadataPlaceholder {
  reportVersion: string;
  exportStatus: "v1-browser-print";
  supportsNow: string[];
  futureActions: string[];
}

export interface ReportData {
  source: "live-plan" | "mock-fallback";
  header: ReportHeaderData;
  profileSnapshot: {
    age: number;
    maritalStatus: PlanDraft["maritalStatus"];
    dependents: number;
    location: string;
    retirementLocation: string;
  };
  executiveSummary: ExecutiveSummaryData;
  financialPosition: FinancialPositionData;
  fireResults: FireResults;
  scenarioHighlights: ScenarioHighlightsData;
  recommendations: RecommendationSet;
  recommendationPayload: RecommendationPayload;
  recommendationPrompt: string;
  assumptions: PlanningAssumptionsData;
  warnings: RecommendationSet["warningFlags"];
  disclaimers: string[];
  exportMetadata: ExportMetadataPlaceholder;
  scenarios: ScenarioDefinition[];
}

export interface BuildReportDataInput {
  planDraft: PlanDraft;
  scenarios: ScenarioDefinition[];
}

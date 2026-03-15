import type { FireMilestoneStatus, FireResults, ScenarioDefinition } from "@/types/fire";
import type { PlanDraft } from "@/types/plan";

export type RecommendationPriority = "high" | "medium" | "low";

export interface WarningFlag {
  id: string;
  label: string;
  detail: string;
  severity: RecommendationPriority;
}

export interface ScenarioInsight {
  title: string;
  detail: string;
  impact: "positive" | "negative" | "neutral";
}

export interface RecommendationAction {
  title: string;
  detail: string;
  priority: RecommendationPriority;
}

export interface RecommendationSection {
  title: string;
  body: string[];
  priority: RecommendationPriority;
}

export interface TopScenarioDelta {
  scenarioId: string;
  scenarioName: string;
  regularFireAgeDelta: number | null;
  yearsToRegularDelta: number | null;
}

export interface RecommendationPayload {
  profileSummary: {
    age: number;
    maritalStatus: PlanDraft["maritalStatus"];
    dependents: number;
    employmentStatus: PlanDraft["currentEmploymentStatus"];
    currentState: string;
    retirementLocation: string;
  };
  incomeSavingsSummary: {
    annualGrossIncome: number;
    annualNetIncome: number;
    annualSavings: number;
    savingsRatePercent: number;
  };
  expenseSummary: {
    currentAnnualExpenses: number;
    retirementAnnualExpenses: number;
  };
  balanceSheetSummary: {
    cash: number;
    taxableInvestments: number;
    retirementAccounts: number;
    businessEquity: number;
    realEstateEquity: number;
    investmentPropertyEquity: number;
    debts: number;
  };
  resultSummary: {
    currentNetWorth: number;
    currentInvestedAssets: number;
    fireAges: FireResults["fireAges"];
    yearsToEachFireType: FireResults["yearsToEachFireType"];
    milestoneStatuses: Record<"coast" | "lean" | "regular" | "fat", FireMilestoneStatus>;
  };
  scenarioSummary: {
    totalScenarios: number;
    topDeltas: TopScenarioDelta[];
    bestImproverScenario: string | null;
    biggestDelayScenario: string | null;
    biggestLever: "savings" | "spending" | "return" | "retirement-age" | "mixed";
    coastSemiRetireViable: boolean;
  };
  assumptionsSummary: FireResults["assumptionsSummary"];
  riskPreferenceFlags: {
    riskTolerance: PlanDraft["riskTolerance"];
    preferredFireType: PlanDraft["preferredFireType"];
    willingToRelocateForLowerCost: boolean;
    willingToWorkPartTimeInRetirement: boolean;
    prioritizeTaxOptimization: boolean;
    legacyGoal: boolean;
  };
  warningFlags: WarningFlag[];
}

export interface RecommendationSet {
  generatedAt: string;
  source: "fallback-rules";
  summary: string;
  strengths: RecommendationSection;
  risks: RecommendationSection;
  scenarioInsights: ScenarioInsight[];
  actions: RecommendationAction[];
  whatMovesEarlier: string[];
  whatCouldDelay: string[];
  warningFlags: WarningFlag[];
  disclaimer: string;
}

export interface RecommendationContext {
  planDraft: PlanDraft;
  results: FireResults;
  scenarios: ScenarioDefinition[];
}

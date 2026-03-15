export type FireType = "coast" | "lean" | "regular" | "fat";

export interface UserProfile {
  age: number;
  retirementAgeGoal: number;
  householdStatus: "single" | "couple";
  location: string;
}

export interface IncomeExpenses {
  annualIncome: number;
  annualExpenses: number;
  annualSavings: number;
  savingsRate: number;
}

export interface AssetsLiabilities {
  investableAssets: number;
  retirementAccounts: number;
  realEstateEquity: number;
  debts: number;
}

export interface RetirementAssumptions {
  expectedReturnRate: number;
  inflationRate: number;
  safeWithdrawalRate: number;
  riskTolerance: "conservative" | "moderate" | "aggressive";
}

export interface ScenarioAdjustments {
  expectedAnnualSavings: number;
  expectedRetirementExpenses: number;
  expectedAnnualReturn: number;
  targetRetirementAge: number;
  willingToWorkPartTimeInRetirement: boolean;
}

export interface ScenarioDefinition {
  id: string;
  name: string;
  description: string;
  adjustments: Partial<ScenarioAdjustments>;
}

export interface ProjectionRow {
  age: number;
  investedAssets: number;
  netWorth: number;
}

export interface FireAssumptionsSummary {
  expectedAnnualReturn: number;
  expectedInflationRate: number;
  realReturnRate: number;
  safeWithdrawalRate: number;
  annualSavings: number;
  targetRetirementAge: number;
  maxProjectionAge: number;
  cashInvestedRatio: number;
  includeSocialSecurity: boolean;
  socialSecurityAge: number;
  socialSecurityAnnualOffset: number;
}

export type FireMilestoneStatus = "already-achieved" | "projected" | "not-reached";

export interface FireMilestone {
  fireType: FireType;
  targetSpending: number;
  targetAmount: number | null;
  age: number | null;
  yearsTo: number | null;
  status: FireMilestoneStatus;
}

export interface FireResults {
  generatedAt: string;
  currentAge: number;
  currentNetWorth: number;
  currentInvestedAssets: number;
  fireNumbers: Record<FireType, number | null>;
  fireAges: Record<FireType, number | null>;
  yearsToEachFireType: Record<FireType, number | null>;
  projectedNetWorthTimeline: ProjectionRow[];
  milestones: FireMilestone[];
  milestoneSummary: {
    fastestPath: FireType | null;
    achievedCount: number;
    note: string;
  };
  assumptionsSummary: FireAssumptionsSummary;
  disclaimer: string;
}

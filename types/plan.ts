export type MaritalStatus = "single" | "married";
export type EmploymentStatus = "employed" | "self-employed" | "business-owner" | "part-time" | "other";
export type PreferredFireType = "coast" | "lean" | "regular" | "fat" | "unsure";

export interface ProfileStepValues {
  age: number;
  maritalStatus: MaritalStatus;
  dependents: number;
  currentState: string;
  retirementLocation: string;
  currentEmploymentStatus: EmploymentStatus;
}

export interface IncomeExpensesStepValues {
  annualGrossIncome: number;
  annualNetIncome: number;
  annualExpenses: number;
  expectedRetirementExpenses: number;
  expectedAnnualSavings: number;
}

export interface AssetsLiabilitiesStepValues {
  cash: number;
  taxableInvestments: number;
  retirementAccounts: number;
  realEstateEquity: number;
  investmentPropertyEquity: number;
  businessEquity: number;
  mortgageBalance: number;
  otherDebt: number;
}

export interface RetirementAssumptionsStepValues {
  expectedAnnualReturn: number;
  expectedInflationRate: number;
  safeWithdrawalRate: number;
  targetRetirementAge: number;
  socialSecurityAge: number;
  includeSocialSecurity: boolean;
}

export interface RiskPreferencesStepValues {
  riskTolerance: "conservative" | "moderate" | "aggressive";
  preferredFireType: PreferredFireType;
  willingToRelocateForLowerCost: boolean;
  willingToWorkPartTimeInRetirement: boolean;
  prioritizeTaxOptimization: boolean;
  legacyGoal: boolean;
}

export interface PlanDraft
  extends ProfileStepValues,
    IncomeExpensesStepValues,
    AssetsLiabilitiesStepValues,
    RetirementAssumptionsStepValues,
    RiskPreferencesStepValues {}

export type PlanStepId = 1 | 2 | 3 | 4 | 5 | 6;

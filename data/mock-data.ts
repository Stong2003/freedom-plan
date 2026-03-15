import { calculateFireResults } from "@/lib/fire/calculate-fire";
import { DEFAULT_SCENARIO_TEMPLATES } from "@/lib/fire/scenarios";
import type {
  AssetsLiabilities,
  FireResults,
  IncomeExpenses,
  RetirementAssumptions,
  ScenarioDefinition,
  UserProfile,
} from "@/types/fire";
import type { PlanDraft } from "@/types/plan";

export const mockUserProfile: UserProfile = {
  age: 31,
  retirementAgeGoal: 50,
  householdStatus: "couple",
  location: "Austin, TX",
};

export const mockIncomeExpenses: IncomeExpenses = {
  annualIncome: 185000,
  annualExpenses: 76000,
  annualSavings: 109000,
  savingsRate: 58.9,
};

export const mockAssetsLiabilities: AssetsLiabilities = {
  investableAssets: 215000,
  retirementAccounts: 98000,
  realEstateEquity: 65000,
  debts: 43000,
};

export const mockAssumptions: RetirementAssumptions = {
  expectedReturnRate: 6.5,
  inflationRate: 2.5,
  safeWithdrawalRate: 4,
  riskTolerance: "moderate",
};

export const mockScenarios: ScenarioDefinition[] = DEFAULT_SCENARIO_TEMPLATES;

export const mockPlanDraft: PlanDraft = {
  age: 31,
  maritalStatus: "married",
  dependents: 1,
  currentState: "Texas",
  retirementLocation: "Colorado",
  currentEmploymentStatus: "employed",
  annualGrossIncome: 185000,
  annualNetIncome: 132000,
  annualExpenses: 76000,
  expectedRetirementExpenses: 68000,
  expectedAnnualSavings: 56000,
  cash: 42000,
  taxableInvestments: 173000,
  retirementAccounts: 98000,
  realEstateEquity: 65000,
  investmentPropertyEquity: 0,
  businessEquity: 25000,
  mortgageBalance: 280000,
  otherDebt: 43000,
  expectedAnnualReturn: 6.5,
  expectedInflationRate: 2.5,
  safeWithdrawalRate: 4,
  targetRetirementAge: 50,
  socialSecurityAge: 67,
  includeSocialSecurity: true,
  riskTolerance: "moderate",
  preferredFireType: "regular",
  willingToRelocateForLowerCost: false,
  willingToWorkPartTimeInRetirement: true,
  prioritizeTaxOptimization: true,
  legacyGoal: true,
};

export const mockResults: FireResults = calculateFireResults(mockPlanDraft);

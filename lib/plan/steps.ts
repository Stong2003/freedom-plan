import type { PlanFormValues } from "@/lib/plan/schemas";
import type { PlanStepId } from "@/types/plan";

export interface PlanStepConfig {
  id: PlanStepId;
  name: string;
  description: string;
  fields: Array<keyof PlanFormValues>;
}

export const planSteps: PlanStepConfig[] = [
  {
    id: 1,
    name: "Profile",
    description: "Basic household context and employment info",
    fields: ["age", "maritalStatus", "dependents", "currentState", "retirementLocation", "currentEmploymentStatus"],
  },
  {
    id: 2,
    name: "Income & Expenses",
    description: "Current income, spending, and savings expectations",
    fields: ["annualGrossIncome", "annualNetIncome", "annualExpenses", "expectedRetirementExpenses", "expectedAnnualSavings"],
  },
  {
    id: 3,
    name: "Assets & Liabilities",
    description: "Balance sheet inputs and debt profile",
    fields: [
      "cash",
      "taxableInvestments",
      "retirementAccounts",
      "realEstateEquity",
      "investmentPropertyEquity",
      "businessEquity",
      "mortgageBalance",
      "otherDebt",
    ],
  },
  {
    id: 4,
    name: "Retirement Assumptions",
    description: "Long-term return, inflation, and retirement timing assumptions",
    fields: [
      "expectedAnnualReturn",
      "expectedInflationRate",
      "safeWithdrawalRate",
      "targetRetirementAge",
      "socialSecurityAge",
      "includeSocialSecurity",
    ],
  },
  {
    id: 5,
    name: "Risk & Preferences",
    description: "Lifestyle and portfolio preference settings",
    fields: [
      "riskTolerance",
      "preferredFireType",
      "willingToRelocateForLowerCost",
      "willingToWorkPartTimeInRetirement",
      "prioritizeTaxOptimization",
      "legacyGoal",
    ],
  },
  {
    id: 6,
    name: "Review",
    description: "Confirm all values before continuing to results",
    fields: [],
  },
];

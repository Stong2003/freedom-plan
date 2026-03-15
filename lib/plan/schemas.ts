import { z } from "zod";

const requiredString = (label: string) => z.string().trim().min(1, `${label} is required`);
const nonNegativeNumber = (label: string) => z.coerce.number().min(0, `${label} must be 0 or greater`);

export const profileStepSchema = z.object({
  age: z.coerce.number().int().min(18, "Age must be at least 18").max(80, "Age must be 80 or less"),
  maritalStatus: z.enum(["single", "married"]),
  dependents: z.coerce.number().int().min(0, "Dependents must be 0 or greater"),
  currentState: requiredString("Current state"),
  retirementLocation: requiredString("Retirement location"),
  currentEmploymentStatus: z.enum(["employed", "self-employed", "business-owner", "part-time", "other"]),
});

export const incomeExpensesStepSchema = z.object({
  annualGrossIncome: nonNegativeNumber("Annual gross income"),
  annualNetIncome: nonNegativeNumber("Annual net income"),
  annualExpenses: nonNegativeNumber("Annual expenses"),
  expectedRetirementExpenses: nonNegativeNumber("Expected retirement expenses"),
  expectedAnnualSavings: nonNegativeNumber("Expected annual savings"),
});

export const assetsLiabilitiesStepSchema = z.object({
  cash: nonNegativeNumber("Cash"),
  taxableInvestments: nonNegativeNumber("Taxable investments"),
  retirementAccounts: nonNegativeNumber("Retirement accounts"),
  realEstateEquity: nonNegativeNumber("Real estate equity"),
  investmentPropertyEquity: nonNegativeNumber("Investment property equity"),
  businessEquity: nonNegativeNumber("Business equity"),
  mortgageBalance: nonNegativeNumber("Mortgage balance"),
  otherDebt: nonNegativeNumber("Other debt"),
});

export const retirementAssumptionsStepSchema = z.object({
  expectedAnnualReturn: z.coerce.number().min(0, "Expected annual return must be non-negative").max(20, "Keep this below 20%"),
  expectedInflationRate: z.coerce.number().min(0, "Inflation rate must be non-negative").max(15, "Keep this below 15%"),
  safeWithdrawalRate: z.coerce.number().min(1, "Safe withdrawal rate should be at least 1%").max(10, "Safe withdrawal rate should be 10% or less"),
  targetRetirementAge: z.coerce.number().int().min(35, "Target retirement age should be at least 35").max(80, "Target retirement age should be 80 or less"),
  socialSecurityAge: z.coerce.number().int().min(62, "Social security age should be at least 62").max(75, "Social security age should be 75 or less"),
  includeSocialSecurity: z.boolean(),
});

export const riskPreferencesStepSchema = z.object({
  riskTolerance: z.enum(["conservative", "moderate", "aggressive"]),
  preferredFireType: z.enum(["coast", "lean", "regular", "fat", "unsure"]),
  willingToRelocateForLowerCost: z.boolean(),
  willingToWorkPartTimeInRetirement: z.boolean(),
  prioritizeTaxOptimization: z.boolean(),
  legacyGoal: z.boolean(),
});

export const planSchema = profileStepSchema
  .merge(incomeExpensesStepSchema)
  .merge(assetsLiabilitiesStepSchema)
  .merge(retirementAssumptionsStepSchema)
  .merge(riskPreferencesStepSchema)
  .refine((values) => values.targetRetirementAge > values.age, {
    message: "Target retirement age should be greater than current age",
    path: ["targetRetirementAge"],
  });

export type PlanFormValues = z.infer<typeof planSchema>;

import {
  DEFAULT_CASH_INVESTED_RATIO,
  DEFAULT_SOCIAL_SECURITY_ANNUAL_OFFSET,
  FIRE_SPENDING_MULTIPLIERS,
  MAX_PROJECTION_AGE,
  MIN_VALID_SWR_PERCENT,
} from "@/lib/fire/constants";
import {
  firstAgeAtTarget,
  resolveMilestoneStatus,
  safeFireNumber,
  toNonNegative,
  toRealReturn,
  toYearsRemaining,
} from "@/lib/fire/helpers";
import { buildNoContributionTimeline, buildProjectionTimeline } from "@/lib/fire/projections";
import type { FireMilestone, FireResults } from "@/types/fire";
import type { PlanDraft } from "@/types/plan";

export function calculateFireResults(input: Partial<PlanDraft>): FireResults {
  const currentAge = Math.max(18, Math.floor(toNonNegative(input.age ?? 0)));
  const targetRetirementAge = Math.max(currentAge, Math.floor(toNonNegative(input.targetRetirementAge ?? currentAge)));

  const taxableInvestments = toNonNegative(input.taxableInvestments ?? 0);
  const retirementAccounts = toNonNegative(input.retirementAccounts ?? 0);
  const cash = toNonNegative(input.cash ?? 0);
  const realEstateEquity = toNonNegative(input.realEstateEquity ?? 0);
  const investmentPropertyEquity = toNonNegative(input.investmentPropertyEquity ?? 0);
  const businessEquity = toNonNegative(input.businessEquity ?? 0);
  const debts = toNonNegative((input.mortgageBalance ?? 0) + (input.otherDebt ?? 0));

  const cashInvestedRatio = DEFAULT_CASH_INVESTED_RATIO;
  const investedCash = cash * cashInvestedRatio;
  const staticCash = cash - investedCash;

  const currentInvestedAssets = taxableInvestments + retirementAccounts + investedCash;
  const currentNetWorth =
    taxableInvestments +
    retirementAccounts +
    cash +
    realEstateEquity +
    investmentPropertyEquity +
    businessEquity -
    debts;

  const staticNetWorthBase = staticCash + realEstateEquity + investmentPropertyEquity + businessEquity - debts;

  const expectedAnnualReturn = toNonNegative(input.expectedAnnualReturn ?? 0);
  const expectedInflationRate = toNonNegative(input.expectedInflationRate ?? 0);
  const realReturnRate = toRealReturn(expectedAnnualReturn, expectedInflationRate);
  const annualSavings = toNonNegative(input.expectedAnnualSavings ?? 0);

  const baseRetirementSpend = toNonNegative(input.expectedRetirementExpenses ?? 0);
  const leanSpendingTarget = baseRetirementSpend * FIRE_SPENDING_MULTIPLIERS.lean;
  const regularSpendingTarget = baseRetirementSpend * FIRE_SPENDING_MULTIPLIERS.regular;
  const fatSpendingTarget = baseRetirementSpend * FIRE_SPENDING_MULTIPLIERS.fat;

  const safeWithdrawalRate = toNonNegative(input.safeWithdrawalRate ?? 0);
  const effectiveSwr = safeWithdrawalRate < MIN_VALID_SWR_PERCENT ? 0 : safeWithdrawalRate;

  const fireNumbers = {
    coast: safeFireNumber(regularSpendingTarget, effectiveSwr),
    lean: safeFireNumber(leanSpendingTarget, effectiveSwr),
    regular: safeFireNumber(regularSpendingTarget, effectiveSwr),
    fat: safeFireNumber(fatSpendingTarget, effectiveSwr),
  };

  const projectedNetWorthTimeline = buildProjectionTimeline({
    currentAge,
    initialInvestedAssets: currentInvestedAssets,
    annualRealReturn: realReturnRate,
    annualSavings,
    targetRetirementAge,
    maxProjectionAge: MAX_PROJECTION_AGE,
    staticNetWorthBase,
  });

  const coastTimeline = buildNoContributionTimeline(currentAge, currentInvestedAssets, realReturnRate, MAX_PROJECTION_AGE);

  const leanFireAge = firstAgeAtTarget(projectedNetWorthTimeline, fireNumbers.lean);
  const regularFireAge = firstAgeAtTarget(projectedNetWorthTimeline, fireNumbers.regular);
  const fatFireAge = firstAgeAtTarget(projectedNetWorthTimeline, fireNumbers.fat);
  const coastFireAge = firstAgeAtTarget(coastTimeline, fireNumbers.regular);

  const yearsToEachFireType = {
    coast: toYearsRemaining(currentAge, coastFireAge),
    lean: toYearsRemaining(currentAge, leanFireAge),
    regular: toYearsRemaining(currentAge, regularFireAge),
    fat: toYearsRemaining(currentAge, fatFireAge),
  };

  const milestones: FireMilestone[] = [
    {
      fireType: "coast",
      targetSpending: regularSpendingTarget,
      targetAmount: fireNumbers.coast,
      age: coastFireAge,
      yearsTo: yearsToEachFireType.coast,
      status: resolveMilestoneStatus(currentAge, coastFireAge),
    },
    {
      fireType: "lean",
      targetSpending: leanSpendingTarget,
      targetAmount: fireNumbers.lean,
      age: leanFireAge,
      yearsTo: yearsToEachFireType.lean,
      status: resolveMilestoneStatus(currentAge, leanFireAge),
    },
    {
      fireType: "regular",
      targetSpending: regularSpendingTarget,
      targetAmount: fireNumbers.regular,
      age: regularFireAge,
      yearsTo: yearsToEachFireType.regular,
      status: resolveMilestoneStatus(currentAge, regularFireAge),
    },
    {
      fireType: "fat",
      targetSpending: fatSpendingTarget,
      targetAmount: fireNumbers.fat,
      age: fatFireAge,
      yearsTo: yearsToEachFireType.fat,
      status: resolveMilestoneStatus(currentAge, fatFireAge),
    },
  ];

  const reached = milestones.filter((item) => item.age !== null).sort((a, b) => (a.age ?? 0) - (b.age ?? 0));
  const fastestPath = reached[0]?.fireType ?? null;

  return {
    generatedAt: new Date().toISOString(),
    currentAge,
    currentNetWorth,
    currentInvestedAssets,
    fireNumbers,
    fireAges: {
      coast: coastFireAge,
      lean: leanFireAge,
      regular: regularFireAge,
      fat: fatFireAge,
    },
    yearsToEachFireType,
    projectedNetWorthTimeline,
    milestones,
    milestoneSummary: {
      fastestPath,
      achievedCount: milestones.filter((item) => item.status === "already-achieved").length,
      note:
        effectiveSwr <= 0
          ? "Safe withdrawal rate is invalid, so FIRE targets could not be calculated."
          : "Deterministic projection (no Monte Carlo or tax modeling) using real return assumptions.",
    },
    assumptionsSummary: {
      expectedAnnualReturn,
      expectedInflationRate,
      realReturnRate: realReturnRate * 100,
      safeWithdrawalRate,
      annualSavings,
      targetRetirementAge,
      maxProjectionAge: MAX_PROJECTION_AGE,
      cashInvestedRatio,
      includeSocialSecurity: Boolean(input.includeSocialSecurity),
      socialSecurityAge: Math.floor(toNonNegative(input.socialSecurityAge ?? 67)),
      socialSecurityAnnualOffset: input.includeSocialSecurity ? DEFAULT_SOCIAL_SECURITY_ANNUAL_OFFSET : 0,
    },
    disclaimer:
      "This estimate is educational only and does not include taxes, Monte Carlo uncertainty, or personalized financial advice.",
  };
}

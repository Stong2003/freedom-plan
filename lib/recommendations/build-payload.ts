import { compareScenarios } from "@/lib/fire/scenarios";
import type { RecommendationContext, RecommendationPayload, WarningFlag } from "@/lib/recommendations/types";

function computeSavingsRate(netIncome: number, savings: number): number {
  if (netIncome <= 0) return 0;
  return (savings / netIncome) * 100;
}

function inferScenarioLever(name: string): "savings" | "spending" | "return" | "retirement-age" | "mixed" {
  const normalized = name.toLowerCase();
  if (normalized.includes("save") || normalized.includes("semi")) return "savings";
  if (normalized.includes("spend")) return "spending";
  if (normalized.includes("return")) return "return";
  if (normalized.includes("retire")) return "retirement-age";
  return "mixed";
}

function getWarningFlags(context: RecommendationContext): WarningFlag[] {
  const { planDraft, results, scenarios } = context;
  const flags: WarningFlag[] = [];
  const savingsRate = computeSavingsRate(planDraft.annualNetIncome, planDraft.expectedAnnualSavings);

  if (results.assumptionsSummary.safeWithdrawalRate <= 0) {
    flags.push({
      id: "invalid-swr",
      label: "Invalid safe withdrawal rate",
      detail: "Safe withdrawal rate is zero or invalid, so FIRE targets are unreliable.",
      severity: "high",
    });
  }

  if (savingsRate < 15) {
    flags.push({
      id: "low-savings-rate",
      label: "Low savings rate",
      detail: "Savings rate appears below 15%, which can materially delay FIRE timelines.",
      severity: "high",
    });
  }

  if (planDraft.expectedRetirementExpenses >= planDraft.annualGrossIncome * 0.8) {
    flags.push({
      id: "high-retirement-spend",
      label: "High retirement spending target",
      detail: "Retirement expenses are close to current gross income, leaving limited margin for FIRE.",
      severity: "medium",
    });
  }

  if (results.fireAges.regular === null) {
    flags.push({
      id: "regular-fire-not-reached",
      label: "Regular FIRE not reached by age 80",
      detail: "Under current assumptions, Regular FIRE is not achieved by the model horizon.",
      severity: "high",
    });
  }

  if (results.fireAges.fat === null) {
    flags.push({
      id: "fat-fire-not-reached",
      label: "Fat FIRE not reached by age 80",
      detail: "Fat FIRE may require stronger levers or different assumptions.",
      severity: "medium",
    });
  }

  if (results.assumptionsSummary.expectedAnnualReturn >= 8) {
    flags.push({
      id: "optimistic-return",
      label: "Optimistic return dependency",
      detail: "Projection depends on relatively high long-term returns, which may increase risk.",
      severity: "medium",
    });
  }

  if (scenarios.length === 0) {
    flags.push({
      id: "no-scenarios",
      label: "No scenarios configured",
      detail: "Scenario stress testing is missing; outcomes may be less robust.",
      severity: "low",
    });
  }

  return flags;
}

export function buildRecommendationPayload(context: RecommendationContext): RecommendationPayload {
  const { planDraft, results, scenarios } = context;
  const { comparisons } = compareScenarios(planDraft, scenarios);

  const topDeltas = comparisons
    .map((item) => ({
      scenarioId: item.scenario.id,
      scenarioName: item.scenario.name,
      regularFireAgeDelta: item.deltas.regularFireAgeDelta,
      yearsToRegularDelta:
        item.scenarioResults.yearsToEachFireType.regular === null || results.yearsToEachFireType.regular === null
          ? null
          : item.scenarioResults.yearsToEachFireType.regular - results.yearsToEachFireType.regular,
    }))
    .sort((a, b) => (a.regularFireAgeDelta ?? 999) - (b.regularFireAgeDelta ?? 999));

  const bestImprover = topDeltas.find((item) => item.regularFireAgeDelta !== null && item.regularFireAgeDelta < 0) ?? null;
  const biggestDelay = [...topDeltas]
    .reverse()
    .find((item) => item.regularFireAgeDelta !== null && item.regularFireAgeDelta > 0) ?? null;

  const bestLever = bestImprover ? inferScenarioLever(bestImprover.scenarioName) : "mixed";
  const coastScenario = comparisons.find((item) => item.scenario.id === "coast-semi-retire");

  const milestoneStatuses = {
    coast: results.milestones.find((m) => m.fireType === "coast")?.status ?? "not-reached",
    lean: results.milestones.find((m) => m.fireType === "lean")?.status ?? "not-reached",
    regular: results.milestones.find((m) => m.fireType === "regular")?.status ?? "not-reached",
    fat: results.milestones.find((m) => m.fireType === "fat")?.status ?? "not-reached",
  };

  return {
    profileSummary: {
      age: planDraft.age,
      maritalStatus: planDraft.maritalStatus,
      dependents: planDraft.dependents,
      employmentStatus: planDraft.currentEmploymentStatus,
      currentState: planDraft.currentState,
      retirementLocation: planDraft.retirementLocation,
    },
    incomeSavingsSummary: {
      annualGrossIncome: planDraft.annualGrossIncome,
      annualNetIncome: planDraft.annualNetIncome,
      annualSavings: planDraft.expectedAnnualSavings,
      savingsRatePercent: computeSavingsRate(planDraft.annualNetIncome, planDraft.expectedAnnualSavings),
    },
    expenseSummary: {
      currentAnnualExpenses: planDraft.annualExpenses,
      retirementAnnualExpenses: planDraft.expectedRetirementExpenses,
    },
    balanceSheetSummary: {
      cash: planDraft.cash,
      taxableInvestments: planDraft.taxableInvestments,
      retirementAccounts: planDraft.retirementAccounts,
      businessEquity: planDraft.businessEquity,
      realEstateEquity: planDraft.realEstateEquity,
      investmentPropertyEquity: planDraft.investmentPropertyEquity,
      debts: planDraft.mortgageBalance + planDraft.otherDebt,
    },
    resultSummary: {
      currentNetWorth: results.currentNetWorth,
      currentInvestedAssets: results.currentInvestedAssets,
      fireAges: results.fireAges,
      yearsToEachFireType: results.yearsToEachFireType,
      milestoneStatuses,
    },
    scenarioSummary: {
      totalScenarios: scenarios.length,
      topDeltas: topDeltas.slice(0, 3),
      bestImproverScenario: bestImprover?.scenarioName ?? null,
      biggestDelayScenario: biggestDelay?.scenarioName ?? null,
      biggestLever: bestLever,
      coastSemiRetireViable:
        coastScenario?.scenarioResults.fireAges.regular !== null &&
        (coastScenario.scenarioResults.fireAges.regular ?? 999) <= (results.fireAges.regular ?? 999),
    },
    assumptionsSummary: results.assumptionsSummary,
    riskPreferenceFlags: {
      riskTolerance: planDraft.riskTolerance,
      preferredFireType: planDraft.preferredFireType,
      willingToRelocateForLowerCost: planDraft.willingToRelocateForLowerCost,
      willingToWorkPartTimeInRetirement: planDraft.willingToWorkPartTimeInRetirement,
      prioritizeTaxOptimization: planDraft.prioritizeTaxOptimization,
      legacyGoal: planDraft.legacyGoal,
    },
    warningFlags: getWarningFlags(context),
  };
}

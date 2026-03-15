import { calculateFireResults } from "@/lib/fire/calculate-fire";
import { toNonNegative } from "@/lib/fire/helpers";
import type { FireResults, ScenarioDefinition } from "@/types/fire";
import type { PlanDraft } from "@/types/plan";

export interface ScenarioDeltaSummary {
  coastFireAgeDelta: number | null;
  leanFireAgeDelta: number | null;
  regularFireAgeDelta: number | null;
  fatFireAgeDelta: number | null;
  currentNetWorthDelta: number;
}

export interface ScenarioComparisonResult {
  scenario: ScenarioDefinition;
  scenarioPlan: PlanDraft;
  scenarioResults: FireResults;
  deltas: ScenarioDeltaSummary;
}

export const DEFAULT_SCENARIO_TEMPLATES: ScenarioDefinition[] = [
  {
    id: "save-more",
    name: "Save More",
    description: "Increase annual savings by $20,000.",
    adjustments: { expectedAnnualSavings: 20000 },
  },
  {
    id: "spend-less-retirement",
    name: "Spend Less in Retirement",
    description: "Reduce retirement expenses by $20,000.",
    adjustments: { expectedRetirementExpenses: -20000 },
  },
  {
    id: "lower-return",
    name: "Lower Return Environment",
    description: "Reduce expected annual return by 2 percentage points.",
    adjustments: { expectedAnnualReturn: -2 },
  },
  {
    id: "delay-retirement",
    name: "Delay Retirement",
    description: "Increase target retirement age by 5 years.",
    adjustments: { targetRetirementAge: 5 },
  },
  {
    id: "coast-semi-retire",
    name: "Coast / Semi-Retire Path",
    description: "Cut savings by 50% and model part-time retirement work preference.",
    adjustments: { expectedAnnualSavings: -0.5, willingToWorkPartTimeInRetirement: true },
  },
];

function deltaAge(scenarioAge: number | null, baseAge: number | null): number | null {
  if (scenarioAge === null || baseAge === null) return null;
  return scenarioAge - baseAge;
}

export function applyScenarioAdjustments(basePlan: PlanDraft, scenario: ScenarioDefinition): PlanDraft {
  const plan: PlanDraft = { ...basePlan };
  const a = scenario.adjustments;

  if (typeof a.expectedAnnualSavings === "number") {
    plan.expectedAnnualSavings =
      a.expectedAnnualSavings > -1 && a.expectedAnnualSavings < 1
        ? toNonNegative(plan.expectedAnnualSavings * (1 + a.expectedAnnualSavings))
        : toNonNegative(plan.expectedAnnualSavings + a.expectedAnnualSavings);
  }

  if (typeof a.expectedRetirementExpenses === "number") {
    plan.expectedRetirementExpenses = toNonNegative(plan.expectedRetirementExpenses + a.expectedRetirementExpenses);
  }

  if (typeof a.expectedAnnualReturn === "number") {
    plan.expectedAnnualReturn = toNonNegative(plan.expectedAnnualReturn + a.expectedAnnualReturn);
  }

  if (typeof a.targetRetirementAge === "number") {
    plan.targetRetirementAge = Math.max(plan.age, Math.floor(plan.targetRetirementAge + a.targetRetirementAge));
  }

  if (typeof a.willingToWorkPartTimeInRetirement === "boolean") {
    plan.willingToWorkPartTimeInRetirement = a.willingToWorkPartTimeInRetirement;
  }

  return plan;
}

export function compareScenarios(basePlan: PlanDraft, scenarios: ScenarioDefinition[]): {
  baseResults: FireResults;
  comparisons: ScenarioComparisonResult[];
} {
  const baseResults = calculateFireResults(basePlan);

  const comparisons = scenarios.map((scenario) => {
    const scenarioPlan = applyScenarioAdjustments(basePlan, scenario);
    const scenarioResults = calculateFireResults(scenarioPlan);

    return {
      scenario,
      scenarioPlan,
      scenarioResults,
      deltas: {
        coastFireAgeDelta: deltaAge(scenarioResults.fireAges.coast, baseResults.fireAges.coast),
        leanFireAgeDelta: deltaAge(scenarioResults.fireAges.lean, baseResults.fireAges.lean),
        regularFireAgeDelta: deltaAge(scenarioResults.fireAges.regular, baseResults.fireAges.regular),
        fatFireAgeDelta: deltaAge(scenarioResults.fireAges.fat, baseResults.fireAges.fat),
        currentNetWorthDelta: scenarioResults.currentNetWorth - baseResults.currentNetWorth,
      },
    };
  });

  return { baseResults, comparisons };
}

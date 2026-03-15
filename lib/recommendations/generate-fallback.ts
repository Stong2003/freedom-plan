import type {
  RecommendationAction,
  RecommendationPayload,
  RecommendationSection,
  RecommendationSet,
  ScenarioInsight,
} from "@/lib/recommendations/types";

function buildScenarioInsights(payload: RecommendationPayload): ScenarioInsight[] {
  const insights: ScenarioInsight[] = [];

  if (payload.scenarioSummary.bestImproverScenario) {
    insights.push({
      title: "Best improving scenario",
      detail: `${payload.scenarioSummary.bestImproverScenario} currently provides the strongest Regular FIRE acceleration.`,
      impact: "positive",
    });
  }

  if (payload.scenarioSummary.biggestDelayScenario) {
    insights.push({
      title: "Most delaying scenario",
      detail: `${payload.scenarioSummary.biggestDelayScenario} appears to push Regular FIRE furthest later.`,
      impact: "negative",
    });
  }

  insights.push({
    title: "Biggest lever",
    detail: `Scenario analysis indicates ${payload.scenarioSummary.biggestLever.replace("-", " ")} is currently the strongest timing lever.`,
    impact: "neutral",
  });

  insights.push({
    title: "Coast / semi-retire viability",
    detail: payload.scenarioSummary.coastSemiRetireViable
      ? "Coast/Semi-retire path appears viable without materially delaying Regular FIRE."
      : "Coast/Semi-retire path currently appears slower than baseline and should be pressure-tested.",
    impact: payload.scenarioSummary.coastSemiRetireViable ? "positive" : "neutral",
  });

  return insights.slice(0, 4);
}

function buildActions(payload: RecommendationPayload): RecommendationAction[] {
  const actions: RecommendationAction[] = [];

  if (payload.incomeSavingsSummary.savingsRatePercent < 20) {
    actions.push({
      title: "Improve savings rate",
      detail: "Target a higher savings ratio through income growth and fixed-cost control.",
      priority: "high",
    });
  }

  if (payload.expenseSummary.retirementAnnualExpenses > payload.expenseSummary.currentAnnualExpenses) {
    actions.push({
      title: "Revalidate retirement spending target",
      detail: "Pressure-test retirement spending assumptions against desired lifestyle tiers.",
      priority: "high",
    });
  }

  if (payload.assumptionsSummary.expectedAnnualReturn >= 8) {
    actions.push({
      title: "Stress-test return assumptions",
      detail: "Model outcomes at lower return environments to avoid optimistic plan bias.",
      priority: "medium",
    });
  }

  if (payload.riskPreferenceFlags.willingToRelocateForLowerCost) {
    actions.push({
      title: "Quantify relocation upside",
      detail: "Estimate housing/tax/cost-of-living savings from lower-cost retirement locations.",
      priority: "medium",
    });
  }

  actions.push({
    title: "Review scenario deltas quarterly",
    detail: "Update core assumptions and compare scenarios as income/expenses evolve.",
    priority: "low",
  });

  return actions.slice(0, 3);
}

function buildSection(title: string, body: string[], priority: RecommendationSection["priority"]): RecommendationSection {
  return { title, body, priority };
}

export function generateFallbackRecommendations(payload: RecommendationPayload): RecommendationSet {
  const scenarioInsights = buildScenarioInsights(payload);
  const actions = buildActions(payload);

  const summary =
    payload.resultSummary.fireAges.regular === null
      ? "Your current baseline does not reach Regular FIRE by age 80 under v1 assumptions."
      : `Regular FIRE is projected at age ${payload.resultSummary.fireAges.regular} with ${payload.resultSummary.yearsToEachFireType.regular} years remaining.`;

  const strengths = buildSection(
    "Strengths",
    [
      `Current net worth is estimated at $${Math.round(payload.resultSummary.currentNetWorth).toLocaleString()}.`,
      `Current invested assets are estimated at $${Math.round(payload.resultSummary.currentInvestedAssets).toLocaleString()}.`,
      payload.riskPreferenceFlags.willingToWorkPartTimeInRetirement
        ? "You have part-time retirement flexibility, which can reduce downside planning risk."
        : "Your plan currently assumes no part-time retirement income support.",
    ],
    "medium",
  );

  const risks = buildSection(
    "Risks / Constraints",
    payload.warningFlags.length > 0
      ? payload.warningFlags.slice(0, 4).map((flag) => `${flag.label}: ${flag.detail}`)
      : ["No major structural risk flags detected in v1 rule checks."],
    payload.warningFlags.some((flag) => flag.severity === "high") ? "high" : "medium",
  );

  const whatMovesEarlier = [
    "Increasing annual savings and reducing retirement spending assumptions.",
    "Maintaining long-term contribution consistency before target retirement age.",
    "Using scenario-tested adjustments with the strongest positive regular FIRE delta.",
  ];

  const whatCouldDelay = [
    "Lower market returns versus baseline assumptions.",
    "Higher-than-planned recurring expenses in pre- or post-retirement years.",
    "Reduced contribution pace due to income volatility.",
  ];

  return {
    generatedAt: new Date().toISOString(),
    source: "fallback-rules",
    summary,
    strengths,
    risks,
    scenarioInsights,
    actions,
    whatMovesEarlier,
    whatCouldDelay,
    warningFlags: payload.warningFlags,
    disclaimer:
      "Educational planning guidance only. This is not personalized investment, legal, or tax advice.",
  };
}

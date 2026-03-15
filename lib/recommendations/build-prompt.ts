import type { RecommendationPayload } from "@/lib/recommendations/types";

export function buildRecommendationPrompt(payload: RecommendationPayload): string {
  return [
    "You are a financial planning assistant for a FIRE retirement app.",
    "Produce practical, cautious, educational guidance only. Do not provide legal/tax advice.",
    "Keep the tone clear and professional, and avoid unnecessary verbosity.",
    "",
    "Output sections in this exact order:",
    "1) Summary",
    "2) Strengths",
    "3) Risks / Constraints",
    "4) Top 3 Actions",
    "5) Scenario Insights",
    "6) What Could Move FIRE Earlier",
    "7) What Could Delay FIRE",
    "",
    "Use the structured planning payload below:",
    JSON.stringify(payload, null, 2),
  ].join("\n");
}

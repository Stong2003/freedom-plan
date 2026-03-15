import { buildRecommendationPayload } from "@/lib/recommendations/build-payload";
import { buildRecommendationPrompt } from "@/lib/recommendations/build-prompt";
import { generateFallbackRecommendations } from "@/lib/recommendations/generate-fallback";
import type { RecommendationContext } from "@/lib/recommendations/types";

export function generateRecommendationArtifacts(context: RecommendationContext) {
  const payload = buildRecommendationPayload(context);
  const prompt = buildRecommendationPrompt(payload);
  const recommendations = generateFallbackRecommendations(payload);

  return { payload, prompt, recommendations };
}

import { RecommendationSummary } from "@/components/recommendations/recommendation-summary";
import type { RecommendationSet } from "@/lib/recommendations/types";

export function ReportRecommendationsSection({ recommendations }: { recommendations: RecommendationSet }) {
  return <RecommendationSummary recommendations={recommendations} />;
}

import { SectionCard } from "@/components/cards/section-card";
import type { RecommendationSet } from "@/lib/recommendations/types";

interface RecommendationSummaryProps {
  recommendations: RecommendationSet;
}

export function RecommendationSummary({ recommendations }: RecommendationSummaryProps) {
  return (
    <SectionCard className="report-section" title="Your FIRE Strategy Summary" description="Actionable strategy guidance based on your current FIRE Plan inputs.">
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">{recommendations.summary}</p>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-md border bg-secondary/40 p-3">
            <h4 className="text-sm font-semibold">{recommendations.strengths.title}</h4>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
              {recommendations.strengths.body.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-md border bg-secondary/40 p-3">
            <h4 className="text-sm font-semibold">{recommendations.risks.title}</h4>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
              {recommendations.risks.body.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="rounded-md border bg-white p-3">
          <h4 className="text-sm font-semibold">Top 3 actions</h4>
          <ol className="mt-2 space-y-2 text-sm">
            {recommendations.actions.map((action) => (
              <li key={action.title} className="rounded border bg-secondary/30 px-3 py-2">
                <p className="font-medium">{action.title}</p>
                <p className="text-muted-foreground">{action.detail}</p>
              </li>
            ))}
          </ol>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-md border bg-secondary/30 p-3">
            <h4 className="text-sm font-semibold">Scenario insights</h4>
            <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
              {recommendations.scenarioInsights.map((insight) => (
                <li key={insight.title}>• {insight.detail}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-md border bg-secondary/30 p-3">
            <h4 className="text-sm font-semibold">Warnings</h4>
            <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
              {recommendations.warningFlags.slice(0, 4).map((warning) => (
                <li key={warning.id}>• {warning.label}</li>
              ))}
              {recommendations.warningFlags.length === 0 ? <li>• No major warning flags in v1 checks.</li> : null}
            </ul>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-md border bg-secondary/30 p-3">
            <h4 className="text-sm font-semibold">What could move FIRE earlier</h4>
            <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
              {recommendations.whatMovesEarlier.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-md border bg-secondary/30 p-3">
            <h4 className="text-sm font-semibold">What could delay FIRE</h4>
            <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
              {recommendations.whatCouldDelay.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
        </div>


        <p className="text-xs text-muted-foreground">{recommendations.disclaimer}</p>
      </div>
    </SectionCard>
  );
}

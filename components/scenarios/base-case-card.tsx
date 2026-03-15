import { SectionCard } from "@/components/cards/section-card";
import { formatCurrency, formatMilestoneAge, formatYearsRemaining } from "@/lib/fire/formatters";
import type { FireResults } from "@/types/fire";

interface BaseCaseCardProps {
  results: FireResults;
}

export function BaseCaseCard({ results }: BaseCaseCardProps) {
  return (
    <SectionCard title="Base Case" description="Derived from your latest plan inputs.">
      <dl className="grid gap-2 text-sm md:grid-cols-2">
        <div className="rounded-md border bg-secondary/40 px-3 py-2">
          <dt className="text-muted-foreground">Current net worth</dt>
          <dd className="font-medium">{formatCurrency(results.currentNetWorth)}</dd>
        </div>
        <div className="rounded-md border bg-secondary/40 px-3 py-2">
          <dt className="text-muted-foreground">Current invested assets</dt>
          <dd className="font-medium">{formatCurrency(results.currentInvestedAssets)}</dd>
        </div>
        {results.milestones.map((milestone) => (
          <div key={milestone.fireType} className="rounded-md border bg-secondary/40 px-3 py-2">
            <dt className="text-muted-foreground uppercase">{milestone.fireType} FIRE</dt>
            <dd className="font-medium">
              {formatMilestoneAge(milestone.age)} · {formatYearsRemaining(milestone.yearsTo)}
            </dd>
          </div>
        ))}
      </dl>
    </SectionCard>
  );
}

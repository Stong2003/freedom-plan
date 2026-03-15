import { SectionCard } from "@/components/cards/section-card";
import type { ExportMetadataPlaceholder } from "@/lib/report/types";

export function ExportPlaceholderSection({ data }: { data: ExportMetadataPlaceholder }) {
  return (
    <SectionCard
      title="Export & Sharing"
      description="Use Print / Save as PDF today. Additional sharing workflows are listed below."
    >
      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-semibold">Supported now</h4>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
            {data.supportsNow.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold">Coming later</h4>
          <div className="mt-2 grid gap-3 md:grid-cols-3">
            {data.futureActions.map((action) => (
              <div key={action} className="rounded-md border border-dashed bg-secondary/20 p-4">
                <p className="font-medium">{action}</p>
                <p className="text-sm text-muted-foreground">Planned future enhancement.</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionCard>
  );
}

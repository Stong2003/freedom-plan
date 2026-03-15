import { SectionCard } from "@/components/cards/section-card";

export function DisclaimerSection({ disclaimers }: { disclaimers: string[] }) {
  return (
    <SectionCard className="report-section" title="Important Disclaimers / Limitations" description="Please review these before acting on report outputs.">
      <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
        {disclaimers.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </SectionCard>
  );
}

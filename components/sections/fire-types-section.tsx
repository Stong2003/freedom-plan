import { SectionCard } from "@/components/cards/section-card";

const fireTypes = [
  {
    title: "Coast FIRE",
    description: "Build enough early so compounding can carry your investments to retirement with minimal additional contributions.",
  },
  {
    title: "Lean FIRE",
    description: "Retire on a streamlined lifestyle focused on low recurring costs and high flexibility.",
  },
  {
    title: "Regular FIRE",
    description: "Target a balanced retirement lifestyle using your current standard of living as the baseline.",
  },
  {
    title: "Fat FIRE",
    description: "Retire with a premium lifestyle budget and additional safety margins for optionality.",
  },
];

export function FireTypesSection() {
  return (
    <section className="grid gap-4 md:grid-cols-2">
      {fireTypes.map((type) => (
        <SectionCard key={type.title} title={type.title} description={type.description}>
          <div className="h-2 w-full rounded-full bg-secondary" />
        </SectionCard>
      ))}
    </section>
  );
}

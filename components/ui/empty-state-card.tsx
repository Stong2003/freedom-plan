import Link from "next/link";

import { SectionCard } from "@/components/cards/section-card";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface EmptyStateAction {
  label: string;
  href?: string;
  onClick?: () => void;
  variant?: "default" | "secondary" | "outline";
}

interface EmptyStateCardProps {
  title: string;
  description: string;
  actions?: EmptyStateAction[];
}

export function EmptyStateCard({ title, description, actions = [] }: EmptyStateCardProps) {
  return (
    <SectionCard title={title} description={description}>
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">Start with your FIRE Plan to unlock projections, scenario comparisons, and a printable report.</p>
        {actions.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {actions.map((action) =>
              action.href ? (
                <Link
                  key={action.label}
                  href={action.href}
                  className={cn(buttonVariants({ variant: action.variant ?? "default" }))}
                >
                  {action.label}
                </Link>
              ) : (
                <Button key={action.label} type="button" variant={action.variant ?? "default"} onClick={action.onClick}>
                  {action.label}
                </Button>
              ),
            )}
          </div>
        ) : null}
      </div>
    </SectionCard>
  );
}

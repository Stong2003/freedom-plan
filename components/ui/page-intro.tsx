import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface PageIntroProps {
  title: string;
  description: string;
  badge?: string;
  actions?: ReactNode;
  className?: string;
}

export function PageIntro({ title, description, badge, actions, className }: PageIntroProps) {
  return (
    <section className={cn("rounded-xl border bg-gradient-to-br from-white to-secondary/40 p-5 sm:p-6", className)}>
      {badge ? <p className="text-xs font-medium uppercase tracking-[0.16em] text-primary">{badge}</p> : null}
      <div className="mt-2 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h1>
          <p className="max-w-3xl text-sm text-muted-foreground sm:text-base">{description}</p>
        </div>
        {actions ? <div className="flex flex-wrap gap-2">{actions}</div> : null}
      </div>
    </section>
  );
}

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { SectionCard } from "@/components/cards/section-card";
import { Button } from "@/components/ui/button";

const planSchema = z.object({
  age: z.number().min(18).max(70),
  annualIncome: z.number().min(0),
  annualExpenses: z.number().min(0),
});

type PlanSchema = z.infer<typeof planSchema>;

export function PlanFormPlaceholder() {
  const form = useForm<PlanSchema>({
    resolver: zodResolver(planSchema),
    defaultValues: { age: 31, annualIncome: 185000, annualExpenses: 76000 },
  });

  return (
    <SectionCard
      title="Planning Inputs (MVP Scaffold)"
      description="Form structure is wired with React Hook Form + Zod, while advanced validation and calculations are intentionally stubbed."
    >
      <form className="grid gap-4 md:grid-cols-3" onSubmit={form.handleSubmit(() => undefined)}>
        <label className="space-y-2 text-sm">
          <span>Current age</span>
          <input
            type="number"
            className="w-full rounded-md border bg-white px-3 py-2"
            {...form.register("age", { valueAsNumber: true })}
          />
        </label>
        <label className="space-y-2 text-sm">
          <span>Annual income</span>
          <input
            type="number"
            className="w-full rounded-md border bg-white px-3 py-2"
            {...form.register("annualIncome", { valueAsNumber: true })}
          />
        </label>
        <label className="space-y-2 text-sm">
          <span>Annual expenses</span>
          <input
            type="number"
            className="w-full rounded-md border bg-white px-3 py-2"
            {...form.register("annualExpenses", { valueAsNumber: true })}
          />
        </label>
        <div className="md:col-span-3">
          <Button type="submit">Save Inputs (Placeholder)</Button>
        </div>
      </form>
    </SectionCard>
  );
}

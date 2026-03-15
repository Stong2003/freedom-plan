import { SectionCard } from "@/components/cards/section-card";
import { Button } from "@/components/ui/button";
import type { PlanFormValues } from "@/lib/plan/schemas";
import type { PlanStepId } from "@/types/plan";

interface ReviewGroup {
  title: string;
  step: PlanStepId;
  values: Array<{ label: string; value: string }>;
}

interface PlanReviewProps {
  values: PlanFormValues;
  onEdit: (step: PlanStepId) => void;
}

const currency = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

export function PlanReview({ values, onEdit }: PlanReviewProps) {
  const groups: ReviewGroup[] = [
    {
      title: "Profile",
      step: 1,
      values: [
        { label: "Age", value: String(values.age) },
        { label: "Marital status", value: values.maritalStatus },
        { label: "Dependents", value: String(values.dependents) },
        { label: "Current state", value: values.currentState },
        { label: "Retirement location", value: values.retirementLocation },
        { label: "Employment status", value: values.currentEmploymentStatus },
      ],
    },
    {
      title: "Income & Expenses",
      step: 2,
      values: [
        { label: "Annual gross income", value: currency.format(values.annualGrossIncome) },
        { label: "Annual net income", value: currency.format(values.annualNetIncome) },
        { label: "Annual expenses", value: currency.format(values.annualExpenses) },
        { label: "Expected retirement expenses", value: currency.format(values.expectedRetirementExpenses) },
        { label: "Expected annual savings", value: currency.format(values.expectedAnnualSavings) },
      ],
    },
    {
      title: "Assets & Liabilities",
      step: 3,
      values: [
        { label: "Cash", value: currency.format(values.cash) },
        { label: "Taxable investments", value: currency.format(values.taxableInvestments) },
        { label: "Retirement accounts", value: currency.format(values.retirementAccounts) },
        { label: "Real estate equity", value: currency.format(values.realEstateEquity) },
        { label: "Investment property equity", value: currency.format(values.investmentPropertyEquity) },
        { label: "Business equity", value: currency.format(values.businessEquity) },
        { label: "Mortgage balance", value: currency.format(values.mortgageBalance) },
        { label: "Other debt", value: currency.format(values.otherDebt) },
      ],
    },
    {
      title: "Retirement Assumptions",
      step: 4,
      values: [
        { label: "Expected annual return", value: `${values.expectedAnnualReturn}%` },
        { label: "Expected inflation rate", value: `${values.expectedInflationRate}%` },
        { label: "Safe withdrawal rate", value: `${values.safeWithdrawalRate}%` },
        { label: "Target retirement age", value: String(values.targetRetirementAge) },
        { label: "Social Security age", value: String(values.socialSecurityAge) },
        { label: "Include Social Security", value: values.includeSocialSecurity ? "Yes" : "No" },
      ],
    },
    {
      title: "Risk & Preferences",
      step: 5,
      values: [
        { label: "Risk tolerance", value: values.riskTolerance },
        { label: "Preferred FIRE type", value: values.preferredFireType },
        { label: "Willing to relocate", value: values.willingToRelocateForLowerCost ? "Yes" : "No" },
        { label: "Work part-time in retirement", value: values.willingToWorkPartTimeInRetirement ? "Yes" : "No" },
        { label: "Prioritize tax optimization", value: values.prioritizeTaxOptimization ? "Yes" : "No" },
        { label: "Legacy goal", value: values.legacyGoal ? "Yes" : "No" },
      ],
    },
  ];

  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-primary/30 bg-primary/5 p-4 text-sm text-muted-foreground">
        Review each section before generating your Results. You can edit any step and return when ready.
      </div>
      {groups.map((group) => (
        <SectionCard key={group.title} title={group.title} description="Confirm the details for this section.">
          <div className="space-y-3">
            <dl className="grid gap-2 text-sm md:grid-cols-2">
              {group.values.map((item) => (
                <div key={item.label} className="flex items-center justify-between rounded-md border bg-secondary/40 px-3 py-2">
                  <dt className="text-muted-foreground">{item.label}</dt>
                  <dd className="font-medium">{item.value}</dd>
                </div>
              ))}
            </dl>
            <Button variant="outline" type="button" onClick={() => onEdit(group.step)}>
              Edit section
            </Button>
          </div>
        </SectionCard>
      ))}
    </div>
  );
}

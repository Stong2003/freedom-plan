"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";

import { SectionCard } from "@/components/cards/section-card";
import { CheckboxField } from "@/components/forms/checkbox-field";
import { SelectField } from "@/components/forms/select-field";
import { TextInputField } from "@/components/forms/text-input-field";
import { PlanProgress } from "@/components/plan/plan-progress";
import { PlanReview } from "@/components/plan/plan-review";
import { PlanStepNav } from "@/components/plan/plan-step-nav";
import { Button } from "@/components/ui/button";
import { PageIntro } from "@/components/ui/page-intro";
import {
  assetsLiabilitiesStepSchema,
  incomeExpensesStepSchema,
  planSchema,
  profileStepSchema,
  retirementAssumptionsStepSchema,
  riskPreferencesStepSchema,
  type PlanFormValues,
} from "@/lib/plan/schemas";
import { planSteps } from "@/lib/plan/steps";
import { usePlannerStore } from "@/store/planner-store";
import type { PlanStepId } from "@/types/plan";

const stepValidators: Record<Exclude<PlanStepId, 6>, (values: unknown) => { success: boolean }> = {
  1: (values) => profileStepSchema.safeParse(values),
  2: (values) => incomeExpensesStepSchema.safeParse(values),
  3: (values) => assetsLiabilitiesStepSchema.safeParse(values),
  4: (values) => retirementAssumptionsStepSchema.safeParse(values),
  5: (values) => riskPreferencesStepSchema.safeParse(values),
};

export default function PlanPage() {
  const router = useRouter();
  const [saveNotice, setSaveNotice] = useState("");
  const [validationNotice, setValidationNotice] = useState("");
  const {
    currentStep,
    completedSteps,
    planDraft,
    setCurrentStep,
    markStepComplete,
    updatePlanDraft,
  } = usePlannerStore((state) => ({
    currentStep: state.currentStep,
    completedSteps: state.completedSteps,
    planDraft: state.planDraft,
    setCurrentStep: state.setCurrentStep,
    markStepComplete: state.markStepComplete,
    updatePlanDraft: state.updatePlanDraft,
  }));

  const form = useForm<PlanFormValues>({
    resolver: zodResolver(planSchema),
    defaultValues: planDraft,
    mode: "onChange",
  });

  const activeStep = useMemo(() => planSteps.find((step) => step.id === currentStep) ?? planSteps[0], [currentStep]);
  const completionPct = Math.round(((currentStep - 1) / (planSteps.length - 1)) * 100);

  const persistDraft = () => {
    updatePlanDraft(form.getValues());
  };
  const getStepValues = (fields: Array<keyof PlanFormValues>) => {
    const values = form.getValues();
    return fields.reduce<Partial<PlanFormValues>>((acc, field) => {
      acc[field] = values[field];
      return acc;
    }, {});
  };


  const validateCurrentStep = async () => {
    if (currentStep === 6) {
      return true;
    }

    const fields = activeStep.fields;
    const isValidByForm = await form.trigger(fields, { shouldFocus: true });
    if (!isValidByForm) {
      return false;
    }

    const data = getStepValues(fields);
    const validator = stepValidators[currentStep as Exclude<PlanStepId, 6>];
    const parsed = validator(data);
    return parsed.success;
  };

  const handleSaveOnly = () => {
    setValidationNotice("");
    persistDraft();
    setSaveNotice("Step saved.");
  };

  const handleContinue = async () => {
    setSaveNotice("");
    setValidationNotice("");
    const isValid = await validateCurrentStep();
    if (!isValid) {
      setValidationNotice("Please correct the highlighted fields before continuing.");
      return;
    }

    persistDraft();
    if (currentStep < 6) {
      markStepComplete(currentStep);
      setCurrentStep((currentStep + 1) as PlanStepId);
    }
  };

  const handleBack = () => {
    persistDraft();
    if (currentStep > 1) {
      setCurrentStep((currentStep - 1) as PlanStepId);
    }
  };

  const goToResults = async () => {
    const isValid = planSchema.safeParse(form.getValues()).success;
    if (!isValid) {
      return;
    }
    persistDraft();
    markStepComplete(5);
    setCurrentStep(6);
    router.push("/results");
  };

  return (
    <div className="space-y-6">
      <PageIntro
        badge="FIRE Plan"
        title="Plan"
        description="Complete each step to build your FIRE Plan. Your progress is saved locally as you move through the flow."
      />

      <PlanProgress value={completionPct} />

      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <aside className="lg:sticky lg:top-8 lg:h-fit">
          <PlanStepNav
            steps={planSteps.map((step) => ({ id: step.id, name: step.name }))}
            currentStep={currentStep}
            completedSteps={completedSteps}
            onNavigate={(step) => setCurrentStep(step)}
          />
        </aside>

        <SectionCard title={activeStep.name} description={activeStep.description}>
          <form className="space-y-6" onSubmit={(event) => event.preventDefault()}>
            {currentStep === 1 ? (
              <div className="grid gap-4 md:grid-cols-2">
                <TextInputField id="age" label="Age" type="number" register={form.register("age", { valueAsNumber: true })} error={form.formState.errors.age} />
                <SelectField
                  id="maritalStatus"
                  label="Marital status"
                  register={form.register("maritalStatus")}
                  error={form.formState.errors.maritalStatus}
                  options={[
                    { label: "Single", value: "single" },
                    { label: "Married", value: "married" },
                  ]}
                />
                <TextInputField
                  id="dependents"
                  label="Dependents"
                  type="number"
                  register={form.register("dependents", { valueAsNumber: true })}
                  error={form.formState.errors.dependents}
                />
                <TextInputField id="currentState" label="Current state" register={form.register("currentState")} error={form.formState.errors.currentState} />
                <TextInputField
                  id="retirementLocation"
                  label="Retirement location"
                  register={form.register("retirementLocation")}
                  error={form.formState.errors.retirementLocation}
                />
                <SelectField
                  id="currentEmploymentStatus"
                  label="Current employment status"
                  register={form.register("currentEmploymentStatus")}
                  error={form.formState.errors.currentEmploymentStatus}
                  options={[
                    { label: "Employed", value: "employed" },
                    { label: "Self-employed", value: "self-employed" },
                    { label: "Business owner", value: "business-owner" },
                    { label: "Part-time", value: "part-time" },
                    { label: "Other", value: "other" },
                  ]}
                />
              </div>
            ) : null}

            {currentStep === 2 ? (
              <div className="grid gap-4 md:grid-cols-2">
                <TextInputField id="annualGrossIncome" label="Annual gross income" type="number" register={form.register("annualGrossIncome", { valueAsNumber: true })} error={form.formState.errors.annualGrossIncome} />
                <TextInputField id="annualNetIncome" label="Annual net income" type="number" register={form.register("annualNetIncome", { valueAsNumber: true })} error={form.formState.errors.annualNetIncome} />
                <TextInputField id="annualExpenses" label="Annual expenses" type="number" register={form.register("annualExpenses", { valueAsNumber: true })} error={form.formState.errors.annualExpenses} />
                <TextInputField id="expectedRetirementExpenses" label="Expected retirement expenses" type="number" register={form.register("expectedRetirementExpenses", { valueAsNumber: true })} error={form.formState.errors.expectedRetirementExpenses} />
                <TextInputField id="expectedAnnualSavings" label="Expected annual savings" type="number" register={form.register("expectedAnnualSavings", { valueAsNumber: true })} error={form.formState.errors.expectedAnnualSavings} />
              </div>
            ) : null}

            {currentStep === 3 ? (
              <div className="grid gap-4 md:grid-cols-2">
                <TextInputField id="cash" label="Cash" type="number" register={form.register("cash", { valueAsNumber: true })} error={form.formState.errors.cash} />
                <TextInputField id="taxableInvestments" label="Taxable investments" type="number" register={form.register("taxableInvestments", { valueAsNumber: true })} error={form.formState.errors.taxableInvestments} />
                <TextInputField id="retirementAccounts" label="Retirement accounts" type="number" register={form.register("retirementAccounts", { valueAsNumber: true })} error={form.formState.errors.retirementAccounts} />
                <TextInputField id="realEstateEquity" label="Real estate equity" type="number" register={form.register("realEstateEquity", { valueAsNumber: true })} error={form.formState.errors.realEstateEquity} />
                <TextInputField id="investmentPropertyEquity" label="Investment property equity" type="number" register={form.register("investmentPropertyEquity", { valueAsNumber: true })} error={form.formState.errors.investmentPropertyEquity} />
                <TextInputField id="businessEquity" label="Business equity" type="number" register={form.register("businessEquity", { valueAsNumber: true })} error={form.formState.errors.businessEquity} />
                <TextInputField id="mortgageBalance" label="Mortgage balance" type="number" register={form.register("mortgageBalance", { valueAsNumber: true })} error={form.formState.errors.mortgageBalance} />
                <TextInputField id="otherDebt" label="Other debt" type="number" register={form.register("otherDebt", { valueAsNumber: true })} error={form.formState.errors.otherDebt} />
              </div>
            ) : null}

            {currentStep === 4 ? (
              <div className="grid gap-4 md:grid-cols-2">
                <TextInputField id="expectedAnnualReturn" label="Expected annual return (%)" helperText="exp: conservative 4-6%, growth 7-9%" type="number" register={form.register("expectedAnnualReturn", { valueAsNumber: true })} error={form.formState.errors.expectedAnnualReturn} />
                <TextInputField id="expectedInflationRate" label="Expected inflation rate (%)" helperText="Long-run planning assumption" type="number" register={form.register("expectedInflationRate", { valueAsNumber: true })} error={form.formState.errors.expectedInflationRate} />
                <TextInputField id="safeWithdrawalRate" label="Safe withdrawal rate (%)" helperText="Common baseline is 4%" type="number" register={form.register("safeWithdrawalRate", { valueAsNumber: true })} error={form.formState.errors.safeWithdrawalRate} />
                <TextInputField id="targetRetirementAge" label="Target retirement age" type="number" register={form.register("targetRetirementAge", { valueAsNumber: true })} error={form.formState.errors.targetRetirementAge} />
                <TextInputField id="socialSecurityAge" label="Social Security age" type="number" register={form.register("socialSecurityAge", { valueAsNumber: true })} error={form.formState.errors.socialSecurityAge} />
                <div className="md:col-span-2">
                  <CheckboxField id="includeSocialSecurity" label="Include Social Security in retirement planning" register={form.register("includeSocialSecurity")} />
                </div>
              </div>
            ) : null}

            {currentStep === 5 ? (
              <div className="grid gap-4 md:grid-cols-2">
                <SelectField
                  id="riskTolerance"
                  label="Risk tolerance"
                  register={form.register("riskTolerance")}
                  error={form.formState.errors.riskTolerance}
                  options={[
                    { label: "Conservative", value: "conservative" },
                    { label: "Moderate", value: "moderate" },
                    { label: "Aggressive", value: "aggressive" },
                  ]}
                />
                <SelectField
                  id="preferredFireType"
                  label="Preferred FIRE type"
                  register={form.register("preferredFireType")}
                  error={form.formState.errors.preferredFireType}
                  options={[
                    { label: "Coast FIRE", value: "coast" },
                    { label: "Lean FIRE", value: "lean" },
                    { label: "Regular FIRE", value: "regular" },
                    { label: "Fat FIRE", value: "fat" },
                    { label: "Unsure", value: "unsure" },
                  ]}
                />
                <div className="md:col-span-2 grid gap-3 md:grid-cols-2">
                  <CheckboxField
                    id="willingToRelocateForLowerCost"
                    label="Willing to relocate for lower cost"
                    register={form.register("willingToRelocateForLowerCost")}
                  />
                  <CheckboxField
                    id="willingToWorkPartTimeInRetirement"
                    label="Willing to work part-time in retirement"
                    register={form.register("willingToWorkPartTimeInRetirement")}
                  />
                  <CheckboxField
                    id="prioritizeTaxOptimization"
                    label="Prioritize tax optimization"
                    register={form.register("prioritizeTaxOptimization")}
                  />
                  <CheckboxField id="legacyGoal" label="Legacy / estate goal" register={form.register("legacyGoal")} />
                </div>
              </div>
            ) : null}

            {currentStep === 6 ? <PlanReview values={form.getValues()} onEdit={setCurrentStep} /> : null}

            {saveNotice ? <p className="text-sm text-green-700">{saveNotice}</p> : null}
            {validationNotice ? <p className="text-sm text-red-600">{validationNotice}</p> : null}

            <div className="flex flex-wrap items-center justify-between gap-3 border-t pt-6">
              <Button type="button" variant="outline" onClick={handleBack} disabled={currentStep === 1}>
                Back
              </Button>

              <div className="flex flex-wrap gap-3">
                {currentStep < 6 ? (
                  <>
                    <Button type="button" variant="secondary" onClick={handleSaveOnly}>
                      Save Step
                    </Button>
                    <Button type="button" onClick={handleContinue}>
                      Continue
                    </Button>
                  </>
                ) : (
                  <Button type="button" onClick={goToResults}>
                    View Results
                  </Button>
                )}
              </div>
            </div>
          </form>
        </SectionCard>
      </div>
    </div>
  );
}

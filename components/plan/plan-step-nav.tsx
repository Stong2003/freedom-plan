import { CheckCircle2, Circle } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { PlanStepId } from "@/types/plan";

interface StepItem {
  id: PlanStepId;
  name: string;
}

interface PlanStepNavProps {
  steps: StepItem[];
  currentStep: PlanStepId;
  completedSteps: PlanStepId[];
  onNavigate: (step: PlanStepId) => void;
}

export function PlanStepNav({ steps, currentStep, completedSteps, onNavigate }: PlanStepNavProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Planner Steps</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {steps.map((step) => {
          const isActive = step.id === currentStep;
          const isCompleted = completedSteps.includes(step.id);
          const isClickable = step.id <= currentStep || isCompleted;

          return (
            <button
              key={step.id}
              type="button"
              onClick={() => isClickable && onNavigate(step.id)}
              disabled={!isClickable}
              className={cn(
                "flex w-full items-center gap-3 rounded-lg border px-3 py-2 text-left text-sm transition",
                isActive && "border-primary bg-primary/5",
                isCompleted && !isActive && "border-green-200 bg-green-50",
                !isClickable && "cursor-not-allowed opacity-60",
              )}
            >
              {isCompleted ? (
                <CheckCircle2 className="h-4 w-4 text-green-600" />
              ) : (
                <Circle className={cn("h-4 w-4", isActive ? "text-primary" : "text-muted-foreground")} />
              )}
              <span className="font-medium">{step.id}. {step.name}</span>
            </button>
          );
        })}
      </CardContent>
    </Card>
  );
}

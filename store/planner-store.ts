import { create } from "zustand";

import {
  mockAssumptions,
  mockAssetsLiabilities,
  mockIncomeExpenses,
  mockPlanDraft,
  mockResults,
  mockScenarios,
  mockUserProfile,
} from "@/data/mock-data";
import { DEFAULT_SCENARIO_TEMPLATES } from "@/lib/fire/scenarios";
import type {
  AssetsLiabilities,
  FireResults,
  IncomeExpenses,
  RetirementAssumptions,
  ScenarioDefinition,
  UserProfile,
} from "@/types/fire";
import type { PlanDraft, PlanStepId } from "@/types/plan";

interface PlannerState {
  userProfile: UserProfile;
  financialInputs: {
    incomeExpenses: IncomeExpenses;
    assetsLiabilities: AssetsLiabilities;
  };
  assumptions: RetirementAssumptions;
  results: FireResults;
  scenarios: ScenarioDefinition[];
  planDraft: PlanDraft;
  currentStep: PlanStepId;
  completedSteps: PlanStepId[];
  setUserProfile: (profile: UserProfile) => void;
  setIncomeExpenses: (values: IncomeExpenses) => void;
  setAssetsLiabilities: (values: AssetsLiabilities) => void;
  setAssumptions: (values: RetirementAssumptions) => void;
  setResults: (values: FireResults) => void;
  setScenarios: (values: ScenarioDefinition[]) => void;
  updateScenario: (id: string, values: Partial<ScenarioDefinition["adjustments"]>) => void;
  removeScenario: (id: string) => void;
  resetScenario: (id: string) => void;
  restoreDefaultScenarios: () => void;
  setCurrentStep: (step: PlanStepId) => void;
  markStepComplete: (step: PlanStepId) => void;
  updatePlanDraft: (values: Partial<PlanDraft>) => void;
  resetPlan: () => void;
}

const initialPlanState: Pick<PlannerState, "planDraft" | "currentStep" | "completedSteps"> = {
  planDraft: mockPlanDraft,
  currentStep: 1,
  completedSteps: [],
};

const cloneDefaultScenarios = () => DEFAULT_SCENARIO_TEMPLATES.map((scenario) => ({ ...scenario, adjustments: { ...scenario.adjustments } }));

export const usePlannerStore = create<PlannerState>((set) => ({
  userProfile: mockUserProfile,
  financialInputs: {
    incomeExpenses: mockIncomeExpenses,
    assetsLiabilities: mockAssetsLiabilities,
  },
  assumptions: mockAssumptions,
  results: mockResults,
  scenarios: mockScenarios.map((scenario) => ({ ...scenario, adjustments: { ...scenario.adjustments } })),
  ...initialPlanState,
  setUserProfile: (profile) => set({ userProfile: profile }),
  setIncomeExpenses: (values) =>
    set((state) => ({
      financialInputs: { ...state.financialInputs, incomeExpenses: values },
    })),
  setAssetsLiabilities: (values) =>
    set((state) => ({
      financialInputs: { ...state.financialInputs, assetsLiabilities: values },
    })),
  setAssumptions: (values) => set({ assumptions: values }),
  setResults: (values) => set({ results: values }),
  setScenarios: (values) => set({ scenarios: values }),
  updateScenario: (id, values) =>
    set((state) => ({
      scenarios: state.scenarios.map((scenario) =>
        scenario.id === id ? { ...scenario, adjustments: { ...scenario.adjustments, ...values } } : scenario,
      ),
    })),
  removeScenario: (id) =>
    set((state) => ({
      scenarios: state.scenarios.filter((scenario) => scenario.id !== id),
    })),
  resetScenario: (id) =>
    set((state) => {
      const template = DEFAULT_SCENARIO_TEMPLATES.find((scenario) => scenario.id === id);
      if (!template) return state;
      return {
        scenarios: state.scenarios.map((scenario) =>
          scenario.id === id ? { ...template, adjustments: { ...template.adjustments } } : scenario,
        ),
      };
    }),
  restoreDefaultScenarios: () => set({ scenarios: cloneDefaultScenarios() }),
  setCurrentStep: (step) => set({ currentStep: step }),
  markStepComplete: (step) =>
    set((state) => ({
      completedSteps: state.completedSteps.includes(step)
        ? state.completedSteps
        : [...state.completedSteps, step].sort((a, b) => a - b),
    })),
  updatePlanDraft: (values) =>
    set((state) => ({
      planDraft: { ...state.planDraft, ...values },
    })),
  resetPlan: () =>
    set(() => ({
      ...initialPlanState,
    })),
}));

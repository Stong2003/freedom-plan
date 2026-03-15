import type { FireMilestoneStatus } from "@/types/fire";

export function toNonNegative(value: number): number {
  if (!Number.isFinite(value)) return 0;
  return Math.max(0, value);
}

export function toPercentDecimal(percent: number): number {
  return toNonNegative(percent) / 100;
}

export function toRealReturn(nominalPercent: number, inflationPercent: number): number {
  const nominal = toPercentDecimal(nominalPercent);
  const inflation = toPercentDecimal(inflationPercent);
  if (inflation === 0) return nominal;
  return (1 + nominal) / (1 + inflation) - 1;
}

export function safeFireNumber(annualSpend: number, swrPercent: number): number | null {
  const spending = toNonNegative(annualSpend);
  const swrDecimal = toPercentDecimal(swrPercent);
  if (swrDecimal <= 0) return null;
  return spending / swrDecimal;
}

export function firstAgeAtTarget(
  timeline: Array<{ age: number; investedAssets: number }>,
  targetAmount: number | null,
): number | null {
  if (targetAmount === null) return null;
  const hit = timeline.find((row) => row.investedAssets >= targetAmount);
  return hit?.age ?? null;
}

export function resolveMilestoneStatus(age: number, targetAge: number | null): FireMilestoneStatus {
  if (targetAge === null) return "not-reached";
  if (targetAge <= age) return "already-achieved";
  return "projected";
}

export function toYearsRemaining(currentAge: number, milestoneAge: number | null): number | null {
  if (milestoneAge === null) return null;
  return Math.max(0, milestoneAge - currentAge);
}

import type { FireMilestone, FireMilestoneStatus } from "@/types/fire";

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export function formatCurrency(value: number | null): string {
  if (value === null || !Number.isFinite(value)) return "N/A";
  return currency.format(value);
}

export function formatPercent(value: number): string {
  if (!Number.isFinite(value)) return "N/A";
  return `${value.toFixed(1)}%`;
}

export function formatMilestoneAge(age: number | null): string {
  if (age === null) return "Not reached by 80";
  return `Age ${age}`;
}

export function formatYearsRemaining(years: number | null): string {
  if (years === null) return "Not reached by 80";
  if (years === 0) return "Already achieved";
  return `${years} years`;
}

export function formatMilestoneStatus(status: FireMilestoneStatus): string {
  if (status === "already-achieved") return "Already achieved";
  if (status === "projected") return "Projected";
  return "Not reached by 80";
}

export function getFastestMilestone(milestones: FireMilestone[]): FireMilestone | null {
  const projected = milestones
    .filter((item) => item.age !== null)
    .sort((a, b) => (a.age ?? Number.MAX_SAFE_INTEGER) - (b.age ?? Number.MAX_SAFE_INTEGER));
  return projected[0] ?? null;
}


export function formatAgeDelta(delta: number | null): string {
  if (delta === null) return "No comparable baseline";
  if (delta === 0) return "No change";
  if (delta < 0) return `${Math.abs(delta)} years earlier`;
  return `${delta} years later`;
}

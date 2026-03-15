import { MAX_PROJECTION_AGE } from "@/lib/fire/constants";
import { toNonNegative } from "@/lib/fire/helpers";
import type { ProjectionRow } from "@/types/fire";

interface BuildProjectionParams {
  currentAge: number;
  initialInvestedAssets: number;
  annualRealReturn: number;
  annualSavings: number;
  targetRetirementAge: number;
  maxProjectionAge?: number;
  staticNetWorthBase: number;
}

export function buildProjectionTimeline({
  currentAge,
  initialInvestedAssets,
  annualRealReturn,
  annualSavings,
  targetRetirementAge,
  maxProjectionAge = MAX_PROJECTION_AGE,
  staticNetWorthBase,
}: BuildProjectionParams): ProjectionRow[] {
  const startAge = Math.max(18, Math.floor(toNonNegative(currentAge)));
  const endAge = Math.max(startAge, maxProjectionAge);

  let investedAssets = toNonNegative(initialInvestedAssets);
  const rows: ProjectionRow[] = [];

  for (let age = startAge; age <= endAge; age += 1) {
    rows.push({
      age,
      investedAssets,
      netWorth: investedAssets + staticNetWorthBase,
    });

    const growth = investedAssets * annualRealReturn;
    const contribution = age < targetRetirementAge ? toNonNegative(annualSavings) : 0;
    investedAssets = toNonNegative(investedAssets + growth + contribution);
  }

  return rows;
}

export function buildNoContributionTimeline(
  currentAge: number,
  initialInvestedAssets: number,
  annualRealReturn: number,
  maxProjectionAge = MAX_PROJECTION_AGE,
): Array<{ age: number; investedAssets: number }> {
  const startAge = Math.max(18, Math.floor(toNonNegative(currentAge)));
  const endAge = Math.max(startAge, maxProjectionAge);
  const rows: Array<{ age: number; investedAssets: number }> = [];

  let invested = toNonNegative(initialInvestedAssets);
  for (let age = startAge; age <= endAge; age += 1) {
    rows.push({ age, investedAssets: invested });
    invested = toNonNegative(invested + invested * annualRealReturn);
  }

  return rows;
}

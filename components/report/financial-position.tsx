import { MetricCard } from "@/components/cards/metric-card";
import { SectionCard } from "@/components/cards/section-card";
import { formatCurrency } from "@/lib/fire/formatters";
import type { FinancialPositionData } from "@/lib/report/types";

export function FinancialPositionSection({ data }: { data: FinancialPositionData }) {
  return (
    <SectionCard className="report-section" title="Current Financial Position" description="Income, savings, expenses, assets, liabilities, and net worth snapshot.">
      <div className="space-y-4">
        <div className="grid gap-3 md:grid-cols-3">
          <MetricCard label="Gross income" value={formatCurrency(data.annualGrossIncome)} />
          <MetricCard label="Net income" value={formatCurrency(data.annualNetIncome)} />
          <MetricCard label="Annual savings" value={formatCurrency(data.annualSavings)} />
          <MetricCard label="Current expenses" value={formatCurrency(data.annualExpenses)} />
          <MetricCard label="Retirement expenses" value={formatCurrency(data.retirementExpenses)} />
          <MetricCard label="Current invested assets" value={formatCurrency(data.currentInvestedAssets)} />
        </div>
        <div className="grid gap-4 lg:grid-cols-2 text-sm">
          <div className="rounded-md border bg-secondary/30 p-3">
            <h4 className="mb-2 font-semibold">Assets</h4>
            <ul className="space-y-1 text-muted-foreground">
              <li>Cash: {formatCurrency(data.assets.cash)}</li>
              <li>Taxable investments: {formatCurrency(data.assets.taxableInvestments)}</li>
              <li>Retirement accounts: {formatCurrency(data.assets.retirementAccounts)}</li>
              <li>Business equity: {formatCurrency(data.assets.businessEquity)}</li>
              <li>Real estate equity: {formatCurrency(data.assets.realEstateEquity)}</li>
              <li>Investment property equity: {formatCurrency(data.assets.investmentPropertyEquity)}</li>
            </ul>
          </div>
          <div className="rounded-md border bg-secondary/30 p-3">
            <h4 className="mb-2 font-semibold">Liabilities</h4>
            <ul className="space-y-1 text-muted-foreground">
              <li>Mortgage balance: {formatCurrency(data.liabilities.mortgageBalance)}</li>
              <li>Other debt: {formatCurrency(data.liabilities.otherDebt)}</li>
              <li>Total debt: {formatCurrency(data.liabilities.totalDebt)}</li>
              <li className="font-medium text-foreground">Current net worth: {formatCurrency(data.currentNetWorth)}</li>
            </ul>
          </div>
        </div>
      </div>
    </SectionCard>
  );
}

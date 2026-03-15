import { Card, CardContent } from "@/components/ui/card";

interface MetricCardProps {
  label: string;
  value: string;
  helper?: string;
}

export function MetricCard({ label, value, helper }: MetricCardProps) {
  return (
    <Card>
      <CardContent className="space-y-2 p-6">
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="text-2xl font-semibold tracking-tight">{value}</p>
        {helper ? <p className="text-xs text-muted-foreground">{helper}</p> : null}
      </CardContent>
    </Card>
  );
}

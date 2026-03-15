interface PlanProgressProps {
  value: number;
}

export function PlanProgress({ value }: PlanProgressProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium">Completion progress</span>
        <span className="text-muted-foreground">{value}%</span>
      </div>
      <div className="h-2 w-full rounded-full bg-secondary">
        <div className="h-2 rounded-full bg-primary transition-all" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

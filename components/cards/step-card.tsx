import { ArrowRight } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StepCardProps {
  step: number;
  title: string;
  details: string;
}

export function StepCard({ step, title, details }: StepCardProps) {
  return (
    <Card className="h-full">
      <CardHeader>
        <p className="text-xs uppercase tracking-widest text-muted-foreground">Step {step}</p>
        <CardTitle className="flex items-center justify-between text-lg">
          {title}
          <ArrowRight className="h-4 w-4 text-muted-foreground" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{details}</p>
      </CardContent>
    </Card>
  );
}

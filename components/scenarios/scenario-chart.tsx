"use client";

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ScenarioChartProps {
  data: Array<{ name: string; yearsToRegular: number }>;
}

export function ScenarioChart({ data }: ScenarioChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Years to Regular FIRE by Scenario</CardTitle>
      </CardHeader>
      <CardContent className="h-[280px] sm:h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" interval={0} tick={{ fontSize: 12 }} />
            <YAxis />
            <Tooltip />
            <Bar dataKey="yearsToRegular" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

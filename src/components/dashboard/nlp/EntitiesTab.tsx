
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { Entity } from './types';

interface EntitiesTabProps {
  entities: Entity[];
}

const EntitiesTab: React.FC<EntitiesTabProps> = ({ entities }) => {
  return (
    <div className="h-full">
      <div className="mb-3">
        <ChartContainer
          config={{
            count: { label: "Count", color: "hsl(var(--chart-1))" },
          }}
          className="h-32"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={entities} layout="horizontal">
              <XAxis type="number" className="text-xs" />
              <YAxis dataKey="text" type="category" className="text-xs" width={60} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="count" fill="var(--color-count)" />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
      <div className="space-y-1 flex-1 overflow-y-auto">
        {entities.map((entity, idx) => (
          <div key={idx} className="flex justify-between items-center p-2 bg-slate-50 rounded text-xs">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs">
                {entity.type}
              </Badge>
              <span className="font-medium">{entity.text}</span>
            </div>
            <span className="text-slate-600">{entity.confidence}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EntitiesTab;


import React from 'react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { ScatterChart, Scatter, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { EmbeddingDataPoint } from './types';

interface EmbeddingsTabProps {
  data: EmbeddingDataPoint[];
}

const EmbeddingsTab: React.FC<EmbeddingsTabProps> = ({ data }) => {
  return (
    <div className="h-full">
      <ChartContainer
        config={{
          Complaints: { label: "Complaints", color: "#ef4444" },
          Reviews: { label: "Reviews", color: "#3b82f6" },
          Support: { label: "Support", color: "#22c55e" },
          Feedback: { label: "Feedback", color: "#f59e0b" },
        }}
        className="h-full"
      >
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart data={data}>
            <XAxis dataKey="x" className="text-xs" />
            <YAxis dataKey="y" className="text-xs" />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Scatter dataKey="y" fill="#3b82f6" />
          </ScatterChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
};

export default EmbeddingsTab;


import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Feature } from './types';

interface FeatureImportanceTabProps {
  features: Feature[];
}

const FeatureImportanceTab: React.FC<FeatureImportanceTabProps> = ({ features }) => {
  return (
    <div className="space-y-1 max-h-32 overflow-y-auto">
      {features.map((feature, index) => (
        <div key={index} className="flex items-center gap-3 p-2 bg-slate-50 rounded-lg border">
          <div className={`w-3 h-3 rounded-full flex-shrink-0 ${
            feature.status === 'optimized' ? 'bg-green-500' :
            feature.status === 'processing' ? 'bg-blue-500 animate-pulse' : 'bg-gray-300'
          }`}></div>
          <div className="flex-1">
            <div className="text-sm font-medium text-slate-900">{feature.name}</div>
            <div className="text-xs text-slate-500">{feature.type}</div>
          </div>
          <div className="text-right">
            <div className="text-sm font-bold text-purple-600">{feature.importance}</div>
            <Badge variant={feature.status === 'optimized' ? 'default' : 'secondary'} className="text-xs">
              {feature.status}
            </Badge>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeatureImportanceTab;

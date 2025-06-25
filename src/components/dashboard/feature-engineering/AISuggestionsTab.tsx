
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, AlertCircle } from 'lucide-react';
import { AISuggestion } from './types';

interface AISuggestionsTabProps {
  suggestions: AISuggestion[];
}

const AISuggestionsTab: React.FC<AISuggestionsTabProps> = ({ suggestions }) => {
  return (
    <>
      <div className="space-y-2 max-h-32 overflow-y-auto">
        {suggestions.map((suggestion, index) => (
          <div key={index} className="p-2 bg-slate-50 rounded-lg border">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium text-slate-900">{suggestion.feature}</span>
              <Badge variant="outline" className="text-xs">
                {Math.round(suggestion.confidence * 100)}% conf
              </Badge>
            </div>
            <div className="text-sm text-slate-700">{suggestion.suggestion}</div>
            <div className="text-xs text-slate-500">{suggestion.reason}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-2 pt-2">
        <Button size="sm" variant="outline" className="text-xs">
          <CheckCircle className="w-3 h-3 mr-1" />
          Apply All
        </Button>
        <Button size="sm" variant="outline" className="text-xs">
          <AlertCircle className="w-3 h-3 mr-1" />
          Review
        </Button>
      </div>
    </>
  );
};

export default AISuggestionsTab;

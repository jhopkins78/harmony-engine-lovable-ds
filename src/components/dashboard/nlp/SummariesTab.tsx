
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Summary, WordCloudItem } from './types';

interface SummariesTabProps {
  summaries: Summary[];
  wordCloudData: WordCloudItem[];
}

const SummariesTab: React.FC<SummariesTabProps> = ({ summaries, wordCloudData }) => {
  return (
    <div className="space-y-2 h-full overflow-y-auto">
      {summaries.map((summary) => (
        <div key={summary.id} className="p-2 bg-slate-50 rounded border">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">{summary.title}</span>
            <Badge variant="outline" className="text-xs">
              {summary.confidence}
            </Badge>
          </div>
          <p className="text-xs text-slate-700 leading-relaxed">
            {summary.summary}
          </p>
          <div className="text-xs text-slate-500 mt-1">
            {summary.length} chars • Auto-generated
          </div>
        </div>
      ))}
      
      <div className="mt-3">
        <div className="text-xs font-medium mb-2">Word Cloud</div>
        <div className="flex flex-wrap gap-1">
          {wordCloudData.map((word, idx) => (
            <span
              key={idx}
              className={`px-2 py-1 rounded text-xs ${
                word.sentiment === 'positive' ? 'bg-green-100 text-green-700' :
                word.sentiment === 'negative' ? 'bg-red-100 text-red-700' :
                'bg-slate-100 text-slate-700'
              }`}
              style={{ fontSize: `${Math.max(10, Math.min(14, word.frequency / 10))}px` }}
            >
              {word.word}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SummariesTab;

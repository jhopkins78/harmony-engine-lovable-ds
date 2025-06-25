
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Topic } from './types';

interface TopicsTabProps {
  topics: Topic[];
}

const TopicsTab: React.FC<TopicsTabProps> = ({ topics }) => {
  return (
    <div className="space-y-2 h-full overflow-y-auto">
      {topics.map((topic) => (
        <div key={topic.id} className="p-2 bg-slate-50 rounded border">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">{topic.name}</span>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-600">{topic.docs} docs</span>
              <Badge variant="outline" className="text-xs">
                {topic.coherence}
              </Badge>
            </div>
          </div>
          <div className="mt-1">
            <div className="flex flex-wrap gap-1 text-xs">
              {topic.keywords.map((keyword, idx) => (
                <span key={idx} className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded">
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
      <div className="mt-3 p-2 bg-indigo-50 rounded border border-indigo-200">
        <div className="text-xs text-indigo-800 font-medium">Harmony Output:</div>
        <div className="text-xs text-indigo-700 mt-1">
          "Top 3 topics identified. Summary: 'Customers are most concerned with refund policy.'"
        </div>
      </div>
    </div>
  );
};

export default TopicsTab;

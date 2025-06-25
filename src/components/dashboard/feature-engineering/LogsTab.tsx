
import React from 'react';
import { LogItem } from './types';

interface LogsTabProps {
  logs: LogItem[];
}

const LogsTab: React.FC<LogsTabProps> = ({ logs }) => {
  return (
    <div className="space-y-2 max-h-32 overflow-y-auto">
      {logs.map((log, index) => (
        <div key={index} className="flex items-start gap-2 p-2 bg-slate-50 rounded-lg border">
          <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
            log.status === 'success' ? 'bg-green-500' : 'bg-blue-500 animate-pulse'
          }`}></div>
          <div className="flex-1 min-w-0">
            <div className="text-xs text-slate-400">{log.time}</div>
            <div className="text-sm text-slate-700">{log.action}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LogsTab;

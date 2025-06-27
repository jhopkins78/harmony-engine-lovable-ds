
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Play, Pause } from 'lucide-react';

interface DashboardHeaderProps {
  isRealTime: boolean;
  lastUpdate: Date;
  onToggleRealTime: () => void;
}

const DashboardHeader = ({ isRealTime, lastUpdate, onToggleRealTime }: DashboardHeaderProps) => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Harmony Engine Data Science
          </h1>
          <p className="text-lg text-slate-600 mt-2">
            Advanced Data Science Platform for Statistical Analysis & Team Collaboration
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Badge variant={isRealTime ? "default" : "secondary"} className="px-3 py-1">
            {isRealTime ? "Live Analytics" : "Paused"}
          </Badge>
          <Button
            variant="outline"
            size="sm"
            onClick={onToggleRealTime}
            className="flex items-center gap-2"
          >
            {isRealTime ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            {isRealTime ? "Pause" : "Resume"}
          </Button>
          <span className="text-sm text-slate-500">
            Last update: {lastUpdate.toLocaleTimeString()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;

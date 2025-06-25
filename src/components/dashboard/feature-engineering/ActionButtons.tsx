
import React from 'react';
import { Button } from '@/components/ui/button';
import { Zap, Download } from 'lucide-react';

const ActionButtons = () => {
  return (
    <div className="grid grid-cols-2 gap-2">
      <Button size="sm" variant="outline" className="text-xs">
        <Zap className="w-3 h-3 mr-1" />
        Auto-Generate
      </Button>
      <Button size="sm" variant="outline" className="text-xs">
        <Download className="w-3 h-3 mr-1" />
        Export Logs
      </Button>
    </div>
  );
};

export default ActionButtons;

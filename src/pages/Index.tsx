
import React, { useState, useEffect } from 'react';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import DataIngestionPanel from '@/components/dashboard/DataIngestionPanel';
import DataTransformationPanel from '@/components/dashboard/DataTransformationPanel';
import ModelPerformancePanel from '@/components/dashboard/ModelPerformancePanel';
import BiasDetectionPanel from '@/components/dashboard/BiasDetectionPanel';
import CollaborationPanel from '@/components/dashboard/CollaborationPanel';
import ExperimentationPanel from '@/components/dashboard/ExperimentationPanel';
import { Button } from '@/components/ui/button';
import { FileText, Database, Code, BarChart3 } from 'lucide-react';

const Dashboard = () => {
  const [isRealTime, setIsRealTime] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  // Simulate real-time updates
  useEffect(() => {
    if (isRealTime) {
      const interval = setInterval(() => {
        setLastUpdate(new Date());
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isRealTime]);

  const handleToggleRealTime = () => {
    setIsRealTime(!isRealTime);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-6 py-6">
        <DashboardHeader 
          isRealTime={isRealTime}
          lastUpdate={lastUpdate}
          onToggleRealTime={handleToggleRealTime}
        />

        {/* Main Dashboard Grid - 3 columns, 2 rows */}
        <div className="grid grid-cols-3 grid-rows-2 gap-6 h-[calc(100vh-240px)] mb-6">
          {/* Top Row - 60% height */}
          <div className="row-span-1 h-full">
            <DataIngestionPanel />
          </div>
          <div className="row-span-1 h-full">
            <DataTransformationPanel />
          </div>
          <div className="row-span-1 h-full">
            <ModelPerformancePanel />
          </div>

          {/* Bottom Row - 40% height */}
          <div className="row-span-1 h-full">
            <CollaborationPanel />
          </div>
          <div className="row-span-1 h-full">
            <ExperimentationPanel />
          </div>
          <div className="row-span-1 h-full">
            <BiasDetectionPanel />
          </div>
        </div>

        {/* Footer Toolbar */}
        <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-sm border-t border-slate-200 px-6 py-3">
          <div className="container mx-auto flex justify-center gap-4">
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Jupyter
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Database className="w-4 h-4" />
              SQL
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Code className="w-4 h-4" />
              Python
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              R
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

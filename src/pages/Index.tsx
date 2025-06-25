
import React, { useState, useEffect } from 'react';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import DataIngestionPanel from '@/components/dashboard/DataIngestionPanel';
import DataTransformationPanel from '@/components/dashboard/DataTransformationPanel';
import ModelPerformancePanel from '@/components/dashboard/ModelPerformancePanel';
import BiasDetectionPanel from '@/components/dashboard/BiasDetectionPanel';
import CollaborationPanel from '@/components/dashboard/CollaborationPanel';
import ExperimentationPanel from '@/components/dashboard/ExperimentationPanel';

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <DashboardHeader 
        isRealTime={isRealTime}
        lastUpdate={lastUpdate}
        onToggleRealTime={handleToggleRealTime}
      />

      {/* Dashboard Grid */}
      <div className="grid grid-cols-12 grid-rows-2 gap-6 h-[calc(100vh-200px)]">
        <DataIngestionPanel />
        <DataTransformationPanel />
        <ModelPerformancePanel />
        <BiasDetectionPanel />
        <CollaborationPanel />
        <ExperimentationPanel />
      </div>
    </div>
  );
};

export default Dashboard;

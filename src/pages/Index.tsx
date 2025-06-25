
import React, { useState, useEffect } from 'react';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import DataIngestionPanel from '@/components/dashboard/DataIngestionPanel';
import DataTransformationPanel from '@/components/dashboard/DataTransformationPanel';
import ModelPerformancePanel from '@/components/dashboard/ModelPerformancePanel';
import BiasDetectionPanel from '@/components/dashboard/BiasDetectionPanel';
import CollaborationPanel from '@/components/dashboard/CollaborationPanel';
import ExperimentationPanel from '@/components/dashboard/ExperimentationPanel';
import FeatureEngineeringPanel from '@/components/dashboard/FeatureEngineeringPanel';
import PipelineOrchestrationPanel from '@/components/dashboard/PipelineOrchestrationPanel';
import ModelExplainabilityPanel from '@/components/dashboard/ModelExplainabilityPanel';
import MemoryGraphPanel from '@/components/dashboard/MemoryGraphPanel';
import StructuredDataUploadConsole from '@/components/dashboard/StructuredDataUploadConsole';
import UnstructuredDataUploadConsole from '@/components/dashboard/UnstructuredDataUploadConsole';
import TimeSeriesConsole from '@/components/dashboard/TimeSeriesConsole';
import BayesianConsole from '@/components/dashboard/BayesianConsole';
import CausalInferenceConsole from '@/components/dashboard/CausalInferenceConsole';
import AnomalyDetectionConsole from '@/components/dashboard/AnomalyDetectionConsole';
import NLPConsole from '@/components/dashboard/NLPConsole';
import { Button } from '@/components/ui/button';
import { FileText, Database, Code, BarChart3, ChevronDown, ChevronUp } from 'lucide-react';

const Dashboard = () => {
  const [isRealTime, setIsRealTime] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [showUploadPanel, setShowUploadPanel] = useState(false);

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 pb-20">
      <div className="container mx-auto px-6 py-6">
        <DashboardHeader 
          isRealTime={isRealTime}
          lastUpdate={lastUpdate}
          onToggleRealTime={handleToggleRealTime}
        />

        {/* Data Upload Panel Toggle */}
        <div className="mb-4">
          <Button
            variant="outline"
            onClick={() => setShowUploadPanel(!showUploadPanel)}
            className="flex items-center gap-2"
          >
            <Database className="w-4 h-4" />
            Data Upload Consoles
            {showUploadPanel ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </Button>
        </div>

        {/* Data Upload Consoles */}
        {showUploadPanel && (
          <div className="grid grid-cols-2 gap-6 mb-6">
            <StructuredDataUploadConsole />
            <UnstructuredDataUploadConsole />
          </div>
        )}

        {/* Main Dashboard Grid - Fixed height container */}
        <div className="grid grid-cols-3 grid-rows-2 gap-6 h-[500px] mb-8">
          {/* Top Row */}
          <div className="row-span-1">
            <DataIngestionPanel />
          </div>
          <div className="row-span-1">
            <DataTransformationPanel />
          </div>
          <div className="row-span-1">
            <ModelPerformancePanel />
          </div>

          {/* Bottom Row - 4 columns */}
          <div className="col-span-3 row-span-1">
            <div className="grid grid-cols-4 gap-6 h-full">
              <div>
                <FeatureEngineeringPanel />
              </div>
              <div>
                <PipelineOrchestrationPanel />
              </div>
              <div>
                <ModelExplainabilityPanel />
              </div>
              <div>
                <MemoryGraphPanel />
              </div>
            </div>
          </div>
        </div>

        {/* Advanced Analytics Consoles - Fixed height horizontal scrollable */}
        <div className="mt-16">
          <h3 className="text-lg font-semibold mb-6 text-slate-700">Advanced Analytics Consoles</h3>
          <div className="w-full overflow-x-auto pb-4">
            <div className="flex gap-6 items-start min-h-[480px] scroll-smooth snap-x snap-mandatory">
              <div className="flex-shrink-0 w-80 snap-start">
                <TimeSeriesConsole />
              </div>
              <div className="flex-shrink-0 w-80 snap-start">
                <BayesianConsole />
              </div>
              <div className="flex-shrink-0 w-80 snap-start">
                <CausalInferenceConsole />
              </div>
              <div className="flex-shrink-0 w-80 snap-start">
                <AnomalyDetectionConsole />
              </div>
              <div className="flex-shrink-0 w-80 snap-start">
                <NLPConsole />
              </div>
            </div>
          </div>
        </div>

        {/* Footer Toolbar */}
        <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-sm border-t border-slate-200 px-6 py-3 z-10">
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

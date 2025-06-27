
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { GitBranch, AlertTriangle, Play, Pause, Eye } from 'lucide-react';
import { useHarmonyData } from '@/hooks/useHarmonyData';

interface LivePipelineOrchestrationPanelProps {
  datasetId?: string;
}

const LivePipelineOrchestrationPanel = ({ datasetId }: LivePipelineOrchestrationPanelProps) => {
  const { getPipelineStatus, agentLogs, retryAgent, loading } = useHarmonyData(datasetId);

  const pipelineStatus = getPipelineStatus();
  const recentLogs = agentLogs.slice(0, 4);

  const pipelineSteps = [
    { id: 1, name: 'Data Ingestion', agent: 'extraction', status: pipelineStatus.extraction || 'pending' },
    { id: 2, name: 'Data Validation', agent: 'validation', status: pipelineStatus.validation || 'pending' },
    { id: 3, name: 'Transformation', agent: 'transformation', status: pipelineStatus.transformation || 'pending' },
    { id: 4, name: 'Audio Processing', agent: 'audio', status: pipelineStatus.audio || 'pending' },
    { id: 5, name: 'Model Training', agent: 'model', status: pipelineStatus.model || 'pending' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'running': return 'bg-blue-500 animate-pulse';
      case 'failed': return 'bg-red-500';
      default: return 'bg-gray-300';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed': return 'default';
      case 'running': return 'secondary';
      case 'failed': return 'destructive';
      default: return 'outline';
    }
  };

  const getOverallStatus = () => {
    const statuses = Object.values(pipelineStatus);
    if (statuses.some(s => s === 'failed')) return 'Failed';
    if (statuses.some(s => s === 'running')) return 'Running';
    if (statuses.every(s => s === 'completed')) return 'Completed';
    return 'Pending';
  };

  const handleRetry = async (agentName: string) => {
    try {
      await retryAgent(agentName);
    } catch (error) {
      console.error('Failed to retry agent:', error);
    }
  };

  if (loading) {
    return (
      <Card className="h-full flex flex-col border-2 border-orange-200 shadow-lg">
        <CardContent className="flex-1 flex items-center justify-center">
          <div className="text-slate-500">Loading pipeline status...</div>
        </CardContent>
      </Card>
    );
  }

  const overallStatus = getOverallStatus();
  const failedStep = pipelineSteps.find(step => step.status === 'failed');

  return (
    <Card className="h-full flex flex-col border-2 border-orange-200 shadow-lg">
      <CardHeader className="pb-3 flex-shrink-0">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-orange-700 text-lg">
            <GitBranch className="w-5 h-5" />
            Pipeline Orchestration & Dependency Flow
          </CardTitle>
          <Badge variant={overallStatus === 'Failed' ? 'destructive' : overallStatus === 'Running' ? 'secondary' : 'default'} 
                 className={overallStatus === 'Failed' ? 'bg-red-100 text-red-800' : ''}>
            {overallStatus}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 overflow-hidden">
        <Tabs defaultValue="flow" className="h-full flex flex-col">
          <TabsList className="grid w-full grid-cols-3 mb-3">
            <TabsTrigger value="flow" className="text-xs">Flow</TabsTrigger>
            <TabsTrigger value="logs" className="text-xs">Logs</TabsTrigger>
            <TabsTrigger value="metrics" className="text-xs">Metrics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="flow" className="flex-1 space-y-2">
            <div className="space-y-1">
              {pipelineSteps.slice(0, 3).map((step) => (
                <div key={step.id} className="flex items-center gap-3 p-2 bg-slate-50 rounded-lg border">
                  <div className={`w-3 h-3 rounded-full flex-shrink-0 ${getStatusColor(step.status)}`}></div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-slate-900">{step.name}</div>
                    <div className="text-xs text-slate-500">{step.agent}</div>
                  </div>
                  <Badge variant={getStatusBadge(step.status)} className="text-xs">
                    {step.status}
                  </Badge>
                </div>
              ))}
            </div>
            
            {failedStep && (
              <Alert className="border-red-200 bg-red-50">
                <AlertTriangle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-800 text-sm">
                  {failedStep.name} failed - Check logs for details
                </AlertDescription>
              </Alert>
            )}

            <div className="grid grid-cols-3 gap-2 pt-2">
              <Button size="sm" variant="outline" className="text-xs" onClick={() => failedStep && handleRetry(failedStep.agent)}>
                <Play className="w-3 h-3 mr-1" />
                Retry
              </Button>
              <Button size="sm" variant="outline" className="text-xs">
                <Pause className="w-3 h-3 mr-1" />
                Pause
              </Button>
              <Button size="sm" variant="outline" className="text-xs">
                <Eye className="w-3 h-3 mr-1" />
                Debug
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="logs" className="flex-1 space-y-2">
            <div className="space-y-2 max-h-28 overflow-y-auto">
              {recentLogs.map((log, index) => (
                <div key={index} className="flex items-start gap-2 p-2 bg-slate-50 rounded-lg border">
                  <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                    log.log_level === 'error' ? 'bg-red-500' :
                    log.log_level === 'warning' ? 'bg-yellow-500' : 'bg-green-500'
                  }`}></div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-400">{new Date(log.timestamp).toLocaleTimeString()}</span>
                      <span className="text-xs font-medium text-slate-600">{log.agent}</span>
                    </div>
                    <div className="text-sm text-slate-700">{log.message}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-2 pt-2">
              <Button size="sm" variant="outline" className="text-xs" onClick={() => failedStep && handleRetry(failedStep.agent)}>
                <Play className="w-3 h-3 mr-1" />
                Retry
              </Button>
              <Button size="sm" variant="outline" className="text-xs">
                <Pause className="w-3 h-3 mr-1" />
                Pause
              </Button>
              <Button size="sm" variant="outline" className="text-xs">
                <Eye className="w-3 h-3 mr-1" />
                Debug
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="metrics" className="flex-1 space-y-2">
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                <div className="text-sm font-medium text-blue-700">Active Steps</div>
                <div className="text-lg font-bold text-blue-800">
                  {Object.values(pipelineStatus).filter(s => s === 'running').length}
                </div>
              </div>
              <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                <div className="text-sm font-medium text-green-700">Completed</div>
                <div className="text-lg font-bold text-green-800">
                  {Object.values(pipelineStatus).filter(s => s === 'completed').length}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 pt-2">
              <Button size="sm" variant="outline" className="text-xs" onClick={() => failedStep && handleRetry(failedStep.agent)}>
                <Play className="w-3 h-3 mr-1" />
                Retry
              </Button>
              <Button size="sm" variant="outline" className="text-xs">
                <Pause className="w-3 h-3 mr-1" />
                Pause
              </Button>
              <Button size="sm" variant="outline" className="text-xs">
                <Eye className="w-3 h-3 mr-1" />
                Debug
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default LivePipelineOrchestrationPanel;

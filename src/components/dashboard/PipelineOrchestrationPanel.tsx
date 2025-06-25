
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { GitBranch, AlertTriangle, Play, Pause, Eye } from 'lucide-react';

const PipelineOrchestrationPanel = () => {
  const pipelineSteps = [
    { id: 1, name: 'Data Ingestion', status: 'completed', duration: '2.3s' },
    { id: 2, name: 'Data Validation', status: 'completed', duration: '0.8s' },
    { id: 3, name: 'Transformation', status: 'running', duration: '1.2s' },
    { id: 4, name: 'Audio Processing', status: 'failed', duration: '—' },
    { id: 5, name: 'Model Training', status: 'pending', duration: '—' }
  ];

  const jobLogs = [
    { time: '14:25', stage: 'Stage 4', message: 'Schema drift detected in audio ingestion', level: 'error' },
    { time: '14:24', stage: 'Stage 3', message: 'Transformation pipeline started', level: 'info' },
    { time: '14:23', stage: 'Stage 2', message: 'Data validation completed successfully', level: 'success' },
    { time: '14:22', stage: 'Stage 1', message: 'Ingested 3,930 records', level: 'success' }
  ];

  return (
    <Card className="h-full flex flex-col border-2 border-orange-200 shadow-lg">
      <CardHeader className="pb-4 flex-shrink-0">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-orange-700 text-lg">
            <GitBranch className="w-5 h-5" />
            Pipeline Orchestration & Dependency Flow
          </CardTitle>
          <Badge variant="destructive" className="bg-red-100 text-red-800">
            Failed
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 overflow-hidden">
        <Tabs defaultValue="flow" className="h-full flex flex-col">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="flow" className="text-xs">Flow</TabsTrigger>
            <TabsTrigger value="logs" className="text-xs">Logs</TabsTrigger>
            <TabsTrigger value="metrics" className="text-xs">Metrics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="flow" className="flex-1 space-y-3">
            <div className="space-y-2">
              {pipelineSteps.map((step) => (
                <div key={step.id} className="flex items-center gap-3 p-2 bg-slate-50 rounded-lg border">
                  <div className={`w-3 h-3 rounded-full flex-shrink-0 ${
                    step.status === 'completed' ? 'bg-green-500' :
                    step.status === 'running' ? 'bg-blue-500 animate-pulse' :
                    step.status === 'failed' ? 'bg-red-500' : 'bg-gray-300'
                  }`}></div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-slate-900">{step.name}</div>
                    <div className="text-xs text-slate-500">{step.duration}</div>
                  </div>
                  <Badge variant={
                    step.status === 'completed' ? 'default' :
                    step.status === 'running' ? 'secondary' :
                    step.status === 'failed' ? 'destructive' : 'outline'
                  } className="text-xs">
                    {step.status}
                  </Badge>
                </div>
              ))}
            </div>
            
            <Alert className="border-red-200 bg-red-50">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-800 text-sm">
                Stage 4 failed: Schema drift detected in audio ingestion
              </AlertDescription>
            </Alert>
          </TabsContent>
          
          <TabsContent value="logs" className="flex-1 space-y-2">
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {jobLogs.map((log, index) => (
                <div key={index} className="flex items-start gap-2 p-2 bg-slate-50 rounded-lg border">
                  <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                    log.level === 'error' ? 'bg-red-500' :
                    log.level === 'success' ? 'bg-green-500' : 'bg-blue-500'
                  }`}></div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-400">{log.time}</span>
                      <span className="text-xs font-medium text-slate-600">{log.stage}</span>
                    </div>
                    <div className="text-sm text-slate-700">{log.message}</div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="metrics" className="flex-1 space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                <div className="text-sm font-medium text-blue-700">Avg Runtime</div>
                <div className="text-lg font-bold text-blue-800">4.2s</div>
              </div>
              <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                <div className="text-sm font-medium text-green-700">Success Rate</div>
                <div className="text-lg font-bold text-green-800">92%</div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="grid grid-cols-3 gap-2 mt-4">
          <Button size="sm" variant="outline" className="text-xs">
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
      </CardContent>
    </Card>
  );
};

export default PipelineOrchestrationPanel;

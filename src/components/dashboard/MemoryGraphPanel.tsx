
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Network, Clock, Database, Eye } from 'lucide-react';

const MemoryGraphPanel = () => {
  const memoryNodes = [
    { agent: 'EDA Agent', connections: 3, last_access: '2m ago', data_type: 'normalized_dataset' },
    { agent: 'Model Agent', connections: 2, last_access: '5m ago', data_type: 'feature_matrix' },
    { agent: 'Bias Agent', connections: 4, last_access: '8m ago', data_type: 'fairness_metrics' },
    { agent: 'Transform Agent', connections: 1, last_access: '12m ago', data_type: 'pipeline_config' }
  ];

  const memoryQueries = [
    { time: '14:25', query: 'GET feature_importance_scores', agent: 'Model Agent', status: 'success' },
    { time: '14:23', query: 'WRITE normalized_dataset', agent: 'EDA Agent', status: 'success' },
    { time: '14:20', query: 'READ bias_metrics', agent: 'Bias Agent', status: 'success' },
    { time: '14:18', query: 'UPDATE pipeline_state', agent: 'Transform Agent', status: 'success' }
  ];

  const agentHandoffs = [
    { time: '12:45 PM', from: 'EDA Agent', to: 'Model Agent', data: 'normalized dataset', size: '2.3MB' },
    { time: '12:42 PM', from: 'Transform Agent', to: 'EDA Agent', data: 'cleaned features', size: '1.8MB' },
    { time: '12:38 PM', from: 'Bias Agent', to: 'Model Agent', data: 'fairness constraints', size: '0.5MB' }
  ];

  return (
    <Card className="h-full flex flex-col border-2 border-violet-200 shadow-lg">
      <CardHeader className="pb-4 flex-shrink-0">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-violet-700 text-lg">
            <Network className="w-5 h-5" />
            Harmony Shared Memory & Inter-Agent Insights
          </CardTitle>
          <Badge variant="secondary" className="bg-violet-100 text-violet-800">
            Active
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 overflow-hidden">
        <Tabs defaultValue="graph" className="h-full flex flex-col">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="graph" className="text-xs">Graph</TabsTrigger>
            <TabsTrigger value="queries" className="text-xs">Queries</TabsTrigger>
            <TabsTrigger value="handoffs" className="text-xs">Handoffs</TabsTrigger>
          </TabsList>
          
          <TabsContent value="graph" className="flex-1 space-y-3">
            <div className="space-y-2">
              {memoryNodes.map((node, index) => (
                <div key={index} className="flex items-center gap-3 p-2 bg-slate-50 rounded-lg border">
                  <div className="w-8 h-8 bg-violet-100 rounded-full flex items-center justify-center">
                    <Database className="w-4 h-4 text-violet-600" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-slate-900">{node.agent}</div>
                    <div className="text-xs text-slate-500">{node.data_type}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-slate-400">{node.last_access}</div>
                    <div className="text-xs text-violet-600">{node.connections} connections</div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="bg-violet-50 p-3 rounded-lg border border-violet-200">
              <div className="text-sm font-medium text-violet-700">Harmony Output</div>
              <div className="text-sm text-violet-800">EDA Agent passed normalized dataset to Model Agent at 12:45 PM</div>
            </div>
          </TabsContent>
          
          <TabsContent value="queries" className="flex-1 space-y-2">
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {memoryQueries.map((query, index) => (
                <div key={index} className="flex items-start gap-2 p-2 bg-slate-50 rounded-lg border">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-400">{query.time}</span>
                      <span className="text-xs font-medium text-slate-600">{query.agent}</span>
                    </div>
                    <div className="text-sm text-slate-700">{query.query}</div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="handoffs" className="flex-1 space-y-2">
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {agentHandoffs.map((handoff, index) => (
                <div key={index} className="p-2 bg-slate-50 rounded-lg border">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-slate-400">{handoff.time}</span>
                    <span className="text-xs text-slate-500">{handoff.size}</span>
                  </div>
                  <div className="text-sm text-slate-700">
                    <span className="font-medium">{handoff.from}</span>
                    <span className="mx-2">→</span>
                    <span className="font-medium">{handoff.to}</span>
                  </div>
                  <div className="text-xs text-slate-600">{handoff.data}</div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="grid grid-cols-2 gap-2 mt-4">
          <Button size="sm" variant="outline" className="text-xs">
            <Clock className="w-3 h-3 mr-1" />
            Timeline
          </Button>
          <Button size="sm" variant="outline" className="text-xs">
            <Eye className="w-3 h-3 mr-1" />
            Trace
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default MemoryGraphPanel;

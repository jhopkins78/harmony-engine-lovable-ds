
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Zap, Database, FileText, BarChart3, Code } from 'lucide-react';

const ExperimentationPanel = () => {
  const experimentData = [
    { experiment: 'SVM vs XGBoost', metric: 'F1', improvement: 3, pvalue: 0.02, confidence: 95 },
    { experiment: 'Neural Net Audio', metric: 'Accuracy', improvement: 5, pvalue: 0.01, confidence: 99 },
    { experiment: 'Bias Mitigation', metric: 'Fairness', improvement: 40, pvalue: 0.001, confidence: 99.9 },
    { experiment: 'Feature Selection', metric: 'Latency', improvement: -15, pvalue: 0.03, confidence: 97 }
  ];

  return (
    <Card className="h-full flex flex-col border-2 border-cyan-200 shadow-lg">
      <CardHeader className="pb-4 flex-shrink-0">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-cyan-700 text-lg">
            <Zap className="w-5 h-5" />
            Advanced Metrics & Experimentation
          </CardTitle>
          <Badge variant="secondary" className="bg-cyan-100 text-cyan-800">
            Running
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 overflow-hidden">
        <Tabs defaultValue="experiments" className="h-full flex flex-col">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="experiments" className="text-sm">Experiments</TabsTrigger>
            <TabsTrigger value="metrics" className="text-sm">Statistical Tests</TabsTrigger>
          </TabsList>
          
          <TabsContent value="experiments" className="flex-1 space-y-3">
            <div className="h-24">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={experimentData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="experiment" tick={{ fontSize: 8 }} />
                  <YAxis tick={{ fontSize: 10 }} />
                  <Tooltip />
                  <Bar dataKey="improvement" fill="#06b6d4" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="bg-green-50 p-3 rounded-lg border border-green-200">
              <div className="text-sm font-medium text-green-700">Latest Result</div>
              <div className="text-sm text-green-800">Neural Net Audio: +5% accuracy (p&lt;0.01)</div>
            </div>
          </TabsContent>
          
          <TabsContent value="metrics" className="flex-1 space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-cyan-50 p-3 rounded-lg border border-cyan-200">
                <div className="text-sm font-medium text-cyan-700">P-values</div>
                <div className="text-lg font-bold text-cyan-800">0.001-0.03</div>
              </div>
              <div className="bg-cyan-50 p-3 rounded-lg border border-cyan-200">
                <div className="text-sm font-medium text-cyan-700">Min Confidence</div>
                <div className="text-lg font-bold text-cyan-800">95%</div>
              </div>
            </div>
            
            <div className="bg-cyan-50 p-3 rounded-lg border border-cyan-200">
              <div className="text-sm font-medium text-cyan-700 mb-2">🔮 Harmony Suggests</div>
              <div className="text-sm text-cyan-800 mb-2">Try neural network for audio transcription (95% confidence)</div>
              <Button size="sm" className="text-xs bg-cyan-600 hover:bg-cyan-700">
                Run Experiment
              </Button>
            </div>
          </TabsContent>
        </Tabs>

        <div className="grid grid-cols-4 gap-1 mt-4">
          <Button size="sm" variant="outline" className="text-xs">
            <Database className="w-3 h-3" />
          </Button>
          <Button size="sm" variant="outline" className="text-xs">
            <FileText className="w-3 h-3" />
          </Button>
          <Button size="sm" variant="outline" className="text-xs">
            <Code className="w-3 h-3" />
          </Button>
          <Button size="sm" variant="outline" className="text-xs">
            <BarChart3 className="w-3 h-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExperimentationPanel;

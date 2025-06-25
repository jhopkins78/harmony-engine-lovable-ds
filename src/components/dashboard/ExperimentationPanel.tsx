
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Zap, GitBranch, Database, FileText, BarChart3 } from 'lucide-react';

const ExperimentationPanel = () => {
  const experimentData = [
    { experiment: 'SVM vs XGBoost', metric: 'F1', improvement: 3, pvalue: 0.02, confidence: 95 },
    { experiment: 'Neural Net Audio', metric: 'Accuracy', improvement: 5, pvalue: 0.01, confidence: 99 },
    { experiment: 'Bias Mitigation', metric: 'Fairness', improvement: 40, pvalue: 0.001, confidence: 99.9 },
    { experiment: 'Feature Selection', metric: 'Latency', improvement: -15, pvalue: 0.03, confidence: 97 }
  ];

  return (
    <Card className="col-span-4 row-span-1 border-2 border-cyan-200 shadow-lg">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-cyan-700">
          <Zap className="w-5 h-5" />
          Advanced Metrics & Experimentation
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Tabs defaultValue="experiments" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="experiments" className="text-xs">Experiments</TabsTrigger>
            <TabsTrigger value="metrics" className="text-xs">Statistical Tests</TabsTrigger>
          </TabsList>
          
          <TabsContent value="experiments" className="space-y-3">
            <ResponsiveContainer width="100%" height={120}>
              <BarChart data={experimentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="experiment" tick={{ fontSize: 8 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip />
                <Bar dataKey="improvement" fill="#06b6d4" />
              </BarChart>
            </ResponsiveContainer>
            
            <div className="bg-green-50 p-2 rounded border border-green-200">
              <div className="text-xs font-medium text-green-700">Latest Result</div>
              <div className="text-sm text-green-800">Neural Net Audio: +5% accuracy (p&lt;0.01)</div>
            </div>
          </TabsContent>
          
          <TabsContent value="metrics" className="space-y-2">
            <div className="space-y-2">
              <div className="text-xs font-medium">Statistical Validation</div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-cyan-50 p-2 rounded">
                  <div className="font-semibold">P-values</div>
                  <div>Range: 0.001-0.03</div>
                </div>
                <div className="bg-cyan-50 p-2 rounded">
                  <div className="font-semibold">Confidence</div>
                  <div>Min: 95%</div>
                </div>
              </div>
              
              <div className="bg-cyan-50 p-2 rounded border border-cyan-200">
                <div className="text-xs font-medium text-cyan-700 mb-1">🔮 Harmony Suggests</div>
                <div className="text-xs text-cyan-800">Try neural network for audio transcription (95% confidence)</div>
                <div className="mt-1">
                  <Button size="sm" className="text-xs bg-cyan-600 hover:bg-cyan-700">
                    Run Experiment
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="grid grid-cols-4 gap-2">
          <Button size="sm" variant="outline" className="text-xs">
            <GitBranch className="w-3 h-3 mr-1" />
            Jupyter
          </Button>
          <Button size="sm" variant="outline" className="text-xs">
            <Database className="w-3 h-3 mr-1" />
            SQL
          </Button>
          <Button size="sm" variant="outline" className="text-xs">
            <FileText className="w-3 h-3 mr-1" />
            Python
          </Button>
          <Button size="sm" variant="outline" className="text-xs">
            <BarChart3 className="w-3 h-3 mr-1" />
            R
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExperimentationPanel;

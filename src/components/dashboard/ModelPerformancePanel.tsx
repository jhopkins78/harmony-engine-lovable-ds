
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Brain, TrendingUp, Eye, GitBranch } from 'lucide-react';

const ModelPerformancePanel = () => {
  const modelPerformanceData = [
    { model: 'XGBoost', f1: 0.92, rmse: 1.5, auc: 0.94, training_time: 45, inference: 2 },
    { model: 'Random Forest', f1: 0.89, rmse: 1.8, auc: 0.91, training_time: 30, inference: 4 },
    { model: 'Neural Network', f1: 0.94, rmse: 1.3, auc: 0.96, training_time: 120, inference: 1 },
    { model: 'SVM', f1: 0.87, rmse: 2.1, auc: 0.88, training_time: 60, inference: 3 },
    { model: 'LightGBM', f1: 0.91, rmse: 1.6, auc: 0.93, training_time: 25, inference: 1.5 }
  ];

  return (
    <Card className="col-span-3 row-span-1 border-2 border-green-200 shadow-lg">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-green-700">
          <Brain className="w-5 h-5" />
          Model Performance & Selection
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Tabs defaultValue="performance" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="performance" className="text-xs">Performance</TabsTrigger>
            <TabsTrigger value="selection" className="text-xs">Selection</TabsTrigger>
          </TabsList>
          
          <TabsContent value="performance" className="space-y-3">
            <ResponsiveContainer width="100%" height={120}>
              <BarChart data={modelPerformanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="model" tick={{ fontSize: 8 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip />
                <Bar dataKey="f1" fill="#10b981" />
                <Bar dataKey="auc" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
            
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-green-50 p-2 rounded">
                <div className="font-semibold">Best F1</div>
                <div>Neural Net: 0.94</div>
              </div>
              <div className="bg-blue-50 p-2 rounded">
                <div className="font-semibold">Best AUC</div>
                <div>Neural Net: 0.96</div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="selection" className="space-y-2">
            <div className="text-xs font-medium">Selection Criteria</div>
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span>Training Time (min)</span>
                <span>25-120</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>Inference (sec)</span>
                <span>1-4</span>
              </div>
              <div className="flex justify-between text-xs">
                <span>Memory (GB)</span>
                <span>2-8</span>
              </div>
            </div>
            
            <Alert className="border-red-200 bg-red-50">
              <TrendingUp className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-800 text-xs">
                KL divergence: 0.3—retrain needed
              </AlertDescription>
            </Alert>
          </TabsContent>
        </Tabs>

        <div className="grid grid-cols-2 gap-2">
          <Button size="sm" variant="outline" className="text-xs">
            <Eye className="w-3 h-3 mr-1" />
            SHAP
          </Button>
          <Button size="sm" variant="outline" className="text-xs">
            <GitBranch className="w-3 h-3 mr-1" />
            Compare
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ModelPerformancePanel;

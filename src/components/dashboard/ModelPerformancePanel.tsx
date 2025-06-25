
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Brain, TrendingUp, Eye, BarChart3 } from 'lucide-react';

const ModelPerformancePanel = () => {
  const modelPerformanceData = [
    { model: 'XGBoost', f1: 0.92, rmse: 1.5, auc: 0.94, training_time: 45, inference: 2 },
    { model: 'Random Forest', f1: 0.89, rmse: 1.8, auc: 0.91, training_time: 30, inference: 4 },
    { model: 'Neural Net', f1: 0.94, rmse: 1.3, auc: 0.96, training_time: 120, inference: 1 },
    { model: 'SVM', f1: 0.87, rmse: 2.1, auc: 0.88, training_time: 60, inference: 3 },
    { model: 'LightGBM', f1: 0.91, rmse: 1.6, auc: 0.93, training_time: 25, inference: 1.5 }
  ];

  return (
    <Card className="h-full flex flex-col border-2 border-green-200 shadow-lg">
      <CardHeader className="pb-4 flex-shrink-0">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-green-700 text-lg">
            <Brain className="w-5 h-5" />
            Model Performance & Selection
          </CardTitle>
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            Optimized
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 overflow-hidden">
        <Tabs defaultValue="performance" className="h-full flex flex-col">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="performance" className="text-sm">Performance</TabsTrigger>
            <TabsTrigger value="selection" className="text-sm">Selection</TabsTrigger>
          </TabsList>
          
          <TabsContent value="performance" className="flex-1 space-y-3">
            <div className="h-32">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={modelPerformanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="model" tick={{ fontSize: 8 }} />
                  <YAxis tick={{ fontSize: 10 }} />
                  <Tooltip />
                  <Bar dataKey="f1" fill="#10b981" />
                  <Bar dataKey="auc" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                <div className="text-sm font-medium text-green-700">Best F1</div>
                <div className="text-lg font-bold text-green-800">Neural Net: 0.94</div>
              </div>
              <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                <div className="text-sm font-medium text-blue-700">Best AUC</div>
                <div className="text-lg font-bold text-blue-800">Neural Net: 0.96</div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="selection" className="flex-1 space-y-3">
            <div className="space-y-2">
              <div className="text-sm font-medium text-slate-700">Selection Criteria</div>
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Training Time:</span>
                  <span className="font-semibold">25-120 min</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Inference:</span>
                  <span className="font-semibold">1-4 sec</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Memory:</span>
                  <span className="font-semibold">2-8 GB</span>
                </div>
              </div>
            </div>
            
            <Alert className="border-red-200 bg-red-50">
              <TrendingUp className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-800 text-sm">
                KL divergence: 0.3—retrain needed
              </AlertDescription>
            </Alert>
          </TabsContent>
        </Tabs>

        <div className="grid grid-cols-2 gap-2 mt-4">
          <Button size="sm" variant="outline" className="text-sm">
            <Eye className="w-3 h-3 mr-2" />
            SHAP
          </Button>
          <Button size="sm" variant="outline" className="text-sm">
            <BarChart3 className="w-3 h-3 mr-2" />
            Compare
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ModelPerformancePanel;


import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Filter, Clock, Settings } from 'lucide-react';

const DataTransformationPanel = () => {
  const transformationMetrics = [
    { process: 'Duplicate Removal', impact: 10, variance: 95, error: 2 },
    { process: 'Missing Value Imputation', impact: 5, variance: 98, error: 3 },
    { process: 'Feature Scaling', impact: 0, variance: 95, error: 1 },
    { process: 'Encoding', impact: 15, variance: 90, error: 5 },
    { process: 'PCA Reduction', impact: 20, variance: 95, error: 2 }
  ];

  return (
    <Card className="col-span-2 row-span-1 border-2 border-purple-200 shadow-lg">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-purple-700">
          <Filter className="w-5 h-5" />
          Cleaning & Transformation
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-800">95%</div>
          <div className="text-sm text-purple-600">variance preserved</div>
        </div>

        <div className="space-y-2">
          <div className="text-sm font-medium">Transformation Impact</div>
          <ResponsiveContainer width="100%" height={100}>
            <LineChart data={transformationMetrics}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="process" tick={{ fontSize: 8 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip />
              <Line type="monotone" dataKey="variance" stroke="#8b5cf6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-2">
          <div className="text-xs font-medium">Processing Stats</div>
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span>Duplicates Removed</span>
              <span className="font-semibold">10%</span>
            </div>
            <div className="flex justify-between text-xs">
              <span>Values Imputed</span>
              <span className="font-semibold">5%</span>
            </div>
            <div className="flex justify-between text-xs">
              <span>PCA Components</span>
              <span className="font-semibold">10</span>
            </div>
            <div className="flex justify-between text-xs">
              <span>Sparsity (One-hot)</span>
              <span className="font-semibold">80%</span>
            </div>
          </div>
        </div>

        <Alert className="border-yellow-200 bg-yellow-50">
          <Clock className="h-4 w-4 text-yellow-600" />
          <AlertDescription className="text-yellow-800 text-xs">
            High imputation error in audio—review method
          </AlertDescription>
        </Alert>

        <Button size="sm" variant="outline" className="w-full text-xs">
          <Settings className="w-3 h-3 mr-1" />
          Pipeline Config
        </Button>
      </CardContent>
    </Card>
  );
};

export default DataTransformationPanel;


import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Filter, Clock, Settings } from 'lucide-react';

const DataTransformationPanel = () => {
  const transformationMetrics = [
    { process: 'Duplicates', impact: 10, variance: 95, error: 2 },
    { process: 'Imputation', impact: 5, variance: 98, error: 3 },
    { process: 'Scaling', impact: 0, variance: 95, error: 1 },
    { process: 'Encoding', impact: 15, variance: 90, error: 5 },
    { process: 'PCA', impact: 20, variance: 95, error: 2 }
  ];

  return (
    <Card className="h-full flex flex-col border-2 border-purple-200 shadow-lg">
      <CardHeader className="pb-4 flex-shrink-0">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-purple-700 text-lg">
            <Filter className="w-5 h-5" />
            Cleaning & Transformation
          </CardTitle>
          <Badge variant="secondary" className="bg-purple-100 text-purple-800">
            Active
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 overflow-hidden space-y-4">
        {/* Variance Preserved */}
        <div className="text-center bg-purple-50 p-4 rounded-lg border border-purple-200">
          <div className="text-3xl font-bold text-purple-800">95%</div>
          <div className="text-sm text-purple-600">variance preserved</div>
        </div>

        {/* Transformation Impact Chart */}
        <div className="space-y-2">
          <div className="text-sm font-medium text-slate-700">Transformation Impact</div>
          <div className="h-24">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={transformationMetrics}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="process" tick={{ fontSize: 8 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip />
                <Line type="monotone" dataKey="variance" stroke="#8b5cf6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Processing Stats */}
        <div className="space-y-2">
          <div className="text-sm font-medium text-slate-700">Processing Statistics</div>
          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Duplicates Removed:</span>
              <span className="font-semibold">10%</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Values Imputed:</span>
              <span className="font-semibold">5%</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">PCA Components:</span>
              <span className="font-semibold">10</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Sparsity (One-hot):</span>
              <span className="font-semibold">80%</span>
            </div>
          </div>
        </div>

        {/* Alert */}
        <Alert className="border-yellow-200 bg-yellow-50">
          <Clock className="h-4 w-4 text-yellow-600" />
          <AlertDescription className="text-yellow-800 text-sm">
            High imputation error in audio—review method
          </AlertDescription>
        </Alert>

        {/* Action Button */}
        <Button size="sm" variant="outline" className="w-full text-sm">
          <Settings className="w-3 h-3 mr-2" />
          Pipeline Config
        </Button>
      </CardContent>
    </Card>
  );
};

export default DataTransformationPanel;

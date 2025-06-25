
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Database, AlertTriangle, Eye, BarChart3 } from 'lucide-react';

const DataIngestionPanel = () => {
  const ingestionQualityData = [
    { type: 'PDFs', processed: 1500, completeness: 85, consistency: 92, accuracy: 95, anomalies: 5 },
    { type: 'Emails', processed: 800, completeness: 90, consistency: 88, accuracy: 92, anomalies: 8 },
    { type: 'Audio', processed: 30, completeness: 78, consistency: 85, accuracy: 88, anomalies: 12 },
    { type: 'Contracts', processed: 600, completeness: 95, consistency: 97, accuracy: 97, anomalies: 3 },
    { type: 'Sheets', processed: 900, completeness: 98, consistency: 94, accuracy: 96, anomalies: 4 }
  ];

  return (
    <Card className="h-full flex flex-col border-2 border-blue-200 shadow-lg">
      <CardHeader className="pb-4 flex-shrink-0">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-blue-700 text-lg">
            <Database className="w-5 h-5" />
            Data Ingestion & Quality Metrics
          </CardTitle>
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
            Live
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 overflow-hidden space-y-4">
        {/* Summary Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-green-50 p-3 rounded-lg border border-green-200">
            <div className="text-sm font-medium text-green-700">Total Processed</div>
            <div className="text-2xl font-bold text-green-800">3,930</div>
          </div>
          <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
            <div className="text-sm font-medium text-blue-700">Avg Quality</div>
            <div className="text-2xl font-bold text-blue-800">92.4%</div>
          </div>
        </div>

        {/* Alert */}
        <Alert className="border-orange-200 bg-orange-50">
          <AlertTriangle className="h-4 w-4 text-orange-600" />
          <AlertDescription className="text-orange-800 text-sm">
            High missing data in contract PDFs—review pipeline
          </AlertDescription>
        </Alert>

        {/* Quality Chart */}
        <div className="space-y-2">
          <div className="text-sm font-medium text-slate-700">Quality Metrics by Type</div>
          <div className="h-32">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ingestionQualityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="type" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip />
                <Bar dataKey="completeness" fill="#3b82f6" />
                <Bar dataKey="consistency" fill="#10b981" />
                <Bar dataKey="accuracy" fill="#f59e0b" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Statistical Metrics */}
        <div className="space-y-2">
          <div className="text-sm font-medium text-slate-700">Statistical Metrics</div>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-600">Missing Values:</span>
              <span className="font-semibold">15%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Format Errors:</span>
              <span className="font-semibold">8%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Outliers:</span>
              <span className="font-semibold">5%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Entropy:</span>
              <span className="font-semibold">0.73</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-2">
          <Button size="sm" variant="outline" className="text-sm">
            <Eye className="w-3 h-3 mr-2" />
            Lineage
          </Button>
          <Button size="sm" variant="outline" className="text-sm">
            <BarChart3 className="w-3 h-3 mr-2" />
            Stats
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default DataIngestionPanel;

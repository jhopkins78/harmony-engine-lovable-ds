
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Database, AlertTriangle, Eye, BarChart3 } from 'lucide-react';

const DataIngestionPanel = () => {
  const ingestionQualityData = [
    { type: 'PDFs', processed: 1500, completeness: 85, consistency: 92, accuracy: 95, anomalies: 5 },
    { type: 'Emails', processed: 800, completeness: 90, consistency: 88, accuracy: 92, anomalies: 8 },
    { type: 'Audio', processed: 30, completeness: 78, consistency: 85, accuracy: 88, anomalies: 12 },
    { type: 'Contracts', processed: 600, completeness: 95, consistency: 97, accuracy: 97, anomalies: 3 },
    { type: 'Spreadsheets', processed: 900, completeness: 98, consistency: 94, accuracy: 96, anomalies: 4 }
  ];

  return (
    <Card className="col-span-3 row-span-1 border-2 border-blue-200 shadow-lg">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-blue-700">
          <Database className="w-5 h-5" />
          Data Ingestion & Quality Metrics
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="bg-green-50 p-2 rounded border border-green-200">
            <div className="font-semibold text-green-700">Total Processed</div>
            <div className="text-xl font-bold text-green-800">3,930</div>
          </div>
          <div className="bg-blue-50 p-2 rounded border border-blue-200">
            <div className="font-semibold text-blue-700">Avg Quality</div>
            <div className="text-xl font-bold text-blue-800">92.4%</div>
          </div>
        </div>

        <Alert className="border-orange-200 bg-orange-50">
          <AlertTriangle className="h-4 w-4 text-orange-600" />
          <AlertDescription className="text-orange-800 text-xs">
            High missing data in contract PDFs—review pipeline
          </AlertDescription>
        </Alert>

        <div className="space-y-2">
          <div className="text-sm font-medium">Quality Metrics by Type</div>
          <ResponsiveContainer width="100%" height={120}>
            <BarChart data={ingestionQualityData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="type" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip />
              <Bar dataKey="completeness" fill="#3b82f6" />
              <Bar dataKey="consistency" fill="#10b981" />
              <Bar dataKey="accuracy" fill="#f59e0b" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-2">
          <div className="text-xs">Statistical Metrics:</div>
          <div className="grid grid-cols-2 gap-1 text-xs">
            <div>Missing Values: 15%</div>
            <div>Format Errors: 8%</div>
            <div>Outliers: 5%</div>
            <div>Entropy: 0.73</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Button size="sm" variant="outline" className="text-xs">
            <Eye className="w-3 h-3 mr-1" />
            Lineage
          </Button>
          <Button size="sm" variant="outline" className="text-xs">
            <BarChart3 className="w-3 h-3 mr-1" />
            Stats
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default DataIngestionPanel;

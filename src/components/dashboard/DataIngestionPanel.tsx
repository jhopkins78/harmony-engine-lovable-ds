
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Database, AlertTriangle, Eye, BarChart3 } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';

interface QualityMetric {
  type: string;
  processed: number;
  completeness: number;
  consistency: number;
  accuracy: number;
  anomalies: number;
}

interface DataIngestionResponse {
  totalProcessed: number;
  averageQuality: number;
  statisticalMetrics: {
    missingValues: number;
    formatErrors: number;
    outliers: number;
    entropy: number;
  };
  typeBreakdown: QualityMetric[];
}

const fetchDataIngestionQuality = async (): Promise<DataIngestionResponse> => {
  console.log('Fetching data from FastAPI backend...');
  const response = await fetch('http://localhost:8001/api/data-ingestion-quality');
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  const data = await response.json();
  console.log('FastAPI response:', data);
  return data;
};

const DataIngestionPanel = () => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['data-ingestion-quality'],
    queryFn: fetchDataIngestionQuality,
    refetchInterval: 5000, // Refetch every 5 seconds for real-time updates
    retry: 3,
  });

  // Fallback data for when API is not available
  const fallbackData: DataIngestionResponse = {
    totalProcessed: 3930,
    averageQuality: 92.4,
    statisticalMetrics: {
      missingValues: 15,
      formatErrors: 8,
      outliers: 5,
      entropy: 0.73
    },
    typeBreakdown: [
      { type: 'PDFs', processed: 1500, completeness: 85, consistency: 92, accuracy: 95, anomalies: 5 },
      { type: 'Emails', processed: 800, completeness: 90, consistency: 88, accuracy: 92, anomalies: 8 },
      { type: 'Audio', processed: 30, completeness: 78, consistency: 85, accuracy: 88, anomalies: 12 },
      { type: 'Contracts', processed: 600, completeness: 95, consistency: 97, accuracy: 97, anomalies: 3 },
      { type: 'Sheets', processed: 900, completeness: 98, consistency: 94, accuracy: 96, anomalies: 4 }
    ]
  };

  const displayData = data || fallbackData;
  const isUsingFallback = !data && !isLoading;

  return (
    <Card className="h-full flex flex-col border-2 border-blue-200 shadow-lg">
      <CardHeader className="pb-4 flex-shrink-0">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-blue-700 text-lg">
            <Database className="w-5 h-5" />
            Data Ingestion & Quality Metrics
          </CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant={error ? "destructive" : isUsingFallback ? "secondary" : "default"} className={error ? "" : isUsingFallback ? "bg-yellow-100 text-yellow-800" : "bg-blue-100 text-blue-800"}>
              {error ? "Error" : isUsingFallback ? "Fallback" : "Live"}
            </Badge>
            {isLoading && <div className="text-xs text-slate-500">Loading...</div>}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 overflow-hidden space-y-4">
        {/* Error Alert */}
        {error && (
          <Alert className="border-red-200 bg-red-50">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800 text-sm">
              FastAPI connection failed: {error.message}. Using fallback data.
              <Button 
                size="sm" 
                variant="outline" 
                onClick={() => refetch()} 
                className="ml-2 h-6"
              >
                Retry
              </Button>
            </AlertDescription>
          </Alert>
        )}

        {/* Summary Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-green-50 p-3 rounded-lg border border-green-200">
            <div className="text-sm font-medium text-green-700">Total Processed</div>
            <div className="text-2xl font-bold text-green-800">
              {displayData.totalProcessed.toLocaleString()}
            </div>
          </div>
          <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
            <div className="text-sm font-medium text-blue-700">Avg Quality</div>
            <div className="text-2xl font-bold text-blue-800">
              {displayData.averageQuality.toFixed(1)}%
            </div>
          </div>
        </div>

        {/* Dynamic Alert based on data */}
        <Alert className="border-orange-200 bg-orange-50">
          <AlertTriangle className="h-4 w-4 text-orange-600" />
          <AlertDescription className="text-orange-800 text-sm">
            {displayData.statisticalMetrics.missingValues > 10 
              ? `High missing data (${displayData.statisticalMetrics.missingValues}%)—review pipeline`
              : `Data quality looks good (${displayData.statisticalMetrics.missingValues}% missing)`
            }
          </AlertDescription>
        </Alert>

        {/* Quality Chart */}
        <div className="space-y-2">
          <div className="text-sm font-medium text-slate-700">Quality Metrics by Type</div>
          <div className="h-32">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={displayData.typeBreakdown}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="type" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip />
                <Bar dataKey="completeness" fill="#3b82f6" name="Completeness" />
                <Bar dataKey="consistency" fill="#10b981" name="Consistency" />
                <Bar dataKey="accuracy" fill="#f59e0b" name="Accuracy" />
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
              <span className="font-semibold">{displayData.statisticalMetrics.missingValues}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Format Errors:</span>
              <span className="font-semibold">{displayData.statisticalMetrics.formatErrors}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Outliers:</span>
              <span className="font-semibold">{displayData.statisticalMetrics.outliers}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-slate-600">Entropy:</span>
              <span className="font-semibold">{displayData.statisticalMetrics.entropy.toFixed(2)}</span>
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

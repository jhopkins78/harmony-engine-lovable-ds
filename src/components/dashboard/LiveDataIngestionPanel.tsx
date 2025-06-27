
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Database, AlertTriangle, Eye, BarChart3 } from 'lucide-react';
import { useHarmonyData } from '@/hooks/useHarmonyData';

interface LiveDataIngestionPanelProps {
  datasetId?: string;
}

const LiveDataIngestionPanel = ({ datasetId }: LiveDataIngestionPanelProps) => {
  const { metrics, getMetricsByAgent, getErrorLogs, loading } = useHarmonyData(datasetId);

  const ingestionMetrics = getMetricsByAgent('extraction');
  const errorLogs = getErrorLogs();
  
  // Transform metrics into chart data
  const chartData = React.useMemo(() => {
    const metricsMap: Record<string, any> = {};
    
    ingestionMetrics.forEach(metric => {
      const key = metric.metric_key;
      const value = metric.type === 'number' ? parseFloat(metric.value) : metric.value;
      metricsMap[key] = value;
    });

    return [
      { type: 'PDFs', processed: metricsMap.pdf_processed || 0, completeness: metricsMap.pdf_completeness || 0, consistency: metricsMap.pdf_consistency || 0, accuracy: metricsMap.pdf_accuracy || 0 },
      { type: 'Emails', processed: metricsMap.email_processed || 0, completeness: metricsMap.email_completeness || 0, consistency: metricsMap.email_consistency || 0, accuracy: metricsMap.email_accuracy || 0 },
      { type: 'Audio', processed: metricsMap.audio_processed || 0, completeness: metricsMap.audio_completeness || 0, consistency: metricsMap.audio_consistency || 0, accuracy: metricsMap.audio_accuracy || 0 },
      { type: 'Contracts', processed: metricsMap.contract_processed || 0, completeness: metricsMap.contract_completeness || 0, consistency: metricsMap.contract_consistency || 0, accuracy: metricsMap.contract_accuracy || 0 },
      { type: 'Sheets', processed: metricsMap.sheet_processed || 0, completeness: metricsMap.sheet_completeness || 0, consistency: metricsMap.sheet_consistency || 0, accuracy: metricsMap.sheet_accuracy || 0 }
    ];
  }, [ingestionMetrics]);

  const totalProcessed = chartData.reduce((sum, item) => sum + item.processed, 0);
  const avgQuality = chartData.length > 0 
    ? chartData.reduce((sum, item) => sum + ((item.completeness + item.consistency + item.accuracy) / 3), 0) / chartData.length 
    : 0;

  const recentError = errorLogs.find(log => log.agent === 'extraction');

  if (loading) {
    return (
      <Card className="h-full flex flex-col border-2 border-blue-200 shadow-lg">
        <CardContent className="flex-1 flex items-center justify-center">
          <div className="text-slate-500">Loading ingestion data...</div>
        </CardContent>
      </Card>
    );
  }

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
            <div className="text-2xl font-bold text-green-800">{totalProcessed.toLocaleString()}</div>
          </div>
          <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
            <div className="text-sm font-medium text-blue-700">Avg Quality</div>
            <div className="text-2xl font-bold text-blue-800">{avgQuality.toFixed(1)}%</div>
          </div>
        </div>

        {/* Error Alert */}
        {recentError && (
          <Alert className="border-orange-200 bg-orange-50">
            <AlertTriangle className="h-4 w-4 text-orange-600" />
            <AlertDescription className="text-orange-800 text-sm">
              {recentError.message}
            </AlertDescription>
          </Alert>
        )}

        {/* Quality Chart */}
        <div className="space-y-2">
          <div className="text-sm font-medium text-slate-700">Quality Metrics by Type</div>
          <div className="h-32">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
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
              <span className="font-semibold">{ingestionMetrics.find(m => m.metric_key === 'missing_values')?.value || '0%'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Format Errors:</span>
              <span className="font-semibold">{ingestionMetrics.find(m => m.metric_key === 'format_errors')?.value || '0%'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Outliers:</span>
              <span className="font-semibold">{ingestionMetrics.find(m => m.metric_key === 'outliers')?.value || '0%'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Entropy:</span>
              <span className="font-semibold">{ingestionMetrics.find(m => m.metric_key === 'entropy')?.value || '0.0'}</span>
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

export default LiveDataIngestionPanel;

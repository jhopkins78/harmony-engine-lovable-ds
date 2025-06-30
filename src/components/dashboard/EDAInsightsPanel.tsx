
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BarChart3, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import { BASE_API_URL } from '@/config/api';

interface EDAData {
  datasetShape: {
    rows: number;
    columns: number;
  };
  missingValues: number;
  duplicateRows: number;
  topCorrelations: Array<{
    feature1: string;
    feature2: string;
    correlation: number;
  }>;
  importantFeatures: string[];
  status: 'completed' | 'in_progress' | 'failed';
}

const EDAInsightsPanel = () => {
  const [edaData, setEdaData] = useState<EDAData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEDAInsights = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${BASE_API_URL}/eda-insights`, {
          headers: {
            'ngrok-skip-browser-warning': 'true'
          }
        });

        if (response.ok) {
          const data = await response.json();
          setEdaData(data);
        } else {
          throw new Error('Failed to fetch EDA insights');
        }
      } catch (err) {
        console.error('EDA insights fetch error:', err);
        setError('Unable to fetch EDA insights');
        // Use mock data as fallback
        setEdaData({
          datasetShape: { rows: 6000, columns: 22 },
          missingValues: 3,
          duplicateRows: 1.2,
          topCorrelations: [
            { feature1: 'feature_5', feature2: 'feature_9', correlation: 0.91 }
          ],
          importantFeatures: ['feature_3', 'feature_7', 'feature_15'],
          status: 'completed'
        });
      } finally {
        setLoading(false);
      }
    };

    fetchEDAInsights();
  }, []);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-500"><CheckCircle className="w-3 h-3 mr-1" />Completed</Badge>;
      case 'in_progress':
        return <Badge className="bg-yellow-500"><Loader className="w-3 h-3 mr-1 animate-spin" />In Progress</Badge>;
      case 'failed':
        return <Badge variant="destructive"><AlertCircle className="w-3 h-3 mr-1" />Failed</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  if (loading) {
    return (
      <Card className="w-full border-2 border-green-200 bg-green-50/30">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-green-700 text-lg">
            <BarChart3 className="w-5 h-5" />
            Exploratory Data Analysis
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center py-8">
          <div className="flex items-center gap-3">
            <Loader className="w-6 h-6 animate-spin text-green-600" />
            <span className="text-green-700">Analyzing data...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full border-2 border-green-200 bg-green-50/30">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-green-700 text-lg">
            <BarChart3 className="w-5 h-5" />
            Exploratory Data Analysis
          </CardTitle>
          {edaData && getStatusBadge(edaData.status)}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {error && (
          <div className="bg-yellow-100 border border-yellow-300 rounded p-3 text-sm text-yellow-800">
            {error} - Showing mock data as fallback
          </div>
        )}

        {edaData && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Dataset Shape */}
            <div className="bg-white p-4 rounded-lg border">
              <div className="text-sm text-slate-600 mb-1">Dataset Shape</div>
              <div className="text-lg font-semibold text-slate-800">
                {edaData.datasetShape.rows.toLocaleString()} rows × {edaData.datasetShape.columns} columns
              </div>
            </div>

            {/* Missing Values */}
            <div className="bg-white p-4 rounded-lg border">
              <div className="text-sm text-slate-600 mb-1">Missing Values</div>
              <div className="text-lg font-semibold text-orange-600">
                {edaData.missingValues}%
              </div>
            </div>

            {/* Duplicate Rows */}
            <div className="bg-white p-4 rounded-lg border">
              <div className="text-sm text-slate-600 mb-1">Duplicate Rows</div>
              <div className="text-lg font-semibold text-red-600">
                {edaData.duplicateRows}%
              </div>
            </div>

            {/* Top Correlations */}
            <div className="bg-white p-4 rounded-lg border">
              <div className="text-sm text-slate-600 mb-1">Top Correlations</div>
              {edaData.topCorrelations.length > 0 && (
                <div className="text-sm font-medium text-slate-800">
                  {edaData.topCorrelations[0].feature1} ↔ {edaData.topCorrelations[0].feature2}
                  <div className="text-blue-600 font-semibold">
                    (r={edaData.topCorrelations[0].correlation})
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {edaData && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Important Features */}
            <div className="bg-white p-4 rounded-lg border">
              <div className="text-sm text-slate-600 mb-2">Important Features</div>
              <div className="flex flex-wrap gap-2">
                {edaData.importantFeatures.map((feature, idx) => (
                  <Badge key={idx} variant="outline" className="text-xs bg-blue-50">
                    {feature}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Action Button */}
            <div className="bg-white p-4 rounded-lg border flex items-center justify-center">
              <Button variant="outline" className="flex items-center gap-2">
                📊 View Full Report
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EDAInsightsPanel;


import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Brain, Eye, Download } from 'lucide-react';
import { useHarmonyData } from '@/hooks/useHarmonyData';

interface LiveModelExplainabilityPanelProps {
  datasetId?: string;
}

const LiveModelExplainabilityPanel = ({ datasetId }: LiveModelExplainabilityPanelProps) => {
  const { explainability, getMetricsByAgent, loading } = useHarmonyData(datasetId);
  const [selectedInstance, setSelectedInstance] = useState('ID_1247');

  const explainabilityData = explainability[0]; // Most recent explainability data
  const modelMetrics = getMetricsByAgent('model');

  // Transform SHAP values for chart
  const shapData = React.useMemo(() => {
    if (!explainabilityData?.shap_values) return [];
    
    return Object.entries(explainabilityData.shap_values).map(([feature, value]) => ({
      feature,
      shap_value: value,
      contribution: value > 0 ? 'positive' : 'negative'
    }));
  }, [explainabilityData]);

  const instanceExplanations = [
    { 
      id: 'ID_1247', 
      prediction: 'High Risk', 
      confidence: 0.87, 
      key_driver: explainabilityData?.summary_text || 'Loading explanation...'
    },
    { id: 'ID_8932', prediction: 'Low Risk', confidence: 0.94, key_driver: 'High income + Positive sentiment' },
    { id: 'ID_5621', prediction: 'Medium Risk', confidence: 0.72, key_driver: 'Mixed signals in audio' }
  ];

  if (loading) {
    return (
      <Card className="h-full flex flex-col border-2 border-teal-200 shadow-lg">
        <CardContent className="flex-1 flex items-center justify-center">
          <div className="text-slate-500">Loading explainability data...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full flex flex-col border-2 border-teal-200 shadow-lg">
      <CardHeader className="pb-4 flex-shrink-0">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-teal-700 text-lg">
            <Brain className="w-5 h-5" />
            Model Explainability & Interpretability
          </CardTitle>
          <Badge variant="secondary" className="bg-teal-100 text-teal-800">
            Live
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 overflow-hidden">
        <Tabs defaultValue="shap" className="h-full flex flex-col">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="shap" className="text-xs">SHAP</TabsTrigger>
            <TabsTrigger value="instances" className="text-xs">Instances</TabsTrigger>
            <TabsTrigger value="lime" className="text-xs">LIME</TabsTrigger>
          </TabsList>
          
          <TabsContent value="shap" className="flex-1 space-y-3">
            {shapData.length > 0 ? (
              <>
                <div className="h-32">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={shapData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis dataKey="feature" tick={{ fontSize: 8 }} />
                      <YAxis tick={{ fontSize: 10 }} />
                      <Tooltip />
                      <Bar dataKey="shap_value" fill="#14b8a6" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="bg-teal-50 p-3 rounded-lg border border-teal-200">
                  <div className="text-sm font-medium text-teal-700">Harmony Output</div>
                  <div className="text-sm text-teal-800">{explainabilityData?.summary_text || 'Processing explainability data...'}</div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-slate-500">No SHAP data available yet</div>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="instances" className="flex-1 space-y-2">
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {instanceExplanations.map((instance, index) => (
                <div key={index} className="p-2 bg-slate-50 rounded-lg border">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-slate-900">{instance.id}</span>
                    <Badge variant={
                      instance.prediction === 'High Risk' ? 'destructive' :
                      instance.prediction === 'Low Risk' ? 'default' : 'secondary'
                    } className="text-xs">
                      {instance.prediction}
                    </Badge>
                  </div>
                  <div className="text-xs text-slate-600">{instance.key_driver}</div>
                  <div className="text-xs text-slate-500">Confidence: {(instance.confidence * 100).toFixed(1)}%</div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="lime" className="flex-1 space-y-3">
            <div className="bg-purple-50 p-3 rounded-lg border border-purple-200">
              <div className="text-sm font-medium text-purple-700">Local Interpretation</div>
              <div className="text-sm text-purple-800">
                {explainabilityData ? `Analysis for ${selectedInstance}: ${explainabilityData.summary_text}` : 'No LIME data available'}
              </div>
            </div>
            
            {shapData.length > 0 && (
              <div className="space-y-2">
                <div className="text-sm font-medium text-slate-700">Feature Contributions</div>
                <div className="space-y-1">
                  {shapData.slice(0, 3).map((item, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span className="text-slate-600">{item.feature}:</span>
                      <span className={`font-semibold ${item.shap_value > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {item.shap_value > 0 ? '+' : ''}{item.shap_value.toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>

        <div className="grid grid-cols-2 gap-2 mt-4">
          <Button size="sm" variant="outline" className="text-xs">
            <Eye className="w-3 h-3 mr-1" />
            ICE Plots
          </Button>
          <Button size="sm" variant="outline" className="text-xs">
            <Download className="w-3 h-3 mr-1" />
            Export Report
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LiveModelExplainabilityPanel;

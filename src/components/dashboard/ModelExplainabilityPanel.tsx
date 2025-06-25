
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Brain, HelpCircle, Eye } from 'lucide-react';

const ModelExplainabilityPanel = () => {
  const shapData = [
    { feature: 'Age', shap_value: 0.15, contribution: 'positive' },
    { feature: 'Income', shap_value: 0.12, contribution: 'positive' },
    { feature: 'Email_Sentiment', shap_value: -0.08, contribution: 'negative' },
    { feature: 'Contract_Length', shap_value: 0.06, contribution: 'positive' },
    { feature: 'Audio_Quality', shap_value: -0.04, contribution: 'negative' }
  ];

  const instanceExplanations = [
    { id: 'ID_1247', prediction: 'High Risk', confidence: 0.87, key_driver: 'Low income + Short contract' },
    { id: 'ID_8932', prediction: 'Low Risk', confidence: 0.94, key_driver: 'High income + Positive sentiment' },
    { id: 'ID_5621', prediction: 'Medium Risk', confidence: 0.72, key_driver: 'Mixed signals in audio' }
  ];

  return (
    <Card className="h-full flex flex-col border-2 border-teal-200 shadow-lg">
      <CardHeader className="pb-4 flex-shrink-0">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-teal-700 text-lg">
            <Brain className="w-5 h-5" />
            Model Explainability & Interpretability
          </CardTitle>
          <Badge variant="secondary" className="bg-teal-100 text-teal-800">
            Active
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
              <div className="text-sm text-teal-800">Customer sentiment drove 30% of decision weight for segment A</div>
            </div>
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
              <div className="text-sm text-purple-800">For instance ID_1247: Age (+0.3), Income (-0.2), Sentiment (-0.1)</div>
            </div>
            
            <div className="space-y-2">
              <div className="text-sm font-medium text-slate-700">Feature Contributions</div>
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Age:</span>
                  <span className="font-semibold text-green-600">+0.3</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Income:</span>
                  <span className="font-semibold text-red-600">-0.2</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Sentiment:</span>
                  <span className="font-semibold text-red-600">-0.1</span>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="grid grid-cols-2 gap-2 mt-4">
          <Button size="sm" variant="outline" className="text-xs">
            <Eye className="w-3 h-3 mr-1" />
            ICE Plots
          </Button>
          <Button size="sm" variant="outline" className="text-xs">
            <HelpCircle className="w-3 h-3 mr-1" />
            Explain
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ModelExplainabilityPanel;

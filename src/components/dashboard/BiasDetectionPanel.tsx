
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Shield, AlertTriangle } from 'lucide-react';

const BiasDetectionPanel = () => {
  const biasMetrics = [
    { group: 'Gender', disparity: 1.2, tpr_gap: 5, fpr_diff: 3, mitigation: 40 },
    { group: 'Age', disparity: 1.1, tpr_gap: 3, fpr_diff: 2, mitigation: 60 },
    { group: 'Ethnicity', disparity: 1.3, tpr_gap: 7, fpr_diff: 4, mitigation: 35 },
    { group: 'Income', disparity: 1.4, tpr_gap: 8, fpr_diff: 5, mitigation: 25 }
  ];

  return (
    <Card className="h-full flex flex-col border-2 border-red-200 shadow-lg">
      <CardHeader className="pb-4 flex-shrink-0">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-red-700 text-lg">
            <Shield className="w-5 h-5" />
            Bias Detection & Mitigation
          </CardTitle>
          <Badge variant="destructive" className="bg-red-100 text-red-800">
            Alert
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 overflow-hidden space-y-4">
        {/* Summary Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-red-50 p-3 rounded-lg border border-red-200">
            <div className="text-sm font-medium text-red-700">Max Disparity</div>
            <div className="text-2xl font-bold text-red-800">1.4:1</div>
          </div>
          <div className="bg-green-50 p-3 rounded-lg border border-green-200">
            <div className="text-sm font-medium text-green-700">Avg Mitigation</div>
            <div className="text-2xl font-bold text-green-800">40%</div>
          </div>
        </div>

        {/* Bias Metrics Chart */}
        <div className="space-y-2">
          <div className="text-sm font-medium text-slate-700">Bias Metrics by Group</div>
          <div className="h-24">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={biasMetrics}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="group" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip />
                <Bar dataKey="disparity" fill="#ef4444" />
                <Bar dataKey="mitigation" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Fairness Metrics */}
        <div className="space-y-2">
          <div className="text-sm font-medium text-slate-700">Fairness Metrics</div>
          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Demographic Parity:</span>
              <span className="font-semibold">1.2:1</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Equal Opportunity:</span>
              <span className="font-semibold">5% gap</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Predictive Bias:</span>
              <span className="font-semibold">3% diff</span>
            </div>
          </div>
        </div>

        {/* Alert */}
        <Alert className="border-red-200 bg-red-50">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800 text-sm">
            High bias in customer segmentation—review features
          </AlertDescription>
        </Alert>

        {/* Action Button */}
        <Button size="sm" variant="outline" className="w-full text-sm">
          <Shield className="w-3 h-3 mr-2" />
          Audit Report
        </Button>
      </CardContent>
    </Card>
  );
};

export default BiasDetectionPanel;

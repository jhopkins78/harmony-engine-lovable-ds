
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
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
    <Card className="col-span-2 row-span-1 border-2 border-red-200 shadow-lg">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-red-700">
          <Shield className="w-5 h-5" />
          Bias Detection & Mitigation
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="bg-red-50 p-2 rounded border border-red-200">
            <div className="font-semibold text-red-700">Max Disparity</div>
            <div className="text-xl font-bold text-red-800">1.4:1</div>
          </div>
          <div className="bg-green-50 p-2 rounded border border-green-200">
            <div className="font-semibold text-green-700">Avg Mitigation</div>
            <div className="text-xl font-bold text-green-800">40%</div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-sm font-medium">Bias Metrics by Group</div>
          <ResponsiveContainer width="100%" height={100}>
            <BarChart data={biasMetrics}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="group" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip />
              <Bar dataKey="disparity" fill="#ef4444" />
              <Bar dataKey="mitigation" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-2">
          <div className="text-xs font-medium">Fairness Metrics</div>
          <div className="space-y-1 text-xs">
            <div className="flex justify-between">
              <span>Demographic Parity</span>
              <span>1.2:1</span>
            </div>
            <div className="flex justify-between">
              <span>Equal Opportunity</span>
              <span>5% gap</span>
            </div>
            <div className="flex justify-between">
              <span>Predictive Bias</span>
              <span>3% diff</span>
            </div>
          </div>
        </div>

        <Alert className="border-red-200 bg-red-50">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800 text-xs">
            High bias in customer segmentation—review features
          </AlertDescription>
        </Alert>

        <Button size="sm" variant="outline" className="w-full text-xs">
          <Shield className="w-3 h-3 mr-1" />
          Audit Report
        </Button>
      </CardContent>
    </Card>
  );
};

export default BiasDetectionPanel;

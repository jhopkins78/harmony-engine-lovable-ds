
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, ScatterChart, Scatter, ReferenceLine, AreaChart, Area } from 'recharts';
import { AlertTriangle, Eye, Settings, TrendingDown } from 'lucide-react';

const AnomalyDetectionConsole = () => {
  const [selectedModel, setSelectedModel] = useState('Isolation Forest');
  const [threshold, setThreshold] = useState(2.7);

  // Mock data for anomaly detection
  const timeSeriesData = [
    { time: '00:00', value: 1200, anomaly: false, score: 0.1 },
    { time: '04:00', value: 800, anomaly: false, score: 0.2 },
    { time: '08:00', value: 2100, anomaly: false, score: 0.3 },
    { time: '12:00', value: 4500, anomaly: true, score: 3.2 }, // Anomaly
    { time: '16:00', value: 2300, anomaly: false, score: 0.4 },
    { time: '20:00', value: 1800, anomaly: false, score: 0.3 },
    { time: '24:00', value: 1000, anomaly: false, score: 0.2 },
  ];

  const anomalyScores = [
    { id: 1, score: 3.2, timestamp: '12:15', value: 4500, category: 'Traffic Spike' },
    { id: 2, score: 2.9, timestamp: '15:42', value: -200, category: 'Negative Value' },
    { id: 3, score: 2.8, timestamp: '18:30', value: 0, category: 'Zero Reading' },
    { id: 4, score: 2.6, timestamp: '21:10', value: 3800, category: 'High Variance' },
  ];

  const distributionData = [
    { value: -3, density: 0.1, threshold: false },
    { value: -2, density: 0.5, threshold: false },
    { value: -1, density: 1.2, threshold: false },
    { value: 0, density: 2.4, threshold: false },
    { value: 1, density: 1.8, threshold: false },
    { value: 2, density: 0.8, threshold: false },
    { value: 2.7, density: 0.3, threshold: true },
    { value: 3, density: 0.2, threshold: true },
    { value: 4, density: 0.05, threshold: true },
  ];

  const modelPerformance = [
    { model: 'Isolation Forest', precision: 0.89, recall: 0.76, f1: 0.82, status: 'active' },
    { model: 'Autoencoder', precision: 0.84, recall: 0.81, f1: 0.83, status: 'ready' },
    { model: 'Z-Score', precision: 0.72, recall: 0.89, f1: 0.80, status: 'ready' },
    { model: 'LOF', precision: 0.91, recall: 0.68, f1: 0.78, status: 'training' },
  ];

  return (
    <Card className="h-96 bg-white/90 backdrop-blur-sm border-slate-200 shadow-lg">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-orange-600" />
          Anomaly Detection
          <Badge variant="outline" className="ml-auto text-xs">
            37 Detected
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-3 h-full">
        <Tabs defaultValue="overview" className="h-full flex flex-col">
          <TabsList className="grid w-full grid-cols-4 mb-2 h-8">
            <TabsTrigger value="overview" className="text-xs px-2">Overview</TabsTrigger>
            <TabsTrigger value="scores" className="text-xs px-2">Scores</TabsTrigger>
            <TabsTrigger value="timeseries" className="text-xs px-2">Timeline</TabsTrigger>
            <TabsTrigger value="tuning" className="text-xs px-2">Tuning</TabsTrigger>
          </TabsList>

          <div className="flex-1 overflow-hidden">
            <TabsContent value="overview" className="h-full m-0">
              <div className="space-y-2 h-full overflow-y-auto">
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2 bg-red-50 rounded border border-red-200">
                    <div className="text-xs font-medium text-red-800">Critical</div>
                    <div className="text-lg font-bold text-red-700">8</div>
                  </div>
                  <div className="p-2 bg-orange-50 rounded border border-orange-200">
                    <div className="text-xs font-medium text-orange-800">Warning</div>
                    <div className="text-lg font-bold text-orange-700">29</div>
                  </div>
                </div>
                
                {modelPerformance.map((model) => (
                  <div
                    key={model.model}
                    className={`p-2 rounded border cursor-pointer transition-colors ${
                      selectedModel === model.model ? 'bg-orange-50 border-orange-200' : 'bg-slate-50 border-slate-200'
                    }`}
                    onClick={() => setSelectedModel(model.model)}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{model.model}</span>
                      <Badge
                        variant={model.status === 'active' ? 'default' : 'secondary'}
                        className="text-xs"
                      >
                        {model.status}
                      </Badge>
                    </div>
                    <div className="flex gap-3 text-xs text-slate-600 mt-1">
                      <span>P: {model.precision}</span>
                      <span>R: {model.recall}</span>
                      <span>F1: {model.f1}</span>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="scores" className="h-full m-0">
              <div className="space-y-2 h-full overflow-y-auto">
                {anomalyScores.map((anomaly) => (
                  <div key={anomaly.id} className="p-2 bg-slate-50 rounded border">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{anomaly.category}</span>
                      <Badge
                        variant={anomaly.score > 3 ? 'destructive' : 'secondary'}
                        className="text-xs"
                      >
                        {anomaly.score.toFixed(1)}σ
                      </Badge>
                    </div>
                    <div className="flex gap-4 text-xs text-slate-600 mt-1">
                      <span>{anomaly.timestamp}</span>
                      <span>Value: {anomaly.value}</span>
                    </div>
                  </div>
                ))}
                <div className="mt-3 p-2 bg-orange-50 rounded border border-orange-200">
                  <div className="text-xs text-orange-800 font-medium">Harmony Output:</div>
                  <div className="text-xs text-orange-700 mt-1">
                    "Detected 37 anomalies. Suggested threshold = 2.7σ"
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="timeseries" className="h-full m-0">
              <div className="h-full">
                <ChartContainer
                  config={{
                    value: { label: "Value", color: "hsl(var(--chart-1))" },
                    anomaly: { label: "Anomaly", color: "hsl(var(--chart-2))" },
                  }}
                  className="h-full"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={timeSeriesData}>
                      <XAxis dataKey="time" className="text-xs" />
                      <YAxis className="text-xs" />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke="var(--color-value)"
                        strokeWidth={2}
                        dot={(props) => {
                          const { cx, cy, payload } = props;
                          if (payload.anomaly) {
                            return <circle cx={cx} cy={cy} r={4} fill="#ef4444" stroke="#fff" strokeWidth={2} />;
                          }
                          return <circle cx={cx} cy={cy} r={2} fill="var(--color-value)" />;
                        }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </TabsContent>

            <TabsContent value="tuning" className="h-full m-0">
              <div className="h-full">
                <div className="mb-3 p-2 bg-slate-50 rounded">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Threshold: {threshold}σ</span>
                    <Button size="sm" variant="outline" className="text-xs">
                      Apply
                    </Button>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    step="0.1"
                    value={threshold}
                    onChange={(e) => setThreshold(parseFloat(e.target.value))}
                    className="w-full"
                  />
                </div>
                <ChartContainer
                  config={{
                    density: { label: "Density", color: "hsl(var(--chart-1))" },
                    threshold: { label: "Threshold", color: "hsl(var(--chart-2))" },
                  }}
                  className="flex-1"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={distributionData}>
                      <XAxis dataKey="value" className="text-xs" />
                      <YAxis className="text-xs" />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Area
                        type="monotone"
                        dataKey="density"
                        stroke="var(--color-density)"
                        fill="var(--color-density)"
                        fillOpacity={0.6}
                      />
                      <ReferenceLine x={threshold} stroke="#ef4444" strokeDasharray="5 5" />
                    </AreaChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AnomalyDetectionConsole;

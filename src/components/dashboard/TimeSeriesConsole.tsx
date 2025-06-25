
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, ReferenceLine, Area, AreaChart } from 'recharts';
import { TrendingUp, Calendar, Activity, AlertCircle } from 'lucide-react';

const TimeSeriesConsole = () => {
  const [activeModel, setActiveModel] = useState('Prophet');

  // Mock data for time series
  const decompositionData = [
    { time: '2024-01', observed: 1200, trend: 1150, seasonal: 50, residual: 0 },
    { time: '2024-02', observed: 1180, trend: 1160, seasonal: 20, residual: 0 },
    { time: '2024-03', observed: 1220, trend: 1170, seasonal: 50, residual: 0 },
    { time: '2024-04', observed: 1250, trend: 1180, seasonal: 70, residual: 0 },
    { time: '2024-05', observed: 1300, trend: 1190, seasonal: 110, residual: 0 },
    { time: '2024-06', observed: 1280, trend: 1200, seasonal: 80, residual: 0 },
  ];

  const forecastData = [
    { time: '2024-01', actual: 1200, forecast: null, lower: null, upper: null },
    { time: '2024-02', actual: 1180, forecast: null, lower: null, upper: null },
    { time: '2024-03', actual: 1220, forecast: null, lower: null, upper: null },
    { time: '2024-04', actual: 1250, forecast: null, lower: null, upper: null },
    { time: '2024-05', actual: 1300, forecast: null, lower: null, upper: null },
    { time: '2024-06', actual: 1280, forecast: null, lower: null, upper: null },
    { time: '2024-07', actual: null, forecast: 1320, lower: 1250, upper: 1390 },
    { time: '2024-08', actual: null, forecast: 1340, lower: 1260, upper: 1420 },
    { time: '2024-09', actual: null, forecast: 1365, lower: 1275, upper: 1455 },
  ];

  const models = [
    { name: 'Prophet', accuracy: 94.2, mape: 6.3, status: 'optimal' },
    { name: 'ARIMA', accuracy: 91.8, mape: 8.1, status: 'good' },
    { name: 'LSTM', accuracy: 89.5, mape: 10.4, status: 'training' },
    { name: 'XGBoost Time', accuracy: 87.3, mape: 12.7, status: 'pending' },
  ];

  const errorMetrics = [
    { metric: 'MAPE', value: '6.3%', status: 'excellent' },
    { metric: 'RMSE', value: '42.1', status: 'good' },
    { metric: 'MAE', value: '31.8', status: 'good' },
    { metric: 'R²', value: '0.94', status: 'excellent' },
  ];

  return (
    <Card className="h-96 bg-white/90 backdrop-blur-sm border-slate-200 shadow-lg">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-blue-600" />
          Time Series Forecasting
          <Badge variant="outline" className="ml-auto text-xs">
            {activeModel}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-3 h-full">
        <Tabs defaultValue="forecast" className="h-full flex flex-col">
          <TabsList className="grid w-full grid-cols-4 mb-2 h-8">
            <TabsTrigger value="decomposition" className="text-xs px-2">Decomp</TabsTrigger>
            <TabsTrigger value="models" className="text-xs px-2">Models</TabsTrigger>
            <TabsTrigger value="forecast" className="text-xs px-2">Forecast</TabsTrigger>
            <TabsTrigger value="errors" className="text-xs px-2">Errors</TabsTrigger>
          </TabsList>

          <div className="flex-1 overflow-hidden">
            <TabsContent value="decomposition" className="h-full m-0">
              <div className="h-full">
                <ChartContainer
                  config={{
                    observed: { label: "Observed", color: "hsl(var(--chart-1))" },
                    trend: { label: "Trend", color: "hsl(var(--chart-2))" },
                    seasonal: { label: "Seasonal", color: "hsl(var(--chart-3))" },
                  }}
                  className="h-full"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={decompositionData}>
                      <XAxis dataKey="time" className="text-xs" />
                      <YAxis className="text-xs" />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line type="monotone" dataKey="observed" stroke="var(--color-observed)" strokeWidth={2} />
                      <Line type="monotone" dataKey="trend" stroke="var(--color-trend)" strokeWidth={1} strokeDasharray="5 5" />
                      <Line type="monotone" dataKey="seasonal" stroke="var(--color-seasonal)" strokeWidth={1} />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </TabsContent>

            <TabsContent value="models" className="h-full m-0">
              <div className="space-y-2 h-full overflow-y-auto">
                {models.map((model) => (
                  <div
                    key={model.name}
                    className={`p-2 rounded border cursor-pointer transition-colors ${
                      activeModel === model.name ? 'bg-blue-50 border-blue-200' : 'bg-slate-50 border-slate-200'
                    }`}
                    onClick={() => setActiveModel(model.name)}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{model.name}</span>
                      <Badge
                        variant={model.status === 'optimal' ? 'default' : 'secondary'}
                        className="text-xs"
                      >
                        {model.status}
                      </Badge>
                    </div>
                    <div className="flex gap-4 text-xs text-slate-600 mt-1">
                      <span>Acc: {model.accuracy}%</span>
                      <span>MAPE: {model.mape}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="forecast" className="h-full m-0">
              <div className="h-full">
                <ChartContainer
                  config={{
                    actual: { label: "Actual", color: "hsl(var(--chart-1))" },
                    forecast: { label: "Forecast", color: "hsl(var(--chart-2))" },
                    upper: { label: "Upper CI", color: "hsl(var(--chart-3))" },
                    lower: { label: "Lower CI", color: "hsl(var(--chart-3))" },
                  }}
                  className="h-full"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={forecastData}>
                      <XAxis dataKey="time" className="text-xs" />
                      <YAxis className="text-xs" />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Area
                        dataKey="upper"
                        stackId="ci"
                        stroke="none"
                        fill="var(--color-upper)"
                        fillOpacity={0.2}
                      />
                      <Area
                        dataKey="lower"
                        stackId="ci"
                        stroke="none"
                        fill="var(--color-lower)"
                        fillOpacity={0.2}
                      />
                      <Line type="monotone" dataKey="actual" stroke="var(--color-actual)" strokeWidth={2} />
                      <Line type="monotone" dataKey="forecast" stroke="var(--color-forecast)" strokeWidth={2} strokeDasharray="5 5" />
                      <ReferenceLine x="2024-06" stroke="#666" strokeDasharray="2 2" />
                    </AreaChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </TabsContent>

            <TabsContent value="errors" className="h-full m-0">
              <div className="space-y-2 h-full overflow-y-auto">
                {errorMetrics.map((metric) => (
                  <div key={metric.metric} className="flex justify-between items-center p-2 bg-slate-50 rounded">
                    <span className="text-sm font-medium">{metric.metric}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{metric.value}</span>
                      <Badge
                        variant={metric.status === 'excellent' ? 'default' : 'secondary'}
                        className="text-xs"
                      >
                        {metric.status}
                      </Badge>
                    </div>
                  </div>
                ))}
                <div className="mt-3 p-2 bg-blue-50 rounded border border-blue-200">
                  <div className="text-xs text-blue-800 font-medium">Harmony Output:</div>
                  <div className="text-xs text-blue-700 mt-1">
                    "Prophet forecast 90-day demand, 85% CI. MAPE = 6.3%"
                  </div>
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default TimeSeriesConsole;

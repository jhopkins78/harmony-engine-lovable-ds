
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, AreaChart, Area, BarChart, Bar } from 'recharts';
import { Activity, Target, Zap, CheckCircle } from 'lucide-react';

const BayesianConsole = () => {
  const [convergenceStatus, setConvergenceStatus] = useState('converged');

  // Mock data for Bayesian analysis
  const posteriorData = [
    { value: 0.05, prior: 0.8, posterior: 0.2 },
    { value: 0.10, prior: 1.2, posterior: 1.8 },
    { value: 0.15, prior: 1.5, posterior: 4.2 },
    { value: 0.20, prior: 1.2, posterior: 6.8 },
    { value: 0.25, prior: 0.8, posterior: 4.1 },
    { value: 0.30, prior: 0.4, posterior: 1.2 },
  ];

  const traceData = [
    { iteration: 1000, chain1: 0.18, chain2: 0.16, chain3: 0.19 },
    { iteration: 1500, chain1: 0.15, chain2: 0.17, chain3: 0.16 },
    { iteration: 2000, chain1: 0.17, chain2: 0.18, chain3: 0.15 },
    { iteration: 2500, chain1: 0.16, chain2: 0.15, chain3: 0.17 },
    { iteration: 3000, chain1: 0.18, chain2: 0.16, chain3: 0.18 },
  ];

  const diagnostics = [
    { parameter: 'churn_rate', rhat: 1.01, ess: 2847, status: 'good' },
    { parameter: 'intercept', rhat: 1.00, ess: 3124, status: 'excellent' },
    { parameter: 'age_coeff', rhat: 1.02, ess: 2691, status: 'good' },
    { parameter: 'tenure_coeff', rhat: 1.01, ess: 2938, status: 'good' },
  ];

  const posteriorChecks = [
    { metric: 'Mean Prediction', observed: 0.167, predicted: 0.164, pvalue: 0.78 },
    { metric: 'Std Prediction', observed: 0.089, predicted: 0.092, pvalue: 0.65 },
    { metric: 'Min Prediction', observed: 0.001, predicted: 0.003, pvalue: 0.82 },
    { metric: 'Max Prediction', observed: 0.456, predicted: 0.441, pvalue: 0.71 },
  ];

  return (
    <Card className="h-96 bg-white/90 backdrop-blur-sm border-slate-200 shadow-lg">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold flex items-center gap-2">
          <Target className="w-4 h-4 text-purple-600" />
          Bayesian Inference
          <Badge variant="outline" className="ml-auto text-xs">
            <CheckCircle className="w-3 h-3 mr-1" />
            Converged
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-3 h-full">
        <Tabs defaultValue="posteriors" className="h-full flex flex-col">
          <TabsList className="grid w-full grid-cols-4 mb-2 h-8">
            <TabsTrigger value="posteriors" className="text-xs px-2">Prior/Post</TabsTrigger>
            <TabsTrigger value="diagnostics" className="text-xs px-2">Diagnostics</TabsTrigger>
            <TabsTrigger value="fit" className="text-xs px-2">Fit</TabsTrigger>
            <TabsTrigger value="checks" className="text-xs px-2">Checks</TabsTrigger>
          </TabsList>

          <div className="flex-1 overflow-hidden">
            <TabsContent value="posteriors" className="h-full m-0">
              <div className="h-full">
                <ChartContainer
                  config={{
                    prior: { label: "Prior", color: "hsl(var(--chart-1))" },
                    posterior: { label: "Posterior", color: "hsl(var(--chart-2))" },
                  }}
                  className="h-full"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={posteriorData}>
                      <XAxis dataKey="value" className="text-xs" />
                      <YAxis className="text-xs" />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Area
                        type="monotone"
                        dataKey="prior"
                        stackId="1"
                        stroke="var(--color-prior)"
                        fill="var(--color-prior)"
                        fillOpacity={0.3}
                      />
                      <Area
                        type="monotone"
                        dataKey="posterior"
                        stackId="2"
                        stroke="var(--color-posterior)"
                        fill="var(--color-posterior)"
                        fillOpacity={0.6}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </TabsContent>

            <TabsContent value="diagnostics" className="h-full m-0">
              <div className="space-y-2 h-full overflow-y-auto">
                <div className="grid grid-cols-2 gap-2 mb-3">
                  <div className="p-2 bg-green-50 rounded border border-green-200">
                    <div className="text-xs font-medium text-green-800">Iterations</div>
                    <div className="text-sm text-green-700">3,000</div>
                  </div>
                  <div className="p-2 bg-blue-50 rounded border border-blue-200">
                    <div className="text-xs font-medium text-blue-800">Chains</div>
                    <div className="text-sm text-blue-700">4</div>
                  </div>
                </div>
                {diagnostics.map((diag) => (
                  <div key={diag.parameter} className="flex justify-between items-center p-2 bg-slate-50 rounded">
                    <span className="text-xs font-medium">{diag.parameter}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs">R̂: {diag.rhat}</span>
                      <span className="text-xs">ESS: {diag.ess}</span>
                      <Badge
                        variant={diag.status === 'excellent' ? 'default' : 'secondary'}
                        className="text-xs"
                      >
                        {diag.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="fit" className="h-full m-0">
              <div className="h-full">
                <ChartContainer
                  config={{
                    chain1: { label: "Chain 1", color: "hsl(var(--chart-1))" },
                    chain2: { label: "Chain 2", color: "hsl(var(--chart-2))" },
                    chain3: { label: "Chain 3", color: "hsl(var(--chart-3))" },
                  }}
                  className="h-full"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={traceData}>
                      <XAxis dataKey="iteration" className="text-xs" />
                      <YAxis className="text-xs" />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line type="monotone" dataKey="chain1" stroke="var(--color-chain1)" strokeWidth={1} />
                      <Line type="monotone" dataKey="chain2" stroke="var(--color-chain2)" strokeWidth={1} />
                      <Line type="monotone" dataKey="chain3" stroke="var(--color-chain3)" strokeWidth={1} />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </TabsContent>

            <TabsContent value="checks" className="h-full m-0">
              <div className="space-y-2 h-full overflow-y-auto">
                {posteriorChecks.map((check) => (
                  <div key={check.metric} className="p-2 bg-slate-50 rounded">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-medium">{check.metric}</span>
                      <Badge
                        variant={check.pvalue > 0.05 ? 'default' : 'destructive'}
                        className="text-xs"
                      >
                        p = {check.pvalue}
                      </Badge>
                    </div>
                    <div className="flex gap-4 text-xs text-slate-600 mt-1">
                      <span>Obs: {check.observed}</span>
                      <span>Pred: {check.predicted}</span>
                    </div>
                  </div>
                ))}
                <div className="mt-3 p-2 bg-purple-50 rounded border border-purple-200">
                  <div className="text-xs text-purple-800 font-medium">Harmony Output:</div>
                  <div className="text-xs text-purple-700 mt-1">
                    "Posterior P(customer churn &lt; 15%) = 0.93. Model converged in 3,000 iterations (R̂ = 1.01)"
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

export default BayesianConsole;

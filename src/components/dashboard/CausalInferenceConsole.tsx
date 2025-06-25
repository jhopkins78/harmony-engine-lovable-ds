
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, ErrorBar, ScatterChart, Scatter } from 'recharts';
import { GitBranch, ArrowRight, TestTube, CheckCircle2 } from 'lucide-react';

const CausalInferenceConsole = () => {
  const [selectedMethod, setSelectedMethod] = useState('Propensity Score');

  // Mock data for causal analysis
  const treatmentEffects = [
    { treatment: 'Promotion', ate: 0.12, ci_lower: 0.08, ci_upper: 0.16, pvalue: 0.001 },
    { treatment: 'Email Campaign', ate: 0.07, ci_lower: 0.03, ci_upper: 0.11, pvalue: 0.012 },
    { treatment: 'Discount', ate: 0.15, ci_lower: 0.11, ci_upper: 0.19, pvalue: 0.000 },
  ];

  const counterfactualData = [
    { group: 'Control', observed: 0.23, counterfactual: 0.35 },
    { group: 'Treatment', observed: 0.35, counterfactual: 0.23 },
  ];

  const assumptionTests = [
    { assumption: 'Unconfoundedness', test: 'Balance Test', result: 'Pass', pvalue: 0.23 },
    { assumption: 'Overlap', test: 'Propensity Bounds', result: 'Pass', pvalue: 0.89 },
    { assumption: 'SUTVA', test: 'Spillover Test', result: 'Pass', pvalue: 0.67 },
    { assumption: 'Positivity', test: 'Support Check', result: 'Warning', pvalue: 0.04 },
  ];

  const dagNodes = [
    { id: 'X', label: 'Treatment', x: 50, y: 150, type: 'treatment' },
    { id: 'Y', label: 'Outcome', x: 250, y: 150, type: 'outcome' },
    { id: 'Z1', label: 'Age', x: 50, y: 50, type: 'confounder' },
    { id: 'Z2', label: 'Income', x: 150, y: 50, type: 'confounder' },
    { id: 'M', label: 'Mediator', x: 150, y: 200, type: 'mediator' },
  ];

  return (
    <Card className="h-96 bg-white/90 backdrop-blur-sm border-slate-200 shadow-lg">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold flex items-center gap-2">
          <GitBranch className="w-4 h-4 text-green-600" />
          Causal Inference
          <Badge variant="outline" className="ml-auto text-xs">
            {selectedMethod}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-3 h-full">
        <Tabs defaultValue="effects" className="h-full flex flex-col">
          <TabsList className="grid w-full grid-cols-4 mb-2 h-8">
            <TabsTrigger value="graph" className="text-xs px-2">DAG</TabsTrigger>
            <TabsTrigger value="effects" className="text-xs px-2">Effects</TabsTrigger>
            <TabsTrigger value="counterfactual" className="text-xs px-2">Counter</TabsTrigger>
            <TabsTrigger value="assumptions" className="text-xs px-2">Tests</TabsTrigger>
          </TabsList>

          <div className="flex-1 overflow-hidden">
            <TabsContent value="graph" className="h-full m-0">
              <div className="h-full relative bg-slate-50 rounded border">
                <svg className="w-full h-full">
                  {/* DAG Edges */}
                  <defs>
                    <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                      <polygon points="0 0, 10 3.5, 0 7" fill="#64748b" />
                    </marker>
                  </defs>
                  
                  {/* Arrows */}
                  <line x1="50" y1="50" x2="50" y2="130" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrowhead)" />
                  <line x1="150" y1="50" x2="50" y2="130" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrowhead)" />
                  <line x1="150" y1="50" x2="250" y2="130" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrowhead)" />
                  <line x1="70" y1="150" x2="230" y2="150" stroke="#ef4444" strokeWidth="3" markerEnd="url(#arrowhead)" />
                  <line x1="70" y1="160" x2="130" y2="190" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrowhead)" />
                  <line x1="170" y1="200" x2="230" y2="160" stroke="#64748b" strokeWidth="2" markerEnd="url(#arrowhead)" />
                  
                  {/* Nodes */}
                  {dagNodes.map((node) => (
                    <g key={node.id}>
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r="15"
                        fill={
                          node.type === 'treatment' ? '#ef4444' :
                          node.type === 'outcome' ? '#22c55e' :
                          node.type === 'confounder' ? '#3b82f6' :
                          '#f59e0b'
                        }
                        stroke="#fff"
                        strokeWidth="2"
                      />
                      <text
                        x={node.x}
                        y={node.y - 25}
                        textAnchor="middle"
                        className="text-xs font-medium"
                        fill="#374151"
                      >
                        {node.label}
                      </text>
                    </g>
                  ))}
                </svg>
                <div className="absolute bottom-2 left-2 text-xs text-slate-600">
                  <div className="flex gap-3">
                    <span className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      Treatment
                    </span>
                    <span className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      Outcome
                    </span>
                    <span className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      Confounder
                    </span>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="effects" className="h-full m-0">
              <div className="h-full">
                <ChartContainer
                  config={{
                    ate: { label: "ATE", color: "hsl(var(--chart-1))" },
                  }}
                  className="h-full"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={treatmentEffects} layout="horizontal">
                      <XAxis type="number" className="text-xs" />
                      <YAxis dataKey="treatment" type="category" className="text-xs" width={80} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="ate" fill="var(--color-ate)">
                        <ErrorBar dataKey="ci_lower" width={4} />
                        <ErrorBar dataKey="ci_upper" width={4} />
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </TabsContent>

            <TabsContent value="counterfactual" className="h-full m-0">
              <div className="h-full">
                <ChartContainer
                  config={{
                    observed: { label: "Observed", color: "hsl(var(--chart-1))" },
                    counterfactual: { label: "Counterfactual", color: "hsl(var(--chart-2))" },
                  }}
                  className="h-full"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={counterfactualData}>
                      <XAxis dataKey="group" className="text-xs" />
                      <YAxis className="text-xs" />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="observed" fill="var(--color-observed)" />
                      <Bar dataKey="counterfactual" fill="var(--color-counterfactual)" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </TabsContent>

            <TabsContent value="assumptions" className="h-full m-0">
              <div className="space-y-2 h-full overflow-y-auto">
                {assumptionTests.map((test) => (
                  <div key={test.assumption} className="p-2 bg-slate-50 rounded">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-medium">{test.assumption}</span>
                      <Badge
                        variant={test.result === 'Pass' ? 'default' : test.result === 'Warning' ? 'secondary' : 'destructive'}
                        className="text-xs"
                      >
                        {test.result}
                      </Badge>
                    </div>
                    <div className="flex gap-4 text-xs text-slate-600 mt-1">
                      <span>{test.test}</span>
                      <span>p = {test.pvalue}</span>
                    </div>
                  </div>
                ))}
                <div className="mt-3 p-2 bg-green-50 rounded border border-green-200">
                  <div className="text-xs text-green-800 font-medium">Harmony Output:</div>
                  <div className="text-xs text-green-700 mt-1">
                    "Estimated ATE of promotion on conversion: +12% (CI 95%: 8%-16%)"
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

export default CausalInferenceConsole;


import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { ScatterChart, Scatter, XAxis, YAxis, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { MessageSquare, Hash, User, FileText } from 'lucide-react';

const NLPConsole = () => {
  const [selectedTask, setSelectedTask] = useState('Topic Modeling');

  // Mock data for NLP analysis
  const embeddingData = [
    { x: -2.1, y: 1.5, cluster: 'Complaints', label: 'Doc1' },
    { x: -1.8, y: 1.2, cluster: 'Complaints', label: 'Doc2' },
    { x: 0.5, y: -0.8, cluster: 'Reviews', label: 'Doc3' },
    { x: 0.3, y: -1.2, cluster: 'Reviews', label: 'Doc4' },
    { x: 2.1, y: 0.5, cluster: 'Support', label: 'Doc5' },
    { x: 1.9, y: 0.8, cluster: 'Support', label: 'Doc6' },
    { x: -0.2, y: 2.1, cluster: 'Feedback', label: 'Doc7' },
    { x: 0.1, y: 1.8, cluster: 'Feedback', label: 'Doc8' },
  ];

  const topics = [
    { id: 1, name: 'Refund Policy', coherence: 0.78, docs: 147, keywords: ['refund', 'policy', 'return', 'money'] },
    { id: 2, name: 'Product Quality', coherence: 0.72, docs: 203, keywords: ['quality', 'defect', 'broken', 'poor'] },
    { id: 3, name: 'Shipping Issues', coherence: 0.69, docs: 89, keywords: ['shipping', 'delay', 'delivery', 'late'] },
    { id: 4, name: 'Customer Service', coherence: 0.65, docs: 156, keywords: ['service', 'support', 'help', 'staff'] },
  ];

  const entities = [
    { text: 'Apple Inc.', type: 'ORG', confidence: 0.98, count: 45 },
    { text: 'John Smith', type: 'PERSON', confidence: 0.95, count: 23 },
    { text: 'New York', type: 'GPE', confidence: 0.92, count: 67 },
    { text: '$299.99', type: 'MONEY', confidence: 0.89, count: 12 },
    { text: 'iPhone 15', type: 'PRODUCT', confidence: 0.94, count: 78 },
  ];

  const summaries = [
    {
      id: 1,
      title: 'Customer Feedback Analysis',
      summary: 'Customers are most concerned with refund policy clarity and shipping delays. Positive sentiment around product quality but concerns about customer service response times.',
      confidence: 0.87,
      length: 156
    },
    {
      id: 2,
      title: 'Support Ticket Trends',
      summary: 'Most tickets relate to billing issues and account access problems. Resolution time has improved by 23% this quarter.',
      confidence: 0.91,
      length: 89
    }
  ];

  const wordCloudData = [
    { word: 'refund', frequency: 89, sentiment: 'negative' },
    { word: 'quality', frequency: 76, sentiment: 'neutral' },
    { word: 'excellent', frequency: 65, sentiment: 'positive' },
    { word: 'shipping', frequency: 54, sentiment: 'negative' },
    { word: 'support', frequency: 48, sentiment: 'neutral' },
    { word: 'satisfied', frequency: 42, sentiment: 'positive' },
    { word: 'delay', frequency: 38, sentiment: 'negative' },
    { word: 'recommend', frequency: 35, sentiment: 'positive' },
  ];

  return (
    <Card className="h-96 bg-white/90 backdrop-blur-sm border-slate-200 shadow-lg">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-indigo-600" />
          NLP Modeling
          <Badge variant="outline" className="ml-auto text-xs">
            {selectedTask}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-3 h-full">
        <Tabs defaultValue="topics" className="h-full flex flex-col">
          <TabsList className="grid w-full grid-cols-4 mb-2 h-8">
            <TabsTrigger value="embeddings" className="text-xs px-2">Embed</TabsTrigger>
            <TabsTrigger value="topics" className="text-xs px-2">Topics</TabsTrigger>
            <TabsTrigger value="entities" className="text-xs px-2">NER</TabsTrigger>
            <TabsTrigger value="summaries" className="text-xs px-2">Summary</TabsTrigger>
          </TabsList>

          <div className="flex-1 overflow-hidden">
            <TabsContent value="embeddings" className="h-full m-0">
              <div className="h-full">
                <ChartContainer
                  config={{
                    Complaints: { label: "Complaints", color: "#ef4444" },
                    Reviews: { label: "Reviews", color: "#3b82f6" },
                    Support: { label: "Support", color: "#22c55e" },
                    Feedback: { label: "Feedback", color: "#f59e0b" },
                  }}
                  className="h-full"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <ScatterChart data={embeddingData}>
                      <XAxis dataKey="x" className="text-xs" />
                      <YAxis dataKey="y" className="text-xs" />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Scatter
                        dataKey="y"
                        fill={(entry) => {
                          const colors = {
                            'Complaints': '#ef4444',
                            'Reviews': '#3b82f6',
                            'Support': '#22c55e',
                            'Feedback': '#f59e0b'
                          };
                          return colors[entry.cluster] || '#64748b';
                        }}
                      />
                    </ScatterChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </TabsContent>

            <TabsContent value="topics" className="h-full m-0">
              <div className="space-y-2 h-full overflow-y-auto">
                {topics.map((topic) => (
                  <div key={topic.id} className="p-2 bg-slate-50 rounded border">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{topic.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-600">{topic.docs} docs</span>
                        <Badge variant="outline" className="text-xs">
                          {topic.coherence}
                        </Badge>
                      </div>
                    </div>
                    <div className="mt-1">
                      <div className="flex flex-wrap gap-1 text-xs">
                        {topic.keywords.map((keyword, idx) => (
                          <span key={idx} className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded">
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
                <div className="mt-3 p-2 bg-indigo-50 rounded border border-indigo-200">
                  <div className="text-xs text-indigo-800 font-medium">Harmony Output:</div>
                  <div className="text-xs text-indigo-700 mt-1">
                    "Top 3 topics identified. Summary: 'Customers are most concerned with refund policy.'"
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="entities" className="h-full m-0">
              <div className="h-full">
                <div className="mb-3">
                  <ChartContainer
                    config={{
                      count: { label: "Count", color: "hsl(var(--chart-1))" },
                    }}
                    className="h-32"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={entities} layout="horizontal">
                        <XAxis type="number" className="text-xs" />
                        <YAxis dataKey="text" type="category" className="text-xs" width={60} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="count" fill="var(--color-count)" />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
                <div className="space-y-1 flex-1 overflow-y-auto">
                  {entities.map((entity, idx) => (
                    <div key={idx} className="flex justify-between items-center p-2 bg-slate-50 rounded text-xs">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          {entity.type}
                        </Badge>
                        <span className="font-medium">{entity.text}</span>
                      </div>
                      <span className="text-slate-600">{entity.confidence}</span>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="summaries" className="h-full m-0">
              <div className="space-y-2 h-full overflow-y-auto">
                {summaries.map((summary) => (
                  <div key={summary.id} className="p-2 bg-slate-50 rounded border">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">{summary.title}</span>
                      <Badge variant="outline" className="text-xs">
                        {summary.confidence}
                      </Badge>
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed">
                      {summary.summary}
                    </p>
                    <div className="text-xs text-slate-500 mt-1">
                      {summary.length} chars • Auto-generated
                    </div>
                  </div>
                ))}
                
                <div className="mt-3">
                  <div className="text-xs font-medium mb-2">Word Cloud</div>
                  <div className="flex flex-wrap gap-1">
                    {wordCloudData.map((word, idx) => (
                      <span
                        key={idx}
                        className={`px-2 py-1 rounded text-xs ${
                          word.sentiment === 'positive' ? 'bg-green-100 text-green-700' :
                          word.sentiment === 'negative' ? 'bg-red-100 text-red-700' :
                          'bg-slate-100 text-slate-700'
                        }`}
                        style={{ fontSize: `${Math.max(10, Math.min(14, word.frequency / 10))}px` }}
                      >
                        {word.word}
                      </span>
                    ))}
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

export default NLPConsole;

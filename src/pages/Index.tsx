
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, Area, AreaChart, PieChart, Pie, Cell,
  ScatterPlot, Scatter
} from 'recharts';
import { 
  Activity, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Database, 
  FileText, 
  MessageSquare, 
  Network, 
  TrendingUp,
  Users,
  Zap,
  Brain,
  Eye,
  GitBranch,
  Play,
  Pause,
  Settings
} from 'lucide-react';

const Dashboard = () => {
  const [isRealTime, setIsRealTime] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  // Simulate real-time updates
  useEffect(() => {
    if (isRealTime) {
      const interval = setInterval(() => {
        setLastUpdate(new Date());
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isRealTime]);

  // Sample data for visualizations
  const ingestionData = [
    { type: 'PDFs', processed: 1000, quality: 95 },
    { type: 'Emails', processed: 500, quality: 92 },
    { type: 'Audio', processed: 20, quality: 88 },
    { type: 'Contracts', processed: 300, quality: 97 },
    { type: 'Spreadsheets', processed: 800, quality: 94 }
  ];

  const pipelinePerformance = [
    { time: '09:00', throughput: 8500, accuracy: 96 },
    { time: '10:00', throughput: 9200, accuracy: 94 },
    { time: '11:00', throughput: 10000, accuracy: 95 },
    { time: '12:00', throughput: 9800, accuracy: 97 },
    { time: '13:00', throughput: 10200, accuracy: 96 }
  ];

  const modelMetrics = [
    { metric: 'F1-Score', value: 0.89, threshold: 0.85, status: 'good' },
    { metric: 'RMSE', value: 0.12, threshold: 0.15, status: 'good' },
    { metric: 'Accuracy', value: 0.94, threshold: 0.90, status: 'good' },
    { metric: 'Precision', value: 0.91, threshold: 0.88, status: 'good' }
  ];

  const sentimentData = [
    { time: '09:00', positive: 75, negative: 15, neutral: 10 },
    { time: '10:00', positive: 78, negative: 12, neutral: 10 },
    { time: '11:00', positive: 72, negative: 18, neutral: 10 },
    { time: '12:00', positive: 80, negative: 10, neutral: 10 },
    { time: '13:00', positive: 76, negative: 14, neutral: 10 }
  ];

  const collaborationData = [
    { user: 'Sarah Chen', action: 'Annotated email sentiment model', time: '2 min ago', type: 'annotation' },
    { user: 'Dr. Rodriguez', action: 'Suggested feature weight adjustment', time: '5 min ago', type: 'suggestion' },
    { user: 'Alex Kim', action: 'Flagged contract risk pattern', time: '8 min ago', type: 'alert' },
    { user: 'Maria Santos', action: 'Shared insight on audio trends', time: '12 min ago', type: 'insight' }
  ];

  const experimentData = [
    { name: 'NLP-v2', accuracy: 94, baseline: 89, improvement: 5 },
    { name: 'Churn-RF', accuracy: 92, baseline: 87, improvement: 5 },
    { name: 'Audio-BERT', accuracy: 88, baseline: 85, improvement: 3 },
    { name: 'Contract-OCR', accuracy: 96, baseline: 91, improvement: 5 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Harmony Engine Dashboard
            </h1>
            <p className="text-lg text-slate-600 mt-2">
              Advanced Data Science Platform for AI-Driven Insights
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant={isRealTime ? "default" : "secondary"} className="px-3 py-1">
              {isRealTime ? "Live" : "Paused"}
            </Badge>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsRealTime(!isRealTime)}
              className="flex items-center gap-2"
            >
              {isRealTime ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              {isRealTime ? "Pause" : "Resume"}
            </Button>
            <span className="text-sm text-slate-500">
              Last update: {lastUpdate.toLocaleTimeString()}
            </span>
          </div>
        </div>
      </div>

      {/* Dashboard Grid */}
      <div className="grid grid-cols-12 grid-rows-2 gap-6 h-[calc(100vh-200px)]">
        
        {/* Data Ingestion and Quality Monitor - Top Left (20%) */}
        <Card className="col-span-3 row-span-1 border-2 border-blue-200 shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-blue-700">
              <Database className="w-5 h-5" />
              Data Ingestion & Quality
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="bg-green-50 p-2 rounded border border-green-200">
                <div className="font-semibold text-green-700">Processed Today</div>
                <div className="text-xl font-bold text-green-800">2,620</div>
              </div>
              <div className="bg-blue-50 p-2 rounded border border-blue-200">
                <div className="font-semibold text-blue-700">Avg Quality</div>
                <div className="text-xl font-bold text-blue-800">94.2%</div>
              </div>
            </div>

            <Alert className="border-orange-200 bg-orange-50">
              <AlertTriangle className="h-4 w-4 text-orange-600" />
              <AlertDescription className="text-orange-800">
                Corrupted contract PDF detected - auto-quarantined
              </AlertDescription>
            </Alert>

            <div className="space-y-2">
              <div className="text-sm font-medium">Quality by Data Type</div>
              <ResponsiveContainer width="100%" height={120}>
                <BarChart data={ingestionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="type" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} />
                  <Tooltip />
                  <Bar dataKey="quality" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <Button size="sm" variant="outline" className="text-xs">
                <Eye className="w-3 h-3 mr-1" />
                Lineage
              </Button>
              <Button size="sm" variant="outline" className="text-xs">
                <Settings className="w-3 h-3 mr-1" />
                Config
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Agent Pipeline Performance - Top Center (15%) */}
        <Card className="col-span-2 row-span-1 border-2 border-purple-200 shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-purple-700">
              <Network className="w-5 h-5" />
              Agent Pipelines
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-800">10.2k</div>
              <div className="text-sm text-purple-600">records/sec</div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs font-medium">NLP Agent</span>
                <Badge variant="outline" className="text-xs">96% acc</Badge>
              </div>
              <Progress value={96} className="h-2" />
              
              <div className="flex justify-between items-center">
                <span className="text-xs font-medium">OCR Agent</span>
                <Badge variant="outline" className="text-xs">94% acc</Badge>
              </div>
              <Progress value={94} className="h-2" />
              
              <div className="flex justify-between items-center">
                <span className="text-xs font-medium">Audio Agent</span>
                <Badge variant="outline" className="text-xs">88% acc</Badge>
              </div>
              <Progress value={88} className="h-2" />
            </div>

            <ResponsiveContainer width="100%" height={100}>
              <LineChart data={pipelinePerformance}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip />
                <Line type="monotone" dataKey="throughput" stroke="#8b5cf6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>

            <Alert className="border-yellow-200 bg-yellow-50">
              <Clock className="h-4 w-4 text-yellow-600" />
              <AlertDescription className="text-yellow-800 text-xs">
                Contract agent bottleneck detected
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* Model Performance and Insights - Top Right (20%) */}
        <Card className="col-span-3 row-span-1 border-2 border-green-200 shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-green-700">
              <Brain className="w-5 h-5" />
              Model Performance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Tabs defaultValue="metrics" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="metrics" className="text-xs">Metrics</TabsTrigger>
                <TabsTrigger value="insights" className="text-xs">Insights</TabsTrigger>
              </TabsList>
              
              <TabsContent value="metrics" className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  {modelMetrics.map((metric) => (
                    <div key={metric.metric} className="bg-green-50 p-2 rounded border border-green-200">
                      <div className="font-semibold text-green-700 text-xs">{metric.metric}</div>
                      <div className="text-lg font-bold text-green-800">{metric.value}</div>
                      <div className="flex items-center gap-1">
                        <CheckCircle className="w-3 h-3 text-green-600" />
                        <span className="text-xs text-green-600">Above threshold</span>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="insights" className="space-y-2">
                <div className="bg-blue-50 p-3 rounded border border-blue-200">
                  <div className="font-semibold text-blue-700 text-sm mb-2">Feature Importance</div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span>Customer complaints</span>
                      <span className="font-semibold">60%</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span>Payment history</span>
                      <span className="font-semibold">25%</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span>Support tickets</span>
                      <span className="font-semibold">15%</span>
                    </div>
                  </div>
                </div>
                
                <Alert className="border-red-200 bg-red-50">
                  <TrendingUp className="h-4 w-4 text-red-600" />
                  <AlertDescription className="text-red-800 text-xs">
                    Model drift detected in churn prediction
                  </AlertDescription>
                </Alert>
              </TabsContent>
            </Tabs>

            <div className="grid grid-cols-2 gap-2">
              <Button size="sm" variant="outline" className="text-xs">
                <Eye className="w-3 h-3 mr-1" />
                SHAP
              </Button>
              <Button size="sm" variant="outline" className="text-xs">
                <GitBranch className="w-3 h-3 mr-1" />
                Retrain
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Real-Time Collaboration Hub - Top Far Right (20%) */}
        <Card className="col-span-4 row-span-1 border-2 border-indigo-200 shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-indigo-700">
              <Users className="w-5 h-5" />
              Real-Time Collaboration Hub
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <Badge className="bg-green-100 text-green-800">4 users active</Badge>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-slate-600">Live sync</span>
              </div>
            </div>

            <div className="space-y-2 max-h-40 overflow-y-auto">
              <div className="text-sm font-medium mb-2">Recent Activity</div>
              {collaborationData.map((activity, index) => (
                <div key={index} className="flex items-start gap-2 p-2 bg-slate-50 rounded border">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    activity.type === 'annotation' ? 'bg-blue-500' :
                    activity.type === 'suggestion' ? 'bg-yellow-500' :
                    activity.type === 'alert' ? 'bg-red-500' : 'bg-green-500'
                  }`}></div>
                  <div className="flex-1">
                    <div className="text-xs font-medium">{activity.user}</div>
                    <div className="text-xs text-slate-600">{activity.action}</div>
                    <div className="text-xs text-slate-400">{activity.time}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-2">
              <Button size="sm" className="text-xs bg-indigo-600 hover:bg-indigo-700">
                <MessageSquare className="w-3 h-3 mr-1" />
                Annotate
              </Button>
              <Button size="sm" variant="outline" className="text-xs">
                <GitBranch className="w-3 h-3 mr-1" />
                Version
              </Button>
            </div>

            <div className="bg-indigo-50 p-2 rounded border border-indigo-200">
              <div className="text-xs font-medium text-indigo-700 mb-1">Shared Workspace</div>
              <div className="text-xs text-indigo-600">
                Contract themes + Sales trends analysis active
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Unstructured Data Insights - Bottom Left (15%) */}
        <Card className="col-span-2 row-span-1 border-2 border-orange-200 shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-orange-700">
              <FileText className="w-5 h-5" />
              Unstructured Insights
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-2">
              <div className="bg-orange-50 p-2 rounded border border-orange-200">
                <div className="font-semibold text-orange-700 text-xs">Email Sentiment</div>
                <div className="text-lg font-bold text-orange-800">75% Positive</div>
              </div>
              <div className="bg-orange-50 p-2 rounded border border-orange-200">
                <div className="font-semibold text-orange-700 text-xs">Contract Themes</div>
                <div className="text-sm text-orange-800">Payment delays</div>
              </div>
            </div>

            <ResponsiveContainer width="100%" height={100}>
              <AreaChart data={sentimentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip />
                <Area type="monotone" dataKey="positive" stackId="1" stroke="#f97316" fill="#fed7aa" />
                <Area type="monotone" dataKey="neutral" stackId="1" stroke="#64748b" fill="#e2e8f0" />
                <Area type="monotone" dataKey="negative" stackId="1" stroke="#ef4444" fill="#fecaca" />
              </AreaChart>
            </ResponsiveContainer>

            <div className="space-y-2">
              <div className="text-xs font-medium">Audio Insights</div>
              <div className="bg-yellow-50 p-2 rounded border border-yellow-200">
                <div className="text-xs text-yellow-800">
                  Customer calls highlight pricing concerns (↑15%)
                </div>
              </div>
            </div>

            <Button size="sm" variant="outline" className="w-full text-xs">
              <Eye className="w-3 h-3 mr-1" />
              View Word Clouds
            </Button>
          </CardContent>
        </Card>

        {/* Experimentation and Recommendations - Bottom Right (15%) */}
        <Card className="col-span-4 row-span-1 border-2 border-cyan-200 shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-cyan-700">
              <Zap className="w-5 h-5" />
              Experimentation & Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Tabs defaultValue="experiments" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="experiments" className="text-xs">Experiments</TabsTrigger>
                <TabsTrigger value="recommendations" className="text-xs">AI Recommendations</TabsTrigger>
              </TabsList>
              
              <TabsContent value="experiments" className="space-y-3">
                <ResponsiveContainer width="100%" height={120}>
                  <BarChart data={experimentData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                    <YAxis tick={{ fontSize: 10 }} />
                    <Tooltip />
                    <Bar dataKey="accuracy" fill="#06b6d4" />
                    <Bar dataKey="baseline" fill="#e5e7eb" />
                  </BarChart>
                </ResponsiveContainer>
                
                <div className="bg-green-50 p-2 rounded border border-green-200">
                  <div className="text-xs font-medium text-green-700">Latest Result</div>
                  <div className="text-sm text-green-800">NLP-v2: +5% accuracy improvement</div>
                </div>
              </TabsContent>
              
              <TabsContent value="recommendations" className="space-y-2">
                <div className="space-y-2">
                  <div className="bg-cyan-50 p-2 rounded border border-cyan-200">
                    <div className="text-xs font-medium text-cyan-700 mb-1">🔮 Harmony Suggests</div>
                    <div className="text-xs text-cyan-800">Add audio sentiment to churn prediction model</div>
                    <div className="mt-1">
                      <Button size="sm" className="text-xs bg-cyan-600 hover:bg-cyan-700">
                        Apply
                      </Button>
                    </div>
                  </div>
                  
                  <div className="bg-cyan-50 p-2 rounded border border-cyan-200">
                    <div className="text-xs font-medium text-cyan-700 mb-1">🔮 Harmony Suggests</div>
                    <div className="text-xs text-cyan-800">Increase OCR capacity for contract processing</div>
                    <div className="mt-1">
                      <Button size="sm" className="text-xs bg-cyan-600 hover:bg-cyan-700">
                        Apply
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <div className="grid grid-cols-3 gap-2">
              <Button size="sm" variant="outline" className="text-xs">
                <GitBranch className="w-3 h-3 mr-1" />
                Jupyter
              </Button>
              <Button size="sm" variant="outline" className="text-xs">
                <Database className="w-3 h-3 mr-1" />
                SQL
              </Button>
              <Button size="sm" variant="outline" className="text-xs">
                <FileText className="w-3 h-3 mr-1" />
                Python
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Additional monitoring panel that spans remaining space */}
        <Card className="col-span-6 row-span-1 border-2 border-slate-200 shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-slate-700">
              <Activity className="w-5 h-5" />
              System Overview & Advanced Analytics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 gap-4 h-full">
              <div className="space-y-3">
                <div className="text-sm font-medium">System Health</div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs">CPU Usage</span>
                    <span className="text-xs font-semibold">68%</span>
                  </div>
                  <Progress value={68} className="h-2" />
                  
                  <div className="flex justify-between items-center">
                    <span className="text-xs">Memory</span>
                    <span className="text-xs font-semibold">45%</span>
                  </div>
                  <Progress value={45} className="h-2" />
                  
                  <div className="flex justify-between items-center">
                    <span className="text-xs">Storage</span>
                    <span className="text-xs font-semibold">72%</span>
                  </div>
                  <Progress value={72} className="h-2" />
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="text-sm font-medium">Data Flow</div>
                <ResponsiveContainer width="100%" height={100}>
                  <LineChart data={pipelinePerformance}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" tick={{ fontSize: 8 }} />
                    <YAxis tick={{ fontSize: 8 }} />
                    <Tooltip />
                    <Line type="monotone" dataKey="throughput" stroke="#3b82f6" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              
              <div className="space-y-3">
                <div className="text-sm font-medium">Alert Summary</div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="text-xs">2 Critical</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span className="text-xs">5 Warning</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-xs">12 Info</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="text-sm font-medium">Quick Actions</div>
                <div className="space-y-2">
                  <Button size="sm" className="w-full text-xs bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    <Play className="w-3 h-3 mr-1" />
                    Run Pipeline
                  </Button>
                  <Button size="sm" variant="outline" className="w-full text-xs">
                    <Settings className="w-3 h-3 mr-1" />
                    Configure
                  </Button>
                  <Button size="sm" variant="outline" className="w-full text-xs">
                    <Eye className="w-3 h-3 mr-1" />
                    Deep Dive
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;

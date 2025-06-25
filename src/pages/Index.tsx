
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
  ScatterChart, Scatter
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
  Settings,
  Filter,
  BarChart3,
  Shield
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
  const ingestionQualityData = [
    { type: 'PDFs', processed: 1500, completeness: 85, consistency: 92, accuracy: 95, anomalies: 5 },
    { type: 'Emails', processed: 800, completeness: 90, consistency: 88, accuracy: 92, anomalies: 8 },
    { type: 'Audio', processed: 30, completeness: 78, consistency: 85, accuracy: 88, anomalies: 12 },
    { type: 'Contracts', processed: 600, completeness: 95, consistency: 97, accuracy: 97, anomalies: 3 },
    { type: 'Spreadsheets', processed: 900, completeness: 98, consistency: 94, accuracy: 96, anomalies: 4 }
  ];

  const transformationMetrics = [
    { process: 'Duplicate Removal', impact: 10, variance: 95, error: 2 },
    { process: 'Missing Value Imputation', impact: 5, variance: 98, error: 3 },
    { process: 'Feature Scaling', impact: 0, variance: 95, error: 1 },
    { process: 'Encoding', impact: 15, variance: 90, error: 5 },
    { process: 'PCA Reduction', impact: 20, variance: 95, error: 2 }
  ];

  const modelPerformanceData = [
    { model: 'XGBoost', f1: 0.92, rmse: 1.5, auc: 0.94, training_time: 45, inference: 2 },
    { model: 'Random Forest', f1: 0.89, rmse: 1.8, auc: 0.91, training_time: 30, inference: 4 },
    { model: 'Neural Network', f1: 0.94, rmse: 1.3, auc: 0.96, training_time: 120, inference: 1 },
    { model: 'SVM', f1: 0.87, rmse: 2.1, auc: 0.88, training_time: 60, inference: 3 },
    { model: 'LightGBM', f1: 0.91, rmse: 1.6, auc: 0.93, training_time: 25, inference: 1.5 }
  ];

  const biasMetrics = [
    { group: 'Gender', disparity: 1.2, tpr_gap: 5, fpr_diff: 3, mitigation: 40 },
    { group: 'Age', disparity: 1.1, tpr_gap: 3, fpr_diff: 2, mitigation: 60 },
    { group: 'Ethnicity', disparity: 1.3, tpr_gap: 7, fpr_diff: 4, mitigation: 35 },
    { group: 'Income', disparity: 1.4, tpr_gap: 8, fpr_diff: 5, mitigation: 25 }
  ];

  const experimentData = [
    { experiment: 'SVM vs XGBoost', metric: 'F1', improvement: 3, pvalue: 0.02, confidence: 95 },
    { experiment: 'Neural Net Audio', metric: 'Accuracy', improvement: 5, pvalue: 0.01, confidence: 99 },
    { experiment: 'Bias Mitigation', metric: 'Fairness', improvement: 40, pvalue: 0.001, confidence: 99.9 },
    { experiment: 'Feature Selection', metric: 'Latency', improvement: -15, pvalue: 0.03, confidence: 97 }
  ];

  const collaborationData = [
    { user: 'Dr. Chen', action: 'Flagged bias in email sentiment model', time: '2 min ago', type: 'bias' },
    { user: 'Alex Kim', action: 'Suggested feature engineering for audio', time: '5 min ago', type: 'suggestion' },
    { user: 'Sarah Rodriguez', action: 'Validated contract risk patterns', time: '8 min ago', type: 'validation' },
    { user: 'Maria Santos', action: 'Updated transformation pipeline', time: '12 min ago', type: 'update' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Harmony Engine Analytics Dashboard
            </h1>
            <p className="text-lg text-slate-600 mt-2">
              Advanced Data Science Platform for Statistical Analysis & Team Collaboration
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant={isRealTime ? "default" : "secondary"} className="px-3 py-1">
              {isRealTime ? "Live Analytics" : "Paused"}
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
        
        {/* Data Ingestion and Quality Metrics - Top Left (20%) */}
        <Card className="col-span-3 row-span-1 border-2 border-blue-200 shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-blue-700">
              <Database className="w-5 h-5" />
              Data Ingestion & Quality Metrics
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="bg-green-50 p-2 rounded border border-green-200">
                <div className="font-semibold text-green-700">Total Processed</div>
                <div className="text-xl font-bold text-green-800">3,930</div>
              </div>
              <div className="bg-blue-50 p-2 rounded border border-blue-200">
                <div className="font-semibold text-blue-700">Avg Quality</div>
                <div className="text-xl font-bold text-blue-800">92.4%</div>
              </div>
            </div>

            <Alert className="border-orange-200 bg-orange-50">
              <AlertTriangle className="h-4 w-4 text-orange-600" />
              <AlertDescription className="text-orange-800 text-xs">
                High missing data in contract PDFs—review pipeline
              </AlertDescription>
            </Alert>

            <div className="space-y-2">
              <div className="text-sm font-medium">Quality Metrics by Type</div>
              <ResponsiveContainer width="100%" height={120}>
                <BarChart data={ingestionQualityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="type" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} />
                  <Tooltip />
                  <Bar dataKey="completeness" fill="#3b82f6" />
                  <Bar dataKey="consistency" fill="#10b981" />
                  <Bar dataKey="accuracy" fill="#f59e0b" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-2">
              <div className="text-xs">Statistical Metrics:</div>
              <div className="grid grid-cols-2 gap-1 text-xs">
                <div>Missing Values: 15%</div>
                <div>Format Errors: 8%</div>
                <div>Outliers: 5%</div>
                <div>Entropy: 0.73</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <Button size="sm" variant="outline" className="text-xs">
                <Eye className="w-3 h-3 mr-1" />
                Lineage
              </Button>
              <Button size="sm" variant="outline" className="text-xs">
                <BarChart3 className="w-3 h-3 mr-1" />
                Stats
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Data Cleaning and Transformation Metrics - Top Center (15%) */}
        <Card className="col-span-2 row-span-1 border-2 border-purple-200 shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-purple-700">
              <Filter className="w-5 h-5" />
              Cleaning & Transformation
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-800">95%</div>
              <div className="text-sm text-purple-600">variance preserved</div>
            </div>

            <div className="space-y-2">
              <div className="text-sm font-medium">Transformation Impact</div>
              <ResponsiveContainer width="100%" height={100}>
                <LineChart data={transformationMetrics}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="process" tick={{ fontSize: 8 }} />
                  <YAxis tick={{ fontSize: 10 }} />
                  <Tooltip />
                  <Line type="monotone" dataKey="variance" stroke="#8b5cf6" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-2">
              <div className="text-xs font-medium">Processing Stats</div>
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span>Duplicates Removed</span>
                  <span className="font-semibold">10%</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span>Values Imputed</span>
                  <span className="font-semibold">5%</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span>PCA Components</span>
                  <span className="font-semibold">10</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span>Sparsity (One-hot)</span>
                  <span className="font-semibold">80%</span>
                </div>
              </div>
            </div>

            <Alert className="border-yellow-200 bg-yellow-50">
              <Clock className="h-4 w-4 text-yellow-600" />
              <AlertDescription className="text-yellow-800 text-xs">
                High imputation error in audio—review method
              </AlertDescription>
            </Alert>

            <Button size="sm" variant="outline" className="w-full text-xs">
              <Settings className="w-3 h-3 mr-1" />
              Pipeline Config
            </Button>
          </CardContent>
        </Card>

        {/* Model Selection and Performance Indicators - Top Right (20%) */}
        <Card className="col-span-3 row-span-1 border-2 border-green-200 shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-green-700">
              <Brain className="w-5 h-5" />
              Model Performance & Selection
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Tabs defaultValue="performance" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="performance" className="text-xs">Performance</TabsTrigger>
                <TabsTrigger value="selection" className="text-xs">Selection</TabsTrigger>
              </TabsList>
              
              <TabsContent value="performance" className="space-y-3">
                <ResponsiveContainer width="100%" height={120}>
                  <BarChart data={modelPerformanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="model" tick={{ fontSize: 8 }} />
                    <YAxis tick={{ fontSize: 10 }} />
                    <Tooltip />
                    <Bar dataKey="f1" fill="#10b981" />
                    <Bar dataKey="auc" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
                
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-green-50 p-2 rounded">
                    <div className="font-semibold">Best F1</div>
                    <div>Neural Net: 0.94</div>
                  </div>
                  <div className="bg-blue-50 p-2 rounded">
                    <div className="font-semibold">Best AUC</div>
                    <div>Neural Net: 0.96</div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="selection" className="space-y-2">
                <div className="text-xs font-medium">Selection Criteria</div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span>Training Time (min)</span>
                    <span>25-120</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>Inference (sec)</span>
                    <span>1-4</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>Memory (GB)</span>
                    <span>2-8</span>
                  </div>
                </div>
                
                <Alert className="border-red-200 bg-red-50">
                  <TrendingUp className="h-4 w-4 text-red-600" />
                  <AlertDescription className="text-red-800 text-xs">
                    KL divergence: 0.3—retrain needed
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
                Compare
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Data Bias Detection and Mitigation Metrics - Bottom Left (15%) */}
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

        {/* Real-Time Collaboration Hub - Bottom Center (15%) */}
        <Card className="col-span-4 row-span-1 border-2 border-indigo-200 shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-indigo-700">
              <Users className="w-5 h-5" />
              Real-Time Collaboration Hub
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <Badge className="bg-green-100 text-green-800">4 analysts active</Badge>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-slate-600">Live sync</span>
              </div>
            </div>

            <div className="space-y-2 max-h-40 overflow-y-auto">
              <div className="text-sm font-medium mb-2">Team Activity Feed</div>
              {collaborationData.map((activity, index) => (
                <div key={index} className="flex items-start gap-2 p-2 bg-slate-50 rounded border">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    activity.type === 'bias' ? 'bg-red-500' :
                    activity.type === 'suggestion' ? 'bg-yellow-500' :
                    activity.type === 'validation' ? 'bg-green-500' : 'bg-blue-500'
                  }`}></div>
                  <div className="flex-1">
                    <div className="text-xs font-medium">{activity.user}</div>
                    <div className="text-xs text-slate-600">{activity.action}</div>
                    <div className="text-xs text-slate-400">{activity.time}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-2">
              <Button size="sm" className="text-xs bg-indigo-600 hover:bg-indigo-700">
                <MessageSquare className="w-3 h-3 mr-1" />
                Annotate
              </Button>
              <Button size="sm" variant="outline" className="text-xs">
                <GitBranch className="w-3 h-3 mr-1" />
                Version
              </Button>
              <Button size="sm" variant="outline" className="text-xs">
                <Eye className="w-3 h-3 mr-1" />
                Insights
              </Button>
            </div>

            <div className="bg-indigo-50 p-2 rounded border border-indigo-200">
              <div className="text-xs font-medium text-indigo-700 mb-1">Shared Workspace</div>
              <div className="text-xs text-indigo-600">
                Bias mitigation + Model optimization active
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Advanced Metrics and Experimentation - Bottom Right (15%) */}
        <Card className="col-span-4 row-span-1 border-2 border-cyan-200 shadow-lg">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-cyan-700">
              <Zap className="w-5 h-5" />
              Advanced Metrics & Experimentation
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Tabs defaultValue="experiments" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="experiments" className="text-xs">Experiments</TabsTrigger>
                <TabsTrigger value="metrics" className="text-xs">Statistical Tests</TabsTrigger>
              </TabsList>
              
              <TabsContent value="experiments" className="space-y-3">
                <ResponsiveContainer width="100%" height={120}>
                  <BarChart data={experimentData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="experiment" tick={{ fontSize: 8 }} />
                    <YAxis tick={{ fontSize: 10 }} />
                    <Tooltip />
                    <Bar dataKey="improvement" fill="#06b6d4" />
                  </BarChart>
                </ResponsiveContainer>
                
                <div className="bg-green-50 p-2 rounded border border-green-200">
                  <div className="text-xs font-medium text-green-700">Latest Result</div>
                  <div className="text-sm text-green-800">Neural Net Audio: +5% accuracy (p&lt;0.01)</div>
                </div>
              </TabsContent>
              
              <TabsContent value="metrics" className="space-y-2">
                <div className="space-y-2">
                  <div className="text-xs font-medium">Statistical Validation</div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-cyan-50 p-2 rounded">
                      <div className="font-semibold">P-values</div>
                      <div>Range: 0.001-0.03</div>
                    </div>
                    <div className="bg-cyan-50 p-2 rounded">
                      <div className="font-semibold">Confidence</div>
                      <div>Min: 95%</div>
                    </div>
                  </div>
                  
                  <div className="bg-cyan-50 p-2 rounded border border-cyan-200">
                    <div className="text-xs font-medium text-cyan-700 mb-1">🔮 Harmony Suggests</div>
                    <div className="text-xs text-cyan-800">Try neural network for audio transcription (95% confidence)</div>
                    <div className="mt-1">
                      <Button size="sm" className="text-xs bg-cyan-600 hover:bg-cyan-700">
                        Run Experiment
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <div className="grid grid-cols-4 gap-2">
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
              <Button size="sm" variant="outline" className="text-xs">
                <BarChart3 className="w-3 h-3 mr-1" />
                R
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;

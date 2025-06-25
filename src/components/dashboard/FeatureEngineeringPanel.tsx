
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Zap, Check, X, Settings, Bot, User, ArrowRight } from 'lucide-react';

const FeatureEngineeringPanel = () => {
  const featureImportanceData = [
    { feature: 'Age_x_Income', importance: 0.24, type: 'cross', status: 'accepted' },
    { feature: 'Email_Length_Poly', importance: 0.18, type: 'polynomial', status: 'accepted' },
    { feature: 'Contract_Duration_Bin', importance: 0.15, type: 'binning', status: 'pending' },
    { feature: 'Audio_Sentiment_Cross', importance: 0.12, type: 'cross', status: 'accepted' },
    { feature: 'PDF_Pages_Log', importance: 0.08, type: 'transform', status: 'rejected' }
  ];

  const transformationLogs = [
    { time: '14:23', action: 'Applied polynomial transform to Email_Length', status: 'success' },
    { time: '14:20', action: 'Created Age_x_Income interaction term', status: 'success' },
    { time: '14:18', action: 'Binned Contract_Duration into 5 groups', status: 'pending' },
    { time: '14:15', action: 'Generated cross-feature for Audio_Sentiment', status: 'success' }
  ];

  const transformationMap = [
    { feature: 'Age', original: 'Age', transformation: 'Min-Max Scaling', method: 'range(0,1)', origin: 'manual', status: 'active' },
    { feature: 'Income', original: 'Income', transformation: 'Log Transform', method: 'log(x+1)', origin: 'AI-suggested', status: 'active' },
    { feature: 'Email_Length', original: 'Email_Length', transformation: 'Polynomial', method: 'x^2, x^3', origin: 'AI-suggested', status: 'active' },
    { feature: 'Contract_Duration', original: 'Contract_Duration', transformation: 'Binning', method: '5 bins', origin: 'manual', status: 'pending' },
    { feature: 'Audio_Quality', original: 'Audio_Quality', transformation: 'Standard Scaling', method: 'z-score', origin: 'manual', status: 'active' },
    { feature: 'PDF_Pages', original: 'PDF_Pages', transformation: 'Log Transform', method: 'log(x)', origin: 'AI-suggested', status: 'rejected' }
  ];

  return (
    <Card className="h-full flex flex-col border-2 border-yellow-200 shadow-lg">
      <CardHeader className="pb-4 flex-shrink-0">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-yellow-700 text-lg">
            <Zap className="w-5 h-5" />
            Feature Engineering & Auto-Generation
          </CardTitle>
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
            Active
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 overflow-hidden">
        <Tabs defaultValue="importance" className="h-full flex flex-col">
          <TabsList className="grid w-full grid-cols-4 mb-4">
            <TabsTrigger value="importance" className="text-xs">Importance</TabsTrigger>
            <TabsTrigger value="logs" className="text-xs">Logs</TabsTrigger>
            <TabsTrigger value="suggestions" className="text-xs">AI Suggestions</TabsTrigger>
            <TabsTrigger value="transformation" className="text-xs">Transform Map</TabsTrigger>
          </TabsList>
          
          <TabsContent value="importance" className="flex-1 space-y-3">
            <div className="h-32">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={featureImportanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="feature" tick={{ fontSize: 8 }} />
                  <YAxis tick={{ fontSize: 10 }} />
                  <Tooltip />
                  <Bar dataKey="importance" fill="#eab308" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="bg-green-50 p-3 rounded-lg border border-green-200">
              <div className="text-sm font-medium text-green-700">Harmony Output</div>
              <div className="text-sm text-green-800">Auto-generated 8 new interaction terms. 3 accepted.</div>
            </div>
          </TabsContent>
          
          <TabsContent value="logs" className="flex-1 space-y-2">
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {transformationLogs.map((log, index) => (
                <div key={index} className="flex items-start gap-2 p-2 bg-slate-50 rounded-lg border">
                  <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                    log.status === 'success' ? 'bg-green-500' :
                    log.status === 'pending' ? 'bg-yellow-500' : 'bg-red-500'
                  }`}></div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-slate-400">{log.time}</div>
                    <div className="text-sm text-slate-700">{log.action}</div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="suggestions" className="flex-1 space-y-3">
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 bg-blue-50 rounded-lg border border-blue-200">
                <div className="text-sm text-blue-800">Create Age_x_Contract interaction</div>
                <div className="flex gap-1">
                  <Button size="sm" variant="outline" className="h-6 w-6 p-0">
                    <Check className="w-3 h-3" />
                  </Button>
                  <Button size="sm" variant="outline" className="h-6 w-6 p-0">
                    <X className="w-3 h-3" />
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-between p-2 bg-blue-50 rounded-lg border border-blue-200">
                <div className="text-sm text-blue-800">Apply log transform to PDF_Pages</div>
                <div className="flex gap-1">
                  <Button size="sm" variant="outline" className="h-6 w-6 p-0">
                    <Check className="w-3 h-3" />
                  </Button>
                  <Button size="sm" variant="outline" className="h-6 w-6 p-0">
                    <X className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="transformation" className="flex-1 space-y-3">
            <div className="max-h-40 overflow-y-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-xs p-2">Feature</TableHead>
                    <TableHead className="text-xs p-2">Transform</TableHead>
                    <TableHead className="text-xs p-2">Origin</TableHead>
                    <TableHead className="text-xs p-2">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transformationMap.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell className="text-xs p-2">
                        <div className="flex items-center gap-1">
                          <span className="font-medium">{item.original}</span>
                          <ArrowRight className="w-3 h-3 text-slate-400" />
                          <span className="text-slate-600">{item.feature}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-xs p-2">
                        <div className="text-slate-700">{item.transformation}</div>
                        <div className="text-slate-500 text-xs">{item.method}</div>
                      </TableCell>
                      <TableCell className="text-xs p-2">
                        <div className="flex items-center gap-1">
                          {item.origin === 'manual' ? (
                            <User className="w-3 h-3 text-blue-600" />
                          ) : (
                            <Bot className="w-3 h-3 text-purple-600" />
                          )}
                          <span className={item.origin === 'manual' ? 'text-blue-600' : 'text-purple-600'}>
                            {item.origin === 'manual' ? 'Manual' : 'AI'}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-xs p-2">
                        <Badge 
                          variant={
                            item.status === 'active' ? 'default' :
                            item.status === 'pending' ? 'secondary' : 'destructive'
                          }
                          className="text-xs"
                        >
                          {item.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
        </Tabs>

        <Button size="sm" variant="outline" className="w-full mt-4 text-xs">
          <Settings className="w-3 h-3 mr-2" />
          Configure Auto-Engineering
        </Button>
      </CardContent>
    </Card>
  );
};

export default FeatureEngineeringPanel;

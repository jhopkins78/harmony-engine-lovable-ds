
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Settings, CheckCircle, AlertCircle, Zap, ArrowRight, Sparkles, Download } from 'lucide-react';

const FeatureEngineeringPanel = () => {
  const [selectedFeature, setSelectedFeature] = useState('');

  const features = [
    { name: 'age_normalized', importance: 0.23, status: 'optimized', type: 'numerical' },
    { name: 'income_log', importance: 0.18, status: 'optimized', type: 'numerical' },
    { name: 'email_sentiment', importance: 0.15, status: 'processing', type: 'text' },
    { name: 'contract_duration', importance: 0.12, status: 'optimized', type: 'categorical' },
    { name: 'interaction_frequency', importance: 0.09, status: 'pending', type: 'numerical' }
  ];

  const transformationMap = [
    { 
      originalFeature: 'age', 
      transformedFeature: 'age_normalized', 
      transformation: 'Min-Max Scaling', 
      origin: 'AI-Suggested',
      status: 'applied',
      improvement: '+12% correlation'
    },
    { 
      originalFeature: 'income', 
      transformedFeature: 'income_log', 
      transformation: 'Log Transform', 
      origin: 'Manual',
      status: 'applied',
      improvement: '+8% correlation'
    },
    { 
      originalFeature: 'email_text', 
      transformedFeature: 'email_sentiment', 
      transformation: 'Sentiment Analysis', 
      origin: 'AI-Suggested',
      status: 'processing',
      improvement: 'TBD'
    },
    { 
      originalFeature: 'contract_type', 
      transformedFeature: 'contract_duration', 
      transformation: 'One-Hot Encoding', 
      origin: 'Manual',
      status: 'applied',
      improvement: '+5% correlation'
    }
  ];

  const logs = [
    { time: '14:23', action: 'Applied log transformation to income', status: 'success' },
    { time: '14:20', action: 'Generated polynomial features for age', status: 'success' },
    { time: '14:18', action: 'Started sentiment analysis on email text', status: 'processing' },
    { time: '14:15', action: 'Normalized numerical features', status: 'success' }
  ];

  const aiSuggestions = [
    { feature: 'interaction_frequency', suggestion: 'Apply square root transformation', confidence: 0.89, reason: 'Reduces skewness' },
    { feature: 'purchase_amount', suggestion: 'Create binned categories', confidence: 0.76, reason: 'Non-linear patterns detected' },
    { feature: 'email_timestamp', suggestion: 'Extract time-based features', confidence: 0.84, reason: 'Temporal patterns found' }
  ];

  return (
    <Card className="h-full flex flex-col border-2 border-purple-200 shadow-lg">
      <CardHeader className="pb-3 flex-shrink-0">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-purple-700 text-lg">
            <Settings className="w-5 h-5" />
            Feature Engineering & Auto-Generation
          </CardTitle>
          <Badge variant="secondary" className="bg-purple-100 text-purple-800">
            Processing
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 overflow-hidden">
        <Tabs defaultValue="importance" className="h-full flex flex-col">
          <TabsList className="grid w-full grid-cols-4 mb-3">
            <TabsTrigger value="importance" className="text-xs">Importance</TabsTrigger>
            <TabsTrigger value="transformation" className="text-xs">Transform Map</TabsTrigger>
            <TabsTrigger value="logs" className="text-xs">Logs</TabsTrigger>
            <TabsTrigger value="suggestions" className="text-xs">AI Suggestions</TabsTrigger>
          </TabsList>
          
          <TabsContent value="importance" className="flex-1 space-y-2">
            <div className="space-y-1 max-h-32 overflow-y-auto">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3 p-2 bg-slate-50 rounded-lg border">
                  <div className={`w-3 h-3 rounded-full flex-shrink-0 ${
                    feature.status === 'optimized' ? 'bg-green-500' :
                    feature.status === 'processing' ? 'bg-blue-500 animate-pulse' : 'bg-gray-300'
                  }`}></div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-slate-900">{feature.name}</div>
                    <div className="text-xs text-slate-500">{feature.type}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-purple-600">{feature.importance}</div>
                    <Badge variant={feature.status === 'optimized' ? 'default' : 'secondary'} className="text-xs">
                      {feature.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2">
              <Button size="sm" variant="outline" className="text-xs">
                <Zap className="w-3 h-3 mr-1" />
                Auto-Generate
              </Button>
              <Button size="sm" variant="outline" className="text-xs">
                <Download className="w-3 h-3 mr-1" />
                Export Features
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="transformation" className="flex-1 space-y-2">
            <div className="max-h-32 overflow-y-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-xs p-2">Original</TableHead>
                    <TableHead className="text-xs p-2">Transform</TableHead>
                    <TableHead className="text-xs p-2">Origin</TableHead>
                    <TableHead className="text-xs p-2">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transformationMap.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell className="text-xs p-2 font-medium">{item.originalFeature}</TableCell>
                      <TableCell className="text-xs p-2">
                        <div className="flex items-center gap-1">
                          <ArrowRight className="w-3 h-3 text-slate-400" />
                          <span>{item.transformation}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-xs p-2">
                        <Badge variant={item.origin === 'AI-Suggested' ? 'default' : 'secondary'} className="text-xs">
                          {item.origin === 'AI-Suggested' ? (
                            <><Sparkles className="w-3 h-3 mr-1" />AI</>
                          ) : (
                            'Manual'
                          )}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-xs p-2">
                        <Badge variant={item.status === 'applied' ? 'default' : 'secondary'} className="text-xs">
                          {item.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="bg-purple-50 p-2 rounded-lg border border-purple-200">
              <div className="text-xs font-medium text-purple-700">Summary</div>
              <div className="text-xs text-purple-800">4 transformations applied • 3 AI-suggested • 1 manual</div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <Button size="sm" variant="outline" className="text-xs">
                <Zap className="w-3 h-3 mr-1" />
                Auto-Generate
              </Button>
              <Button size="sm" variant="outline" className="text-xs">
                <Download className="w-3 h-3 mr-1" />
                Export Map
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="logs" className="flex-1 space-y-2">
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {logs.map((log, index) => (
                <div key={index} className="flex items-start gap-2 p-2 bg-slate-50 rounded-lg border">
                  <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                    log.status === 'success' ? 'bg-green-500' : 'bg-blue-500 animate-pulse'
                  }`}></div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-slate-400">{log.time}</div>
                    <div className="text-sm text-slate-700">{log.action}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2">
              <Button size="sm" variant="outline" className="text-xs">
                <Zap className="w-3 h-3 mr-1" />
                Auto-Generate
              </Button>
              <Button size="sm" variant="outline" className="text-xs">
                <Download className="w-3 h-3 mr-1" />
                Export Logs
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="suggestions" className="flex-1 space-y-2">
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {aiSuggestions.map((suggestion, index) => (
                <div key={index} className="p-2 bg-slate-50 rounded-lg border">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-slate-900">{suggestion.feature}</span>
                    <Badge variant="outline" className="text-xs">
                      {Math.round(suggestion.confidence * 100)}% conf
                    </Badge>
                  </div>
                  <div className="text-sm text-slate-700">{suggestion.suggestion}</div>
                  <div className="text-xs text-slate-500">{suggestion.reason}</div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2">
              <Button size="sm" variant="outline" className="text-xs">
                <CheckCircle className="w-3 h-3 mr-1" />
                Apply All
              </Button>
              <Button size="sm" variant="outline" className="text-xs">
                <AlertCircle className="w-3 h-3 mr-1" />
                Review
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default FeatureEngineeringPanel;

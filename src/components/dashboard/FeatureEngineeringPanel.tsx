
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Settings } from 'lucide-react';
import ActionButtons from './feature-engineering/ActionButtons';
import FeatureImportanceTab from './feature-engineering/FeatureImportanceTab';
import TransformationMapTab from './feature-engineering/TransformationMapTab';
import LogsTab from './feature-engineering/LogsTab';
import AISuggestionsTab from './feature-engineering/AISuggestionsTab';
import { Feature, TransformationItem, LogItem, AISuggestion } from './feature-engineering/types';

const FeatureEngineeringPanel = () => {
  const [selectedFeature, setSelectedFeature] = useState('');

  const features: Feature[] = [
    { name: 'age_normalized', importance: 0.23, status: 'optimized', type: 'numerical' },
    { name: 'income_log', importance: 0.18, status: 'optimized', type: 'numerical' },
    { name: 'email_sentiment', importance: 0.15, status: 'processing', type: 'text' },
    { name: 'contract_duration', importance: 0.12, status: 'optimized', type: 'categorical' },
    { name: 'interaction_frequency', importance: 0.09, status: 'pending', type: 'numerical' }
  ];

  const transformationMap: TransformationItem[] = [
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

  const logs: LogItem[] = [
    { time: '14:23', action: 'Applied log transformation to income', status: 'success' },
    { time: '14:20', action: 'Generated polynomial features for age', status: 'success' },
    { time: '14:18', action: 'Started sentiment analysis on email text', status: 'processing' },
    { time: '14:15', action: 'Normalized numerical features', status: 'success' }
  ];

  const aiSuggestions: AISuggestion[] = [
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
          <div className="flex flex-col gap-3 mb-3">
            <ActionButtons />
            
            <TabsList className="flex flex-row w-full h-auto p-1 gap-1 overflow-x-auto">
              <TabsTrigger value="importance" className="flex-shrink-0 text-xs px-2 py-1 whitespace-nowrap">
                Importance
              </TabsTrigger>
              <TabsTrigger value="transformation" className="flex-shrink-0 text-xs px-2 py-1 whitespace-nowrap">
                Transform Map
              </TabsTrigger>
              <TabsTrigger value="logs" className="flex-shrink-0 text-xs px-2 py-1 whitespace-nowrap">
                Logs
              </TabsTrigger>
              <TabsTrigger value="suggestions" className="flex-shrink-0 text-xs px-2 py-1 whitespace-nowrap">
                AI Suggestions
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="importance" className="flex-1 space-y-2 mt-0">
            <FeatureImportanceTab features={features} />
          </TabsContent>

          <TabsContent value="transformation" className="flex-1 space-y-2 mt-0">
            <TransformationMapTab transformationMap={transformationMap} />
          </TabsContent>
          
          <TabsContent value="logs" className="flex-1 space-y-2 mt-0">
            <LogsTab logs={logs} />
          </TabsContent>
          
          <TabsContent value="suggestions" className="flex-1 space-y-2 mt-0">
            <AISuggestionsTab suggestions={aiSuggestions} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default FeatureEngineeringPanel;

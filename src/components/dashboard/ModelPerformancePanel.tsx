
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Brain, TrendingUp, Eye, BarChart3, Settings, Play, RotateCcw } from 'lucide-react';

const ModelPerformancePanel = () => {
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedTuning, setSelectedTuning] = useState('');

  const modelPerformanceData = [
    { model: 'XGBoost', f1: 0.92, rmse: 1.5, auc: 0.94, training_time: 45, inference: 2 },
    { model: 'Random Forest', f1: 0.89, rmse: 1.8, auc: 0.91, training_time: 30, inference: 4 },
    { model: 'Neural Net', f1: 0.94, rmse: 1.3, auc: 0.96, training_time: 120, inference: 1 },
    { model: 'SVM', f1: 0.87, rmse: 2.1, auc: 0.88, training_time: 60, inference: 3 },
    { model: 'LightGBM', f1: 0.91, rmse: 1.6, auc: 0.93, training_time: 25, inference: 1.5 }
  ];

  const modelOptions = [
    { value: 'random-forest', label: 'Random Forest (RanFor)', type: 'Classification/Regression', advantages: 'Robust, handles missing values well', trainTime: '15-30 min' },
    { value: 'xgboost', label: 'XGBoost', type: 'Classification/Regression', advantages: 'High performance, efficient', trainTime: '20-45 min' },
    { value: 'lightgbm', label: 'LightGBM', type: 'Classification/Regression', advantages: 'Fast training, memory efficient', trainTime: '10-25 min' },
    { value: 'logistic-regression', label: 'Logistic Regression (LogReg)', type: 'Classification', advantages: 'Interpretable, fast', trainTime: '5-10 min' },
    { value: 'linear-regression', label: 'Linear Regression (LinReg)', type: 'Regression', advantages: 'Simple, interpretable', trainTime: '2-5 min' },
    { value: 'knn', label: 'K-Nearest Neighbors (KNN)', type: 'Classification/Regression', advantages: 'Simple, no assumptions', trainTime: '1-3 min' },
    { value: 'svm', label: 'Support Vector Machine (SVM)', type: 'Classification/Regression', advantages: 'Effective in high dimensions', trainTime: '30-60 min' },
    { value: 'nn-mlp', label: 'Neural Net - MLP (NN-MLP)', type: 'Classification/Regression', advantages: 'Non-linear patterns', trainTime: '45-90 min' },
    { value: 'nn-dnn', label: 'Neural Net - DNN (NN-DNN)', type: 'Classification/Regression', advantages: 'Deep learning capabilities', trainTime: '60-120 min' },
    { value: 'kmeans', label: 'K-Means', type: 'Clustering', advantages: 'Simple clustering', trainTime: '5-15 min' },
    { value: 'naive-bayes', label: 'Naive Bayes', type: 'Classification', advantages: 'Fast, works with small datasets', trainTime: '2-5 min' }
  ];

  const tuningOptions = [
    { value: 'gridsearch', label: 'GridSearch', description: 'Exhaustive search over parameter grid', params: 'n_estimators, max_depth, min_samples_split' },
    { value: 'randomsearch', label: 'RandomSearch (RanSearch)', description: 'Random sampling of parameter space', params: 'n_estimators, max_depth, learning_rate' },
    { value: 'bayesian-opt', label: 'Bayesian Optimization (BayOpt)', description: 'Probabilistic model-based optimization', params: 'max_depth, learning_rate, reg_alpha' },
    { value: 'optuna', label: 'Optuna', description: 'Automatic hyperparameter optimization', params: 'n_trials, sampler, pruner' },
    { value: 'hyperband', label: 'HyperBand', description: 'Bandit-based configuration evaluation', params: 'max_iter, eta, resource' },
    { value: 'bayessearchcv', label: 'BayesSearchCV', description: 'Bayesian optimization with cross-validation', params: 'n_iter, cv, scoring' },
    { value: 'tpe', label: 'Tree-structured Parzen Estimator (TPE)', description: 'Sequential model-based optimization', params: 'n_startup_trials, n_warmup_steps' },
    { value: 'raytune', label: 'RayTune', description: 'Scalable hyperparameter tuning', params: 'scheduler, search_alg, resources' },
    { value: 'pbt', label: 'Population-Based Training (PBT)', description: 'Population-based hyperparameter optimization', params: 'population_size, mutation_rate' }
  ];

  const selectedModelData = modelOptions.find(model => model.value === selectedModel);
  const selectedTuningData = tuningOptions.find(tuning => tuning.value === selectedTuning);

  const handleReset = () => {
    setSelectedModel('');
    setSelectedTuning('');
  };

  return (
    <Card className="h-full flex flex-col border-2 border-green-200 shadow-lg">
      <CardHeader className="pb-3 flex-shrink-0">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-green-700 text-lg">
            <Brain className="w-5 h-5" />
            Model Performance & Selection
          </CardTitle>
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            Optimized
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 overflow-hidden">
        <Tabs defaultValue="performance" className="h-full flex flex-col">
          <TabsList className="grid w-full grid-cols-3 mb-3">
            <TabsTrigger value="performance" className="text-sm">Performance</TabsTrigger>
            <TabsTrigger value="selection" className="text-sm">Selection</TabsTrigger>
            <TabsTrigger value="configuration" className="text-sm">Configuration</TabsTrigger>
          </TabsList>
          
          <TabsContent value="performance" className="flex-1 space-y-3">
            <div className="h-28">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={modelPerformanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="model" tick={{ fontSize: 8 }} />
                  <YAxis tick={{ fontSize: 10 }} />
                  <Tooltip />
                  <Bar dataKey="f1" fill="#10b981" />
                  <Bar dataKey="auc" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-green-50 p-2 rounded-lg border border-green-200">
                <div className="text-xs font-medium text-green-700">Best F1</div>
                <div className="text-sm font-bold text-green-800">Neural Net: 0.94</div>
              </div>
              <div className="bg-blue-50 p-2 rounded-lg border border-blue-200">
                <div className="text-xs font-medium text-blue-700">Best AUC</div>
                <div className="text-sm font-bold text-blue-800">Neural Net: 0.96</div>
              </div>
            </div>

            {/* Move the action buttons higher up */}
            <div className="grid grid-cols-2 gap-2 pt-2">
              <Button size="sm" variant="outline" className="text-xs">
                <Eye className="w-3 h-3 mr-1" />
                SHAP
              </Button>
              <Button size="sm" variant="outline" className="text-xs">
                <BarChart3 className="w-3 h-3 mr-1" />
                Compare
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="selection" className="flex-1 space-y-3">
            <div className="space-y-2">
              <div className="text-sm font-medium text-slate-700">Selection Criteria</div>
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Training Time:</span>
                  <span className="font-semibold">25-120 min</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Inference:</span>
                  <span className="font-semibold">1-4 sec</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Memory:</span>
                  <span className="font-semibold">2-8 GB</span>
                </div>
              </div>
            </div>
            
            <Alert className="border-red-200 bg-red-50">
              <TrendingUp className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-800 text-sm">
                KL divergence: 0.3—retrain needed
              </AlertDescription>
            </Alert>
          </TabsContent>

          <TabsContent value="configuration" className="flex-1 space-y-3">
            <div className="grid grid-cols-1 gap-3">
              {/* Model Selection Dropdown */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Select Model</label>
                <Select value={selectedModel} onValueChange={setSelectedModel}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Choose a model..." />
                  </SelectTrigger>
                  <SelectContent>
                    {modelOptions.map((model) => (
                      <SelectItem key={model.value} value={model.value}>
                        {model.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Tuning Strategy Dropdown */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Select Tuning Strategy</label>
                <Select value={selectedTuning} onValueChange={setSelectedTuning}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Choose tuning method..." />
                  </SelectTrigger>
                  <SelectContent>
                    {tuningOptions.map((tuning) => (
                      <SelectItem key={tuning.value} value={tuning.value}>
                        {tuning.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Model Details */}
            {selectedModelData && (
              <div className="bg-blue-50 p-2 rounded-lg border border-blue-200">
                <div className="text-xs font-medium text-blue-700 mb-1">Model Details</div>
                <div className="space-y-1 text-xs">
                  <div><span className="font-medium">Type:</span> {selectedModelData.type}</div>
                  <div><span className="font-medium">Advantages:</span> {selectedModelData.advantages}</div>
                  <div><span className="font-medium">Training Time:</span> {selectedModelData.trainTime}</div>
                </div>
              </div>
            )}

            {/* Tuning Details */}
            {selectedTuningData && (
              <div className="bg-purple-50 p-2 rounded-lg border border-purple-200">
                <div className="text-xs font-medium text-purple-700 mb-1">Tuning Strategy</div>
                <div className="space-y-1 text-xs">
                  <div><span className="font-medium">Method:</span> {selectedTuningData.description}</div>
                  <div><span className="font-medium">Parameters:</span> {selectedTuningData.params}</div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-2">
              <Button 
                size="sm" 
                className="flex-1 text-xs"
                disabled={!selectedModel || !selectedTuning}
              >
                <Play className="w-3 h-3 mr-1" />
                Run Training
              </Button>
              <Button 
                size="sm" 
                variant="outline"
                onClick={handleReset}
                className="text-xs"
              >
                <RotateCcw className="w-3 h-3 mr-1" />
                Reset
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ModelPerformancePanel;

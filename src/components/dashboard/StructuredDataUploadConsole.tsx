import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Database, Upload, FileSpreadsheet, CheckCircle, AlertCircle, Eye } from 'lucide-react';

const StructuredDataUploadConsole = () => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'validating' | 'uploaded' | 'error'>('idle');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [taskType, setTaskType] = useState<string>('');
  const [skipHeader, setSkipHeader] = useState(false);
  const [inferTypes, setInferTypes] = useState(true);
  const [previewData, setPreviewData] = useState<any[]>([]);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = Array.from(e.dataTransfer.files);
    const validFile = files.find(file => 
      file.name.match(/\.(csv|xlsx|parquet)$/i)
    );
    
    if (validFile) {
      handleFileUpload(validFile);
    }
  }, []);

  const handleFileUpload = async (file: File) => {
    setSelectedFile(file);
    setUploadStatus('uploading');
    setUploadProgress(0);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('https://02b4686d7c03.ngrok-free.app/api/upload-file', {
        method: 'POST',
        body: formData,
        headers: {
          'ngrok-skip-browser-warning': 'true'
        }
      });

      const result = await response.json();
      console.log('Upload result:', result);

      if (response.ok) {
        setUploadProgress(100);
        setUploadStatus('validating');
        
        setTimeout(() => {
          setUploadStatus('uploaded');
          // Set preview data from API response or mock data
          setPreviewData(result.preview || [
            { id: 1, name: 'Sample A', value: 123.45, category: 'Type 1' },
            { id: 2, name: 'Sample B', value: 67.89, category: 'Type 2' },
            { id: 3, name: 'Sample C', value: 234.56, category: 'Type 1' },
            { id: 4, name: 'Sample D', value: 98.76, category: 'Type 3' },
            { id: 5, name: 'Sample E', value: 156.78, category: 'Type 2' }
          ]);
        }, 1500);
      } else {
        throw new Error(result.message || 'Upload failed');
      }
    } catch (error) {
      console.error('Upload error:', error);
      setUploadStatus('error');
      setUploadProgress(0);
    }
  };

  const getStatusBadge = () => {
    switch (uploadStatus) {
      case 'idle':
        return <Badge variant="secondary">Waiting</Badge>;
      case 'uploading':
        return <Badge className="bg-yellow-500">Uploading</Badge>;
      case 'validating':
        return <Badge className="bg-blue-500">Validating</Badge>;
      case 'uploaded':
        return <Badge className="bg-green-500"><CheckCircle className="w-3 h-3 mr-1" />Uploaded</Badge>;
      case 'error':
        return <Badge variant="destructive"><AlertCircle className="w-3 h-3 mr-1" />Error</Badge>;
      default:
        return <Badge variant="secondary">Waiting</Badge>;
    }
  };

  return (
    <Card className="h-full border-2 border-blue-200 bg-blue-50/30">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-blue-700 text-lg">
            <Database className="w-5 h-5" />
            Upload Structured Dataset
          </CardTitle>
          {getStatusBadge()}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Drag and Drop Area */}
        <div
          className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
            dragActive ? 'border-blue-500 bg-blue-100' : 'border-blue-300 bg-white'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <FileSpreadsheet className="mx-auto h-12 w-12 text-blue-400 mb-2" />
          <p className="text-sm text-blue-600 mb-2">
            Drag & drop your structured data files here
          </p>
          <p className="text-xs text-blue-500 mb-3">
            Supports: .csv, .xlsx, .parquet
          </p>
          <Button size="sm" variant="outline">
            <Upload className="w-4 h-4 mr-2" />
            Browse Files
          </Button>
        </div>

        {/* Upload Progress */}
        {uploadProgress > 0 && uploadProgress < 100 && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Uploading {selectedFile?.name}</span>
              <span>{uploadProgress}%</span>
            </div>
            <Progress value={uploadProgress} className="h-2" />
          </div>
        )}

        {/* Configuration Options */}
        {selectedFile && (
          <div className="space-y-3 p-3 bg-white rounded border">
            <div className="text-sm font-medium text-slate-700">Configuration</div>
            
            <div className="grid grid-cols-1 gap-3">
              <div>
                <label className="text-xs text-slate-600 mb-1 block">Task Type</label>
                <Select value={taskType} onValueChange={setTaskType}>
                  <SelectTrigger className="h-8 text-sm">
                    <SelectValue placeholder="Select task type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="classification">Classification</SelectItem>
                    <SelectItem value="regression">Regression</SelectItem>
                    <SelectItem value="timeseries">Time Series</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex gap-4 text-xs">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={skipHeader}
                    onChange={(e) => setSkipHeader(e.target.checked)}
                    className="rounded"
                  />
                  Skip Header
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={inferTypes}
                    onChange={(e) => setInferTypes(e.target.checked)}
                    className="rounded"
                  />
                  Infer Data Types
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Data Preview */}
        {previewData.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
              <Eye className="w-4 h-4" />
              Data Preview (First 5 rows)
            </div>
            <div className="bg-white border rounded text-xs overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50">
                  <tr>
                    {Object.keys(previewData[0]).map(key => (
                      <th key={key} className="px-2 py-1 text-left font-medium">{key}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {previewData.map((row, idx) => (
                    <tr key={idx} className="border-t">
                      {Object.values(row).map((value: any, colIdx) => (
                        <td key={colIdx} className="px-2 py-1">{value}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default StructuredDataUploadConsole;

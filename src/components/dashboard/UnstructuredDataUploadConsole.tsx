
import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileText, Upload, File, Music, Image, CheckCircle, AlertCircle, Filter } from 'lucide-react';

const UnstructuredDataUploadConsole = () => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'processing' | 'uploaded' | 'error'>('idle');
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [processingIntent, setProcessingIntent] = useState<string>('');
  const [fileTypeFilter, setFileTypeFilter] = useState<string>('all');

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
    const validFiles = files.filter(file => 
      file.name.match(/\.(pdf|txt|docx|mp3|wav|json)$/i)
    );
    
    if (validFiles.length > 0) {
      handleFileUpload(validFiles);
    }
  }, []);

  const handleFileUpload = (files: File[]) => {
    setSelectedFiles(files);
    setUploadStatus('uploading');
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploadStatus('processing');
          setTimeout(() => {
            setUploadStatus('uploaded');
          }, 2000);
          return 100;
        }
        return prev + 8;
      });
    }, 300);
  };

  const getFileIcon = (fileName: string) => {
    const ext = fileName.split('.').pop()?.toLowerCase();
    switch (ext) {
      case 'pdf':
      case 'txt':
      case 'docx':
        return <FileText className="w-4 h-4" />;
      case 'mp3':
      case 'wav':
        return <Music className="w-4 h-4" />;
      case 'json':
        return <File className="w-4 h-4" />;
      default:
        return <File className="w-4 h-4" />;
    }
  };

  const getFileTypeBadge = (fileName: string) => {
    const ext = fileName.split('.').pop()?.toLowerCase();
    switch (ext) {
      case 'pdf':
      case 'txt':
      case 'docx':
        return <Badge variant="outline" className="text-xs">Text</Badge>;
      case 'mp3':
      case 'wav':
        return <Badge variant="outline" className="text-xs bg-green-50">Audio</Badge>;
      case 'json':
        return <Badge variant="outline" className="text-xs bg-blue-50">Data</Badge>;
      default:
        return <Badge variant="outline" className="text-xs">Other</Badge>;
    }
  };

  const getStatusBadge = () => {
    switch (uploadStatus) {
      case 'idle':
        return <Badge variant="secondary">Waiting</Badge>;
      case 'uploading':
        return <Badge className="bg-yellow-500">Uploading</Badge>;
      case 'processing':
        return <Badge className="bg-purple-500">Processing</Badge>;
      case 'uploaded':
        return <Badge className="bg-green-500"><CheckCircle className="w-3 h-3 mr-1" />Uploaded</Badge>;
      case 'error':
        return <Badge variant="destructive"><AlertCircle className="w-3 h-3 mr-1" />Error</Badge>;
      default:
        return <Badge variant="secondary">Waiting</Badge>;
    }
  };

  return (
    <Card className="h-full border-2 border-purple-200 bg-purple-50/30">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-purple-700 text-lg">
            <FileText className="w-5 h-5" />
            Upload Unstructured Files
          </CardTitle>
          {getStatusBadge()}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* File Type Filter */}
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-purple-600" />
          <Select value={fileTypeFilter} onValueChange={setFileTypeFilter}>
            <SelectTrigger className="h-8 w-32 text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="text">Text</SelectItem>
              <SelectItem value="audio">Audio</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Drag and Drop Area */}
        <div
          className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
            dragActive ? 'border-purple-500 bg-purple-100' : 'border-purple-300 bg-white'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <FileText className="mx-auto h-12 w-12 text-purple-400 mb-2" />
          <p className="text-sm text-purple-600 mb-2">
            Drag & drop your unstructured files here
          </p>
          <p className="text-xs text-purple-500 mb-3">
            Supports: .pdf, .txt, .docx, .mp3, .wav, .json
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
              <span>Processing {selectedFiles.length} file(s)</span>
              <span>{uploadProgress}%</span>
            </div>
            <Progress value={uploadProgress} className="h-2" />
          </div>
        )}

        {/* Configuration Options */}
        {selectedFiles.length > 0 && (
          <div className="space-y-3 p-3 bg-white rounded border">
            <div className="text-sm font-medium text-slate-700">Processing Configuration</div>
            
            <div>
              <label className="text-xs text-slate-600 mb-1 block">Processing Intent</label>
              <Select value={processingIntent} onValueChange={setProcessingIntent}>
                <SelectTrigger className="h-8 text-sm">
                  <SelectValue placeholder="Select processing intent" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="nlp">NLP Analysis</SelectItem>
                  <SelectItem value="transcription">Audio Transcription</SelectItem>
                  <SelectItem value="semantic">Semantic Analysis</SelectItem>
                  <SelectItem value="extraction">Data Extraction</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}

        {/* File List */}
        {selectedFiles.length > 0 && (
          <div className="space-y-2">
            <div className="text-sm font-medium text-slate-700">
              Uploaded Files ({selectedFiles.length})
            </div>
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {selectedFiles.map((file, idx) => (
                <div key={idx} className="flex items-center justify-between p-2 bg-white border rounded text-sm">
                  <div className="flex items-center gap-2">
                    {getFileIcon(file.name)}
                    <span className="truncate max-w-32">{file.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {getFileTypeBadge(file.name)}
                    <span className="text-xs text-slate-500">
                      {(file.size / 1024).toFixed(1)} KB
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default UnstructuredDataUploadConsole;

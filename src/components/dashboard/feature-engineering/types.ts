
export interface Feature {
  name: string;
  importance: number;
  status: 'optimized' | 'processing' | 'pending';
  type: 'numerical' | 'text' | 'categorical';
}

export interface TransformationItem {
  originalFeature: string;
  transformedFeature: string;
  transformation: string;
  origin: 'AI-Suggested' | 'Manual';
  status: 'applied' | 'processing';
  improvement: string;
}

export interface LogItem {
  time: string;
  action: string;
  status: 'success' | 'processing';
}

export interface AISuggestion {
  feature: string;
  suggestion: string;
  confidence: number;
  reason: string;
}

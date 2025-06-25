
export interface EmbeddingDataPoint {
  x: number;
  y: number;
  cluster: string;
  label: string;
  fill: string;
}

export interface Topic {
  id: number;
  name: string;
  coherence: number;
  docs: number;
  keywords: string[];
}

export interface Entity {
  text: string;
  type: string;
  confidence: number;
  count: number;
}

export interface Summary {
  id: number;
  title: string;
  summary: string;
  confidence: number;
  length: number;
}

export interface WordCloudItem {
  word: string;
  frequency: number;
  sentiment: 'positive' | 'negative' | 'neutral';
}

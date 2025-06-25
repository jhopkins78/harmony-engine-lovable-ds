
import { EmbeddingDataPoint, Topic, Entity, Summary, WordCloudItem } from './types';

export const embeddingData: EmbeddingDataPoint[] = [
  { x: -2.1, y: 1.5, cluster: 'Complaints', label: 'Doc1', fill: '#ef4444' },
  { x: -1.8, y: 1.2, cluster: 'Complaints', label: 'Doc2', fill: '#ef4444' },
  { x: 0.5, y: -0.8, cluster: 'Reviews', label: 'Doc3', fill: '#3b82f6' },
  { x: 0.3, y: -1.2, cluster: 'Reviews', label: 'Doc4', fill: '#3b82f6' },
  { x: 2.1, y: 0.5, cluster: 'Support', label: 'Doc5', fill: '#22c55e' },
  { x: 1.9, y: 0.8, cluster: 'Support', label: 'Doc6', fill: '#22c55e' },
  { x: -0.2, y: 2.1, cluster: 'Feedback', label: 'Doc7', fill: '#f59e0b' },
  { x: 0.1, y: 1.8, cluster: 'Feedback', label: 'Doc8', fill: '#f59e0b' },
];

export const topics: Topic[] = [
  { id: 1, name: 'Refund Policy', coherence: 0.78, docs: 147, keywords: ['refund', 'policy', 'return', 'money'] },
  { id: 2, name: 'Product Quality', coherence: 0.72, docs: 203, keywords: ['quality', 'defect', 'broken', 'poor'] },
  { id: 3, name: 'Shipping Issues', coherence: 0.69, docs: 89, keywords: ['shipping', 'delay', 'delivery', 'late'] },
  { id: 4, name: 'Customer Service', coherence: 0.65, docs: 156, keywords: ['service', 'support', 'help', 'staff'] },
];

export const entities: Entity[] = [
  { text: 'Apple Inc.', type: 'ORG', confidence: 0.98, count: 45 },
  { text: 'John Smith', type: 'PERSON', confidence: 0.95, count: 23 },
  { text: 'New York', type: 'GPE', confidence: 0.92, count: 67 },
  { text: '$299.99', type: 'MONEY', confidence: 0.89, count: 12 },
  { text: 'iPhone 15', type: 'PRODUCT', confidence: 0.94, count: 78 },
];

export const summaries: Summary[] = [
  {
    id: 1,
    title: 'Customer Feedback Analysis',
    summary: 'Customers are most concerned with refund policy clarity and shipping delays. Positive sentiment around product quality but concerns about customer service response times.',
    confidence: 0.87,
    length: 156
  },
  {
    id: 2,
    title: 'Support Ticket Trends',
    summary: 'Most tickets relate to billing issues and account access problems. Resolution time has improved by 23% this quarter.',
    confidence: 0.91,
    length: 89
  }
];

export const wordCloudData: WordCloudItem[] = [
  { word: 'refund', frequency: 89, sentiment: 'negative' },
  { word: 'quality', frequency: 76, sentiment: 'neutral' },
  { word: 'excellent', frequency: 65, sentiment: 'positive' },
  { word: 'shipping', frequency: 54, sentiment: 'negative' },
  { word: 'support', frequency: 48, sentiment: 'neutral' },
  { word: 'satisfied', frequency: 42, sentiment: 'positive' },
  { word: 'delay', frequency: 38, sentiment: 'negative' },
  { word: 'recommend', frequency: 35, sentiment: 'positive' },
];

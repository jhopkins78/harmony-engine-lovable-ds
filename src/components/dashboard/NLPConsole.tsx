
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { MessageSquare } from 'lucide-react';
import EmbeddingsTab from './nlp/EmbeddingsTab';
import TopicsTab from './nlp/TopicsTab';
import EntitiesTab from './nlp/EntitiesTab';
import SummariesTab from './nlp/SummariesTab';
import { embeddingData, topics, entities, summaries, wordCloudData } from './nlp/mockData';

const NLPConsole = () => {
  const [selectedTask, setSelectedTask] = useState('Topic Modeling');

  return (
    <Card className="h-96 bg-white/90 backdrop-blur-sm border-slate-200 shadow-lg">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-indigo-600" />
          NLP Modeling
          <Badge variant="outline" className="ml-auto text-xs">
            {selectedTask}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-3 h-full">
        <Tabs defaultValue="topics" className="h-full flex flex-col">
          <TabsList className="grid w-full grid-cols-4 mb-2 h-8">
            <TabsTrigger value="embeddings" className="text-xs px-2">Embed</TabsTrigger>
            <TabsTrigger value="topics" className="text-xs px-2">Topics</TabsTrigger>
            <TabsTrigger value="entities" className="text-xs px-2">NER</TabsTrigger>
            <TabsTrigger value="summaries" className="text-xs px-2">Summary</TabsTrigger>
          </TabsList>

          <div className="flex-1 overflow-hidden">
            <TabsContent value="embeddings" className="h-full m-0">
              <EmbeddingsTab data={embeddingData} />
            </TabsContent>

            <TabsContent value="topics" className="h-full m-0">
              <TopicsTab topics={topics} />
            </TabsContent>

            <TabsContent value="entities" className="h-full m-0">
              <EntitiesTab entities={entities} />
            </TabsContent>

            <TabsContent value="summaries" className="h-full m-0">
              <SummariesTab summaries={summaries} wordCloudData={wordCloudData} />
            </TabsContent>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default NLPConsole;

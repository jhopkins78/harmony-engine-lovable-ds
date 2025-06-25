
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Users, MessageSquare, BarChart3, Eye } from 'lucide-react';

const CollaborationPanel = () => {
  const collaborationData = [
    { user: 'Dr. Chen', action: 'Flagged bias in email sentiment model', time: '2 min ago', type: 'bias' },
    { user: 'Alex Kim', action: 'Suggested feature engineering for audio', time: '5 min ago', type: 'suggestion' },
    { user: 'Sarah Rodriguez', action: 'Validated contract risk patterns', time: '8 min ago', type: 'validation' },
    { user: 'Maria Santos', action: 'Updated transformation pipeline', time: '12 min ago', type: 'update' }
  ];

  return (
    <Card className="h-full flex flex-col border-2 border-indigo-200 shadow-lg">
      <CardHeader className="pb-4 flex-shrink-0">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-indigo-700 text-lg">
            <Users className="w-5 h-5" />
            Real-Time Collaboration Hub
          </CardTitle>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              4 analysts active
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 overflow-hidden space-y-4">
        {/* Activity Feed */}
        <div className="space-y-2">
          <div className="text-sm font-medium text-slate-700">Team Activity Feed</div>
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {collaborationData.map((activity, index) => (
              <div key={index} className="flex items-start gap-2 p-2 bg-slate-50 rounded-lg border">
                <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                  activity.type === 'bias' ? 'bg-red-500' :
                  activity.type === 'suggestion' ? 'bg-yellow-500' :
                  activity.type === 'validation' ? 'bg-green-500' : 'bg-blue-500'
                }`}></div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-slate-900">{activity.user}</div>
                  <div className="text-xs text-slate-600 truncate">{activity.action}</div>
                  <div className="text-xs text-slate-400">{activity.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-3 gap-2">
          <Button size="sm" className="text-xs bg-indigo-600 hover:bg-indigo-700">
            <MessageSquare className="w-3 h-3 mr-1" />
            Annotate
          </Button>
          <Button size="sm" variant="outline" className="text-xs">
            <BarChart3 className="w-3 h-3 mr-1" />
            Version
          </Button>
          <Button size="sm" variant="outline" className="text-xs">
            <Eye className="w-3 h-3 mr-1" />
            Insights
          </Button>
        </div>

        {/* Shared Workspace */}
        <div className="bg-indigo-50 p-3 rounded-lg border border-indigo-200">
          <div className="text-sm font-medium text-indigo-700 mb-1">Shared Workspace</div>
          <div className="text-xs text-indigo-600">
            Bias mitigation + Model optimization active
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CollaborationPanel;

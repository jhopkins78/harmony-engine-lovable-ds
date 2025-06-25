
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowRight, Sparkles } from 'lucide-react';
import { TransformationItem } from './types';

interface TransformationMapTabProps {
  transformationMap: TransformationItem[];
}

const TransformationMapTab: React.FC<TransformationMapTabProps> = ({ transformationMap }) => {
  return (
    <>
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
    </>
  );
};

export default TransformationMapTab;

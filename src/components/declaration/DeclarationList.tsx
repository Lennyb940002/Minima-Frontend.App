import React from 'react';
import { Clock, CheckCircle, AlertTriangle } from 'lucide-react';
import { Declaration } from './types';
import { formatCurrency } from './utils';

interface DeclarationListProps {
  declarations: Declaration[];
}

const statusIcons = {
  pending: <Clock className="w-4 h-4 text-yellow-500" />,
  submitted: <CheckCircle className="w-4 h-4 text-green-500" />,
  late: <AlertTriangle className="w-4 h-4 text-red-500" />,
};

export function DeclarationList({ declarations }: DeclarationListProps) {
  return (
    <div className="space-y-4">
      {declarations.map((declaration) => (
        <div
          key={declaration.id}
          className="bg-white/5 p-4 rounded-lg border border-white/10 flex items-center justify-between"
        >
          <div className="flex items-center gap-4">
            {statusIcons[declaration.status]}
            <div>
              <h3 className="text-white font-medium">{declaration.type}</h3>
              <p className="text-white/60 text-sm">
                Date limite : {declaration.dueDate}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-white font-medium">
              {formatCurrency(declaration.amount)}
            </p>
            {declaration.submissionDate && (
              <p className="text-white/60 text-sm">
                Soumis le {declaration.submissionDate}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default DeclarationList;
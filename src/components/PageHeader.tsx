
import React from 'react';
import { Button } from '@/components/ui/button';

interface PageHeaderProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({ title, description, children }) => {
  return (
    <div className="flex justify-between items-start mb-6">
      <div>
        <h1 className="text-3xl font-bold">{title}</h1>
        {description && <p className="text-muted-foreground">{description}</p>}
      </div>
      <div className="flex gap-2">
        {children}
      </div>
    </div>
  );
};

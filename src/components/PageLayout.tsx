
import React from 'react';
import { UnifiedAIAssistant } from './UnifiedAIAssistant';

interface PageLayoutProps {
  children: React.ReactNode;
  className?: string;
  showAIAssistant?: boolean;
}

export const PageLayout: React.FC<PageLayoutProps> = ({ 
  children, 
  className = "", 
  showAIAssistant = true 
}) => {
  return (
    <div className={`relative ${className}`}>
      {children}
      {showAIAssistant && (
        <UnifiedAIAssistant className="fixed bottom-0 right-0 z-50" />
      )}
    </div>
  );
};

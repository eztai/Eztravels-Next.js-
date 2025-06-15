
import React from 'react';
import { PersistentAIAssistant } from './PersistentAIAssistant';

interface UnifiedAIAssistantProps {
  className?: string;
}

export const UnifiedAIAssistant: React.FC<UnifiedAIAssistantProps> = ({ className = "" }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className={className}>
      <PersistentAIAssistant isOpen={isOpen} onToggle={() => setIsOpen(!isOpen)} />
    </div>
  );
};

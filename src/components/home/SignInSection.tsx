
import React from 'react';
import { Button } from '@/components/ui/button';
import { User } from 'lucide-react';
import SignInDialog from '@/components/SignInDialog';

interface SignInSectionProps {
  isAuthenticated: boolean;
  showSignInDialog: boolean;
  onShowSignInDialog: (show: boolean) => void;
  onSignIn: (provider?: string) => void;
}

export const SignInSection: React.FC<SignInSectionProps> = ({
  isAuthenticated,
  showSignInDialog,
  onShowSignInDialog,
  onSignIn
}) => {
  if (isAuthenticated) return null;

  return (
    <>
      <div className="flex justify-end mb-4">
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => onShowSignInDialog(true)}
          className="flex items-center gap-2"
        >
          <User className="h-4 w-4" />
          Sign In
        </Button>
      </div>

      <SignInDialog 
        open={showSignInDialog}
        onOpenChange={onShowSignInDialog}
        onSignIn={onSignIn}
      />
    </>
  );
};

'use client'

import React, { useState } from 'react';
import { ExploreSection } from '@/components/ExploreSection';
import SearchChatAssistant from '@/components/SearchChatAssistant';
import { SignInSection } from '@/components/home/SignInSection';
import { AuthenticatedSection } from '@/components/home/AuthenticatedSection';

export default function HomePage() {
  // Mock authentication state - replace with real auth later
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [chatContext, setChatContext] = useState('');
  const [showSignInDialog, setShowSignInDialog] = useState(false);

  const handleLogin = (provider?: string) => {
    // Simulate login success
    setIsAuthenticated(true);
    console.log(`Signed in with ${provider || 'email'}`);
    // Stay on the same page (home) after login
  };

  return (
    <div className="space-y-6">
      <SignInSection
        isAuthenticated={isAuthenticated}
        showSignInDialog={showSignInDialog}
        onShowSignInDialog={setShowSignInDialog}
        onSignIn={handleLogin}
      />

      {/* Main Explore Section with Search Chat */}
      <div className="space-y-6">
        {/* AI Search Chat Assistant */}
        <SearchChatAssistant onContextChange={setChatContext} />
        
        {/* Explore Results */}
        <ExploreSection chatContext={chatContext} />
      </div>

      {/* Authenticated user sections - only show when logged in */}
      {isAuthenticated && <AuthenticatedSection />}
    </div>
  );
} 
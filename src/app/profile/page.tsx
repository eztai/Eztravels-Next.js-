'use client'

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ProfileHeader } from '@/components/profile/ProfileHeader';
import { ContactInformation } from '@/components/profile/ContactInformation';
import { TravelStats } from '@/components/profile/TravelStats';
import { SettingsOverview } from '@/components/profile/SettingsOverview';
import { AuthenticationForm } from '@/components/profile/AuthenticationForm';

export default function ProfilePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Mock authentication state - replace with real auth later
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  
  // Check if user came from another page and should be redirected back after login
  const redirectTo = searchParams?.get('redirectTo');

  // Mock user data - replace with real user data later
  const user = {
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    joinDate: 'March 2023',
    avatar: '/placeholder.svg',
    totalTrips: 12,
    totalSpent: 24500,
    upcomingTrips: 2
  };

  // Mock settings data - replace with real settings later
  const userSettings = {
    currency: 'USD',
    language: 'English',
    maxBudget: 5000,
    emailNotifications: true,
    pushNotifications: true,
    locationSharing: true
  };

  const handleLogin = (provider?: string) => {
    // Simulate login success
    setIsAuthenticated(true);
    console.log(`Signed in with ${provider || 'email'}`);
    
    // If user came from another page, redirect them back
    if (redirectTo && redirectTo !== '/profile') {
      setTimeout(() => {
        router.push(redirectTo);
      }, 500); // Small delay to show login success
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  const handleEditProfile = () => {
    router.push('/profile/edit');
  };

  const handleOpenSettings = () => {
    router.push('/settings');
  };

  // If not authenticated, show login options
  if (!isAuthenticated) {
    return <AuthenticationForm onLogin={handleLogin} />;
  }

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <ProfileHeader 
        user={user}
        onEditProfile={handleEditProfile}
        onLogout={handleLogout}
      />

      <ContactInformation user={user} />

      <TravelStats 
        stats={{
          totalTrips: user.totalTrips,
          totalSpent: user.totalSpent,
          upcomingTrips: user.upcomingTrips
        }} 
      />

      <SettingsOverview 
        settings={userSettings}
        onOpenSettings={handleOpenSettings}
      />
    </div>
  );
} 
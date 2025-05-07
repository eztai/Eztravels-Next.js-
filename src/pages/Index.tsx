
import React from 'react';
import Header from '@/components/Header';
import Dashboard from '@/components/Dashboard';
import TripList from '@/components/TripList';
import TripPlanner from '@/components/TripPlanner';
import BudgetTracker from '@/components/BudgetTracker';
import Calendar from '@/components/Calendar';
import ChatAssistant from '@/components/ChatAssistant';
import Footer from '@/components/Footer';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4">
          <Dashboard />
          <TripList />
          <BudgetTracker />
          <Calendar />
          <ChatAssistant />
          <TripPlanner />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;

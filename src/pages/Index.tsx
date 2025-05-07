
import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native-web';
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
    <View style={styles.container}>
      <Header />
      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <Dashboard />
          <TripList />
          <BudgetTracker />
          <Calendar />
          <ChatAssistant />
          <TripPlanner />
        </View>
      </ScrollView>
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
    maxWidth: 1200,
    alignSelf: 'center',
    width: '100%',
  },
});

export default Index;

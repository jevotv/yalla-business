import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

// Import from the new centralized structure
import { commonStyles, getButtonStyle, getButtonTextStyle } from './src/theme/styles';
import {
  periods,
  trendPeriods,
  salesGoal,
  dashboardCards,
  recentActivities,
  salesTrendData,
  userData
} from './src/constants/data';
import { iconSizes } from './src/constants/icons';

// Import components
import Header from './src/components/Header';
import BottomNav from './src/components/BottomNav';
import DashboardCard from './src/components/DashboardCard';
import ActivityItem from './src/components/ActivityItem';
import Dropdown from './src/components/Dropdown';
import CustomerScreen from './src/screens/CustomerScreen';

export default function App() {
  const [selectedPeriod, setSelectedPeriod] = useState('Today');
  const [selectedTrendPeriod, setSelectedTrendPeriod] = useState('Weekly');
  const [showTrendDropdown, setShowTrendDropdown] = useState(false);
  const [currentScreen, setCurrentScreen] = useState('dashboard'); // 'dashboard' or 'customers'

  // Handler functions
  const handleCardPress = (card) => {
    if (card.title === 'Customers') {
      setCurrentScreen('customers');
    } else {
      console.log(`Card pressed: ${card.title}`);
    }
  };

  const handleBackToDashboard = () => {
    setCurrentScreen('dashboard');
  };

  if (currentScreen === 'customers') {
    return <CustomerScreen onBack={handleBackToDashboard} />;
  }

  return (
    <View style={commonStyles.container}>
      <StatusBar style="auto" />

      {/* Header */}
      <Header
        onMenuPress={() => console.log('Menu pressed')}
        onHomePress={() => console.log('Home pressed')}
      />

      <ScrollView style={commonStyles.scrollView} contentContainerStyle={commonStyles.scrollContent}>
        {/* Monthly Sales Goal */}
        <View style={commonStyles.card}>
          <View style={commonStyles.goalHeader}>
            <Text style={commonStyles.goalTitle}>Monthly Sales Goal</Text>
            <Text style={commonStyles.goalPercentage}>{userData.monthlySalesGoal.percentage}%</Text>
          </View>
          <View style={commonStyles.progressBar}>
            <View style={[commonStyles.progress, { width: `${userData.monthlySalesGoal.percentage}%` }]} />
          </View>
          <Text style={commonStyles.goalAmount}>
            ${userData.monthlySalesGoal.current.toLocaleString()} / ${userData.monthlySalesGoal.target.toLocaleString()}
          </Text>
        </View>

        {/* Time Period Buttons */}
        <View style={commonStyles.periodContainer}>
          {periods.map((period) => (
            <TouchableOpacity
              key={period}
              style={getButtonStyle(selectedPeriod === period)}
              onPress={() => setSelectedPeriod(period)}
            >
              <Text style={getButtonTextStyle(selectedPeriod === period)}>
                {period}
              </Text>
              {selectedPeriod === period && (
                <MaterialIcons name="expand-more" size={iconSizes.small} color="white" />
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Dashboard Cards Grid */}
        <View style={commonStyles.grid}>
          {dashboardCards.map((card, index) => (
            <DashboardCard
              key={index}
              card={card}
              onPress={() => handleCardPress(card)}
            />
          ))}
        </View>

        {/* Sales Trend Section */}
        <View style={commonStyles.section}>
          <Text style={commonStyles.sectionTitle}>Sales Trend</Text>
          <View style={commonStyles.trendCard}>
            <View style={commonStyles.trendHeader}>
              <View>
                <Text style={commonStyles.trendValue}>{salesTrendData.value}</Text>
                <Text style={commonStyles.trendChange}>{salesTrendData.change}</Text>
              </View>

              <Dropdown
                options={trendPeriods}
                selectedOption={selectedTrendPeriod}
                onOptionSelect={setSelectedTrendPeriod}
                isVisible={showTrendDropdown}
                onToggle={() => setShowTrendDropdown(!showTrendDropdown)}
                style={{ position: 'relative' }}
              />
            </View>

            {/* Chart placeholder */}
            <View style={commonStyles.chartPlaceholder}>
              <Text style={commonStyles.chartPlaceholderText}>📊 Sales Trend Chart</Text>
            </View>
          </View>
        </View>

        {/* Recent Activity */}
        <View style={commonStyles.section}>
          <Text style={commonStyles.sectionTitle}>Recent Activity</Text>
          <View style={commonStyles.activityList}>
            {recentActivities.map((activity, index) => (
              <ActivityItem
                key={index}
                activity={activity}
                onPress={() => console.log(`Activity pressed: ${activity.title}`)}
              />
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <BottomNav />
    </View>
  );
}

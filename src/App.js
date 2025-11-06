// Initialize i18n first
import './i18n';

import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, ScrollView, View, Text, TouchableOpacity } from 'react-native';

// Components
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import DashboardCard from './components/DashboardCard';
import ActivityItem from './components/ActivityItem';
import Dropdown from './components/Dropdown';

// Screens
import CustomerScreen from './screens/CustomerScreen';
import OrderManagementScreen from './screens/OrderManagementScreen';
import PurchaseManagementScreen from './screens/PurchaseManagementScreen';
import ProductManagementScreen from './screens/ProductManagementScreen';
import AddProductScreen from './screens/AddProductScreen';
import SalesScreen from './screens/SalesScreen';
import PurchaseScreen from './screens/PurchaseScreen';
import CheckoutScreen from './screens/CheckoutScreen';
import TreasuryScreen from './screens/TreasuryScreen';
import ReturnInvoicesScreen from './screens/ReturnInvoicesScreen';
import SelectInvoiceForReturnScreen from './screens/SelectInvoiceForReturnScreen';
import InvoiceDetailScreen from './screens/InvoiceDetailScreen';

// i18n
import { LanguageProvider, useTranslation } from './i18n/LanguageContext';
import { useTranslatedData } from './i18n/translationUtils';

// Constants and theme
import { commonStyles } from './theme/styles';

const AppContent = () => {
  const { t, currentLanguage, isRTL } = useTranslation();
  const {
    getTranslatedPeriods,
    getTranslatedTrendPeriods,
    getTranslatedDashboardCards,
    getTranslatedRecentActivities,
    getTranslatedSalesTrendData,
    getTranslatedUserData
  } = useTranslatedData();
  
  const [selectedPeriod, setSelectedPeriod] = useState(getTranslatedPeriods()[0]);
  const [selectedTrendPeriod, setSelectedTrendPeriod] = useState(getTranslatedTrendPeriods()[1]);
  const [showTrendDropdown, setShowTrendDropdown] = useState(false);
  
  // Screen state for checkout
  const [checkoutData, setCheckoutData] = useState(null); // { cart, flow, onComplete }
  const [addProductSource, setAddProductSource] = useState('product-management'); // Track where AddProductScreen was called from
  const [currentScreen, setCurrentScreen] = useState('dashboard'); // 'dashboard', 'customers', 'orders', 'purchases', 'product-management', 'add-product', 'sales', 'purchase-product', 'treasury', 'returns', 'select-invoice', 'invoice-detail', or 'checkout'
  
  // State for invoice detail parameters
  const [invoiceDetailParams, setInvoiceDetailParams] = useState(null);
  const [previousScreen, setPreviousScreen] = useState('dashboard'); // Track where we came from for back navigation

  // Get translated data
  const periods = getTranslatedPeriods();
  const trendPeriods = getTranslatedTrendPeriods();
  const dashboardCards = getTranslatedDashboardCards();
  const recentActivities = getTranslatedRecentActivities();
  const salesTrendData = getTranslatedSalesTrendData();
  const userData = getTranslatedUserData();

// Navigation functions
  const navigateToSales = () => setCurrentScreen('sales');
  const navigateToPurchaseProduct = () => setCurrentScreen('purchase-product');
  const navigateToAddProduct = (source = 'product-management') => {
    setAddProductSource(source);
    setCurrentScreen('add-product');
  };
  
  // Checkout functions
  const navigateToCheckout = (cart, flow = 'sales', onComplete = null) => {
    setCheckoutData({ cart, flow, onComplete });
    setCurrentScreen('checkout');
  };
  
  const handleCheckoutComplete = (orderData) => {
    // Add flow information to order data
    const orderWithFlow = { ...orderData, flow: checkoutData.flow };
    
    // Clear checkout data
    setCheckoutData(null);
    
    // Go back to the appropriate screen
    if (orderWithFlow.flow === 'sales') {
      setCurrentScreen('sales');
    } else {
      setCurrentScreen('purchase-product');
    }
    
    // Call onComplete callback if provided
    if (checkoutData?.onComplete) {
      checkoutData.onComplete(orderWithFlow);
    }
  };

  // Handle AddProductScreen navigation back
  const handleAddProductBack = (source) => {
    if (source === 'sales') {
      setCurrentScreen('sales');
    } else if (source === 'purchase') {
      setCurrentScreen('purchase-product');
    } else {
      setCurrentScreen('product-management');
    }
  };

// Handler functions
  const handleMenuPress = () => {
    if (currentScreen === 'customers' || currentScreen === 'orders' || currentScreen === 'purchases' || currentScreen === 'product-management' || currentScreen === 'add-product' || currentScreen === 'sales' || currentScreen === 'purchase-product' || currentScreen === 'treasury') {
      setCurrentScreen('dashboard');
    } else {
      console.log('Menu pressed');
    }
  };

  const handleHomePress = () => {
    setCurrentScreen('dashboard');
  };

  const handleCardPress = (card) => {
    if (t(card.title) === t('dashboard.customers')) {
      setCurrentScreen('customers');
    } else if (t(card.title) === t('dashboard.sales')) {
      setCurrentScreen('orders');
    } else if (t(card.title) === t('dashboard.purchase')) {
      setCurrentScreen('purchases');
    } else if (t(card.title) === t('dashboard.inventory')) {
      setCurrentScreen('product-management');
    } else if (t(card.title) === t('dashboard.treasury')) {
      setCurrentScreen('treasury');
    } else if (t(card.title) === t('dashboard.returns')) {
      setCurrentScreen('returns');
    } else {
      console.log(`Card pressed: ${t(card.title)}`);
    }
  };

  const handleActivityPress = (activity) => {
    console.log(`Activity pressed: ${t(activity.title)}`);
  };

  const handleTrendFilter = () => {
    setShowTrendDropdown(!showTrendDropdown);
  };

  // Render different screens based on currentScreen state
  if (currentScreen === 'customers') {
    return <CustomerScreen onBack={() => setCurrentScreen('dashboard')} />;
  }
  
  if (currentScreen === 'orders') {
    return <OrderManagementScreen onBack={() => setCurrentScreen('dashboard')} navigation={{ navigate: (screen, params) => {
      if (screen === 'invoice-detail') {
        setInvoiceDetailParams(params);
        setPreviousScreen('orders');
        setCurrentScreen('invoice-detail');
      } else {
        setCurrentScreen('sales');
      }
    }}} />;
  }
  
  if (currentScreen === 'purchases') {
    return <PurchaseManagementScreen onBack={() => setCurrentScreen('dashboard')} navigation={{ navigate: (screen, params) => {
      if (screen === 'invoice-detail') {
        setInvoiceDetailParams(params);
        setPreviousScreen('purchases');
        setCurrentScreen('invoice-detail');
      } else {
        setCurrentScreen('purchase-product');
      }
    }}} />;
  }
  
  if (currentScreen === 'product-management') {
    const navigation = { navigate: navigateToAddProduct };
    return <ProductManagementScreen onBack={() => setCurrentScreen('dashboard')} navigation={navigation} />;
  }
  
  if (currentScreen === 'add-product') {
    return <AddProductScreen onBack={handleAddProductBack} source={addProductSource} />;
  }
  
  if (currentScreen === 'sales') {
    return <SalesScreen onBack={() => setCurrentScreen('dashboard')} navigateToCheckout={navigateToCheckout} navigateToAddProduct={() => navigateToAddProduct('sales')} />;
  }
  
  if (currentScreen === 'purchase-product') {
    return <PurchaseScreen onBack={() => setCurrentScreen('dashboard')} navigateToCheckout={navigateToCheckout} navigateToAddProduct={() => navigateToAddProduct('purchase')} />;
  }
  
  if (currentScreen === 'treasury') {
    return <TreasuryScreen onBack={() => setCurrentScreen('dashboard')} />;
  }
  
  if (currentScreen === 'returns') {
    return <ReturnInvoicesScreen onBack={() => setCurrentScreen('dashboard')} navigation={{ navigate: (screen) => {
      if (screen === 'select-invoice') {
        setCurrentScreen('select-invoice');
      }
    }}} />;
  }
  
  if (currentScreen === 'select-invoice') {
    return <SelectInvoiceForReturnScreen onBack={() => setCurrentScreen('returns')} navigation={{ navigate: (screen) => {
      if (screen === 'returns') {
        setCurrentScreen('returns');
      } else if (screen === 'invoice-detail') {
        setCurrentScreen('invoice-detail');
      }
    }}} />;
  }
  
  if (currentScreen === 'invoice-detail') {
    return <InvoiceDetailScreen
      onBack={() => {
        // Go back to the previous screen and clear invoice params
        setCurrentScreen(previousScreen);
        setInvoiceDetailParams(null);
      }}
      navigation={{
        navigate: (screen, params) => {
          if (screen === 'dashboard') {
            setCurrentScreen('dashboard');
            setInvoiceDetailParams(null);
          } else if (screen === 'returns') {
            setCurrentScreen('returns');
            setInvoiceDetailParams(null);
          } else if (screen === 'select-invoice') {
            setCurrentScreen('select-invoice');
            setInvoiceDetailParams(null);
          }
        }
      }}
      route={{ params: invoiceDetailParams }}
    />;
  }
  
  if (currentScreen === 'checkout' && checkoutData) {
    return (
      <CheckoutScreen
        cart={checkoutData.cart}
        flow={checkoutData.flow}
        onBack={() => {
          setCheckoutData(null);
          setCurrentScreen(checkoutData.flow === 'sales' ? 'sales' : 'purchase-product');
        }}
        onPlaceOrder={handleCheckoutComplete}
      />
    );
  }

  return (
    <SafeAreaView style={[commonStyles.container, isRTL && { direction: 'rtl' }]}>
      <StatusBar style="auto" />

      {/* Header */}
      <Header
        onMenuPress={handleMenuPress}
        onHomePress={handleHomePress}
      />

      <ScrollView style={commonStyles.scrollView} contentContainerStyle={commonStyles.scrollContent}>
        {/* Monthly Sales Goal */}
        <View style={commonStyles.card}>
          <View style={commonStyles.goalHeader}>
            <Text style={commonStyles.goalTitle}>{t('dashboard.monthlySalesGoal')}</Text>
            <Text style={commonStyles.goalPercentage}>
              {userData.monthlySalesGoal.percentage}%
            </Text>
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
              style={[
                commonStyles.button,
                selectedPeriod === period && commonStyles.buttonActive
              ]}
              onPress={() => setSelectedPeriod(period)}
            >
              <Text style={[
                commonStyles.buttonText,
                selectedPeriod === period && commonStyles.buttonTextActive
              ]}>
                {period}
              </Text>
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
          <Text style={commonStyles.sectionTitle}>{t('dashboard.salesTrend')}</Text>
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
                onToggle={handleTrendFilter}
              />
            </View>

            {/* Chart placeholder */}
            <View style={commonStyles.chartPlaceholder}>
              <Text style={commonStyles.chartPlaceholderText}>📊 {t('dashboard.salesTrend')}</Text>
            </View>
          </View>
        </View>

        {/* Recent Activity */}
        <View style={commonStyles.section}>
          <Text style={commonStyles.sectionTitle}>{t('dashboard.recentActivity')}</Text>
          <View style={commonStyles.activityList}>
            {recentActivities.map((activity, index) => (
              <ActivityItem
                key={index}
                activity={activity}
                onPress={() => handleActivityPress(activity)}
              />
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <BottomNav />
    </SafeAreaView>
  );
};

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}
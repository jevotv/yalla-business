import { useTranslation } from './LanguageContext';

/**
 * Custom hook to get translated data for dashboard components
 * This ensures data updates when language changes
 */
export const useTranslatedData = () => {
  const { t } = useTranslation();

  // Get translated periods
  const getTranslatedPeriods = () => [
    t('time.today'),
    t('time.thisWeek'),
    t('time.thisMonth')
  ];

  // Get translated trend periods
  const getTranslatedTrendPeriods = () => [
    t('time.daily'),
    t('time.weekly'),
    t('time.monthly')
  ];

  // Get translated dashboard cards
  const getTranslatedDashboardCards = () => [
    {
      icon: 'analytics',
      title: t('dashboard.sales'),
      subtitle: t('dashboard.totalSales'),
      value: '$1,450.75',
      change: '+12.5%',
      changeType: 'positive'
    },
    {
      icon: 'shopping-cart',
      title: t('dashboard.purchase'),
      subtitle: t('dashboard.newOrders'),
      value: '32',
      change: '-3.1%',
      changeType: 'negative'
    },
    {
      icon: 'inventory-2',
      title: t('dashboard.inventory'),
      subtitle: t('dashboard.inventoryValue'),
      value: '$28,300',
      change: '+1.2%',
      changeType: 'positive'
    },
    {
      icon: 'group',
      title: t('dashboard.customers'),
      subtitle: t('common.manageViewCustomerInfo'),
      description: true
    },
    {
      icon: 'account-balance-wallet',
      title: t('dashboard.treasury'),
      subtitle: t('common.trackCashFlow'),
      description: true
    },
    {
      icon: 'bar-chart',
      title: t('dashboard.reports'),
      subtitle: t('common.generateReports'),
      description: true
    },
    {
      icon: 'assignment-return',
      title: t('dashboard.returns'),
      subtitle: t('common.manageReturns'),
      description: true
    },
    {
      icon: 'language',
      title: t('dashboard.buildWebsite'),
      subtitle: t('common.createOnlineStore'),
      description: true
    }
  ];

  // Get translated recent activities
  const getTranslatedRecentActivities = () => [
    {
      icon: 'receipt-long',
      title: t('dashboard.newOrder', { orderNumber: '1024' }),
      time: t('common.minutesAgo', { count: 2 }),
      type: 'positive'
    },
    {
      icon: 'warning',
      title: t('dashboard.lowStock', { productName: 'Product X', quantity: 3 }),
      time: t('common.hourAgo'),
      type: 'negative'
    },
    {
      icon: 'payments',
      title: t('dashboard.payment', { orderNumber: '1021' }),
      time: t('common.yesterday'),
      type: 'primary'
    }
  ];

  // Get translated navigation items
  const getTranslatedNavigationItems = () => ({
    left: [
      { icon: 'assignment-return', label: t('navigation.return') },
      { icon: 'shopping-cart', label: t('dashboard.purchase') }
    ],
    right: [
      { icon: 'call-received', label: t('navigation.receive') },
      { icon: 'payments', label: t('navigation.pay') }
    ],
    fab: {
      icon: 'smart-toy',
      size: 32,
      color: 'white'
    }
  });

  // Get translated user data
  const getTranslatedUserData = () => ({
    greeting: t('dashboard.goodMorning', { name: 'Alex' }),
    monthlySalesGoal: {
      current: 15000,
      target: 20000,
      percentage: 75
    }
  });

  // Get translated sales trend data
  const getTranslatedSalesTrendData = () => ({
    value: '$1,450.75',
    change: t('common.vsLastWeek')
  });

  return {
    getTranslatedPeriods,
    getTranslatedTrendPeriods,
    getTranslatedDashboardCards,
    getTranslatedRecentActivities,
    getTranslatedNavigationItems,
    getTranslatedUserData,
    getTranslatedSalesTrendData,
    t
  };
};
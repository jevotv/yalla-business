import React, { useState } from 'react';
import { Alert } from 'react-native';
import { useTranslation } from '../i18n/LanguageContext';
import { useTranslatedData } from '../i18n/translationUtils';
import ManagementScreen from './ManagementScreen';

// Mock data for purchases
const mockPurchases = [
  {
    id: '20521',
    supplierName: 'Global Suppliers LLC',
    status: 'received',
    date: '2023-10-23',
    total: 1249.99,
    currency: 'SAR'
  },
  {
    id: '20520',
    supplierName: 'Tech Materials Co.',
    status: 'approved',
    date: '2023-10-22',
    total: 587.50,
    currency: 'SAR'
  },
  {
    id: '20519',
    supplierName: 'Premium Ingredients Inc.',
    status: 'pending',
    date: '2023-10-21',
    total: 850.00,
    currency: 'SAR'
  },
  {
    id: '20518',
    supplierName: 'Office Solutions Ltd.',
    status: 'cancelled',
    date: '2023-10-20',
    total: 234.90,
    currency: 'SAR'
  }
];

const mockKPIData = {
  totalSales: {
    value: '85,430.00',
    currency: 'SAR',
    period: 'This Month'
  },
  averageInvoiceValue: {
    value: '250.25',
    currency: 'SAR'
  },
  totalInvoices: {
    value: '178'
  },
  topProduct: {
    name: 'Office Supplies Pack'
  },
  salesGrowth: {
    percentage: '+8.2%',
    positive: true
  },
  outstandingReceivables: {
    value: '8,340.50',
    currency: 'SAR'
  }
};

const PurchaseManagementScreen = ({ onBack, navigation }) => {
  const { t } = useTranslation();
  const { getTranslatedPeriods } = useTranslatedData();
  const [purchases] = useState(mockPurchases);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Handler functions
  const handleAddNewPress = () => {
    console.log('Navigate to Purchase Screen');
    if (navigation && navigation.navigate) {
      navigation.navigate('Purchase');
    }
  };

  const handlePurchasePress = (purchase) => {
    console.log('Purchase pressed:', purchase.id);
    // Create invoice data object similar to SelectInvoiceForReturnScreen
    const invoiceData = {
      id: purchase.id,
      customerName: purchase.supplierName,
      amount: `${purchase.total} ${purchase.currency}`,
      amountValue: purchase.total,
      status: purchase.status,
      statusText: purchase.status,
      date: purchase.date,
      dateValue: purchase.date,
      currency: purchase.currency,
      type: 'purchase' // Purchase is a purchase invoice
    };
    
    // Navigate to invoice detail screen
    if (navigation && navigation.navigate) {
      navigation.navigate('invoice-detail', { invoiceData, action: 'view' });
    }
  };

  const handleStatusFilter = (status) => {
    setSelectedStatus(status);
  };

  const handlePeriodChange = (period) => {
    console.log('Period changed to:', period);
  };

  // Purchase-specific status options
  const statusOptions = [
    { key: 'pending' },
    { key: 'approved' },
    { key: 'received' },
    { key: 'cancelled' }
  ];

  // Translation configuration for purchases
  const translations = {
    titleKey: 'purchases.title',
    searchPlaceholderKey: 'purchases.searchPlaceholder',
    entityPrefix: 'purchases.purchase',
    statusPrefix: 'purchases',
    kpiPrefix: 'purchases',
    emptyState: {
      title: 'purchases.noMorePurchases',
      noSearchResults: 'purchases.noSearchResults',
      endOfList: 'purchases.endOfPurchaseList'
    }
  };

  return (
    <ManagementScreen
      title={t(translations.titleKey)}
      data={purchases}
      statusOptions={statusOptions}
      kpiData={mockKPIData}
      translations={translations}
      onItemPress={handlePurchasePress}
      onAddNew={handleAddNewPress}
      onBack={onBack}
      onStatusFilter={handleStatusFilter}
      onPeriodChange={handlePeriodChange}
      itemLabelField="supplierName"
      itemValueField="total"
      entityKey="purchase"
      selectedStatus={selectedStatus}
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
    />
  );
};

export default PurchaseManagementScreen;
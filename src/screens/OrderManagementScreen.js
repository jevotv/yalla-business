import React, { useState } from 'react';
import { Alert } from 'react-native';
import { useTranslation } from '../i18n/LanguageContext';
import { useTranslatedData } from '../i18n/translationUtils';
import ManagementScreen from './ManagementScreen';

// Mock data for orders
const mockOrders = [
  {
    id: '10521',
    customerName: 'John Doe',
    status: 'shipped',
    date: '2023-10-23',
    total: 149.99,
    currency: 'SAR'
  },
  {
    id: '10520',
    customerName: 'Jane Smith',
    status: 'processing',
    date: '2023-10-22',
    total: 87.50,
    currency: 'SAR'
  },
  {
    id: '10519',
    customerName: 'Robert Brown',
    status: 'delivered',
    date: '2023-10-21',
    total: 250.00,
    currency: 'SAR'
  },
  {
    id: '10518',
    customerName: 'Emily White',
    status: 'cancelled',
    date: '2023-10-20',
    total: 34.90,
    currency: 'SAR'
  }
];

const mockKPIData = {
  totalSales: {
    value: '125,430.00',
    currency: 'SAR',
    period: 'This Month'
  },
  averageInvoiceValue: {
    value: '450.25',
    currency: 'SAR'
  },
  totalInvoices: {
    value: '278'
  },
  topProduct: {
    name: 'Premium Coffee Beans'
  },
  salesGrowth: {
    percentage: '+15.2%',
    positive: true
  },
  outstandingReceivables: {
    value: '12,340.50',
    currency: 'SAR'
  }
};

const OrderManagementScreen = ({ onBack, navigation }) => {
  const { t } = useTranslation();
  const { getTranslatedPeriods } = useTranslatedData();
  const [orders] = useState(mockOrders);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Handler functions
  const handleAddNewPress = () => {
    console.log('Navigate to Sales Screen');
    if (navigation && navigation.navigate) {
      navigation.navigate('Sales');
    }
  };

  const handleOrderPress = (order) => {
    console.log('Order pressed:', order.id);
    // Create invoice data object similar to SelectInvoiceForReturnScreen
    const invoiceData = {
      id: order.id,
      customerName: order.customerName,
      amount: `${order.total} ${order.currency}`,
      amountValue: order.total,
      status: order.status,
      statusText: order.status,
      date: order.date,
      dateValue: order.date,
      currency: order.currency,
      type: 'sales' // Order is a sales invoice
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

  // Status options
  const statusOptions = [
    { key: 'pending' },
    { key: 'processing' },
    { key: 'shipped' },
    { key: 'delivered' },
    { key: 'cancelled' }
  ];

  // Translation configuration
  const translations = {
    titleKey: 'orders.title',
    searchPlaceholderKey: 'orders.searchPlaceholder',
    entityPrefix: 'orders.order',
    statusPrefix: 'orders',
    kpiPrefix: 'orders',
    emptyState: {
      title: 'orders.noMoreOrders',
      noSearchResults: 'orders.noSearchResults',
      endOfList: 'orders.endOfOrderList'
    }
  };

  return (
    <ManagementScreen
      title={t(translations.titleKey)}
      data={orders}
      statusOptions={statusOptions}
      kpiData={mockKPIData}
      translations={translations}
      onItemPress={handleOrderPress}
      onAddNew={handleAddNewPress}
      onBack={onBack}
      onStatusFilter={handleStatusFilter}
      onPeriodChange={handlePeriodChange}
      itemLabelField="customerName"
      itemValueField="total"
      entityKey="order"
      selectedStatus={selectedStatus}
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
    />
  );
};

export default OrderManagementScreen;
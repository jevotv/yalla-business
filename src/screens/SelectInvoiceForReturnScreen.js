import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { commonStyles } from '../theme/styles';
import { colors } from '../theme/colors';
import { useTranslation } from '../i18n/LanguageContext';

const SelectInvoiceForReturnScreen = ({ onBack, navigation, route }) => {
  const { t, isRTL } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState(['Paid', 'Global Tech Inc.']);
  
  // Get return type from navigation params
  const returnType = route?.params?.returnType || 'sales'; // 'sales' or 'purchase'
  const isPurchaseReturn = returnType === 'purchase';

  // Mock Sales Invoice data - using INV prefix for sales
  const salesInvoices = [
    {
      id: 'INV-2024-058',
      customerName: 'Global Tech Inc.',
      amount: '$1,250.75',
      amountValue: 1250.75,
      status: 'paid',
      statusText: 'Paid',
      statusColor: '#34D399',
      date: '15 Oct 2023',
      dateValue: '2023-10-15'
    },
    {
      id: 'INV-2024-057',
      customerName: 'Innovate Solutions',
      amount: '$850.00',
      amountValue: 850.00,
      status: 'partially_paid',
      statusText: 'Partially Paid',
      statusColor: '#FBBF24',
      date: '12 Oct 2023',
      dateValue: '2023-10-12'
    },
    {
      id: 'INV-2024-056',
      customerName: 'Quantum Leap Co.',
      amount: '$3,400.00',
      amountValue: 3400.00,
      status: 'unpaid',
      statusText: 'Unpaid',
      statusColor: '#F87171',
      date: '10 Oct 2023',
      dateValue: '2023-10-10'
    },
    {
      id: 'INV-2024-055',
      customerName: 'Digital Dynamics',
      amount: '$2,150.25',
      amountValue: 2150.25,
      status: 'paid',
      statusText: 'Paid',
      statusColor: '#34D399',
      date: '08 Oct 2023',
      dateValue: '2023-10-08'
    },
    {
      id: 'INV-2024-054',
      customerName: 'Tech Vision LLC',
      amount: '$975.50',
      amountValue: 975.50,
      status: 'partially_paid',
      statusText: 'Partially Paid',
      statusColor: '#FBBF24',
      date: '05 Oct 2023',
      dateValue: '2023-10-05'
    },
    {
      id: 'INV-2024-053',
      customerName: 'StartUp Innovations',
      amount: '$1,750.00',
      amountValue: 1750.00,
      status: 'paid',
      statusText: 'Paid',
      statusColor: '#34D399',
      date: '03 Oct 2023',
      dateValue: '2023-10-03'
    },
    {
      id: 'INV-2024-052',
      customerName: 'Enterprise Systems Ltd',
      amount: '$4,250.80',
      amountValue: 4250.80,
      status: 'unpaid',
      statusText: 'Unpaid',
      statusColor: '#F87171',
      date: '01 Oct 2023',
      dateValue: '2023-10-01'
    },
    {
      id: 'INV-2024-051',
      customerName: 'Cloud Services Pro',
      amount: '$685.25',
      amountValue: 685.25,
      status: 'paid',
      statusText: 'Paid',
      statusColor: '#34D399',
      date: '28 Sep 2023',
      dateValue: '2023-09-28'
    },
    {
      id: 'INV-2024-050',
      customerName: 'Data Analytics Corp',
      amount: '$2,890.15',
      amountValue: 2890.15,
      status: 'partially_paid',
      statusText: 'Partially Paid',
      statusColor: '#FBBF24',
      date: '25 Sep 2023',
      dateValue: '2023-09-25'
    },
    {
      id: 'INV-2024-049',
      customerName: 'NextGen Software',
      amount: '$1,125.60',
      amountValue: 1125.60,
      status: 'paid',
      statusText: 'Paid',
      statusColor: '#34D399',
      date: '22 Sep 2023',
      dateValue: '2023-09-22'
    }
  ];

  // Mock Purchase Invoice data - using PO prefix and vendor names for purchase (consistent with purchase system)
  const purchaseInvoices = [
    {
      id: 'PO-2024-058',
      vendorName: 'ABC Supplies Ltd',
      amount: '$1,250.75',
      amountValue: 1250.75,
      status: 'paid',
      statusText: 'Paid',
      statusColor: '#34D399',
      date: '15 Oct 2023',
      dateValue: '2023-10-15'
    },
    {
      id: 'PO-2024-057',
      vendorName: 'Industrial Components Co',
      amount: '$850.00',
      amountValue: 850.00,
      status: 'partially_paid',
      statusText: 'Partially Paid',
      statusColor: '#FBBF24',
      date: '12 Oct 2023',
      dateValue: '2023-10-12'
    },
    {
      id: 'PO-2024-056',
      vendorName: 'TechParts Distributors',
      amount: '$3,400.00',
      amountValue: 3400.00,
      status: 'unpaid',
      statusText: 'Unpaid',
      statusColor: '#F87171',
      date: '10 Oct 2023',
      dateValue: '2023-10-10'
    },
    {
      id: 'PO-2024-055',
      vendorName: 'Office Essentials Inc',
      amount: '$2,150.25',
      amountValue: 2150.25,
      status: 'paid',
      statusText: 'Paid',
      statusColor: '#34D399',
      date: '08 Oct 2023',
      dateValue: '2023-10-08'
    },
    {
      id: 'PO-2024-054',
      vendorName: 'Manufacturing Supplies LLC',
      amount: '$975.50',
      amountValue: 975.50,
      status: 'partially_paid',
      statusText: 'Partially Paid',
      statusColor: '#FBBF24',
      date: '05 Oct 2023',
      dateValue: '2023-10-05'
    },
    {
      id: 'PO-2024-053',
      vendorName: 'Electronics Warehouse',
      amount: '$1,750.00',
      amountValue: 1750.00,
      status: 'paid',
      statusText: 'Paid',
      statusColor: '#34D399',
      date: '03 Oct 2023',
      dateValue: '2023-10-03'
    },
    {
      id: 'PO-2024-052',
      vendorName: 'Raw Materials Corp',
      amount: '$4,250.80',
      amountValue: 4250.80,
      status: 'unpaid',
      statusText: 'Unpaid',
      statusColor: '#F87171',
      date: '01 Oct 2023',
      dateValue: '2023-10-01'
    },
    {
      id: 'PO-2024-051',
      vendorName: 'Safety Equipment Pro',
      amount: '$685.25',
      amountValue: 685.25,
      status: 'paid',
      statusText: 'Paid',
      statusColor: '#34D399',
      date: '28 Sep 2023',
      dateValue: '2023-09-28'
    },
    {
      id: 'PO-2024-050',
      vendorName: 'Packaging Solutions Ltd',
      amount: '$2,890.15',
      amountValue: 2890.15,
      status: 'partially_paid',
      statusText: 'Partially Paid',
      statusColor: '#FBBF24',
      date: '25 Sep 2023',
      dateValue: '2023-09-25'
    },
    {
      id: 'PO-2024-049',
      vendorName: 'Chemical Supplies Inc',
      amount: '$1,125.60',
      amountValue: 1125.60,
      status: 'paid',
      statusText: 'Paid',
      statusColor: '#34D399',
      date: '22 Sep 2023',
      dateValue: '2023-09-22'
    }
  ];

  // Choose data based on return type
  const mockInvoices = isPurchaseReturn ? purchaseInvoices : salesInvoices;

  const filteredInvoices = () => {
    let filtered = mockInvoices;
    
    if (searchQuery.trim()) {
      filtered = filtered.filter(invoice =>
        invoice.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (invoice.customerName && invoice.customerName.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (invoice.vendorName && invoice.vendorName.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    // Apply active filters
    if (activeFilters.includes('Paid')) {
      filtered = filtered.filter(invoice => invoice.status === 'paid');
    }
    if (activeFilters.includes('Partially Paid')) {
      filtered = filtered.filter(invoice => invoice.status === 'partially_paid');
    }
    if (activeFilters.includes('Unpaid')) {
      filtered = filtered.filter(invoice => invoice.status === 'unpaid');
    }
    if (activeFilters.includes('ABC Supplies Ltd')) {
      filtered = filtered.filter(invoice => invoice.vendorName === 'ABC Supplies Ltd');
    }
    if (activeFilters.includes('Global Tech Inc.')) {
      filtered = filtered.filter(invoice => invoice.customerName === 'Global Tech Inc.');
    }
    
    return filtered;
  };

  const removeFilter = (filter) => {
    setActiveFilters(activeFilters.filter(f => f !== filter));
  };

  const renderStatusIndicator = (status, color) => (
    <View style={[styles.statusIndicator, { backgroundColor: color }]} />
  );

  const renderInvoiceCard = (invoice, index) => (
    <TouchableOpacity
      key={index}
      style={styles.invoiceCard}
      onPress={() => {
        // Navigate to invoice details
        navigation?.navigate('invoice-detail', {
          invoiceId: invoice.id,
          invoiceType: isPurchaseReturn ? 'purchase' : 'sales',
          invoiceData: invoice
        });
      }}
    >
      <View style={styles.invoiceHeader}>
        <View style={styles.invoiceInfo}>
          <Text style={styles.invoiceNumber}>#{invoice.id}</Text>
          <Text style={styles.customerName}>
            {isPurchaseReturn ? invoice.vendorName : invoice.customerName}
          </Text>
        </View>
        <Text style={styles.invoiceAmount}>{invoice.amount}</Text>
      </View>
      
      <View style={styles.invoiceFooter}>
        <View style={styles.invoiceMeta}>
          {renderStatusIndicator(invoice.status, invoice.statusColor)}
          <Text style={styles.statusText}>
            {invoice.status === 'paid' ? t('returns.status.paid') :
             invoice.status === 'partially_paid' ? t('returns.status.partiallyPaid') :
             invoice.status === 'unpaid' ? t('returns.status.unpaid') :
             invoice.statusText}
          </Text>
          <Text style={styles.separator}>·</Text>
          <Text style={styles.invoiceDate}>{invoice.date}</Text>
        </View>
        <TouchableOpacity
          style={styles.viewButton}
          onPress={() => {
            // Navigate to invoice details specifically for viewing
            navigation?.navigate('invoice-detail', {
              invoiceId: invoice.id,
              invoiceType: isPurchaseReturn ? 'purchase' : 'sales',
              invoiceData: invoice,
              action: 'view'
            });
          }}
        >
          <MaterialIcons name="visibility" size={20} color={colors.primary} />
          <Text style={styles.viewButtonText}>{t('returns.selectInvoiceForReturn.view')}</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const renderFilterChip = (filter, index) => (
    <TouchableOpacity 
      key={index} 
      style={styles.filterChip}
      onPress={() => removeFilter(filter)}
    >
      <Text style={styles.filterChipText}>{filter}</Text>
      <MaterialIcons name="close" size={14} color={colors.primary} />
    </TouchableOpacity>
  );

  return (
    <View style={[commonStyles.container, isRTL && { direction: 'rtl' }]}>
      {/* Header */}
      <View style={commonStyles.header}>
        <View style={commonStyles.headerContent}>
          <View style={commonStyles.headerLeft}>
            <TouchableOpacity style={commonStyles.iconButton} onPress={onBack}>
              <MaterialIcons
                name="arrow-back"
                size={24}
                color={colors.icon}
              />
            </TouchableOpacity>
            <Text style={commonStyles.headerTitle}>
              {isPurchaseReturn ? t('returns.selectInvoiceForReturn.screenTitlePurchase') : t('returns.selectInvoiceForReturn.screenTitle')}
            </Text>
          </View>
        </View>
      </View>

      <ScrollView style={commonStyles.scrollView} contentContainerStyle={{ paddingBottom: 16 }}>
        {/* Search & Filter Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchInputContainer}>
            <MaterialIcons name="search" size={20} color={colors.textSecondary} style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder={isPurchaseReturn ? t('returns.selectInvoiceForReturn.searchPlaceholderPurchase') : t('returns.selectInvoiceForReturn.searchPlaceholderSales')}
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholderTextColor={colors.textSecondary}
            />
          </View>
          <TouchableOpacity style={styles.filterButton}>
            <MaterialIcons name="tune" size={20} color={colors.icon} />
            <Text style={styles.filterButtonText}>{t('returns.selectInvoiceForReturn.filter')}</Text>
          </TouchableOpacity>
        </View>

        {/* Active Filters */}
        {activeFilters.length > 0 && (
          <View style={styles.filtersContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {activeFilters.map((filter, index) => renderFilterChip(filter, index))}
              <TouchableOpacity style={styles.dateRangeChip}>
                <Text style={styles.dateRangeText}>{t('returns.selectInvoiceForReturn.dateRange')}</Text>
                <MaterialIcons name="arrow-drop-down" size={14} color={colors.textSecondary} />
              </TouchableOpacity>
            </ScrollView>
          </View>
        )}

        {/* Invoice List */}
        <View style={styles.invoiceList}>
          {filteredInvoices().length > 0 ? (
            filteredInvoices().map((invoice, index) => renderInvoiceCard(invoice, index))
          ) : (
            <View style={styles.emptyState}>
              <MaterialIcons name="search_off" size={48} color={colors.textSecondary} style={{ marginBottom: 16 }} />
              <Text style={styles.emptyStateTitle}>{t('returns.selectInvoiceForReturn.emptyStateTitle')}</Text>
              <Text style={styles.emptyStateMessage}>
                {t('returns.selectInvoiceForReturn.emptyStateMessage')}
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 16,
    backgroundColor: colors.background,
  },
  searchInputContainer: {
    flex: 1,
    position: 'relative',
  },
  searchIcon: {
    position: 'absolute',
    left: 16,
    top: '50%',
    marginTop: -10,
    zIndex: 1,
  },
  searchInput: {
    height: 48,
    backgroundColor: colors.card,
    borderRadius: 8,
    paddingLeft: 48,
    paddingRight: 16,
    fontSize: 16,
    color: colors.text,
    borderWidth: 1,
    borderColor: colors.border,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.card,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 12,
    paddingVertical: 12,
    gap: 4,
    height: 48,
  },
  filterButtonText: {
    fontSize: 14,
    color: colors.text,
    fontWeight: '500',
  },
  filtersContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primaryLight,
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginRight: 8,
    gap: 4,
  },
  filterChipText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.primary,
  },
  dateRangeChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.borderLight,
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginRight: 8,
    gap: 4,
  },
  dateRangeText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  invoiceList: {
    padding: 16,
    paddingTop: 0,
  },
  invoiceCard: {
    backgroundColor: colors.card,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
    marginBottom: 12,
  },
  invoiceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  invoiceInfo: {
    flex: 1,
  },
  invoiceNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  customerName: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  invoiceAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
  },
  invoiceFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  invoiceMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  separator: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  invoiceDate: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  viewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.primaryLight,
    borderRadius: 16,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  viewButtonText: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: '500',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
    marginTop: 32,
    backgroundColor: colors.card,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  emptyStateMessage: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});

export default SelectInvoiceForReturnScreen;
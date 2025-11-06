import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { commonStyles } from '../theme/styles';
import { colors } from '../theme/colors';
import { useTranslation } from '../i18n/LanguageContext';
import ExpandableCard from '../components/ExpandableCard';
import SearchBar from '../components/SearchBar';

const ReturnInvoicesScreen = ({ onBack, navigation }) => {
  const { t, isRTL } = useTranslation();
  const [activeTab, setActiveTab] = useState('sales'); // 'sales' or 'purchase'
  const [searchQuery, setSearchQuery] = useState('');

  // Mock return data
  const mockReturnData = {
    salesReturns: [
      {
        id: 'RI-00123',
        customerName: 'John Smith',
        status: 'completed',
        returnDate: '2023-10-26',
        amount: '$150.00',
        originalDate: '2023-10-15',
        originalInvoice: 'INV-54321',
        notes: 'Item was damaged upon arrival and customer requested a full refund.',
        statusColor: '#28A745'
      },
      {
        id: 'RI-00122',
        customerName: 'Jane Doe',
        status: 'pending',
        returnDate: '2023-10-25',
        amount: '$89.99',
        originalDate: '2023-10-12',
        originalInvoice: 'INV-54310',
        notes: 'Customer ordered the wrong size and exchanged for a different product.',
        statusColor: '#FFC107'
      },
      {
        id: 'RI-00121',
        customerName: 'Adam Miller',
        status: 'refunded',
        returnDate: '2023-10-24',
        amount: '$250.50',
        originalDate: '2023-10-05',
        originalInvoice: 'INV-54298',
        notes: 'Product was not as described on the website. Full refund processed.',
        statusColor: '#DC3545'
      }
    ],
    purchaseReturns: [
      {
        id: 'PR-00123',
        vendorName: 'ABC Supplies',
        status: 'completed',
        returnDate: '2023-10-26',
        amount: '$300.00',
        originalDate: '2023-10-15',
        originalInvoice: 'PO-54321',
        notes: 'Damaged goods received from supplier.',
        statusColor: '#28A745'
      }
    ]
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'completed':
        return t('returns.status.completed');
      case 'pending':
        return t('returns.status.pending');
      case 'refunded':
        return t('returns.status.refunded');
      default:
        return status;
    }
  };

  const filteredReturns = () => {
    const returnsData = activeTab === 'sales' ? mockReturnData.salesReturns : mockReturnData.purchaseReturns;
    
    if (!searchQuery.trim()) return returnsData;
    
    return returnsData.filter(ret => 
      ret.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (ret.customerName && ret.customerName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (ret.vendorName && ret.vendorName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      ret.originalInvoice.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const currentReturns = filteredReturns();

  const renderStatusBadge = (status, color) => (
    <View style={[commonStyles.tierBadge, { backgroundColor: `${color}20` }]}>
      <View style={[commonStyles.tierDot, { backgroundColor: color }]} />
      <Text style={[commonStyles.tierText, { color }]}>{getStatusText(status)}</Text>
    </View>
  );

  const renderReturnItem = (item, index) => (
    <View key={index} style={commonStyles.card}>
      <View style={commonStyles.expandableHeader}>
        <View style={commonStyles.expandableHeaderLeft}>
          <View style={commonStyles.expandableTitleRow}>
            <Text style={[commonStyles.expandableTitle, commonStyles.cardTitle]}>
              {item.id}
            </Text>
          </View>
          <Text style={[commonStyles.customerEmail, { marginBottom: 0 }]}>
            {item.customerName || item.vendorName}
          </Text>
        </View>
        {renderStatusBadge(item.status, item.statusColor)}
      </View>

      <View style={[commonStyles.expandableDivider, { marginVertical: 16 }]} />

      <View style={commonStyles.expandableMetricsGrid}>
        <View style={commonStyles.expandableMetricItem}>
          <Text style={commonStyles.expandableMetricLabel}>
            {t('returns.returnDate')}
          </Text>
          <Text style={commonStyles.expandableMetricValue}>
            {item.returnDate}
          </Text>
        </View>
        
        <View style={commonStyles.expandableMetricItem}>
          <Text style={commonStyles.expandableMetricLabel}>
            {t('returns.amount')}
          </Text>
          <Text style={[commonStyles.expandableMetricValue, { fontWeight: 'bold' }]}>
            {item.amount}
          </Text>
        </View>
        
        <View style={commonStyles.expandableMetricItem}>
          <Text style={commonStyles.expandableMetricLabel}>
            {t('returns.originalDate')}
          </Text>
          <Text style={[commonStyles.expandableMetricValue, { fontWeight: 'normal' }]}>
            {item.originalDate}
          </Text>
        </View>
        
        <View style={commonStyles.expandableMetricItem}>
          <Text style={commonStyles.expandableMetricLabel}>
            {t('returns.originalInvoice')}
          </Text>
          <TouchableOpacity
            onPress={() => {
              // Navigate to the original invoice details
              navigation?.navigate('invoice-detail', {
                invoiceId: item.originalInvoice,
                invoiceType: activeTab === 'sales' ? 'sales' : 'purchase',
                returnData: item
              });
            }}
          >
            <Text style={[commonStyles.expandableMetricValue, { color: '#135bec', fontWeight: 'normal' }]}>
              {t('returns.viewInvoice', { invoice: item.originalInvoice })}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <Text style={[commonStyles.customerEmail, { marginTop: 16 }]}>
        <Text style={[commonStyles.customerName, { marginBottom: 0 }]}>
          {t('returns.notes')}:
        </Text> {item.notes}
      </Text>
    </View>
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
                color="#616f89"
              />
            </TouchableOpacity>
            <Text style={commonStyles.headerTitle}>
              {t('returns.screenTitle')}
            </Text>
          </View>
        </View>
      </View>

      <ScrollView style={commonStyles.scrollView} contentContainerStyle={{ paddingBottom: 16 }}>
        {/* Statistics Card */}
        <ExpandableCard
          title={t('returns.returnsNumber')}
          value="128"
          period={t('time.thisMonth')}
          customExpandedContent={
            <View style={styles.expandedMetricsContainer}>
              <View style={styles.metricsGrid}>
                <View style={styles.metricItem}>
                  <Text style={styles.metricLabel}>{t('returns.totalSalesReturns')}</Text>
                  <Text style={styles.metricValue}>SAR 12,500.00</Text>
                </View>
                <View style={styles.metricItem}>
                  <Text style={styles.metricLabel}>{t('returns.totalPurchaseReturns')}</Text>
                  <Text style={styles.metricValue}>SAR 3,200.00</Text>
                </View>
                <View style={styles.metricItem}>
                  <Text style={styles.metricLabel}>{t('returns.returnsPercentage')}</Text>
                  <Text style={styles.metricValue}>5.2%</Text>
                </View>
                <View style={styles.metricItem}>
                  <Text style={styles.metricLabel}>{t('returns.mostReturnedItem')}</Text>
                  <Text style={styles.metricValue}>T-Shirt - Red</Text>
                </View>
              </View>
            </View>
          }
          style={styles.expandableCard}
        />

        {/* Tabs */}
        <View style={commonStyles.section}>
          <View style={[commonStyles.returnTabs, isRTL && { flexDirection: 'row-reverse' }]}>
            <TouchableOpacity
              style={[
                commonStyles.returnTab,
                isRTL && { marginRight: 0, marginLeft: 12 },
                activeTab === 'sales' ? commonStyles.returnTabActive : commonStyles.returnTabInactive
              ]}
              onPress={() => setActiveTab('sales')}
            >
              <Text style={[
                commonStyles.returnTabText,
                activeTab === 'sales' ? commonStyles.returnTabTextActive : commonStyles.returnTabTextInactive
              ]}>
                {t('returns.salesReturn')}
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[
                commonStyles.returnTab,
                activeTab === 'purchase' ? commonStyles.returnTabActive : commonStyles.returnTabInactive
              ]}
              onPress={() => setActiveTab('purchase')}
            >
              <Text style={[
                commonStyles.returnTabText,
                activeTab === 'purchase' ? commonStyles.returnTabTextActive : commonStyles.returnTabTextInactive
              ]}>
                {t('returns.purchaseReturn')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Search Bar */}
        <View style={[commonStyles.section, { marginTop: 0 }]}>
          <SearchBar
            placeholder={t('returns.searchPlaceholder')}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Returns List */}
        <View style={commonStyles.section}>
          {currentReturns.length > 0 ? (
            currentReturns.map((item, index) => renderReturnItem(item, index))
          ) : (
            <View style={[commonStyles.card, { alignItems: 'center', paddingVertical: 32 }]}>
              <MaterialIcons name="inventory_2" size={48} color="#616f89" style={{ marginBottom: 16 }} />
              <Text style={[commonStyles.sectionTitle, { textAlign: 'center', marginBottom: 8 }]}>
                {t('returns.noReturnsFound')}
              </Text>
              <Text style={[commonStyles.customerEmail, { textAlign: 'center' }]}>
                {t('returns.noReturnsMessage')}
              </Text>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Bottom Action Buttons */}
      <View style={styles.bottomButtonsContainer}>
        <TouchableOpacity
          style={styles.purchaseReturnButton}
          onPress={() => {
            // Navigate to select invoice for purchase return
            navigation?.navigate('select-invoice', { returnType: 'purchase' });
          }}
        >
          <Text style={styles.purchaseReturnButtonText}>
            {t('returns.newPurchaseReturn')}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.salesReturnButton}
          onPress={() => {
            // Navigate to select invoice for sales return
            navigation?.navigate('select-invoice', { returnType: 'sales' });
          }}
        >
          <Text style={styles.salesReturnButtonText}>
            {t('returns.newSalesReturn')}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomButtonsContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: colors.card,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    flexDirection: 'row',
    gap: 16,
  },
  purchaseReturnButton: {
    flex: 1,
    backgroundColor: colors.primaryLight,
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 16,
    alignItems: 'center',
    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)',
    elevation: 2,
  },
  salesReturnButton: {
    flex: 1,
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 16,
    alignItems: 'center',
    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)',
    elevation: 2,
  },
  purchaseReturnButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primary,
    textAlign: 'center',
  },
  salesReturnButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.textLight,
    textAlign: 'center',
  },
  // KPI Card Styles for ExpandableCard
  kpiCardStyle: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.1)',
    elevation: 2,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    marginBottom: 24,
  },
  kpiExpandedContent: {
    marginTop: 16,
  },
  kpiMetricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  kpiMetricItem: {
    width: '48%',
    alignItems: 'flex-end',
  },
  kpiMetricLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'right',
    marginBottom: 4,
  },
  kpiMetricValue: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
    textAlign: 'right',
  },
});

export default ReturnInvoicesScreen;
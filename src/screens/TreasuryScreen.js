import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView, 
  StyleSheet,
  SafeAreaView,
  Alert,
  TextInput
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';

// Components
import Dropdown from '../components/Dropdown';
import FlowButton from '../components/FlowButton';
import PaymentReceiptDialog from '../components/PaymentReceiptDialog';

// Constants and theme
import { colors } from '../theme/colors';
import { textStyles } from '../theme/typography';
import { commonStyles } from '../theme/styles';

const TreasuryScreen = ({ onBack }) => {
  const { t, isRTL } = useTranslation();
  
  // State management
  const [expanded, setExpanded] = useState(false);
  const [selectedTab, setSelectedTab] = useState('all');
  const [searchText, setSearchText] = useState('');
  const [selectedPeriod, setSelectedPeriod] = useState('treasury.filter.thisMonth');
  const [showPeriodDropdown, setShowPeriodDropdown] = useState(false);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [showReceiptDialog, setShowReceiptDialog] = useState(false);
  const [transactions, setTransactions] = useState([
    {
      id: 'TXN73829',
      type: 'receipt',
      title: t('treasury.transactions.paymentFromAcme'),
      subtitle: 'Oct 26, 10:45 AM',
      amount: 1200.00,
      isPositive: true,
    },
    {
      id: 'TXN73828',
      type: 'payment',
      title: t('treasury.transactions.officeSupplies'),
      subtitle: 'Oct 26, 09:12 AM',
      amount: 350.00,
      isPositive: false,
    },
    {
      id: 'TXN73827',
      type: 'receipt',
      title: t('treasury.transactions.projectGammaPayment'),
      subtitle: 'Oct 25, 03:30 PM',
      amount: 3500.00,
      isPositive: true,
    },
    {
      id: 'TXN73826',
      type: 'payment',
      title: t('treasury.transactions.monthlySoftwareSubscription'),
      subtitle: 'Oct 25, 11:00 AM',
      amount: 149.00,
      isPositive: false,
    },
  ]);

  const treasuryData = {
    currentBalance: '15,230.50',
    todayNetFlow: '+850.00',
    todayReceipts: '1,200.00',
    todayPayments: '350.00',
    totalReceipts: '25,800.00',
    totalPayments: '10,569.50',
    totalReceivables: '5,400.00',
    totalPayables: '2,150.00',
  };

  const periods = [
    'treasury.filter.thisMonth',
    'treasury.filter.lastMonth',
    'treasury.filter.thisQuarter',
    'treasury.filter.thisYear',
  ];

  const tabs = [
    { key: 'all', label: 'treasury.transactions.all' },
    { key: 'receipts', label: 'treasury.transactions.receipts' },
    { key: 'payments', label: 'treasury.transactions.payments' },
  ];

  const filteredTransactions = transactions.filter(transaction => {
    if (selectedTab === 'all') return true;
    if (selectedTab === 'receipts') return transaction.type === 'receipt';
    if (selectedTab === 'payments') return transaction.type === 'payment';
    return true;
  }).filter(transaction => 
    searchText === '' || 
    transaction.title.toLowerCase().includes(searchText.toLowerCase()) ||
    transaction.id.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleAddPayment = () => {
    setShowPaymentDialog(true);
  };

  const handleAddReceipt = () => {
    setShowReceiptDialog(true);
  };

  const handleSaveTransaction = (transactionData) => {
    // Add new transaction to the list
    const newTransaction = {
      id: `TXN${Date.now()}`,
      type: transactionData.type,
      title: transactionData.customerName,
      subtitle: new Date().toLocaleDateString(),
      amount: transactionData.amount,
      isPositive: transactionData.type === 'receipt',
      ...transactionData
    };

    setTransactions(prev => [newTransaction, ...prev]);
    
    // Close the dialog
    if (transactionData.type === 'payment') {
      setShowPaymentDialog(false);
    } else {
      setShowReceiptDialog(false);
    }

    Alert.alert(t('common.success'), t('common.save'));
  };

  const handleViewInvoice = (transaction) => {
    Alert.alert(t('treasury.actions.viewInvoice'), `${t('treasury.actions.viewInvoiceFor')} ${transaction.title}`);
  };

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const handlePeriodSelect = (periodKey) => {
    setSelectedPeriod(periodKey);
    setShowPeriodDropdown(false);
  };

  return (
    <SafeAreaView style={[commonStyles.container, isRTL && { direction: 'rtl' }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {t('treasury.title')}
        </Text>
        <TouchableOpacity style={styles.notificationButton}>
          <MaterialIcons name="notifications" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        {/* Current Balance Section */}
        <View style={styles.balanceCard}>
          <TouchableOpacity 
            style={styles.balanceHeader}
            onPress={toggleExpanded}
            activeOpacity={0.7}
          >
            <View style={styles.balanceInfo}>
              <Text style={styles.balanceLabel}>
                {t('treasury.balance.currentBalance')}
              </Text>
              <Text style={styles.balanceValue}>
                ${treasuryData.currentBalance}
              </Text>
            </View>
            <View style={styles.moreInfo}>
              <Text style={styles.moreText}>
                {t('treasury.balance.more')}
              </Text>
              <MaterialIcons 
                name="expand-more" 
                size={20} 
                color={colors.primary}
                style={[
                  styles.expandIcon,
                  expanded && styles.expandIconRotated
                ]}
              />
            </View>
          </TouchableOpacity>

          {expanded && (
            <View style={styles.expandedMetrics}>
              <View style={styles.metricsGrid}>
                <View style={styles.metricItem}>
                  <Text style={styles.metricLabel}>
                    {t('treasury.metrics.todayNetFlow')}
                  </Text>
                  <Text style={[styles.metricValue, { color: colors.success }]}>
                    +${treasuryData.todayNetFlow}
                  </Text>
                </View>

                <View style={styles.metricItem}>
                  <Text style={styles.metricLabel}>
                    {t('treasury.metrics.todayReceipts')}
                  </Text>
                  <Text style={styles.metricValue}>
                    ${treasuryData.todayReceipts}
                  </Text>
                </View>

                <View style={styles.metricItem}>
                  <Text style={styles.metricLabel}>
                    {t('treasury.metrics.todayPayments')}
                  </Text>
                  <Text style={styles.metricValue}>
                    ${treasuryData.todayPayments}
                  </Text>
                </View>

                <View style={styles.metricItem}>
                  <Text style={styles.metricLabel}>
                    {t('treasury.metrics.totalReceipts')}
                  </Text>
                  <Text style={styles.metricValue}>
                    ${treasuryData.totalReceipts}
                  </Text>
                </View>

                <View style={styles.metricItem}>
                  <Text style={styles.metricLabel}>
                    {t('treasury.metrics.totalPayments')}
                  </Text>
                  <Text style={styles.metricValue}>
                    ${treasuryData.totalPayments}
                  </Text>
                </View>

                <View style={styles.metricItem}>
                  <Text style={styles.metricLabel}>
                    {t('treasury.metrics.totalReceivables')}
                  </Text>
                  <Text style={[styles.metricValue, { color: colors.success }]}>
                    ${treasuryData.totalReceivables}
                  </Text>
                </View>

                <View style={styles.metricItem}>
                  <Text style={styles.metricLabel}>
                    {t('treasury.metrics.totalPayables')}
                  </Text>
                  <Text style={[styles.metricValue, { color: colors.error }]}>
                    ${treasuryData.totalPayables}
                  </Text>
                </View>
              </View>
            </View>
          )}
        </View>

        {/* Search and Filter Section */}
        <View style={styles.searchSection}>
          <View style={styles.searchContainer}>
            <MaterialIcons 
              name="search" 
              size={20} 
              color={colors.textSecondary} 
              style={styles.searchIcon}
            />
            <TextInput
              style={styles.searchInput}
              placeholder={t('treasury.searchPlaceholder')}
              value={searchText}
              onChangeText={setSearchText}
              placeholderTextColor={colors.textSecondary}
            />
          </View>

          <TouchableOpacity
            style={styles.filterButton}
            onPress={() => setShowPeriodDropdown(!showPeriodDropdown)}
          >
            <MaterialIcons name="calendar-today" size={20} color={colors.text} />
            <Text style={styles.filterText}>{t(selectedPeriod)}</Text>
            <MaterialIcons name="expand-more" size={20} color={colors.text} />
          </TouchableOpacity>
        </View>

        {/* Dropdown for Period Filter */}
        <Dropdown
          options={periods.map(key => t(key))}
          selectedOption={t(selectedPeriod)}
          onOptionSelect={handlePeriodSelect}
          isVisible={showPeriodDropdown}
          onToggle={() => setShowPeriodDropdown(!showPeriodDropdown)}
          style={styles.periodDropdown}
          containerStyle={styles.periodDropdownContainer}
          maxDropdownHeight={200}
        />

        {/* Transaction Tabs */}
        <View style={styles.tabsContainer}>
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab.key}
              style={[
                styles.tab,
                selectedTab === tab.key && styles.tabActive
              ]}
              onPress={() => setSelectedTab(tab.key)}
            >
              <Text style={[
                styles.tabText,
                selectedTab === tab.key && styles.tabTextActive
              ]}>
                {t(tab.label)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Transactions List */}
        <View style={styles.transactionsList}>
          {filteredTransactions.map((transaction) => (
            <View key={transaction.id} style={styles.transactionItem}>
              <View style={[
                styles.transactionIcon,
                {
                  backgroundColor: transaction.isPositive 
                    ? `${colors.success}20` 
                    : `${colors.error}20`
                }
              ]}>
                <MaterialIcons
                  name={transaction.isPositive ? "arrow-upward" : "arrow-downward"}
                  size={20}
                  color={transaction.isPositive ? colors.success : colors.error}
                />
              </View>
              
              <View style={styles.transactionContent}>
                <Text style={styles.transactionTitle}>
                  {transaction.title}
                </Text>
                <Text style={styles.transactionSubtitle}>
                  {transaction.subtitle} • #{transaction.id}
                </Text>
              </View>
              
              <View style={styles.transactionAmount}>
                <Text style={[
                  styles.amountText,
                  {
                    color: transaction.isPositive ? colors.success : colors.error
                  }
                ]}>
                  {transaction.isPositive ? '+' : '-'}${transaction.amount.toFixed(2)}
                </Text>
                <TouchableOpacity onPress={() => handleViewInvoice(transaction)}>
                  <Text style={styles.viewInvoiceText}>
                    {t('treasury.actions.viewInvoice')}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Bottom Action Buttons */}
      <View style={styles.bottomActions}>
        <TouchableOpacity 
          style={[styles.actionButton, styles.addPaymentButton]}
          onPress={handleAddPayment}
        >
          <Text style={styles.addPaymentText}>
            {t('treasury.actions.addPayment')}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.actionButton, styles.addReceiptButton]}
          onPress={handleAddReceipt}
        >
          <Text style={styles.addReceiptText}>
            {t('treasury.actions.addReceipt')}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Payment Dialog */}
      <PaymentReceiptDialog
        isVisible={showPaymentDialog}
        onClose={() => setShowPaymentDialog(false)}
        onSave={handleSaveTransaction}
        transactionType="payment"
      />

      {/* Receipt Dialog */}
      <PaymentReceiptDialog
        isVisible={showReceiptDialog}
        onClose={() => setShowReceiptDialog(false)}
        onSave={handleSaveTransaction}
        transactionType="receipt"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    flex: 1,
    textAlign: 'center',
  },
  notificationButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingBottom: 120,
    paddingHorizontal: 16,
  },
  balanceCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 16,
  },
  balanceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  balanceInfo: {
    flex: 1,
  },
  balanceLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.textSecondary,
    marginBottom: 4,
  },
  balanceValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.text,
  },
  moreInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  moreText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.primary,
    marginRight: 4,
  },
  expandIcon: {
    transform: [{ rotate: '0deg' }],
  },
  expandIconRotated: {
    transform: [{ rotate: '180deg' }],
  },
  expandedMetrics: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  metricItem: {
    width: '47%',
    backgroundColor: colors.backgroundLight,
    padding: 12,
    borderRadius: 8,
  },
  metricLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  metricValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
  },
  searchSection: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 12,
    height: 48,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 12,
    height: 48,
    minWidth: 120,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
    marginHorizontal: 8,
  },
  periodDropdownContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 100,
  },
  tabsContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    marginBottom: 16,
  },
  tab: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginRight: 24,
  },
  tabActive: {
    borderBottomWidth: 2,
    borderBottomColor: colors.primary,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.textSecondary,
  },
  tabTextActive: {
    color: colors.primary,
  },
  transactionsList: {
    gap: 12,
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  transactionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  transactionContent: {
    flex: 1,
  },
  transactionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  transactionSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  transactionAmount: {
    alignItems: 'flex-end',
  },
  amountText: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  viewInvoiceText: {
    fontSize: 14,
    color: colors.primary,
  },
  bottomActions: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  addPaymentButton: {
    backgroundColor: colors.backgroundLight,
    borderWidth: 1,
    borderColor: colors.border,
  },
  addReceiptButton: {
    backgroundColor: colors.primary,
  },
  addPaymentText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
  },
  addReceiptText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.textOnPrimary,
  },
});

export default TreasuryScreen;
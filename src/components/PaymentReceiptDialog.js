import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Modal,
  ScrollView,
  Alert,
  Dimensions
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { commonStyles } from '../theme/styles';
import { textStyles } from '../theme/typography';
import { colors } from '../theme/colors';
import { useTranslation } from '../i18n/LanguageContext';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const PaymentReceiptDialog = ({
  isVisible,
  onClose,
  onSave,
  transactionType = 'receipt' // 'receipt' or 'payment'
}) => {
  const { t, isRTL } = useTranslation();
  const [type, setType] = useState(transactionType);
  const [customerName, setCustomerName] = useState('');
  const [currentBalance, setCurrentBalance] = useState('-2,450.00'); // Mock data
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [referenceNumber, setReferenceNumber] = useState('');
  const [notes, setNotes] = useState('');
  const [selectedInvoices, setSelectedInvoices] = useState([]);
  const [showPaymentMethodDropdown, setShowPaymentMethodDropdown] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ x: 0, y: 0, width: 0 });
  const dropdownButtonRef = useRef(null);

  // Mock invoices data
  const mockInvoices = [
    { id: 'INV-0028', amount: 1200.00, dueDate: 'Oct 15, 2023' },
    { id: 'INV-0031', amount: 750.00, dueDate: 'Nov 01, 2023' },
    { id: 'INV-0032', amount: 500.00, dueDate: 'Nov 10, 2023' },
  ];

  const paymentMethods = [
    { key: 'bankTransfer', label: t('treasury.dialog.paymentMethods.bankTransfer') },
    { key: 'creditCard', label: t('treasury.dialog.paymentMethods.creditCard') },
    { key: 'cash', label: t('treasury.dialog.paymentMethods.cash') },
    { key: 'check', label: t('treasury.dialog.paymentMethods.check') },
  ];

  const handleSave = () => {
    // Basic validation
    if (!customerName.trim()) {
      Alert.alert(t('common.error'), t('customer.nameRequired'));
      return;
    }

    if (!amount || parseFloat(amount) <= 0) {
      Alert.alert(t('common.error'), t('validation.required'));
      return;
    }

    const transactionData = {
      type,
      customerName: customerName.trim(),
      currentBalance,
      amount: parseFloat(amount),
      paymentMethod,
      referenceNumber: referenceNumber.trim(),
      notes: notes.trim(),
      selectedInvoices,
      timestamp: new Date().toISOString(),
    };

    onSave(transactionData);
    handleCancel();
  };

  const handleCancel = () => {
    // Reset form fields
    setCustomerName('');
    setAmount('');
    setPaymentMethod('');
    setReferenceNumber('');
    setNotes('');
    setSelectedInvoices([]);
    setType(transactionType);
    setShowPaymentMethodDropdown(false);
    onClose();
  };

  const handleTypeChange = (newType) => {
    setType(newType);
  };

  const handleInvoiceToggle = (invoiceId) => {
    setSelectedInvoices(prev => 
      prev.includes(invoiceId)
        ? prev.filter(id => id !== invoiceId)
        : [...prev, invoiceId]
    );
  };

  const togglePaymentMethodDropdown = () => {
    if (showPaymentMethodDropdown) {
      setShowPaymentMethodDropdown(false);
    } else {
      // Measure the dropdown button position
      dropdownButtonRef.current?.measure((x, y, width, height, pageX, pageY) => {
        setDropdownPosition({
          x: pageX,
          y: pageY + height + 4,
          width: width
        });
      });
      setShowPaymentMethodDropdown(true);
    }
  };

  const handlePaymentMethodSelect = (method) => {
    setPaymentMethod(method);
    setShowPaymentMethodDropdown(false);
  };

  const getPaymentMethodLabel = (methodKey) => {
    const method = paymentMethods.find(m => m.key === methodKey);
    return method ? method.label : t('treasury.dialog.paymentMethodPlaceholder');
  };

  const formatCurrency = (value) => {
    const num = parseFloat(value) || 0;
    return num.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };

  const preventBackdropClose = (event) => {
    event.stopPropagation();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={handleCancel}
    >
      <TouchableOpacity 
        style={styles.modalOverlay}
        activeOpacity={1}
        onPress={handleCancel}
      >
        <TouchableOpacity 
          style={styles.dialogWrapper}
          activeOpacity={1}
          onPress={preventBackdropClose}
        >
          <View style={[styles.dialogContainer, isRTL && styles.dialogContainerRTL]}>
            {/* Header */}
            <View style={[styles.header, isRTL && styles.headerRTL]}>
              <TouchableOpacity style={styles.backButton} onPress={handleCancel}>
                <MaterialIcons name="arrow-back" size={24} color={colors.text} />
              </TouchableOpacity>
              <Text style={[styles.headerTitle, isRTL && styles.headerTitleRTL]}>
                {t('treasury.dialog.addTransaction')}
              </Text>
              <View style={styles.headerSpacer} />
            </View>

            {/* Segmented Buttons */}
            <View style={styles.segmentedContainer}>
              <View style={styles.segmentedButtons}>
                <TouchableOpacity
                  style={[
                    styles.segmentButton,
                    type === 'receipt' && styles.segmentButtonActive,
                    isRTL && styles.segmentButtonRTL
                  ]}
                  onPress={() => handleTypeChange('receipt')}
                >
                  <Text style={[
                    styles.segmentButtonText,
                    type === 'receipt' && styles.segmentButtonTextActive
                  ]}>
                    {t('treasury.transactions.receipts')}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.segmentButton,
                    type === 'payment' && styles.segmentButtonActive,
                    isRTL && styles.segmentButtonRTL
                  ]}
                  onPress={() => handleTypeChange('payment')}
                >
                  <Text style={[
                    styles.segmentButtonText,
                    type === 'payment' && styles.segmentButtonTextActive
                  ]}>
                    {t('treasury.transactions.payments')}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Form Content */}
            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
              {/* Customer/Vendor Name */}
              <View style={styles.formGroup}>
                <Text style={[textStyles.label, styles.label]}>{t('treasury.dialog.customerVendorName')}</Text>
                <View style={[styles.searchInputContainer, isRTL && styles.searchInputContainerRTL]}>
                  <TextInput
                    style={[styles.searchInput, isRTL && styles.searchInputRTL]}
                    value={customerName}
                    onChangeText={setCustomerName}
                    placeholder={t('treasury.dialog.customerVendorPlaceholder')}
                    placeholderTextColor={colors.textSecondary}
                    onFocus={preventBackdropClose}
                  />
                  <View style={[styles.searchIconContainer, isRTL && styles.searchIconContainerRTL]}>
                    <MaterialIcons name="search" size={20} color={colors.textSecondary} />
                  </View>
                </View>
              </View>

              {/* Current Balance */}
              <View style={styles.balanceContainer}>
                <Text style={styles.balanceLabel}>{t('treasury.dialog.currentBalance')}: </Text>
                <Text style={styles.balanceAmount}>${formatCurrency(currentBalance)}</Text>
              </View>

              {/* Amount */}
              <View style={styles.formGroup}>
                <Text style={[textStyles.label, styles.label]}>{t('treasury.dialog.amount')}</Text>
                <View style={styles.amountContainer}>
                  <Text style={styles.currencySymbol}>$</Text>
                  <TextInput
                    style={styles.amountInput}
                    value={amount}
                    onChangeText={setAmount}
                    placeholder={t('treasury.dialog.amountPlaceholder')}
                    placeholderTextColor={colors.textSecondary}
                    keyboardType="numeric"
                    onFocus={preventBackdropClose}
                  />
                </View>
              </View>

              {/* Payment Method */}
              <View style={styles.formGroup}>
                <Text style={[textStyles.label, styles.label]}>{t('treasury.dialog.paymentMethod')}</Text>
                <View style={styles.dropdownContainer}>
                  <TouchableOpacity
                    ref={dropdownButtonRef}
                    style={styles.dropdownButton}
                    onPress={togglePaymentMethodDropdown}
                    activeOpacity={1}
                  >
                    <Text style={styles.dropdownText}>
                      {paymentMethod ? getPaymentMethodLabel(paymentMethod) : t('treasury.dialog.paymentMethodPlaceholder')}
                    </Text>
                    <MaterialIcons
                      name={showPaymentMethodDropdown ? "expand-less" : "expand-more"}
                      size={20}
                      color={colors.textSecondary}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Reference Number */}
              <View style={styles.formGroup}>
                <Text style={[textStyles.label, styles.label]}>{t('treasury.dialog.referenceNumber')}</Text>
                <TextInput
                  style={styles.input}
                  value={referenceNumber}
                  onChangeText={setReferenceNumber}
                  placeholder={t('treasury.dialog.referencePlaceholder')}
                  placeholderTextColor={colors.textSecondary}
                  onFocus={preventBackdropClose}
                />
              </View>

              {/* Notes */}
              <View style={styles.formGroup}>
                <Text style={[textStyles.label, styles.label]}>{t('treasury.dialog.notes')}</Text>
                <TextInput
                  style={[styles.input, styles.textArea]}
                  value={notes}
                  onChangeText={setNotes}
                  placeholder={t('treasury.dialog.notesPlaceholder')}
                  placeholderTextColor={colors.textSecondary}
                  multiline={true}
                  numberOfLines={4}
                  onFocus={preventBackdropClose}
                />
              </View>

              {/* Related Invoices */}
              <View style={styles.formGroup}>
                <Text style={[textStyles.label, styles.label]}>{t('treasury.dialog.relatedInvoices')}</Text>
                <View style={styles.invoicesContainer}>
                  {mockInvoices.map((invoice) => (
                    <TouchableOpacity
                      key={invoice.id}
                      style={[
                        styles.invoiceItem,
                        selectedInvoices.includes(invoice.id) && styles.invoiceItemSelected
                      ]}
                      onPress={() => handleInvoiceToggle(invoice.id)}
                    >
                      <View style={styles.checkboxContainer}>
                        <View style={[
                          styles.checkbox,
                          selectedInvoices.includes(invoice.id) && styles.checkboxSelected
                        ]}>
                          {selectedInvoices.includes(invoice.id) && (
                            <MaterialIcons name="check" size={16} color="#ffffff" />
                          )}
                        </View>
                      </View>
                      <View style={styles.invoiceInfo}>
                        <View style={styles.invoiceHeader}>
                          <Text style={styles.invoiceId}>{invoice.id}</Text>
                          <Text style={styles.invoiceAmount}>${formatCurrency(invoice.amount.toString())}</Text>
                        </View>
                        <Text style={styles.invoiceDueDate}>Due: {invoice.dueDate}</Text>
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </ScrollView>

            {/* Footer with Save Button */}
            <View style={styles.footer}>
              <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.saveButtonText}>
                  {type === 'receipt' ? t('treasury.dialog.saveReceipt') : t('treasury.dialog.savePayment')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </TouchableOpacity>

      {/* Payment Method Dropdown Modal */}
      <Modal
        visible={showPaymentMethodDropdown}
        transparent={true}
        animationType="none"
        statusBarTranslucent={true}
        onRequestClose={() => setShowPaymentMethodDropdown(false)}
      >
        <TouchableOpacity 
          style={styles.typeModalOverlay} 
          activeOpacity={1}
          onPress={() => setShowPaymentMethodDropdown(false)}
        >
          <View 
            style={[
              styles.typeModalDropdown,
              {
                left: dropdownPosition.x,
                top: dropdownPosition.y,
                width: dropdownPosition.width,
              }
            ]}
          >
            <View style={styles.typeDropdownArrow} />
            {paymentMethods.map((method) => (
              <TouchableOpacity
                key={method.key}
                style={[
                  styles.typeModalDropdownItem,
                  paymentMethod === method.key && styles.typeModalDropdownItemSelected
                ]}
                onPress={() => handlePaymentMethodSelect(method.key)}
              >
                <Text
                  style={[
                    styles.typeModalDropdownItemText,
                    paymentMethod === method.key && styles.typeModalDropdownItemTextSelected
                  ]}
                >
                  {method.label}
                </Text>
                {paymentMethod === method.key && (
                  <MaterialIcons name="check" size={16} color={colors.primary} />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  dialogWrapper: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dialogContainer: {
    backgroundColor: colors.card,
    borderRadius: 12,
    width: '90%',
    maxHeight: '85%',
    flexDirection: 'column',
    elevation: 5,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
    maxWidth: 400,
  },
  dialogContainerRTL: {
    writingDirection: 'rtl',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerRTL: {
    flexDirection: 'row-reverse',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
  },
  headerTitleRTL: {
    textAlign: 'center',
  },
  headerSpacer: {
    width: 40,
  },
  segmentedContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  segmentedButtons: {
    flexDirection: 'row',
    backgroundColor: colors.background,
    borderRadius: 8,
    padding: 4,
  },
  segmentButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    alignItems: 'center',
  },
  segmentButtonRTL: {
    flexDirection: 'row-reverse',
  },
  segmentButtonActive: {
    backgroundColor: colors.card,
    boxShadow: '0px 0px 2px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  segmentButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.textSecondary,
  },
  segmentButtonTextActive: {
    color: colors.text,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    marginBottom: 8,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    backgroundColor: colors.card,
  },
  searchInputContainerRTL: {
    flexDirection: 'row-reverse',
  },
  searchInput: {
    flex: 1,
    height: 48,
    paddingHorizontal: 12,
    fontSize: 16,
    color: colors.text,
  },
  searchInputRTL: {
    textAlign: 'right',
  },
  searchIconContainer: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderLeftWidth: 1,
    borderLeftColor: colors.border,
  },
  searchIconContainerRTL: {
    borderLeftWidth: 0,
    borderRightWidth: 1,
    borderRightColor: colors.border,
  },
  balanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: colors.background,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 16,
  },
  balanceLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
  },
  balanceAmount: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.error,
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    backgroundColor: colors.card,
  },
  currencySymbol: {
    paddingLeft: 12,
    fontSize: 16,
    fontWeight: '500',
    color: colors.text,
  },
  amountInput: {
    flex: 1,
    height: 48,
    paddingHorizontal: 12,
    fontSize: 16,
    color: colors.text,
  },
  dropdownContainer: {
    position: 'relative',
  },
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 48,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    backgroundColor: colors.card,
    paddingHorizontal: 12,
  },
  dropdownText: {
    fontSize: 16,
    color: colors.text,
    flex: 1,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    color: colors.text,
    backgroundColor: colors.card,
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
    paddingTop: 12,
  },
  invoicesContainer: {
    marginTop: 8,
  },
  invoiceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    backgroundColor: colors.background,
    marginBottom: 8,
  },
  invoiceItemSelected: {
    borderColor: colors.primary,
    backgroundColor: `${colors.primary}10`,
  },
  checkboxContainer: {
    marginRight: 12,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  invoiceInfo: {
    flex: 1,
  },
  invoiceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  invoiceId: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  invoiceAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
  },
  invoiceDueDate: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  saveButton: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    elevation: 2,
    boxShadow: '0px 2px 4px rgba(19, 91, 236, 0.2)',
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textLight,
  },
  // Modal overlay styles for payment method dropdown
  typeModalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    zIndex: 999999,
  },
  typeModalDropdown: {
    position: 'absolute',
    backgroundColor: colors.card,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    boxShadow: '0px 6px 16px rgba(0, 0, 0, 0.4)',
    elevation: 100,
    zIndex: 1000000,
  },
  typeDropdownArrow: {
    position: 'absolute',
    top: -8,
    left: 16,
    width: 0,
    height: 0,
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderBottomWidth: 8,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: colors.card,
  },
  typeModalDropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  typeModalDropdownItemSelected: {
    backgroundColor: '#f0f8ff',
  },
  typeModalDropdownItemText: {
    fontSize: 16,
    color: colors.text,
    flex: 1,
  },
  typeModalDropdownItemTextSelected: {
    color: colors.primary,
    fontWeight: '500',
  },
});

export default PaymentReceiptDialog;
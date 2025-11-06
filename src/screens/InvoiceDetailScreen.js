import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { useTranslation } from '../i18n/LanguageContext';

const InvoiceDetailScreen = ({
  onBack,
  navigation,
  route
}) => {
  const { t, isRTL } = useTranslation();
  const [orderStatus, setOrderStatus] = useState('shipped');
  
  // Get invoice data from route params or use mock data
  const invoiceData = route?.params?.invoiceData || {
    id: '#10521',
    invoiceNumber: '#10521',
    customerName: 'John Doe',
    invoiceDate: '23 أكتوبر 2023',
    invoiceDateEn: 'October 23, 2023',
    dueDate: '30 أكتوبر 2023',
    dueDateEn: 'October 30, 2023',
    orderStatus: isRTL ? 'تم الشحن' : 'Shipped',
    paymentStatus: isRTL ? 'مدفوع جزئياً' : 'Partially Paid',
    paymentStatusKey: 'partially_paid',
    paymentStatusColor: '#F59E0B',
    subtotal: '159.99',
    discount: '-10.00',
    returns: '0.00',
    paidAmount: '50.00',
    unpaidAmount: '99.99',
    total: '149.99',
    currency: 'SAR',
    notes: isRTL ? 'برجاء ترك الطرد عند الباب الأمامي.' : 'Please leave the package at the front door.',
    lineItems: [
      {
        id: 1,
        name: 'Premium Coffee Beans',
        nameAr: 'حبوب القهوة الممتازة',
        sku: 'CB-001',
        quantity: 1,
        unitPrice: '99.99',
        total: '99.99'
      },
      {
        id: 2,
        name: 'Artisan Mug',
        nameAr: 'كوب صُناعي',
        sku: 'MG-012',
        quantity: 2,
        unitPrice: '30.00',
        total: '60.00'
      }
    ],
    returnedItems: []
  };

  const statusOptions = [
    { key: 'processing', label: isRTL ? 'قيد التجهيز' : 'Processing' },
    { key: 'shipped', label: isRTL ? 'تم الشحن' : 'Shipped' },
    { key: 'delivered', label: isRTL ? 'تم التسليم' : 'Delivered' },
    { key: 'cancelled', label: isRTL ? 'ملغي' : 'Cancelled' }
  ];

  // Get localized values based on current language
  const getLocalizedValue = (field) => {
    if (isRTL && invoiceData[`${field}Ar`]) {
      return invoiceData[`${field}Ar`];
    }
    if (invoiceData[`${field}En`]) {
      return invoiceData[`${field}En`];
    }
    return invoiceData[field];
  };

  const formatCurrency = (amount) => {
    const num = parseFloat(amount) || 0;
    return `${num.toFixed(2)} ${invoiceData.currency}`;
  };

  const handleAddPayment = () => {
    Alert.alert(
      t('invoice.payment.addPayment'),
      t('invoice.payment.selectMethod'),
      [
        { text: t('common.cancel'), style: 'cancel' },
        {
          text: isRTL ? 'نقدي' : 'Cash',
          onPress: () => console.log('Selected: Cash')
        },
        {
          text: isRTL ? 'بطاقة ائتمان' : 'Credit Card',
          onPress: () => console.log('Selected: Credit Card')
        },
        {
          text: isRTL ? 'حوالة بنكية' : 'Bank Transfer',
          onPress: () => console.log('Selected: Bank Transfer')
        },
        {
          text: isRTL ? 'شيك' : 'Check',
          onPress: () => console.log('Selected: Check')
        }
      ]
    );
  };

  const handleStatusChange = (status) => {
    setOrderStatus(status.key);
    console.log('Status changed to:', status.key);
  };

  const renderStatusBadge = (status, color) => (
    <View style={[styles.statusBadge, { backgroundColor: `${color}20` }]}>
      <View style={[styles.statusDot, { backgroundColor: color }]} />
      <Text style={[styles.statusText, { color }]}>{status}</Text>
    </View>
  );

  const renderLineItem = (item, index) => (
    <View key={item.id} style={styles.lineItem}>
      <View style={styles.lineItemHeader}>
        <View style={styles.lineItemInfo}>
          <Text style={styles.lineItemName}>
            {getLocalizedValue('name') || item.nameAr || 'Unknown Item'}
          </Text>
          <Text style={styles.lineItemSku}>
            SKU: {item.sku || 'N/A'}
          </Text>
        </View>
        <Text style={styles.lineItemTotal}>
          {formatCurrency(item.total || '0.00')}
        </Text>
      </View>
      <Text style={styles.lineItemQuantity}>
        {isRTL ? 'الكمية' : 'Quantity'}: {item.quantity || 0} × {formatCurrency(item.unitPrice || '0.00')}
      </Text>
    </View>
  );

  return (
    <View style={[styles.container, isRTL && { direction: 'rtl' }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <MaterialIcons
            name={isRTL ? "arrow-forward" : "arrow-back"}
            size={24}
            color="#111318"
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {isRTL ? `فاتورة ${invoiceData.invoiceNumber}` : `Invoice ${invoiceData.invoiceNumber}`}
        </Text>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.moreButton}>
            <MaterialIcons
              name="more-vert"
              size={24}
              color="#111318"
            />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.scrollContent} contentContainerStyle={{ paddingBottom: 16 }}>
        <View style={styles.content}>
          {/* Invoice Summary */}
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>
              {isRTL ? 'ملخص الفاتورة' : 'Invoice Summary'}
            </Text>
            <View style={styles.summaryGrid}>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryLabel}>
                  {isRTL ? 'العميل' : 'Customer'}
                </Text>
                <Text style={styles.summaryValue}>
                  {getLocalizedValue('customerName')}
                </Text>
              </View>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryLabel}>
                  {isRTL ? 'تاريخ الفاتورة' : 'Invoice Date'}
                </Text>
                <Text style={styles.summaryValue}>
                  {getLocalizedValue('invoiceDate')}
                </Text>
              </View>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryLabel}>
                  {isRTL ? 'رقم الطلب' : 'Order Number'}
                </Text>
                <Text style={[styles.summaryValue, { color: colors.primary }]}>
                  {invoiceData.invoiceNumber}
                </Text>
              </View>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryLabel}>
                  {isRTL ? 'تاريخ الاستحقاق' : 'Due Date'}
                </Text>
                <Text style={styles.summaryValue}>
                  {getLocalizedValue('dueDate')}
                </Text>
              </View>
            </View>
          </View>

          {/* Payment Status and Order Status Cards */}
          <View style={styles.twoColumnSection}>
            {/* Payment Status Card */}
            <View style={styles.statusCard}>
              <Text style={styles.cardSubtitle}>
                {isRTL ? 'حالة السداد' : 'Payment Status'}
              </Text>
              {renderStatusBadge(getLocalizedValue('paymentStatus'), invoiceData.paymentStatusColor)}
              <Text style={styles.paymentAmount}>
                {formatCurrency(getLocalizedValue('paidAmount'))} / {formatCurrency(getLocalizedValue('total'))}
              </Text>
              <TouchableOpacity style={styles.addPaymentButton} onPress={handleAddPayment}>
                <MaterialIcons name="add" size={20} color="#ffffff" />
                <Text style={styles.addPaymentButtonText}>
                  {isRTL ? 'إضافة دفعة' : 'Add Payment'}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Order Status Card */}
            <View style={styles.statusCard}>
              <Text style={styles.cardSubtitle}>
                {isRTL ? 'حالة الطلب' : 'Order Status'}
              </Text>
              <View style={styles.dropdownContainer}>
                <Text style={styles.dropdownText}>
                  {statusOptions.find(option => option.key === orderStatus)?.label}
                </Text>
                <MaterialIcons
                  name="expand-more"
                  size={20}
                  color="#616f89"
                  style={styles.dropdownIcon}
                />
              </View>
            </View>
          </View>

          {/* Order Summary */}
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>
              {isRTL ? 'ملخص الطلب' : 'Order Summary'}
            </Text>
            <View style={styles.summaryLines}>
              <View style={styles.summaryLine}>
                <Text style={styles.summaryLineText}>
                  {isRTL ? 'المجموع الفرعي' : 'Subtotal'}
                </Text>
                <Text style={styles.summaryLineText}>
                  {formatCurrency(getLocalizedValue('subtotal'))}
                </Text>
              </View>
              <View style={styles.summaryLine}>
                <Text style={styles.summaryLineText}>
                  {isRTL ? 'الخصم' : 'Discount'}
                </Text>
                <Text style={styles.summaryLineText}>
                  {formatCurrency(getLocalizedValue('discount'))}
                </Text>
              </View>
              <View style={styles.summaryLine}>
                <Text style={styles.summaryLineText}>
                  {isRTL ? 'المرتجعات' : 'Returns'}
                </Text>
                <Text style={styles.summaryLineText}>
                  {formatCurrency(getLocalizedValue('returns'))}
                </Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.summaryLine}>
                <Text style={[styles.summaryLineText, { color: '#16a34a' }]}>
                  {isRTL ? 'المدفوع' : 'Paid'}
                </Text>
                <Text style={[styles.summaryLineText, { color: '#16a34a' }]}>
                  {formatCurrency(getLocalizedValue('paidAmount'))}
                </Text>
              </View>
              <View style={styles.summaryLine}>
                <Text style={[styles.summaryLineText, { color: '#dc2626' }]}>
                  {isRTL ? 'غير مدفوع' : 'Unpaid'}
                </Text>
                <Text style={[styles.summaryLineText, { color: '#dc2626' }]}>
                  {formatCurrency(getLocalizedValue('unpaidAmount'))}
                </Text>
              </View>
              <View style={styles.divider} />
              <View style={[styles.summaryLine, styles.totalLine]}>
                <Text style={styles.totalText}>
                  {isRTL ? 'الإجمالي' : 'Total'}
                </Text>
                <Text style={styles.totalText}>
                  {formatCurrency(getLocalizedValue('total'))}
                </Text>
              </View>
              {invoiceData.notes && (
                <View style={styles.notesSection}>
                  <Text style={styles.notesLabel}>
                    {isRTL ? 'ملاحظات' : 'Notes'}
                  </Text>
                  <Text style={styles.notesText}>
                    {getLocalizedValue('notes')}
                  </Text>
                </View>
              )}
            </View>
          </View>

          {/* Order Items */}
          <View style={styles.itemsCard}>
            <Text style={styles.itemsTitle}>
              {isRTL ? 'أصناف الطلب' : 'Order Items'}
            </Text>
            <View style={styles.itemsList}>
              {(invoiceData.lineItems || []).map(renderLineItem)}
            </View>
          </View>

          {/* Returned Items */}
          <View style={styles.returnedItemsCard}>
            <Text style={styles.sectionTitle}>
              {isRTL ? 'الأصناف المرتجعة' : 'Returned Items'}
            </Text>
            <View style={styles.returnedItemsContent}>
              {(invoiceData.returnedItems || []).length === 0 ? (
                <View style={styles.emptyReturnedItems}>
                  <Text style={styles.emptyReturnedText}>
                    {isRTL ? 'لا توجد أصناف مرتجعة لهذه الفاتورة.' : 'No returned items for this invoice.'}
                  </Text>
                </View>
              ) : (
                <View style={styles.returnedItemsList}>
                  {/* Render returned items here */}
                </View>
              )}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f6f8',
  },
  header: {
    backgroundColor: '#f6f6f8',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  backButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111318',
  },
  headerRight: {
    width: 48,
    alignItems: 'flex-end',
  },
  moreButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContent: {
    flex: 1,
  },
  content: {
    padding: 16,
    gap: 16,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)',
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111318',
    marginBottom: 12,
  },
  summaryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  summaryItem: {
    width: '48%',
    gap: 4,
  },
  summaryLabel: {
    fontSize: 12,
    color: '#6b7280',
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111318',
  },
  twoColumnSection: {
    flexDirection: 'row',
    gap: 16,
  },
  statusCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)',
    elevation: 2,
    flex: 1,
  },
  cardSubtitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111318',
    marginBottom: 8,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 4,
    gap: 6,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  paymentAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111318',
    marginBottom: 16,
  },
  addPaymentButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#135bec',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    gap: 8,
  },
  addPaymentButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#ffffff',
  },
  dropdownContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  dropdownText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111318',
  },
  dropdownIcon: {
    marginLeft: 4,
  },
  summaryLines: {
    gap: 12,
  },
  summaryLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryLineText: {
    fontSize: 14,
    color: '#111318',
  },
  divider: {
    height: 1,
    backgroundColor: '#e5e7eb',
    marginVertical: 8,
  },
  totalLine: {
    paddingTop: 8,
  },
  totalText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111318',
  },
  notesSection: {
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    marginTop: 8,
  },
  notesLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 4,
  },
  notesText: {
    fontSize: 14,
    color: '#374151',
    marginTop: 4,
  },
  itemsCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)',
    elevation: 2,
    overflow: 'hidden',
  },
  itemsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111318',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  itemsList: {
    maxHeight: 240,
  },
  lineItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  lineItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  lineItemInfo: {
    flex: 1,
  },
  lineItemName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111318',
  },
  lineItemSku: {
    fontSize: 12,
    color: '#6b7280',
  },
  lineItemTotal: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111318',
  },
  lineItemQuantity: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
  },
  returnedItemsCard: {
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderStyle: 'dashed',
  },
  returnedItemsContent: {
    gap: 16,
  },
  emptyReturnedItems: {
    textAlign: 'center',
    fontSize: 14,
    color: '#6b7280',
    paddingVertical: 16,
  },
  emptyReturnedText: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
  },
});

export default InvoiceDetailScreen;
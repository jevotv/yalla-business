import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView, 
  StyleSheet, 
  SafeAreaView,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';

// Components
import FlowButton from '../components/FlowButton';

// Theme
import { colors } from '../theme/colors';

// Payment methods
const PAYMENT_METHODS = [
  { key: 'cash', icon: 'payments' },
  { key: 'card', icon: 'credit-card' },
  { key: 'bank', icon: 'account-balance' }
];

// Render header
const renderHeader = (onBack, t) => (
  <View style={styles.header}>
    <TouchableOpacity style={styles.backButton} onPress={onBack}>
      <MaterialIcons name="arrow-back" size={24} color={colors.text} />
    </TouchableOpacity>
    
    <Text style={styles.headerTitle}>{t('checkout.title')}</Text>
    
    <View style={styles.placeholder} />
  </View>
);

// Render cart item
const renderCartItem = (item, index, onUpdateQuantity, onRemoveItem, t) => (
  <View key={item.id} style={styles.cartItem}>
    <View style={styles.cartItemLeft}>
      <View style={styles.productImage}>
        <MaterialIcons name="image" size={32} color={colors.textSecondary} />
      </View>
      <View style={styles.productInfo}>
        <Text style={styles.productName} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={styles.productSku}>
          {t('common.customer')}: {item.id}
        </Text>
        <Text style={styles.productPrice}>
          ${item.price.toFixed(2)}
        </Text>
      </View>
    </View>
    
    <View style={styles.cartItemRight}>
      <View style={styles.quantityContainer}>
        <TouchableOpacity 
          style={styles.quantityButton}
          onPress={() => onUpdateQuantity(index, item.quantity - 1)}
          disabled={item.quantity <= 1}
        >
          <MaterialIcons 
            name="remove" 
            size={16} 
            color={item.quantity <= 1 ? colors.textSecondary : colors.text} 
          />
        </TouchableOpacity>
        
        <TextInput
          style={styles.quantityInput}
          value={item.quantity.toString()}
          onChangeText={(text) => {
            const newQuantity = parseInt(text) || 1;
            onUpdateQuantity(index, Math.max(1, newQuantity));
          }}
          keyboardType="numeric"
          textAlign="center"
        />
        
        <TouchableOpacity 
          style={styles.quantityButton}
          onPress={() => onUpdateQuantity(index, item.quantity + 1)}
        >
          <MaterialIcons 
            name="add" 
            size={16} 
            color={colors.text} 
          />
        </TouchableOpacity>
      </View>
      
      <TouchableOpacity 
        style={styles.removeButton}
        onPress={() => onRemoveItem(index)}
      >
        <MaterialIcons name="delete" size={16} color={colors.error} />
      </TouchableOpacity>
    </View>
  </View>
);

// Render customer section
const renderCustomerSection = (customer, onSelectCustomer, t) => (
  <TouchableOpacity style={styles.customerSection} onPress={onSelectCustomer}>
    <View style={styles.customerLeft}>
      <View style={styles.customerIcon}>
        <MaterialIcons name="person-add" size={20} color={colors.text} />
      </View>
      <Text style={styles.customerText}>
        {customer ? customer.name : t('checkout.addCustomer')}
      </Text>
    </View>
    <MaterialIcons name="arrow-forward-ios" size={16} color={colors.textSecondary} />
  </TouchableOpacity>
);

// Render payment method selection
const renderPaymentMethods = (selectedMethod, onSelectMethod, t) => (
  <View style={styles.paymentMethodsContainer}>
    <Text style={styles.sectionLabel}>{t('checkout.paymentMethod')}</Text>
    <View style={styles.paymentMethods}>
      {PAYMENT_METHODS.map((method) => (
        <FlowButton
          key={method.key}
          text={t(`checkout.${method.key}`)}
          onPress={() => onSelectMethod(method.key)}
          variant={selectedMethod === method.key ? 'primary' : 'secondary'}
          size="small"
          icon={method.icon}
          style={styles.paymentMethodButton}
        />
      ))}
    </View>
  </View>
);

// Render order summary
const renderOrderSummary = (subtotal, discount, taxRate, t) => {
  const taxAmount = subtotal * (taxRate / 100);
  const total = subtotal - discount + taxAmount;

  return (
    <View style={styles.orderSummary}>
      <Text style={styles.sectionLabel}>{t('checkout.total')}</Text>
      
      <View style={styles.summaryRow}>
        <Text style={styles.summaryLabel}>{t('checkout.subtotal')}</Text>
        <Text style={styles.summaryValue}>${subtotal.toFixed(2)}</Text>
      </View>
      
      <View style={styles.summaryRow}>
        <Text style={styles.summaryLabel}>{t('checkout.discount')}</Text>
        <Text style={styles.summaryValue}>-${discount.toFixed(2)}</Text>
      </View>
      
      <View style={styles.summaryRow}>
        <Text style={styles.summaryLabel}>
          {t('checkout.tax', { rate: taxRate })}
        </Text>
        <Text style={styles.summaryValue}>${taxAmount.toFixed(2)}</Text>
      </View>
      
      <View style={[styles.summaryRow, styles.totalRow]}>
        <Text style={styles.totalLabel}>{t('checkout.total')}</Text>
        <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
      </View>
    </View>
  );
};

// Render action buttons
const renderActionButtons = (onSave, onSaveAndPrint, onPlaceOrder, t) => (
  <View style={styles.actionButtons}>
    <FlowButton
      text={t('checkout.save')}
      onPress={onSave}
      variant="secondary"
      size="medium"
      style={styles.saveButton}
    />
    
    <FlowButton
      text={t('checkout.saveAndPrint')}
      onPress={onSaveAndPrint}
      variant="primary"
      size="medium"
      style={styles.savePrintButton}
    />
    
    <TouchableOpacity style={styles.shareButton}>
      <MaterialIcons name="share" size={20} color={colors.text} />
    </TouchableOpacity>
  </View>
);

const CheckoutScreen = ({
  cart,
  onBack,
  onPlaceOrder,
  flow = 'sales' // 'sales' or 'purchase'
}) => {
  const { t } = useTranslation();
  const [customer, setCustomer] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [discount, setDiscount] = useState('');
  const [paidAmount, setPaidAmount] = useState('');
  const [notes, setNotes] = useState('');
  const [taxRate] = useState(5); // 5% tax rate
  const [localCart, setLocalCart] = useState(cart || []);

  // Calculate totals
  const subtotal = localCart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const discountAmount = discount ?
    (discount.includes('%') ?
      subtotal * (parseFloat(discount.replace('%', '')) / 100) :
      parseFloat(discount) || 0
    ) : 0;
  const taxAmount = subtotal * (taxRate / 100);
  const total = subtotal - discountAmount + taxAmount;

  // Handle customer selection
  const handleSelectCustomer = () => {
    // In a real app, this would open a customer selection modal or navigate to customer screen
    Alert.alert(t('checkout.customer'), t('checkout.addCustomer'));
  };

  // Handle save
  const handleSave = () => {
    Alert.alert(t('checkout.save'), t('common.success'));
  };

  // Handle save and print
  const handleSaveAndPrint = () => {
    Alert.alert(t('checkout.saveAndPrint'), t('common.success'));
  };

  // Handle quantity update
  const handleUpdateQuantity = (index, newQuantity) => {
    if (newQuantity <= 0) return;
    
    setLocalCart(prevCart => {
      const updatedCart = [...prevCart];
      updatedCart[index] = {
        ...updatedCart[index],
        quantity: newQuantity
      };
      return updatedCart;
    });
  };

  // Handle remove item
  const handleRemoveItem = (index) => {
    const item = localCart[index];
    
    if (!item) return;
    
    // Web-compatible confirmation using native browser confirm
    if (window.confirm(`Are you sure you want to remove "${item.name}" from your cart?`)) {
      setLocalCart(prevCart => {
        const updatedCart = prevCart.filter((_, i) => i !== index);
        return updatedCart;
      });
    }
  };

  // Handle place order
  const handlePlaceOrder = () => {
    if (localCart.length === 0) {
      Alert.alert(t('checkout.emptyCart'));
      return;
    }

    Alert.alert(
      t('checkout.placeOrder'),
      `${t('checkout.total')}: $${total.toFixed(2)}`,
      [
        { text: t('common.cancel'), style: 'cancel' },
        {
          text: t('checkout.placeOrder'),
          onPress: () => {
            if (onPlaceOrder) {
              onPlaceOrder({
                customer,
                cart: localCart,
                paymentMethod,
                discount: discountAmount,
                paidAmount: parseFloat(paidAmount) || 0,
                notes,
                subtotal,
                tax: taxAmount,
                total
              });
            }
          }
        }
      ]
    );
  };

  if (localCart.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        {renderHeader(onBack, t)}
        <View style={styles.emptyCartContainer}>
          <MaterialIcons name="shopping-cart" size={64} color={colors.textSecondary} />
          <Text style={styles.emptyCartTitle}>{t('checkout.emptyCart')}</Text>
          <FlowButton
            text={t('common.cancel')}
            onPress={onBack}
            variant="primary"
            style={styles.backToCartButton}
          />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      {renderHeader(onBack, t)}
      
      <KeyboardAvoidingView 
        style={styles.content}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Cart Items */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t('checkout.cartItems')}</Text>
            {localCart.map((item, index) =>
              renderCartItem(item, index, handleUpdateQuantity, handleRemoveItem, t)
            )}
          </View>

          {/* Customer Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t('checkout.customer')}</Text>
            {renderCustomerSection(customer, handleSelectCustomer, t)}
          </View>

          {/* Payment Details */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t('checkout.paymentDetails')}</Text>
            
            {/* Payment Methods */}
            {renderPaymentMethods(paymentMethod, setPaymentMethod, t)}
            
            {/* Discount */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>{t('checkout.addDiscount')}</Text>
              <TextInput
                style={styles.textInput}
                placeholder={t('checkout.discountPlaceholder')}
                placeholderTextColor={colors.textSecondary}
                value={discount}
                onChangeText={setDiscount}
              />
            </View>
            
            {/* Paid Amount */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>{t('checkout.paidAmount')}</Text>
              <TextInput
                style={styles.textInput}
                placeholder={t('checkout.paidAmountPlaceholder')}
                placeholderTextColor={colors.textSecondary}
                value={paidAmount}
                onChangeText={setPaidAmount}
                keyboardType="numeric"
              />
            </View>
            
            {/* Notes */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>{t('checkout.notes')}</Text>
              <TextInput
                style={[styles.textInput, styles.notesInput]}
                placeholder={t('checkout.notesPlaceholder')}
                placeholderTextColor={colors.textSecondary}
                value={notes}
                onChangeText={setNotes}
                multiline
                numberOfLines={3}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Fixed Bottom Section */}
      <View style={styles.bottomSection}>
        {/* Order Summary */}
        {renderOrderSummary(subtotal, discountAmount, taxRate, t)}
        
        {/* Action Buttons */}
        {renderActionButtons(handleSave, handleSaveAndPrint, handlePlaceOrder, t)}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: colors.card,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
  },
  placeholder: {
    width: 32,
  },
  content: {
    flex: 1,
  },
  section: {
    backgroundColor: colors.card,
    marginBottom: 12,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 12,
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  cartItemLeft: {
    flexDirection: 'row',
    flex: 1,
    gap: 12,
  },
  productImage: {
    width: 56,
    height: 56,
    borderRadius: 8,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 2,
  },
  productSku: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
  },
  cartItemRight: {
    alignItems: 'flex-end',
    gap: 8,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderRadius: 16,
    paddingHorizontal: 8,
    paddingVertical: 4,
    gap: 4,
  },
  quantityButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityInput: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
    width: 32,
    textAlign: 'center',
    padding: 0,
  },
  removeButton: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  customerSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    backgroundColor: colors.background,
    borderRadius: 8,
  },
  customerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 12,
  },
  customerIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: colors.card,
    justifyContent: 'center',
    alignItems: 'center',
  },
  customerText: {
    fontSize: 16,
    color: colors.text,
    flex: 1,
  },
  paymentMethodsContainer: {
    marginBottom: 16,
  },
  paymentMethods: {
    flexDirection: 'row',
    gap: 8,
  },
  paymentMethodButton: {
    flex: 1,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.textSecondary,
    marginBottom: 4,
  },
  textInput: {
    height: 48,
    backgroundColor: colors.background,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    color: colors.text,
    borderWidth: 1,
    borderColor: colors.border,
  },
  notesInput: {
    height: 80,
    textAlignVertical: 'top',
    paddingTop: 12,
  },
  bottomSection: {
    backgroundColor: colors.card,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    padding: 16,
  },
  orderSummary: {
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  summaryLabel: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  summaryValue: {
    fontSize: 14,
    color: colors.text,
    fontWeight: '500',
  },
  totalRow: {
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    marginTop: 4,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  saveButton: {
    flex: 1,
  },
  savePrintButton: {
    flex: 2,
  },
  shareButton: {
    width: 48,
    height: 48,
    borderRadius: 8,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyCartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyCartTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginTop: 16,
    marginBottom: 24,
    textAlign: 'center',
  },
  backToCartButton: {
    minWidth: 120,
  },
});

export default CheckoutScreen;
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  StyleSheet, 
  SafeAreaView,
  Image,
  Alert,
  Modal
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';

// Components
import Dropdown from '../components/Dropdown';
import FlowButton from '../components/FlowButton';

// Constants and theme
import { colors } from '../theme/colors';
import { textStyles } from '../theme/typography';
import { commonStyles } from '../theme/styles';

const AddProductScreen = ({ onBack, source = 'product-management' }) => {
  const { t, currentLanguage, isRTL } = useTranslation();
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    costPrice: '',
    salePrice: '',
    lowestSellPrice: '',
    openingQuantity: '',
    barcode: '',
    category: ''
  });
  
  // UI state
  const [isCategoryDropdownVisible, setIsCategoryDropdownVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(t('products.addProduct.category.placeholder'));
  
  // New Category Dialog state
  const [showNewCategoryDialog, setShowNewCategoryDialog] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [categories, setCategories] = useState([
    t('products.addProduct.category.groceries'),
    t('products.addProduct.category.electronics'),
    t('products.addProduct.category.apparel'),
    t('products.addProduct.category.createNew') + ' (add new category)'
  ]);

  // Handle input changes
  const updateFormData = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle category selection
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setIsCategoryDropdownVisible(false);
    if (category === t('products.addProduct.category.createNew') + ' (add new category)') {
      setShowNewCategoryDialog(true);
      setNewCategoryName('');
    } else {
      updateFormData('category', category);
    }
  };

  // Handle image upload (placeholder functionality)
  const handleImageUpload = () => {
    Alert.alert(
      t('products.addProduct.image.upload'),
      t('products.addProduct.image.uploadMessage'),
      [
        { text: t('common.cancel'), style: 'cancel' },
        { text: t('products.addProduct.image.camera'), onPress: () => console.log('Camera') },
        { text: t('products.addProduct.image.gallery'), onPress: () => console.log('Gallery') }
      ]
    );
  };

  // Handle barcode scanner
  const handleBarcodeScanner = () => {
    Alert.alert(
      t('products.addProduct.barcode.scanner'),
      t('products.addProduct.barcode.scannerMessage'),
      [
        { text: t('common.cancel'), style: 'cancel' },
        { text: t('products.addProduct.barcode.generate'), onPress: () => generateBarcode() }
      ]
    );
  };

  // Generate random barcode
  const generateBarcode = () => {
    const barcode = Math.random().toString().slice(2, 15);
    updateFormData('barcode', barcode);
  };

  // Handle QR code generation
  const handleQRCode = () => {
    Alert.alert(
      t('products.addProduct.qrCode'),
      t('products.addProduct.qrCodeMessage'),
      [
        { text: t('common.cancel'), style: 'cancel' },
        { text: t('products.addProduct.qrCode.generate'), onPress: () => console.log('Generate QR') }
      ]
    );
  };

  // Handle save new category
  const handleSaveNewCategory = () => {
    if (!newCategoryName.trim()) {
      Alert.alert(t('common.error'), t('products.addProduct.category.categoryRequired'));
      return;
    }

    // Check if category already exists
    const existingCategories = categories.filter(cat =>
      cat !== t('products.addProduct.category.createNew') + ' (add new category)'
    );
    const categoryExists = existingCategories.some(cat =>
      cat.toLowerCase().trim() === newCategoryName.toLowerCase().trim()
    );

    if (categoryExists) {
      Alert.alert(t('common.error'), t('products.addProduct.category.categoryExists'));
      return;
    }

    // Add new category to the list
    const newCategories = [...existingCategories, newCategoryName.trim(), t('products.addProduct.category.createNew') + ' (add new category)'];
    setCategories(newCategories);
    
    // Select the new category
    setSelectedCategory(newCategoryName.trim());
    updateFormData('category', newCategoryName.trim());
    
    // Close dialog and show success message
    setShowNewCategoryDialog(false);
    Alert.alert(t('common.success'), t('products.addProduct.category.categoryAddedSuccess'));
  };

  // Handle cancel new category
  const handleCancelNewCategory = () => {
    setShowNewCategoryDialog(false);
    setNewCategoryName('');
  };

  // Validate form
  const validateForm = () => {
    if (!formData.name.trim()) {
      Alert.alert(t('common.error'), t('products.addProduct.validation.nameRequired'));
      return false;
    }
    if (!formData.description.trim()) {
      Alert.alert(t('common.error'), t('products.addProduct.validation.descriptionRequired'));
      return false;
    }
    if (!formData.costPrice || parseFloat(formData.costPrice) <= 0) {
      Alert.alert(t('common.error'), t('products.addProduct.validation.costPriceRequired'));
      return false;
    }
    if (!formData.salePrice || parseFloat(formData.salePrice) <= 0) {
      Alert.alert(t('common.error'), t('products.addProduct.validation.salePriceRequired'));
      return false;
    }
    if (!selectedCategory || selectedCategory === t('products.addProduct.category.placeholder')) {
      Alert.alert(t('common.error'), t('products.addProduct.validation.categoryRequired'));
      return false;
    }
    return true;
  };

  // Handle save product
  const handleSaveProduct = () => {
    if (!validateForm()) return;

    const productData = {
      ...formData,
      category: selectedCategory,
      costPrice: parseFloat(formData.costPrice),
      salePrice: parseFloat(formData.salePrice),
      lowestSellPrice: parseFloat(formData.lowestSellPrice) || 0,
      openingQuantity: parseInt(formData.openingQuantity) || 0
    };

    console.log('Saving product:', productData);
    
    Alert.alert(
      t('common.success'),
      t('products.addProduct.successMessage'),
      [
        {
          text: 'OK',
          onPress: () => {
            // Navigate back to the appropriate screen based on source
            if (source === 'sales') {
              onBack('sales');
            } else if (source === 'purchase') {
              onBack('purchase');
            } else {
              onBack(); // Default to product-management
            }
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView style={[commonStyles.container, isRTL && { direction: 'rtl' }]}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={onBack} style={styles.backButton}>
            <MaterialIcons name="arrow-back" size={24} color={colors.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>
            {t('products.addProduct.title')}
          </Text>
        </View>
      </View>

      <ScrollView style={commonStyles.scrollView} contentContainerStyle={styles.content}>
        {/* Image Upload Section */}
        <TouchableOpacity style={styles.imageUploadSection} onPress={handleImageUpload}>
          <View style={styles.imageUploadContainer}>
            <View style={styles.imageUploadIcon}>
              <MaterialIcons name="photo-camera" size={32} color={colors.textSecondary} />
            </View>
            <View style={styles.imageUploadText}>
              <Text style={styles.imageUploadTitle}>
                {t('products.addProduct.image.title')}
              </Text>
              <Text style={styles.imageUploadSubtitle}>
                {t('products.addProduct.image.subtitle')}
              </Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* Product Name */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>
            {t('products.addProduct.name.label')}
          </Text>
          <TextInput
            style={styles.textInput}
            placeholder={t('products.addProduct.name.placeholder')}
            value={formData.name}
            onChangeText={(value) => updateFormData('name', value)}
            placeholderTextColor={colors.textSecondary}
          />
        </View>

        {/* Description */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>
            {t('products.addProduct.description.label')}
          </Text>
          <TextInput
            style={[styles.textInput, styles.descriptionInput]}
            placeholder={t('products.addProduct.description.placeholder')}
            value={formData.description}
            onChangeText={(value) => updateFormData('description', value)}
            placeholderTextColor={colors.textSecondary}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>

        {/* Price Fields Row */}
        <View style={styles.row}>
          {/* Cost Price */}
          <View style={styles.halfWidth}>
            <Text style={styles.inputLabel}>
              {t('products.addProduct.costPrice.label')}
            </Text>
            <TextInput
              style={styles.textInput}
              placeholder={t('products.addProduct.costPrice.placeholder')}
              value={formData.costPrice}
              onChangeText={(value) => updateFormData('costPrice', value)}
              placeholderTextColor={colors.textSecondary}
              keyboardType="numeric"
            />
          </View>

          {/* Sale Price */}
          <View style={styles.halfWidth}>
            <Text style={styles.inputLabel}>
              {t('products.addProduct.salePrice.label')}
            </Text>
            <TextInput
              style={styles.textInput}
              placeholder={t('products.addProduct.salePrice.placeholder')}
              value={formData.salePrice}
              onChangeText={(value) => updateFormData('salePrice', value)}
              placeholderTextColor={colors.textSecondary}
              keyboardType="numeric"
            />
          </View>
        </View>

        {/* Additional Price Fields Row */}
        <View style={styles.row}>
          {/* Lowest Sell Price */}
          <View style={styles.halfWidth}>
            <Text style={styles.inputLabel}>
              {t('products.addProduct.lowestSellPrice.label')}
            </Text>
            <TextInput
              style={styles.textInput}
              placeholder={t('products.addProduct.lowestSellPrice.placeholder')}
              value={formData.lowestSellPrice}
              onChangeText={(value) => updateFormData('lowestSellPrice', value)}
              placeholderTextColor={colors.textSecondary}
              keyboardType="numeric"
            />
          </View>

          {/* Opening Quantity */}
          <View style={styles.halfWidth}>
            <Text style={styles.inputLabel}>
              {t('products.addProduct.openingQuantity.label')}
            </Text>
            <TextInput
              style={styles.textInput}
              placeholder={t('products.addProduct.openingQuantity.placeholder')}
              value={formData.openingQuantity}
              onChangeText={(value) => updateFormData('openingQuantity', value)}
              placeholderTextColor={colors.textSecondary}
              keyboardType="numeric"
            />
          </View>
        </View>

        {/* Barcode Section */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>
            {t('products.addProduct.barcode.label')}
          </Text>
          <View style={styles.barcodeContainer}>
            <TextInput
              style={[styles.textInput, styles.barcodeInput]}
              placeholder={t('products.addProduct.barcode.placeholder')}
              value={formData.barcode}
              onChangeText={(value) => updateFormData('barcode', value)}
              placeholderTextColor={colors.textSecondary}
            />
            <TouchableOpacity 
              style={styles.barcodeScannerButton}
              onPress={handleBarcodeScanner}
            >
              <MaterialIcons name="qr-code-scanner" size={24} color={colors.primary} />
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.qrCodeButton}
              onPress={handleQRCode}
            >
              <MaterialIcons name="qr-code" size={24} color={colors.primary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Category Dropdown */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>
            {t('products.addProduct.category.label')}
          </Text>
          <Dropdown
            options={categories}
            selectedOption={selectedCategory}
            onOptionSelect={handleCategorySelect}
            isVisible={isCategoryDropdownVisible}
            onToggle={() => setIsCategoryDropdownVisible(!isCategoryDropdownVisible)}
            style={styles.categoryDropdown}
            containerStyle={styles.categoryDropdownContainer}
            maxDropdownHeight={240}
            dropdownOffset={{ x: 0, y: 8 }}
          />
        </View>
      </ScrollView>

      {/* New Category Dialog */}
      <Modal
        visible={showNewCategoryDialog}
        transparent={true}
        animationType="fade"
        onRequestClose={handleCancelNewCategory}
      >
        <View style={styles.dialogOverlay}>
          <View style={[styles.dialogContainer, isRTL && { direction: 'rtl' }]}>
            <Text style={styles.dialogTitle}>
              {t('products.addProduct.category.newCategory')}
            </Text>
            
            <TextInput
              style={styles.categoryInput}
              placeholder={t('products.addProduct.category.categoryNamePlaceholder')}
              value={newCategoryName}
              onChangeText={setNewCategoryName}
              autoFocus
              onSubmitEditing={handleSaveNewCategory}
              returnKeyType="done"
              placeholderTextColor={colors.textSecondary}
            />
            
            <View style={[styles.dialogButtons, isRTL && { flexDirection: 'row-reverse' }]}>
              <TouchableOpacity
                style={[styles.dialogButton, styles.cancelButton]}
                onPress={handleCancelNewCategory}
              >
                <Text style={styles.cancelButtonText}>
                  {t('common.cancel')}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.dialogButton, styles.saveButton]}
                onPress={handleSaveNewCategory}
              >
                <Text style={styles.saveButtonText}>
                  {t('common.save')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Save Button */}
      <View style={styles.saveButtonContainer}>
        <FlowButton
          text={t('products.addProduct.saveButton')}
          onPress={handleSaveProduct}
          variant="primary"
          size="large"
          style={styles.saveButton}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  backButton: {
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
  },
  content: {
    paddingBottom: 100, // Space for save button
    paddingHorizontal: 16,
  },
  imageUploadSection: {
    marginVertical: 16,
  },
  imageUploadContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
    paddingHorizontal: 24,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: colors.border,
    borderRadius: 12,
    backgroundColor: colors.card,
  },
  imageUploadIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.backgroundLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  imageUploadText: {
    alignItems: 'center',
  },
  imageUploadTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
    textAlign: 'center',
  },
  imageUploadSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  textInput: {
    height: 56,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    backgroundColor: colors.card,
    paddingHorizontal: 16,
    fontSize: 16,
    color: colors.text,
  },
  descriptionInput: {
    height: 120,
    paddingTop: 16,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  halfWidth: {
    flex: 1,
  },
  barcodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    backgroundColor: colors.card,
    overflow: 'hidden',
  },
  barcodeInput: {
    flex: 1,
    height: 56,
    borderWidth: 0,
    borderRadius: 0,
    backgroundColor: 'transparent',
  },
  barcodeScannerButton: {
    width: 56,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    borderLeftWidth: 1,
    borderLeftColor: colors.border,
    backgroundColor: colors.backgroundLight,
  },
  qrCodeButton: {
    width: 56,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    borderLeftWidth: 1,
    borderLeftColor: colors.border,
    backgroundColor: colors.backgroundLight,
  },
  categoryDropdown: {
    width: '100%',
  },
  categoryDropdownContainer: {
    width: '100%',
    zIndex: 100, // Ensure dropdown button is above form elements
  },
  saveButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    zIndex: 50, // Lower z-index than dropdown
  },
  saveButton: {
    width: '100%',
    height: 56,
  },
  // New Category Dialog Styles
  dialogOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dialogContainer: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 24,
    width: '80%',
    maxWidth: 400,
    boxShadow: '0px 2px 3.84px rgba(0, 0, 0, 0.25)',
    elevation: 5,
  },
  dialogTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 24,
  },
  categoryInput: {
    height: 56,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    backgroundColor: colors.background,
    paddingHorizontal: 16,
    fontSize: 16,
    color: colors.text,
    marginBottom: 24,
  },
  dialogButtons: {
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'flex-end',
  },
  dialogButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    minWidth: 80,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cancelButtonText: {
    color: colors.textSecondary,
    fontSize: 16,
    fontWeight: '600',
  },
  saveButton: {
    backgroundColor: colors.primary,
  },
  saveButtonText: {
    color: colors.textOnPrimary,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default AddProductScreen;
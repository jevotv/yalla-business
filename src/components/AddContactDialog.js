import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Modal, ScrollView, Alert, Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { commonStyles } from '../theme/styles';
import { textStyles } from '../theme/typography';
import { colors } from '../theme/colors';
import { useTranslation } from '../i18n/LanguageContext';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const AddContactDialog = ({ isVisible, onClose, onSave, contactType = 'customer' }) => {
  const { t } = useTranslation();
  const [type, setType] = useState(contactType);
  const [showDropdown, setShowDropdown] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ x: 0, y: 0, width: 0 });
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [maxDebt, setMaxDebt] = useState('');
  const [openingBalance, setOpeningBalance] = useState('');
  const dropdownButtonRef = useRef(null);

  const handleSave = () => {
    // Basic validation
    if (!name.trim()) {
      Alert.alert(t('common.error'), t('customer.nameRequired'));
      return;
    }

    const contactData = {
      type,
      name: name.trim(),
      phone: phone.trim(),
      address: address.trim(),
      maxDebt: maxDebt ? parseFloat(maxDebt) : 0,
      openingBalance: openingBalance ? parseFloat(openingBalance) : 0,
    };

    onSave(contactData);
  };

  const handleCancel = () => {
    // Reset form fields
    setName('');
    setPhone('');
    setAddress('');
    setMaxDebt('');
    setOpeningBalance('');
    setType(contactType);
    setShowDropdown(false);
    onClose();
  };

  const contactTypes = [
    { key: 'customer', label: t('common.customer') },
    { key: 'vendor', label: t('common.vendor') },
  ];

  const handleTypeSelect = (selectedType) => {
    setType(selectedType);
    setShowDropdown(false);
  };

  const toggleDropdown = () => {
    if (showDropdown) {
      setShowDropdown(false);
    } else {
      // Measure the dropdown button position
      dropdownButtonRef.current?.measure((x, y, width, height, pageX, pageY) => {
        setDropdownPosition({
          x: pageX,
          y: pageY + height + 4,
          width: width
        });
      });
      setShowDropdown(true);
    }
  };

  const closeDropdown = () => {
    setShowDropdown(false);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={handleCancel}
    >
      <View style={styles.modalOverlay}>
        <TouchableOpacity
          style={styles.modalOverlayTouchable}
          activeOpacity={1}
          onPress={handleCancel}
        >
          <View style={styles.dialogContainer}>
            {/* Header */}
            <View style={styles.header}>
              <TouchableOpacity style={styles.backButton} onPress={handleCancel}>
                <MaterialIcons name="arrow-back" size={24} color="#111318" />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>
                {t('customer.addNewContact')}
              </Text>
              <View style={styles.headerSpacer} />
            </View>

            {/* Form Content */}
            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
              <View style={styles.formGroup}>
                <Text style={textStyles.label}>{t('customer.type')}</Text>
                <View style={styles.dropdownContainer}>
                  <TouchableOpacity
                    ref={dropdownButtonRef}
                    style={styles.dropdownButton}
                    onPress={toggleDropdown}
                    activeOpacity={1}
                  >
                    <Text style={styles.dropdownText}>
                      {type === 'customer' ? t('common.customer') : t('common.vendor')}
                    </Text>
                    <MaterialIcons
                      name={showDropdown ? "expand-less" : "expand-more"}
                      size={20}
                      color="#616f89"
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.formGroup}>
                <Text style={textStyles.label}>{t('customer.name')}</Text>
                <TextInput
                  style={styles.input}
                  value={name}
                  onChangeText={setName}
                  placeholder={t('customer.namePlaceholder')}
                  placeholderTextColor="#9ca3af"
                />
              </View>

              <View style={styles.formGroup}>
                <Text style={textStyles.label}>{t('customer.phone')}</Text>
                <TextInput
                  style={styles.input}
                  value={phone}
                  onChangeText={setPhone}
                  placeholder={t('customer.phonePlaceholder')}
                  placeholderTextColor="#9ca3af"
                  keyboardType="phone-pad"
                />
              </View>

              <View style={styles.formGroup}>
                <Text style={textStyles.label}>{t('customer.address')}</Text>
                <TextInput
                  style={[styles.input, styles.textArea]}
                  value={address}
                  onChangeText={setAddress}
                  placeholder={t('customer.addressPlaceholder')}
                  placeholderTextColor="#9ca3af"
                  multiline={true}
                  numberOfLines={4}
                />
              </View>

              <View style={styles.divider} />

              <View style={styles.financialSection}>
                <Text style={textStyles.h3}>{t('customer.financialDetails')}</Text>
                
                <View style={styles.financialGrid}>
                  <View style={styles.financialFormGroup}>
                    <Text style={textStyles.label}>{t('customer.maxDebt')}</Text>
                    <TextInput
                      style={styles.input}
                      value={maxDebt}
                      onChangeText={setMaxDebt}
                      placeholder={t('customer.maxDebtPlaceholder')}
                      placeholderTextColor="#9ca3af"
                      keyboardType="numeric"
                    />
                  </View>

                  <View style={styles.financialFormGroup}>
                    <Text style={textStyles.label}>{t('customer.openingBalance')}</Text>
                    <TextInput
                      style={styles.input}
                      value={openingBalance}
                      onChangeText={setOpeningBalance}
                      placeholder={t('customer.openingBalancePlaceholder')}
                      placeholderTextColor="#9ca3af"
                      keyboardType="numeric"
                    />
                  </View>
                </View>
              </View>
            </ScrollView>

            {/* Footer with Save Button */}
            <View style={styles.footer}>
              <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.saveButtonText}>{t('common.save')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </View>

      {/* Modal-style Contact Type Dropdown Overlay */}
      <Modal
        visible={showDropdown}
        transparent={true}
        animationType="none"
        statusBarTranslucent={true}
        onRequestClose={closeDropdown}
      >
        {/* Full Screen Backdrop */}
        <TouchableOpacity 
          style={styles.typeModalOverlay} 
          activeOpacity={1}
          onPress={closeDropdown}
        >
          {/* Dropdown positioned absolutely */}
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
            {contactTypes.map((contactType) => (
              <TouchableOpacity
                key={contactType.key}
                style={[
                  styles.typeModalDropdownItem,
                  type === contactType.key && styles.typeModalDropdownItemSelected
                ]}
                onPress={() => handleTypeSelect(contactType.key)}
              >
                <Text
                  style={[
                    styles.typeModalDropdownItemText,
                    type === contactType.key && styles.typeModalDropdownItemTextSelected
                  ]}
                >
                  {contactType.label}
                </Text>
                {type === contactType.key && (
                  <MaterialIcons name="check" size={16} color="#135bec" />
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
  modalOverlayTouchable: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dialogContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    width: '90%',
    maxHeight: '85%',
    flexDirection: 'column',
    elevation: 5,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
    maxWidth: 400,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111318',
  },
  headerSpacer: {
    width: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  formGroup: {
    marginBottom: 20,
  },
  dropdownContainer: {
    position: 'relative',
    marginTop: 8,
  },
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f6f6f8',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: '#dbdfe6',
  },
  dropdownText: {
    fontSize: 16,
    color: '#111318',
    flex: 1,
  },
  // Modal overlay styles for type dropdown
  typeModalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    zIndex: 999999, // Ensure this is above everything
  },
  typeModalDropdown: {
    position: 'absolute',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#dbdfe6',
    boxShadow: '0px 6px 16px rgba(0, 0, 0, 0.4)',
    elevation: 100, // Maximum elevation for mobile
    zIndex: 1000000, // Higher than overlay
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
    borderBottomColor: '#ffffff',
  },
  typeModalDropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  typeModalDropdownItemSelected: {
    backgroundColor: '#f0f8ff',
  },
  typeModalDropdownItemText: {
    fontSize: 16,
    color: '#111318',
    flex: 1,
  },
  typeModalDropdownItemTextSelected: {
    color: '#135bec',
    fontWeight: '500',
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: '#dbdfe6',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 14,
    fontSize: 16,
    color: '#111318',
    marginTop: 8,
    backgroundColor: '#ffffff',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
    paddingTop: 12,
  },
  divider: {
    height: 1,
    backgroundColor: '#f3f4f6',
    marginVertical: 20,
  },
  financialSection: {
    marginTop: 16,
  },
  financialGrid: {
    flexDirection: 'row',
    gap: 16,
  },
  financialFormGroup: {
    flex: 1,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
  },
  saveButton: {
    backgroundColor: '#135bec',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    elevation: 2,
    boxShadow: '0px 2px 4px rgba(19, 91, 236, 0.2)',
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
});

export default AddContactDialog;
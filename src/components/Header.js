import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { iconSizes, iconColors } from '../constants/icons';
import { commonStyles } from '../theme/styles';
import { textStyles } from '../theme/typography';
import { useTranslation } from '../i18n/LanguageContext';
import { useTranslatedData } from '../i18n/translationUtils';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const Header = ({ onMenuPress, onHomePress }) => {
  const { t, currentLanguage, changeLanguage } = useTranslation();
  const { getTranslatedUserData } = useTranslatedData();
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ x: 0, y: 0 });

  const languages = [
    { code: 'en', name: 'EN', flag: '🇺🇸' },
    { code: 'ar', name: 'AR', flag: '🇸🇦' }
  ];

  const currentLanguageData = languages.find(lang => lang.code === currentLanguage);
  const userData = getTranslatedUserData();

  const handleLanguageSelect = async (languageCode) => {
    console.log('🗣️ Header: Language selected:', languageCode, 'Current:', currentLanguage);
    console.log('🗣️ Header: changeLanguage function available:', typeof changeLanguage);
    
    try {
      // Always call changeLanguage to ensure it works even if language appears the same
      console.log('🗣️ Header: About to call changeLanguage with:', languageCode);
      await changeLanguage(languageCode);
      console.log('✅ Header: Language change completed successfully');
    } catch (error) {
      console.error('❌ Header: Language change failed:', error);
    } finally {
      // Always close the dropdown
      setShowLanguageDropdown(false);
      console.log('🔒 Header: Dropdown closed');
    }
  };

  const toggleLanguageDropdown = (event) => {
    if (event) {
      // Get the position of the language selector
      event.currentTarget.measure((x, y, width, height, pageX, pageY) => {
        setDropdownPosition({
          x: pageX + width - 120, // Position dropdown to align right edge
          y: pageY + height + 8   // Position below the selector
        });
      });
    }
    setShowLanguageDropdown(!showLanguageDropdown);
  };

  const closeDropdown = () => {
    setShowLanguageDropdown(false);
  };

  return (
    <>
      <View style={commonStyles.header}>
        <View style={commonStyles.headerContent}>
          <View style={commonStyles.headerLeft}>
            <TouchableOpacity style={commonStyles.iconButton} onPress={onMenuPress}>
              <MaterialIcons
                name="menu"
                size={iconSizes.regular}
                color={iconColors.secondary}
              />
            </TouchableOpacity>
            <Text style={commonStyles.headerTitle}>
              {t('dashboard.goodMorning', { name: 'Alex' })}
            </Text>
            {onHomePress && (
              <TouchableOpacity style={styles.homeButton} onPress={onHomePress}>
                <MaterialIcons
                  name="home"
                  size={iconSizes.regular}
                  color={iconColors.secondary}
                />
              </TouchableOpacity>
            )}
          </View>
          
          {/* Language Selector */}
          <View style={styles.languageContainer}>
            <TouchableOpacity
              ref={(ref) => {
                if (ref && showLanguageDropdown) {
                  ref.measure((x, y, width, height, pageX, pageY) => {
                    setDropdownPosition({
                      x: pageX + width - 120,
                      y: pageY + height + 8
                    });
                  });
                }
              }}
              style={styles.languageSelector}
              onPress={toggleLanguageDropdown}
            >
              <Text style={styles.languageFlag}>{currentLanguageData?.flag}</Text>
              <Text style={styles.languageCode}>{currentLanguageData?.name}</Text>
              <MaterialIcons
                name="expand-more"
                size={16}
                color={iconColors.secondary}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Modal-style Language Dropdown Overlay */}
      <Modal
        visible={showLanguageDropdown}
        transparent={true}
        animationType="none"
        statusBarTranslucent={true}
        onRequestClose={closeDropdown}
      >
        {/* Full Screen Backdrop */}
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={closeDropdown}
        >
          {/* Dropdown positioned absolutely */}
          <View
            style={[
              styles.modalDropdown,
              {
                left: dropdownPosition.x,
                top: dropdownPosition.y,
              }
            ]}
          >
            <View style={styles.dropdownArrow} />
            {languages.map((language) => (
              <TouchableOpacity
                key={language.code}
                style={[
                  styles.modalLanguageOption,
                  currentLanguage === language.code && styles.modalLanguageOptionActive
                ]}
                onPress={() => handleLanguageSelect(language.code)}
              >
                <Text style={styles.modalLanguageFlag}>{language.flag}</Text>
                <Text style={[
                  styles.modalLanguageName,
                  currentLanguage === language.code && styles.modalLanguageNameActive
                ]}>
                  {language.name}
                </Text>
                {currentLanguage === language.code && (
                  <MaterialIcons
                    name="check"
                    size={16}
                    color={iconColors.primary}
                  />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  languageContainer: {
    position: 'relative',
  },
  languageSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
    minWidth: 60,
  },
  languageFlag: {
    fontSize: 16,
  },
  languageCode: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6b7280',
  },
  // Modal overlay styles
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    zIndex: 999999, // Ensure this is above everything
  },
  modalDropdown: {
    position: 'absolute',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    boxShadow: '0px 6px 16px rgba(0, 0, 0, 0.4)',
    elevation: 100, // Maximum elevation for mobile
    minWidth: 120,
    zIndex: 1000000, // Higher than overlay
  },
  dropdownArrow: {
    position: 'absolute',
    top: -8,
    right: 16,
    width: 0,
    height: 0,
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderBottomWidth: 8,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#ffffff',
  },
  modalLanguageOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  modalLanguageOptionActive: {
    backgroundColor: '#f0f8ff',
  },
  modalLanguageFlag: {
    fontSize: 16,
  },
  modalLanguageName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111318',
    flex: 1,
  },
  modalLanguageNameActive: {
    color: iconColors.primary,
  },
  homeButton: {
    marginLeft: 8,
    padding: 4,
  },
});

export default Header;
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  Modal, 
  Animated,
  Dimensions
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useLanguage, SUPPORTED_LANGUAGES } from '../i18n/LanguageContext';

const { width: screenWidth } = Dimensions.get('window');

const LanguageSwitcher = ({ 
  style,
  iconSize = 20,
  iconColor = '#616f89',
  showLabels = false,
  position = 'bottom-right' // 'bottom-right', 'top-right', 'bottom-left', 'top-left'
}) => {
  const { 
    currentLanguage, 
    changeLanguage, 
    toggleLanguage, 
    getLanguageName, 
    isLoading 
  } = useLanguage();
  
  const [showDropdown, setShowDropdown] = useState(false);
  const [slideAnim] = useState(new Animated.Value(-100));

  const languages = [
    { code: SUPPORTED_LANGUAGES.EN, name: 'English', flag: '🇺🇸' },
    { code: SUPPORTED_LANGUAGES.AR, name: 'العربية', flag: '🇸🇦' }
  ];

  const currentLanguageData = languages.find(lang => lang.code === currentLanguage);

  const handleLanguageSelect = async (languageCode) => {
    if (languageCode !== currentLanguage) {
      await changeLanguage(languageCode);
    }
    setShowDropdown(false);
  };

  const toggleDropdown = () => {
    if (showDropdown) {
      Animated.timing(slideAnim, {
        toValue: -100,
        duration: 200,
        useNativeDriver: true,
      }).start(() => setShowDropdown(false));
    } else {
      setShowDropdown(true);
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  };

  // Get position styles
  const getPositionStyles = () => {
    switch (position) {
      case 'top-right':
        return { top: 60, right: 16 };
      case 'bottom-left':
        return { bottom: 100, left: 16 };
      case 'top-left':
        return { top: 60, left: 16 };
      default: // 'bottom-right'
        return { bottom: 100, right: 16 };
    }
  };

  const positionStyles = getPositionStyles();

  return (
    <View style={[styles.container, positionStyles, style]}>
      {/* Main Switcher Button */}
      <TouchableOpacity
        style={[
          styles.switcherButton,
          showDropdown && styles.switcherButtonActive
        ]}
        onPress={toggleDropdown}
        disabled={isLoading}
      >
        {isLoading ? (
          <Animated.View style={styles.loadingContainer}>
            <MaterialIcons 
              name="cached" 
              size={iconSize} 
              color={iconColor} 
            />
          </Animated.View>
        ) : (
          <>
            {showLabels && (
              <Text style={[styles.languageLabel, { color: iconColor }]}>
                {getLanguageName()}
              </Text>
            )}
            <MaterialIcons 
              name="language" 
              size={iconSize} 
              color={iconColor} 
            />
            <MaterialIcons 
              name="expand-more" 
              size={16} 
              color={iconColor} 
            />
          </>
        )}
      </TouchableOpacity>

      {/* Dropdown Menu */}
      {showDropdown && (
        <View style={styles.dropdownContainer}>
          <Animated.View 
            style={[
              styles.dropdown,
              {
                transform: [{ translateY: slideAnim }],
                opacity: showDropdown ? 1 : 0,
              }
            ]}
          >
            <View style={styles.dropdownHeader}>
              <Text style={styles.dropdownTitle}>Select Language</Text>
              <TouchableOpacity 
                onPress={toggleDropdown}
                style={styles.closeButton}
              >
                <MaterialIcons name="close" size={20} color="#616f89" />
              </TouchableOpacity>
            </View>
            
            {languages.map((language) => (
              <TouchableOpacity
                key={language.code}
                style={[
                  styles.languageOption,
                  currentLanguage === language.code && styles.languageOptionActive
                ]}
                onPress={() => handleLanguageSelect(language.code)}
              >
                <View style={styles.languageOptionContent}>
                  <Text style={styles.languageFlag}>{language.flag}</Text>
                  <View style={styles.languageInfo}>
                    <Text style={[
                      styles.languageName,
                      currentLanguage === language.code && styles.languageNameActive
                    ]}>
                      {language.name}
                    </Text>
                    <Text style={styles.languageCode}>
                      {language.code.toUpperCase()}
                    </Text>
                  </View>
                  {currentLanguage === language.code && (
                    <MaterialIcons 
                      name="check" 
                      size={20} 
                      color="#135bec" 
                    />
                  )}
                </View>
              </TouchableOpacity>
            ))}
            
            <TouchableOpacity
              style={styles.toggleButton}
              onPress={() => {
                toggleLanguage();
                setShowDropdown(false);
              }}
            >
              <MaterialIcons name="swap-horiz" size={20} color="#135bec" />
              <Text style={styles.toggleButtonText}>
                Quick Switch ({currentLanguage === 'en' ? 'AR' : 'EN'})
              </Text>
            </TouchableOpacity>
          </Animated.View>
          
          {/* Backdrop */}
          <TouchableOpacity 
            style={styles.backdrop} 
            onPress={toggleDropdown}
            activeOpacity={0}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 1000,
  },
  switcherButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    elevation: 3,
    gap: 4,
  },
  switcherButtonActive: {
    backgroundColor: '#f3f4f6',
  },
  loadingContainer: {
    paddingHorizontal: 4,
  },
  languageLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  dropdownContainer: {
    position: 'absolute',
    bottom: 50,
    right: 0,
  },
  dropdown: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingVertical: 8,
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.15)',
    elevation: 8,
    width: 250,
  },
  dropdownHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
    marginBottom: 8,
  },
  dropdownTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111318',
  },
  closeButton: {
    padding: 4,
  },
  languageOption: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  languageOptionActive: {
    backgroundColor: '#f0f8ff',
  },
  languageOptionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  languageFlag: {
    fontSize: 24,
  },
  languageInfo: {
    flex: 1,
  },
  languageName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111318',
    marginBottom: 2,
  },
  languageNameActive: {
    color: '#135bec',
  },
  languageCode: {
    fontSize: 12,
    color: '#6b7280',
  },
  toggleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 8,
    marginHorizontal: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#f0f8ff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e6f3ff',
  },
  toggleButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#135bec',
  },
  backdrop: {
    position: 'absolute',
    top: -1000,
    left: -1000,
    right: -1000,
    bottom: -1000,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
});

export default LanguageSwitcher;
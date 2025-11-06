import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import i18n from '../i18n';

// Create the context
const LanguageContext = createContext();

// localStorage helper for web/mobile compatibility
const storage = {
  get: (key) => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        return window.localStorage.getItem(key);
      }
      return null;
    } catch (error) {
      console.warn('Failed to get localStorage:', error);
      return null;
    }
  },
  set: (key, value) => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem(key, value);
      }
    } catch (error) {
      console.warn('Failed to set localStorage:', error);
    }
  }
};

// Supported languages
export const SUPPORTED_LANGUAGES = {
  EN: 'en',
  AR: 'ar',
};

const LANGUAGE_NAMES = {
  en: 'English',
  ar: 'العربية',
};

// Language Provider Component
export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);
  const [isLoading, setIsLoading] = useState(false);

  // Change language function - defined first to avoid dependency issues
  const changeLanguage = useCallback(async (newLanguage) => {
    console.log('🗣️ Changing language from', currentLanguage, 'to', newLanguage);
    setIsLoading(true);
    try {
      // Save to localStorage
      storage.set('language', newLanguage);
      console.log('💾 Language saved to localStorage:', newLanguage);
      
      // Change i18n language
      await i18n.changeLanguage(newLanguage);
      setCurrentLanguage(newLanguage);
      console.log('✅ Language changed successfully to:', newLanguage);
    } catch (error) {
      console.error('❌ Failed to change language:', error);
    } finally {
      setIsLoading(false);
    }
  }, [currentLanguage]);

  // Initialize language from localStorage on mount
  useEffect(() => {
    const savedLanguage = storage.get('language');
    console.log('🔍 Initial language check - saved:', savedLanguage, 'current i18n:', i18n.language);
    if (savedLanguage && savedLanguage !== i18n.language) {
      console.log('📋 Loading saved language:', savedLanguage);
      changeLanguage(savedLanguage);
    }
  }, [changeLanguage]);

  // Listen for language changes
  useEffect(() => {
    const handleLanguageChanged = (lng) => {
      console.log('🔄 i18n language changed to:', lng);
      setCurrentLanguage(lng);
    };

    i18n.on('languageChanged', handleLanguageChanged);

    return () => {
      i18n.off('languageChanged', handleLanguageChanged);
    };
  }, []);

  // Toggle between languages
  const toggleLanguage = () => {
    const newLanguage = currentLanguage === SUPPORTED_LANGUAGES.EN 
      ? SUPPORTED_LANGUAGES.AR 
      : SUPPORTED_LANGUAGES.EN;
    changeLanguage(newLanguage);
  };

  // Get language name
  const getLanguageName = (lang = currentLanguage) => {
    return LANGUAGE_NAMES[lang] || LANGUAGE_NAMES.en;
  };

  // Check if RTL language
  const isRTL = currentLanguage === SUPPORTED_LANGUAGES.AR;

  // Context value
  const value = {
    currentLanguage,
    isLoading,
    changeLanguage,
    toggleLanguage,
    getLanguageName,
    isRTL,
    supportedLanguages: Object.values(SUPPORTED_LANGUAGES),
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use language context
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// Custom hook for translations (extends react-i18next useTranslation)
export const useTranslation = () => {
  const { currentLanguage, isRTL, changeLanguage } = useLanguage();
  
  // Import i18n instance directly from the main i18n file to ensure consistency
  const i18nextInstance = require('./index').default;
  
  // Enhanced translation function using the i18next instance directly
  const t = (key, options = {}) => {
    try {
      return i18nextInstance.t(key, options);
    } catch (error) {
      console.error('❌ Translation error for key:', key, error);
      return key; // Fallback to key name if translation fails
    }
  };

  return {
    t,
    i18n: i18nextInstance,
    currentLanguage,
    isRTL,
    changeLanguage // This is the key fix - we need to return the changeLanguage function
  };
};

export default LanguageContext;
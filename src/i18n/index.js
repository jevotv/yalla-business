import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';

// Import translation files
import en from './translations/en.json';
import ar from './translations/ar.json';

// Define supported languages
const supportedLanguages = ['en', 'ar'];

// Get device language, fallback to English
const getDeviceLanguage = () => {
  try {
    const deviceLocale = Localization.getLocales()[0]?.languageCode || 'en';
    return supportedLanguages.includes(deviceLocale) ? deviceLocale : 'en';
  } catch (error) {
    console.warn('Failed to get device language:', error);
    return 'en';
  }
};

// Translation resources
const resources = {
  en: {
    translation: en
  },
  ar: {
    translation: ar
  }
};

// Initialize i18next
const initializeI18n = () => {
  try {
    i18n
      .use(initReactI18next)
      .init({
        resources,
        lng: getDeviceLanguage(), // Set initial language based on device
        fallbackLng: 'en',
        supportedLngs: supportedLanguages,
        
        interpolation: {
          escapeValue: false, // React already does escaping
        },
        
        // Optional: Add namespace support
        defaultNS: 'translation',
        ns: ['translation'],
        
        // Debug mode for development
        debug: false,
        
        // Detection options
        detection: {
          order: ['localStorage', 'navigator'],
          lookupLocalStorage: 'language',
          caches: ['localStorage'],
        },
      });
  } catch (error) {
    console.warn('Failed to initialize i18n:', error);
  }

  return i18n;
};

// Initialize i18n immediately
try {
  initializeI18n();
} catch (error) {
  console.warn('i18n initialization failed:', error);
}

export default i18n;
export const colors = {
  // Primary colors
  primary: '#135bec',
  primaryLight: '#135bec20',
  
  // Background colors
  background: '#f6f6f8',
  backgroundLight: '#ffffff',
  
  // Text colors
  text: '#111318',
  textSecondary: '#616f89',
  textLight: '#ffffff',
  
  // Card colors
  card: '#ffffff',
  cardBorder: '#dbdfe6',
  
  // Status colors
  success: '#7ED321',
  successLight: '#7ED32120',
  error: '#D0021B',
  errorLight: '#D0021B20',
  
  // Button colors
  buttonPrimary: '#135bec',
  buttonSecondary: '#ffffff',
  buttonText: '#111318',
  buttonSecondaryText: '#616f89',
  
  // Border colors
  border: '#dbdfe6',
  borderLight: '#f6f6f8',
  
  // Icon colors
  icon: '#616f89',
  iconActive: '#135bec',
  iconWhite: '#ffffff',
  
  // Navigation colors
  navBackground: '#ffffff',
  navBorder: '#dbdfe6',
  navText: '#616f89',
  
  // Light/Dark mode support
  light: {
    primary: '#135bec',
    background: '#f6f6f8',
    text: '#111318',
    textSecondary: '#616f89',
    card: '#ffffff',
    border: '#dbdfe6',
    success: '#7ED321',
    error: '#D0021B',
  },
  
  dark: {
    primary: '#4A90E2',
    background: '#1a1a1a',
    text: '#ffffff',
    textSecondary: '#cccccc',
    card: '#2a2a2a',
    border: '#444444',
    success: '#7ED321',
    error: '#D0021B',
  }
};

// Helper function to get theme-aware colors
export const getThemeColors = (isDark = false) => {
  return isDark ? colors.dark : colors.light;
};
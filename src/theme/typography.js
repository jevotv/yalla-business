import { StyleSheet } from 'react-native';

export const typography = {
  // Font families
  fontFamily: {
    regular: 'System',
    medium: 'System',
    bold: 'System',
  },

  // Font sizes
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 28,
    '4xl': 32,
  },

  // Font weights
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
  },

  // Line heights
  lineHeight: {
    tight: 1.2,
    normal: 1.4,
    relaxed: 1.6,
  },

  // Letter spacing
  letterSpacing: {
    tight: -0.5,
    normal: 0,
    wide: 0.5,
  },
};

// Typography text styles based on the app's design
export const textStyles = StyleSheet.create({
  // Header styles
  h1: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: '#111318',
    lineHeight: typography.fontSize.xl * typography.lineHeight.tight,
  },
  
  h2: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: '#111318',
    lineHeight: typography.fontSize.lg * typography.lineHeight.tight,
  },
  
  h3: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.bold,
    color: '#111318',
    lineHeight: typography.fontSize.base * typography.lineHeight.tight,
  },

  // Body text styles
  bodyLarge: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.normal,
    color: '#111318',
    lineHeight: typography.fontSize.base * typography.lineHeight.normal,
  },
  
  body: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.normal,
    color: '#111318',
    lineHeight: typography.fontSize.sm * typography.lineHeight.normal,
  },
  
  bodySmall: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.normal,
    color: '#111318',
    lineHeight: typography.fontSize.xs * typography.lineHeight.normal,
  },

  // Label and caption styles
  label: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    color: '#111318',
    lineHeight: typography.fontSize.sm * typography.lineHeight.normal,
  },
  
  caption: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.normal,
    color: '#616f89',
    lineHeight: typography.fontSize.xs * typography.lineHeight.normal,
  },

  // Value styles
  valueLarge: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.bold,
    color: '#111318',
    lineHeight: typography.fontSize['2xl'] * typography.lineHeight.tight,
  },
  
  value: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: '#111318',
    lineHeight: typography.fontSize.lg * typography.lineHeight.tight,
  },

  // Secondary text styles
  secondary: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.normal,
    color: '#616f89',
    lineHeight: typography.fontSize.sm * typography.lineHeight.normal,
  },
  
  secondarySmall: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.normal,
    color: '#616f89',
    lineHeight: typography.fontSize.xs * typography.lineHeight.normal,
  },

  // Navigation styles
  nav: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.medium,
    color: '#616f89',
    lineHeight: typography.fontSize.xs * typography.lineHeight.normal,
  },

  // Button styles
  button: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    color: '#111318',
    lineHeight: typography.fontSize.sm * typography.lineHeight.normal,
  },
  
  buttonLarge: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.medium,
    color: '#111318',
    lineHeight: typography.fontSize.base * typography.lineHeight.normal,
  },

  // Change/percentage styles
  changePositive: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    color: '#7ED321',
    lineHeight: typography.fontSize.sm * typography.lineHeight.normal,
  },
  
  changeNegative: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    color: '#D0021B',
    lineHeight: typography.fontSize.sm * typography.lineHeight.normal,
  },

  // Percentage styles
  percentage: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    color: '#616f89',
    lineHeight: typography.fontSize.sm * typography.lineHeight.normal,
  },

  // Dropdown styles
  dropdown: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.normal,
    color: '#111318',
    lineHeight: typography.fontSize.sm * typography.lineHeight.normal,
  },
  
  dropdownSelected: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    color: '#135bec',
    lineHeight: typography.fontSize.sm * typography.lineHeight.normal,
  },
});

// Helper function to get text style by name
export const getTextStyle = (styleName) => {
  return textStyles[styleName] || textStyles.body;
};

// Export all typography constants for easy access
export const {
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
  letterSpacing,
} = typography;
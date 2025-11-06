export const iconSizes = {
  small: 16,
  medium: 20,
  regular: 24,
  large: 32,
  extraLarge: 40,
};

export const iconColors = {
  primary: '#135bec',
  secondary: '#616f89',
  text: '#111318',
  textSecondary: '#616f89',
  white: '#ffffff',
  success: '#7ED321',
  error: '#D0021B',
};

export const iconMappings = {
  // Navigation icons
  menu: 'menu',
  home: 'home',
  
  // Dashboard icons
  analytics: 'analytics',
  'shopping-cart': 'shopping-cart',
  'inventory-2': 'inventory-2',
  group: 'group',
  'account-balance-wallet': 'account-balance-wallet',
  'bar-chart': 'bar-chart',
  'assignment-return': 'assignment-return',
  language: 'language',
  
  // Activity icons
  'receipt-long': 'receipt-long',
  warning: 'warning',
  payments: 'payments',
  
  // Navigation icons
  'call-received': 'call-received',
  'smart-toy': 'smart-toy',
  
  // UI icons
  'expand-more': 'expand-more',
  'chevron-right': 'chevron-right',
};

// Helper function to get icon color based on type
export const getIconColor = (type, customColor = null) => {
  if (customColor) return customColor;
  
  switch (type) {
    case 'primary':
      return iconColors.primary;
    case 'secondary':
      return iconColors.secondary;
    case 'success':
      return iconColors.success;
    case 'error':
      return iconColors.error;
    case 'white':
      return iconColors.white;
    default:
      return iconColors.secondary;
  }
};

// Helper function to get icon size based on context
export const getIconSize = (context) => {
  switch (context) {
    case 'small':
      return iconSizes.small;
    case 'medium':
      return iconSizes.medium;
    case 'large':
      return iconSizes.large;
    case 'extraLarge':
      return iconSizes.extraLarge;
    default:
      return iconSizes.regular;
  }
};

// MaterialIcons configuration
export const materialIconsConfig = {
  defaultProps: {
    family: 'MaterialIcons',
    color: iconColors.secondary,
    size: iconSizes.regular,
  },
  
  navigation: {
    size: iconSizes.regular,
    color: iconColors.secondary,
  },
  
  header: {
    size: iconSizes.regular,
    color: iconColors.secondary,
  },
  
  card: {
    size: iconSizes.regular,
    color: iconColors.primary,
  },
  
  activity: {
    size: iconSizes.medium,
    color: iconColors.white,
  },
  
  button: {
    size: iconSizes.medium,
    color: iconColors.white,
  },
  
  fab: {
    size: iconSizes.large,
    color: iconColors.white,
  },
  
  dropdown: {
    size: iconSizes.small,
    color: iconColors.secondary,
  },
};
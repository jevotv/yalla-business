# Theme System Documentation

The Yalla Business app uses a comprehensive, centralized theme system that provides consistent styling across all components and screens.

## 📁 Theme Structure

```
src/theme/
├── colors.js      # Color palette and theme management
├── typography.js  # Typography system and text styles
└── styles.js      # Common styles and utility functions
```

## 🎨 Colors (`colors.js`)

### Color Palette

The app uses a carefully designed color system with semantic naming and theme support.

#### Primary Colors
```javascript
colors.primary        // #135bec - Main brand color
colors.primaryLight   // #135bec20 - Light primary for backgrounds
```

#### Background Colors
```javascript
colors.background     // #f6f6f8 - Main background
colors.backgroundLight // #ffffff - Card backgrounds
```

#### Text Colors
```javascript
colors.text           // #111318 - Primary text
colors.textSecondary  // #616f89 - Secondary text
colors.textLight      // #ffffff - Light text on dark backgrounds
```

#### Status Colors
```javascript
colors.success        // #7ED321 - Positive indicators
colors.successLight   // #7ED32120 - Success backgrounds
colors.error          // #D0021B - Error indicators
colors.errorLight     // #D0021B20 - Error backgrounds
```

#### Border and Card Colors
```javascript
colors.border         // #dbdfe6 - Default borders
colors.borderLight    // #f6f6f8 - Light borders
colors.card           // #ffffff - Card backgrounds
colors.cardBorder     // #dbdfe6 - Card borders
```

### Theme Support

The color system includes built-in support for light and dark themes:

```javascript
colors.light = {
  primary: '#135bec',
  background: '#f6f6f8',
  text: '#111318',
  // ... other light theme colors
}

colors.dark = {
  primary: '#4A90E2',
  background: '#1a1a1a',
  text: '#ffffff',
  // ... other dark theme colors
}
```

#### Theme Helper Function
```javascript
import { getThemeColors } from './colors';

// Get colors for current theme
const themeColors = getThemeColors(isDarkMode);
```

## 📝 Typography (`typography.js`)

### Font System

The typography system provides consistent text styling across the app.

#### Font Families
```javascript
typography.fontFamily = {
  regular: 'System',
  medium: 'System',
  bold: 'System',
}
```

#### Font Sizes
```javascript
typography.fontSize = {
  xs: 12,    // Small captions
  sm: 14,    // Body text, labels
  base: 16,  // Default body text
  lg: 18,    // Large body text
  xl: 20,    // Small headers
  '2xl': 24, // Headers
  '3xl': 28, // Large headers
  '4xl': 32, // Extra large headers
}
```

#### Font Weights
```javascript
typography.fontWeight = {
  normal: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
  extrabold: '800',
}
```

### Text Styles

Predefined text styles for consistent typography:

#### Headers
```javascript
textStyles.h1    // Large headers (20px, bold)
textStyles.h2    // Medium headers (18px, bold)
textStyles.h3    // Small headers (16px, bold)
```

#### Body Text
```javascript
textStyles.bodyLarge    // Large body text (16px, normal)
textStyles.body         // Standard body text (14px, normal)
textStyles.bodySmall    // Small body text (12px, normal)
```

#### Labels and Captions
```javascript
textStyles.label        // Form labels (14px, medium)
textStyles.caption      // Captions (12px, normal)
textStyles.secondary    // Secondary text (14px, normal, gray)
```

#### Values and Changes
```javascript
textStyles.valueLarge   // Large values (24px, bold)
textStyles.value        // Standard values (18px, bold)
textStyles.changePositive // Positive changes (green)
textStyles.changeNegative // Negative changes (red)
```

#### Helper Function
```javascript
import { getTextStyle } from './typography';

// Get text style by name
const headerStyle = getTextStyle('h1');
const bodyStyle = getTextStyle('body');
```

## 🎯 Styles (`styles.js`)

### Common Styles

The styles file contains reusable StyleSheet objects and utility functions.

#### Layout Styles
```javascript
commonStyles.container      // Main app container
commonStyles.scrollView     // Scrollable content area
commonStyles.scrollContent  // Scroll view content container
```

#### Card Styles
```javascript
commonStyles.card           // Standard card with border and padding
commonStyles.cardSmall      // Smaller card variant
commonStyles.dashboardCard  // Dashboard-specific card styling
```

#### Header Styles
```javascript
commonStyles.header         // App header container
commonStyles.headerContent  // Header content layout
commonStyles.headerLeft     // Left side of header
commonStyles.headerTitle    // Header title text
```

#### Button Styles
```javascript
commonStyles.iconButton     // Icon-only buttons
commonStyles.button         // Standard buttons
commonStyles.buttonActive   // Active button state
```

#### Navigation Styles
```javascript
commonStyles.bottomNav      // Bottom navigation container
commonStyles.navLeft        // Left navigation section
commonStyles.navCenter      // Center navigation section
commonStyles.navRight       // Right navigation section
commonStyles.navItem        // Individual navigation items
```

### Utility Functions

#### Style Combiners
```javascript
// Combine button styles with active state
const buttonStyle = getButtonStyle(isActive);
const buttonTextStyle = getButtonTextStyle(isActive);
```

#### Status Style Helpers
```javascript
// Get change indicator style
const changeStyle = getChangeStyle('positive'); // Returns green text style
const changeStyle = getChangeStyle('negative'); // Returns red text style
```

#### Activity Icon Styles
```javascript
// Get activity icon background style
const iconStyle = getActivityIconStyle('positive'); // Returns green background
const iconStyle = getActivityIconStyle('negative'); // Returns red background
const iconStyle = getActivityIconStyle('primary');  // Returns blue background
```

## 🚀 Usage Examples

### Using Colors in Components
```javascript
import { colors } from '../theme/colors';

const MyComponent = () => (
  <View style={{ backgroundColor: colors.primary }}>
    <Text style={{ color: colors.textLight }}>Hello World</Text>
  </View>
);
```

### Using Typography in Components
```javascript
import { textStyles } from '../theme/typography';

const MyComponent = () => (
  <View>
    <Text style={textStyles.h1}>Main Title</Text>
    <Text style={textStyles.body}>Body text content</Text>
    <Text style={textStyles.caption}>Caption text</Text>
  </View>
);
```

### Using Common Styles
```javascript
import { commonStyles, getButtonStyle } from '../theme/styles';

const MyComponent = ({ isActive }) => (
  <View style={commonStyles.card}>
    <TouchableOpacity style={getButtonStyle(isActive)}>
      <Text style={commonStyles.buttonText}>Button Text</Text>
    </TouchableOpacity>
  </View>
);
```

## 🎨 Theme Customization

### Adding New Colors
```javascript
// In colors.js
export const colors = {
  // ... existing colors
  accent: '#FF6B35',
  accentLight: '#FF6B3520',
};
```

### Adding New Text Styles
```javascript
// In typography.js
export const textStyles = StyleSheet.create({
  // ... existing styles
  accent: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.medium,
    color: colors.accent,
  },
});
```

### Extending Common Styles
```javascript
// In styles.js
export const commonStyles = StyleSheet.create({
  // ... existing styles
  accentButton: {
    backgroundColor: colors.accent,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
});
```

## 📱 Responsive Design

The theme system is designed to work across different screen sizes and platforms. All styles use relative units and platform-specific adjustments where needed.

### Platform-Specific Styles
```javascript
// iOS-specific padding
paddingBottom: Platform.OS === 'ios' ? 20 : 16,
```

## 🔄 Theme Switching

The theme system is ready for light/dark mode implementation:

```javascript
// In your theme context
const [isDark, setIsDark] = useState(false);
const theme = getThemeColors(isDark);

// Use theme colors throughout the app
<View style={{ backgroundColor: theme.background }}>
  <Text style={{ color: theme.text }}>Themed content</Text>
</View>
```

This centralized theme system ensures consistency, maintainability, and easy customization across the entire Yalla Business application.
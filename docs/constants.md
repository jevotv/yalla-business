# Constants Documentation

The Yalla Business app uses a comprehensive constants system to manage static data, configurations, and reusable values across the application.

## 📁 Constants Structure

```
src/constants/
├── data.js        # Static data and configurations
└── icons.js       # Icon configurations and utilities
```

## 📊 Data Constants (`data.js`)

### Periods Configuration

Time period options for filtering dashboard data:

```javascript
export const periods = ['Today', 'This Week', 'This Month'];
```

### Trend Periods

Options for the sales trend dropdown:

```javascript
export const trendPeriods = ['Daily', 'Weekly', 'Monthly'];
```

### Sales Goal

Default sales goal percentage:

```javascript
export const salesGoal = 75; // 75%
```

### Dashboard Cards

Array of dashboard metric cards with their configurations:

```javascript
export const dashboardCards = [
  {
    icon: 'monitoring',           // MaterialIcon name
    title: 'Sales',              // Card title
    subtitle: 'Total Sales',     // Card subtitle
    value: '$1,450.75',          // Display value
    change: '+12.5%',            // Change indicator
    changeType: 'positive'       // 'positive' | 'negative'
  },
  // ... more cards
];
```

#### Card Types

**Data Cards** (with metrics):
- `icon`: MaterialIcon name for the card
- `title`: Main card title
- `subtitle`: Description of the metric
- `value`: Current value to display
- `change`: Percentage change
- `changeType`: 'positive' or 'negative'

**Description Cards** (without metrics):
- `icon`: MaterialIcon name for the card
- `title`: Main card title
- `subtitle`: Descriptive text
- `description: true`: Flag indicating this is a description card

### Recent Activities

Array of recent business activities for the activity feed:

```javascript
export const recentActivities = [
  {
    icon: 'receipt-long',              // MaterialIcon name
    title: 'New Order #1024 received', // Activity description
    time: '2 minutes ago',             // Relative timestamp
    type: 'positive'                   // 'positive' | 'negative' | 'primary'
  },
  // ... more activities
];
```

#### Activity Types
- `positive`: Green indicators (successful actions)
- `negative`: Red indicators (warnings, issues)
- `primary`: Blue indicators (general actions)

### Sales Trend Data

Configuration for the sales trend section:

```javascript
export const salesTrendData = {
  value: '$1,450.75',           // Current sales value
  change: '+12.5% vs last week' // Change description
};
```

### User Data

User-specific information and preferences:

```javascript
export const userData = {
  greeting: 'Good Morning, Alex',     // Personalized greeting
  monthlySalesGoal: {
    current: 15000,                   // Current sales amount
    target: 20000,                    // Target sales amount
    percentage: 75                    // Completion percentage
  }
};
```

### Navigation Items

Bottom navigation configuration:

```javascript
export const navigationItems = {
  left: [
    { icon: 'assignment-return', label: 'Return' },
    { icon: 'shopping-cart', label: 'Purchase' }
  ],
  right: [
    { icon: 'call-received', label: 'Receive' },
    { icon: 'payments', label: 'Pay' }
  ],
  fab: {
    icon: 'smart-toy',     // Robot/AI icon
    size: 32,              // Icon size
    color: 'white'         // Icon color
  }
};
```

## 🎨 Icon Constants (`icons.js`)

### Icon Sizes

Standardized icon sizes for consistent UI:

```javascript
export const iconSizes = {
  small: 16,      // Small icons (dropdown arrows, etc.)
  medium: 20,     // Medium icons (activity items, etc.)
  regular: 24,    // Standard icons (navigation, cards)
  large: 32,      // Large icons (FAB, prominent elements)
  extraLarge: 40  // Extra large icons (special cases)
};
```

### Icon Colors

Semantic color mapping for icons:

```javascript
export const iconColors = {
  primary: '#135bec',      // Primary brand color
  secondary: '#616f89',    // Secondary/muted color
  text: '#111318',         // Text color
  textSecondary: '#616f89', // Secondary text
  white: '#ffffff',        // White icons
  success: '#7ED321',      // Success indicators
  error: '#D0021B',        // Error indicators
};
```

### Icon Mappings

Complete mapping of icon names used throughout the app:

```javascript
export const iconMappings = {
  // Navigation icons
  menu: 'menu',
  home: 'home',

  // Dashboard icons
  monitoring: 'monitoring',
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
```

### Helper Functions

#### getIconColor(type, customColor)

Returns the appropriate icon color based on semantic type:

```javascript
// Usage
const primaryColor = getIconColor('primary');        // #135bec
const successColor = getIconColor('success');        // #7ED321
const customColor = getIconColor('custom', '#FF6B35'); // #FF6B35
```

**Parameters:**
- `type`: Semantic color type ('primary', 'secondary', 'success', 'error', etc.)
- `customColor`: Optional custom color override

#### getIconSize(context)

Returns the appropriate icon size based on context:

```javascript
// Usage
const smallIcon = getIconSize('small');      // 16
const navIcon = getIconSize('regular');      // 24
const fabIcon = getIconSize('large');        // 32
```

**Parameters:**
- `context`: Size context ('small', 'medium', 'regular', 'large', 'extraLarge')

### MaterialIcons Configuration

Pre-configured settings for MaterialIcons usage:

```javascript
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
```

## 🚀 Usage Examples

### Using Dashboard Data

```javascript
import { dashboardCards, periods } from '../constants/data';

const DashboardScreen = () => (
  <View>
    {/* Period selector */}
    {periods.map(period => (
      <TouchableOpacity key={period}>
        <Text>{period}</Text>
      </TouchableOpacity>
    ))}

    {/* Dashboard cards */}
    {dashboardCards.map(card => (
      <DashboardCard key={card.title} card={card} />
    ))}
  </View>
);
```

### Using Icon Constants

```javascript
import { iconSizes, iconColors, getIconColor } from '../constants/icons';
import { MaterialIcons } from '@expo/vector-icons';

const MyComponent = () => (
  <View>
    <MaterialIcons
      name="home"
      size={iconSizes.regular}
      color={getIconColor('primary')}
    />
    <MaterialIcons
      name="warning"
      size={iconSizes.medium}
      color={getIconColor('error')}
    />
  </View>
);
```

### Using Navigation Data

```javascript
import { navigationItems } from '../constants/data';

const BottomNavigation = () => (
  <View>
    {/* Left navigation items */}
    {navigationItems.left.map(item => (
      <TouchableOpacity key={item.icon}>
        <MaterialIcons name={item.icon} size={24} />
        <Text>{item.label}</Text>
      </TouchableOpacity>
    ))}

    {/* FAB */}
    <TouchableOpacity>
      <MaterialIcons
        name={navigationItems.fab.icon}
        size={navigationItems.fab.size}
        color={navigationItems.fab.color}
      />
    </TouchableOpacity>
  </View>
);
```

## 🔧 Customization

### Adding New Dashboard Cards

```javascript
// In data.js
export const dashboardCards = [
  // ... existing cards
  {
    icon: 'analytics',
    title: 'Analytics',
    subtitle: 'Business Intelligence',
    description: true
  }
];
```

### Adding New Icon Colors

```javascript
// In icons.js
export const iconColors = {
  // ... existing colors
  accent: '#FF6B35',
  accentLight: '#FF6B3520',
};
```

### Extending Navigation

```javascript
// In data.js
export const navigationItems = {
  // ... existing items
  center: [
    { icon: 'search', label: 'Search' }
  ]
};
```

## 📋 Data Structure Guidelines

### Card Data Structure
- Use consistent icon naming from MaterialIcons
- Keep titles concise (1-3 words)
- Use descriptive subtitles
- For data cards, include value and change information
- For description cards, set `description: true`

### Activity Data Structure
- Use appropriate semantic types (positive/negative/primary)
- Keep titles descriptive but concise
- Use relative timestamps ("2 minutes ago", "1 hour ago")
- Choose icons that clearly represent the activity type

### Navigation Structure
- Limit to 2-3 items per section for mobile UX
- Use clear, action-oriented labels
- Choose icons that are universally understood

This constants system provides a single source of truth for all static data and configurations, making the app easier to maintain and customize.
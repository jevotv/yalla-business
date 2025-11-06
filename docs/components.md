# Components Documentation

The Yalla Business app features a comprehensive component library with reusable, modular components that follow consistent design patterns and APIs.

## 📁 Components Structure

```
src/components/
├── Header.js           # App header with navigation
├── BottomNav.js        # Bottom navigation bar
├── DashboardCard.js    # Dashboard metric cards
├── ActivityItem.js     # Activity feed items
├── Dropdown.js         # Reusable dropdown component
├── SearchBar.js        # Search input with icon
└── ExpandableCard.js   # Expandable KPI card component
```

## 🧭 Header Component

### Overview
The Header component provides consistent navigation and branding across the app.

### Props
```javascript
Header.propTypes = {
  onMenuPress: PropTypes.func,    // Menu button press handler
  onHomePress: PropTypes.func,    // Home button press handler
};
```

### Usage
```javascript
import Header from '../components/Header';

const MyScreen = () => (
  <Header
    onMenuPress={() => navigation.openDrawer()}
    onHomePress={() => navigation.navigate('Home')}
  />
);
```

### Features
- **Menu Button**: Left-aligned hamburger menu icon
- **Greeting**: Personalized user greeting ("Good Morning, Alex")
- **Home Button**: Right-aligned home icon
- **Consistent Styling**: Uses centralized theme styles

## 🧭 BottomNav Component

### Overview
Bottom navigation component with integrated AI assistant button.

### Props
```javascript
BottomNav.propTypes = {
  // No props required - uses centralized navigation data
};
```

### Usage
```javascript
import BottomNav from '../components/BottomNav';

const MyScreen = () => (
  <View style={{ flex: 1 }}>
    {/* Screen content */}
    <BottomNav />
  </View>
);
```

### Features
- **Left Section**: Return and Purchase navigation items
- **Center Section**: Elevated AI assistant button (robot icon)
- **Right Section**: Receive and Pay navigation items
- **Responsive Layout**: 30% left, 40% center, 30% right distribution

### Navigation Items Structure
```javascript
// From constants/data.js
navigationItems = {
  left: [
    { icon: 'assignment-return', label: 'Return' },
    { icon: 'shopping-cart', label: 'Purchase' }
  ],
  right: [
    { icon: 'call-received', label: 'Receive' },
    { icon: 'payments', label: 'Pay' }
  ],
  fab: {
    icon: 'smart-toy',
    size: 32,
    color: 'white'
  }
}
```

## 📊 DashboardCard Component

### Overview
Flexible card component for displaying business metrics and navigation items.

### Props
```javascript
DashboardCard.propTypes = {
  card: PropTypes.shape({
    icon: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    value: PropTypes.string,           // Optional for data cards
    change: PropTypes.string,          // Optional for data cards
    changeType: PropTypes.oneOf(['positive', 'negative']), // Optional
    description: PropTypes.bool        // Flag for description cards
  }).isRequired,
  onPress: PropTypes.func
};
```

### Usage
```javascript
import DashboardCard from '../components/DashboardCard';

const Dashboard = () => (
  <View style={styles.grid}>
    {dashboardCards.map((card, index) => (
      <DashboardCard
        key={index}
        card={card}
        onPress={() => handleCardPress(card.title)}
      />
    ))}
  </View>
);
```

### Card Types

#### Data Cards (with metrics)
```javascript
const salesCard = {
  icon: 'monitoring',
  title: 'Sales',
  subtitle: 'Total Sales',
  value: '$1,450.75',
  change: '+12.5%',
  changeType: 'positive'
};
```

#### Description Cards (navigation)
```javascript
const customersCard = {
  icon: 'group',
  title: 'Customers',
  subtitle: 'Manage and view customer information',
  description: true
};
```

### Features
- **Icon Display**: MaterialIcon with primary color theming
- **Conditional Rendering**: Different layouts for data vs description cards
- **Change Indicators**: Color-coded positive/negative changes
- **Touch Feedback**: Press animations and handlers
- **Responsive Grid**: 47% width for 2-column layout

## 📋 ActivityItem Component

### Overview
Component for displaying individual activity feed items with status indicators.

### Props
```javascript
ActivityItem.propTypes = {
  activity: PropTypes.shape({
    icon: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['positive', 'negative', 'primary']).isRequired
  }).isRequired,
  onPress: PropTypes.func
};
```

### Usage
```javascript
import ActivityItem from '../components/ActivityItem';

const ActivityFeed = () => (
  <View style={styles.activityList}>
    {recentActivities.map((activity, index) => (
      <ActivityItem
        key={index}
        activity={activity}
        onPress={() => handleActivityPress(activity)}
      />
    ))}
  </View>
);
```

### Activity Types

#### Positive Activities (Green)
```javascript
const newOrder = {
  icon: 'receipt-long',
  title: 'New Order #1024 received',
  time: '2 minutes ago',
  type: 'positive'
};
```

#### Negative Activities (Red)
```javascript
const lowStock = {
  icon: 'warning',
  title: "Low stock: 'Product X' (3 left)",
  time: '1 hour ago',
  type: 'negative'
};
```

#### Primary Activities (Blue)
```javascript
const payment = {
  icon: 'payments',
  title: 'Payment for Order #1021',
  time: 'Yesterday',
  type: 'primary'
};
```

### Features
- **Status Indicators**: Color-coded circular backgrounds
- **Icon Theming**: Automatic color selection based on activity type
- **Typography**: Consistent text styling for title and timestamp
- **Navigation**: Chevron right icon for drill-down actions
- **Accessibility**: Semantic color coding for quick recognition

## 🎛️ Dropdown Component

### Overview
Reusable dropdown component for selections and filters.

### Props
```javascript
Dropdown.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedOption: PropTypes.string.isRequired,
  onOptionSelect: PropTypes.func.isRequired,
  isVisible: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  style: PropTypes.object  // Additional container styles
};
```

### Usage
```javascript
import Dropdown from '../components/Dropdown';

const TrendSelector = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('Weekly');
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <Dropdown
      options={['Daily', 'Weekly', 'Monthly']}
      selectedOption={selectedPeriod}
      onOptionSelect={setSelectedPeriod}
      isVisible={showDropdown}
      onToggle={() => setShowDropdown(!showDropdown)}
      style={{ position: 'relative' }}
    />
  );
};
```

### Features
- **Toggle Interface**: Click to show/hide options
- **Selection Feedback**: Visual indication of selected option
- **Auto-close**: Dropdown closes after selection
- **Positioning**: Absolute positioning for overlay behavior
- **Styling**: Consistent with app theme and shadows

## 🔍 SearchBar Component

### Overview
Search input component with integrated icon and consistent styling across the app.

### Props
```javascript
SearchBar.propTypes = {
  placeholder: PropTypes.string,        // Placeholder text
  value: PropTypes.string,              // Current input value
  onChangeText: PropTypes.func.isRequired, // Text change handler
  style: PropTypes.object               // Additional container styles
};
```

### Usage
```javascript
import SearchBar from '../components/SearchBar';

const CustomerScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <SearchBar
      placeholder="Search customers..."
      value={searchQuery}
      onChangeText={setSearchQuery}
      style={styles.searchBar}
    />
  );
};
```

### Features
- **Search Icon**: Left-aligned search icon with theme coloring
- **Consistent Styling**: Matches app design system
- **Responsive Layout**: Adapts to container width
- **Input Integration**: Full React Native TextInput support
- **Theme Integration**: Uses centralized styling constants

### Styling
- **Background**: Light gray (#f0f2f4) with rounded corners
- **Icon Color**: Secondary text color (#616f89)
- **Text Color**: Primary text color (#111318)
- **Placeholder**: Secondary text color for hints

## 📊 ExpandableCard Component

### Overview
Expandable KPI card component for displaying metrics with collapsible detailed content.

### Props
```javascript
ExpandableCard.propTypes = {
  title: PropTypes.string.isRequired,           // Card title
  value: PropTypes.string.isRequired,           // Main metric value
  period: PropTypes.string,                     // Time period description
  periods: PropTypes.arrayOf(PropTypes.string), // Available period options
  expandedMetrics: PropTypes.array,             // Detailed metrics data
  onPeriodChange: PropTypes.func,               // Period selection handler
  customExpandedContent: PropTypes.node,        // Custom expanded content
  expanded: PropTypes.bool,                     // Expansion state
  onToggleExpand: PropTypes.func                // Expansion toggle handler
};
```

### Usage
```javascript
import ExpandableCard from '../components/ExpandableCard';

const CustomerKPIs = () => {
  const [expanded, setExpanded] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState('This Month');

  return (
    <ExpandableCard
      title="New Customers"
      value="12"
      period={selectedPeriod}
      periods={['This Month', 'Last 3 Months', 'This Year']}
      onPeriodChange={setSelectedPeriod}
      expanded={expanded}
      onToggleExpand={() => setExpanded(!expanded)}
      customExpandedContent={
        <View style={styles.metricsGrid}>
          <Text>Total Customers: 152</Text>
          <Text>Active This Month: 45</Text>
        </View>
      }
    />
  );
};
```

### Features
- **Expandable Content**: Toggle detailed metrics display
- **Period Selector**: Dropdown for time period selection
- **Custom Content**: Support for custom expanded content
- **State Management**: Controlled expansion state
- **Visual Indicators**: Expand/collapse icon with rotation
- **Consistent Styling**: Matches card design system

### Card States

#### Collapsed State
- Title and main value display
- Expand button (down arrow)
- Period selector (if applicable)

#### Expanded State
- All collapsed content
- Detailed metrics grid
- Custom content area
- Collapse button (up arrow)

### Custom Content Support
The component accepts `customExpandedContent` prop for flexible content rendering:

```javascript
customExpandedContent={
  <View style={styles.topCustomers}>
    <Text>Top Customers This Month:</Text>
    <View>
      <Text>1. Eleanor Vance - $2,400</Text>
      <Text>2. Marcus Holloway - $1,850</Text>
      <Text>3. Clara Oswald - $1,200</Text>
    </View>
  </View>
}
```

## 🎨 Styling and Theming

All components use the centralized theme system:

### Colors
```javascript
import { colors } from '../theme/colors';
import { iconColors } from '../constants/icons';
```

### Typography
```javascript
import { textStyles } from '../theme/typography';
```

### Common Styles
```javascript
import { commonStyles, getButtonStyle, getChangeStyle } from '../theme/styles';
```

### Icon Configuration
```javascript
import { iconSizes, getIconColor } from '../constants/icons';
```

## 🔧 Component Architecture

### Design Principles
- **Modularity**: Each component has a single responsibility
- **Reusability**: Components can be used across different screens
- **Consistency**: All components follow the same design patterns
- **Accessibility**: Proper touch targets and semantic elements
- **Performance**: Optimized rendering and minimal re-renders

### State Management
- **Local State**: Components manage their own interactive state
- **Props-based**: Data flows down through props
- **Callback Pattern**: Parent components handle business logic

### Error Handling
- **Prop Validation**: Using PropTypes for development validation
- **Default Props**: Sensible defaults for optional props
- **Graceful Degradation**: Components handle missing data gracefully

## 🚀 Advanced Usage

### Custom Styling
```javascript
// Override component styles
<DashboardCard
  card={cardData}
  style={{ marginVertical: 10 }}
  onPress={handlePress}
/>
```

### Conditional Rendering
```javascript
// Show different content based on user permissions
<DashboardCard
  card={{
    ...cardData,
    subtitle: isAdmin ? 'Admin View' : 'User View'
  }}
/>
```

### Integration with Navigation
```javascript
// Deep linking support
<ActivityItem
  activity={activity}
  onPress={() => navigation.navigate('ActivityDetail', { id: activity.id })}
/>
```

## 📱 Responsive Behavior

All components are designed to work across different screen sizes:

- **Mobile First**: Optimized for mobile devices
- **Flexible Layouts**: Use percentage-based widths and flex layouts
- **Platform Adjustments**: iOS-specific padding and styling
- **Touch Targets**: Minimum 44px touch targets for accessibility

## 🧪 Testing

Components are designed to be easily testable:

```javascript
// DashboardCard Test
import { render } from '@testing-library/react-native';
import DashboardCard from '../components/DashboardCard';

test('renders dashboard card correctly', () => {
  const card = {
    icon: 'monitoring',
    title: 'Sales',
    subtitle: 'Total Sales',
    value: '$1,000',
    change: '+10%',
    changeType: 'positive'
  };

  const { getByText } = render(<DashboardCard card={card} />);
  expect(getByText('Sales')).toBeTruthy();
  expect(getByText('$1,000')).toBeTruthy();
});

// SearchBar Test
import SearchBar from '../components/SearchBar';

test('search bar handles text input', () => {
  const onChangeText = jest.fn();
  const { getByPlaceholderText } = render(
    <SearchBar
      placeholder="Search customers..."
      value=""
      onChangeText={onChangeText}
    />
  );

  const input = getByPlaceholderText('Search customers...');
  fireEvent.changeText(input, 'test query');
  expect(onChangeText).toHaveBeenCalledWith('test query');
});

// ExpandableCard Test
import ExpandableCard from '../components/ExpandableCard';

test('expandable card toggles expansion', () => {
  const onToggleExpand = jest.fn();
  const { getByTestId } = render(
    <ExpandableCard
      title="New Customers"
      value="12"
      expanded={false}
      onToggleExpand={onToggleExpand}
    />
  );

  const toggleButton = getByTestId('expand-button');
  fireEvent.press(toggleButton);
  expect(onToggleExpand).toHaveBeenCalled();
});
```

## 🔄 Future Enhancements

### Planned Features
- **Animation Support**: Add entrance/exit animations
- **Loading States**: Skeleton screens and loading indicators
- **Error Boundaries**: Graceful error handling
- **Accessibility**: Screen reader support and focus management

### Extensibility
- **Custom Variants**: Additional component variants
- **Theme Overrides**: Component-level theme customization
- **Plugin System**: Third-party component extensions

This component library provides a solid foundation for building consistent, maintainable React Native applications with professional UI/UX standards.
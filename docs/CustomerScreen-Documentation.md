# CustomerScreen.js Documentation

## Overview
`CustomerScreen.js` is a comprehensive customer and vendor management screen for the Yalla Business React Native Expo application. It provides a complete interface for managing customer relationships, viewing analytics, and handling vendor operations.

## File Location
`src/screens/CustomerScreen.js`

## Dependencies

### React Native Components
- `React, { useState }` - Core React hooks for state management
- `View, Text, TouchableOpacity, ScrollView, StyleSheet, Image` - Core UI components
- `SafeAreaView` - Safe area layout component

### External Libraries
- `@expo/vector-icons` - MaterialIcons for consistent iconography

### Internal Dependencies
- `Header` component - Reusable header component
- `SearchBar` component - Search input component
- `ExpandableCard` component - Expandable KPI card component
- `customers, customerKPIs` - Customer data and KPIs from constants
- `colors, textStyles, commonStyles` - Theme and styling constants

## Component Structure

### Props
```javascript
const CustomerScreen = ({ onBack }) => {
  // onBack: Function to return to previous screen (dashboard)
}
```

### State Management
```javascript
const [activeTab, setActiveTab] = useState('customers');  // 'customers' | 'vendors'
const [searchQuery, setSearchQuery] = useState('');       // Search input value
```

## Handler Functions

### Navigation Handlers
- **`handleMenuPress()`** - Returns to dashboard via `onBack()` prop
- **`handleHomePress()`** - Returns to dashboard via `onBack()` prop

### Action Handlers
- **`handleAddNewPress()`** - Logs add new customer/vendor action
- **`handleCustomerPress(customer)`** - Handles individual customer selection
- **`handlePeriodChange(period)`** - Handles time period changes for KPIs

### Data Handlers
- **`filteredCustomers`** - Filters customers based on search query (name/email matching)

## UI Components

### 1. Header Section
**Purpose**: Main navigation and primary actions

**Structure**:
- Home icon button (navigates back to dashboard)
- "Contacts" title
- "Add New" button

**Styling**:
- White background with bottom border
- Home icon: 24px size, #111318 color
- Title: 20px bold font
- Add button: Primary blue background (#135bec) with white text

### 2. Expandable KPI Card
**Purpose**: Display key customer metrics with expansion capability

**NEW COMPONENT - Custom Implementation**
- **Header Section**:
  - Arabic title: "العملاء الجدد" (New Customers)
  - Period selector dropdown: "هذا الشهر" (This Month)
  - Large metric value: "12"
  - Expand/collapse toggle button

**Expanded Content**:
- **Metrics Grid** with 4 key metrics:
  1. **عدد العملاء الإجمالي** (Total Customers): 152
  2. **إجمالي أرصدة العملاء المدينة** (Total Customer Balances): $15,430
  3. **عدد العملاء النشطين هذا الشهر** (Active Customers This Month): 45
  4. **أكبر 3 عملاء** (Top 3 Customers) with individual rankings:
     - Eleanor Vance - $2,400
     - Marcus Holloway - $1,850
     - Clara Oswald - $1,200

**Styling**:
- White card with shadow effects
- Proper spacing and typography
- Color-coded elements matching HTML design

### 3. Tab Selector and Search
**Purpose**: Navigation between customers and vendors, plus search functionality

**Components**:
- **Tab Buttons**: "Customers" | "Vendors"
- **SearchBar**: Real-time customer filtering

**Behavior**:
- Active tab highlighting
- Search filters by name and email
- Smooth transitions between states

### 4. Customer List
**Purpose**: Display customer information with interaction capabilities

**Customer Card Structure**:
- Customer avatar (48x48px circular image)
- Customer name (16px medium weight)
- Customer email (14px secondary color)
- Total sales amount
- Tier badge (Gold/Silver/Bronze)
- Navigation chevron

**Tier Badge System**:
- **Gold**: Yellow background (#fef3c7), yellow dot (#eab308), brown text (#92400e)
- **Silver**: Gray background (#f3f4f6), gray dot (#9ca3af), dark text (#374151)
- **Bronze**: Bronze background (#fef3c7), bronze dot (#cd7f32), brown text (#92400e)

### 5. Empty State (Vendors Tab)
**Purpose**: Guide users when no vendors exist

**Components**:
- Group add icon (64x64px with primary color background)
- "No vendors yet" title
- Descriptive subtitle
- "Add Vendor" call-to-action button

## Styling System

### Layout Styles
- Consistent 16px padding and margins
- 12px border radius for cards
- Flexible row layouts with proper gap spacing

### Typography Hierarchy
- **Headers**: 20px bold (#111318)
- **Subheaders**: 16px medium (#111318)
- **Body text**: 14px regular (#616f89)
- **Captions**: 12px medium (#6b7280)
- **Values**: 18px-32px semibold/bold (#111318)

### Color Palette
- **Primary**: #135bec (buttons, active states)
- **Text Primary**: #111318 (main content)
- **Text Secondary**: #616f89 (subtitles, descriptions)
- **Text Tertiary**: #6b7280 (labels, placeholders)
- **Background**: #ffffff (cards, header)
- **Background Secondary**: #f3f4f6 (tabs, inactive elements)
- **Borders**: #e5e7eb (section dividers)

### Shadow System
- Card elevation: 1px offset, 0.1 opacity, 2px radius
- Tab active state: 1px offset, 0.1 opacity, 2px radius
- Proper iOS and Android shadow support

## Key Features

### NEW FEATURES ADDED

#### 1. Homepage Icon Navigation
- **Location**: Header, next to "Contacts" title
- **Functionality**: One-tap return to dashboard
- **Styling**: 24px home icon with subtle touch padding

#### 2. Custom Expandable KPI Card
- **Complete redesign** matching HTML reference design
- **Arabic language support** for proper RTL display
- **Interactive elements**: Period selector, expand/collapse
- **Comprehensive metrics**: 4 key performance indicators
- **Top customers list** with individual rankings
- **Perfect HTML match** in styling and behavior

#### 3. Enhanced Search System
- **Real-time filtering** by name and email
- **Responsive design** adapting to screen size
- **Clean integration** with tab navigation

#### 4. Advanced Customer Cards
- **Touchable interactions** for customer selection
- **Dynamic tier badges** with color-coded system
- **Comprehensive customer information** display
- **Professional avatar handling** with fallback support

#### 5. Empty State Design
- **User-friendly messaging** for empty vendor list
- **Clear call-to-action** to add first vendor
- **Consistent styling** with rest of application

## Integration Points

### App Navigation
- **Entry Point**: Dashboard "Customers" card click
- **Return Path**: Home button or menu button
- **State Preservation**: Customer search and tab state maintained

### Data Flow
- **Customer Data**: Sourced from `constants/data.js`
- **Theme Integration**: Uses centralized theme system
- **Icon System**: Consistent MaterialIcons usage

### Performance Considerations
- **Efficient Filtering**: Client-side search with array methods
- **Image Optimization**: Proper avatar sizing and caching
- **Memory Management**: Proper ScrollView usage

## Browser Compatibility
- **React Native Web**: Full web platform support
- **Cross-platform**: iOS, Android, Web compatible
- **Responsive Design**: Adapts to various screen sizes

## Future Enhancements
- **Customer Detail Screens**: Individual customer profiles
- **Vendor Management**: Full CRUD operations for vendors
- **Advanced Analytics**: Charts and reporting
- **Import/Export**: Data management capabilities
- **Offline Support**: Local data caching

## Testing Considerations
- **Component Testing**: Unit tests for state management
- **Integration Testing**: Navigation flow validation
- **UI Testing**: Visual regression testing for styling
- **Performance Testing**: Large customer list rendering
- **Accessibility Testing**: Screen reader compatibility

This documentation covers all aspects of the CustomerScreen component, including the latest enhancements and new features implemented to match the HTML reference design perfectly.
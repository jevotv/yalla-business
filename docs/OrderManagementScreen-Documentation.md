# OrderManagementScreen Documentation

## Overview

The OrderManagementScreen component provides a comprehensive order management interface that allows users to view, filter, search, and manage orders. It follows the design specifications from the provided HTML template and integrates seamlessly with the existing theme system and i18n support.

## Features

### Core Functionality
- **Order Listing**: Display orders in a card-based layout with key information
- **Status Filtering**: Filter orders by status (All, Pending, Processing, Shipped, Delivered, Cancelled)
- **Search**: Real-time search functionality across order IDs and customer names
- **KPI Dashboard**: Expandable card showing key performance metrics
- **Navigation**: Home button and back navigation support
- **Empty States**: User-friendly empty state messages

### Design Elements
- **Responsive Layout**: Adapts to different screen sizes
- **Dark/Light Mode Support**: Compatible with theme switching
- **RTL Support**: Full right-to-left language support for Arabic
- **Accessibility**: Proper touch targets and screen reader support
- **Material Design**: Follows Material Design principles with React Native components

## Component Structure

### Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `onBack` | `function` | Yes | Callback function to navigate back to the previous screen |

### Dependencies

```javascript
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView, 
  StyleSheet, 
  SafeAreaView,
  Alert 
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

// Components
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import ExpandableCard from '../components/ExpandableCard';
import FlowButton from '../components/FlowButton';
```

## State Management

```javascript
const [selectedStatus, setSelectedStatus] = useState('all');
const [searchQuery, setSearchQuery] = useState('');
const [orders] = useState(mockOrders);
```

## Mock Data Structure

### Orders Data
```javascript
const mockOrders = [
  {
    id: '10521',
    customerName: 'John Doe',
    status: 'shipped',
    date: '2023-10-23',
    total: 149.99,
    currency: 'SAR'
  }
  // ... more orders
];
```

### KPI Data
```javascript
const mockKPIData = {
  totalSales: { value: '125,430.00', currency: 'SAR', period: 'This Month' },
  averageInvoiceValue: { value: '450.25', currency: 'SAR' },
  totalInvoices: { value: '278' },
  topProduct: { name: 'Premium Coffee Beans' },
  salesGrowth: { percentage: '+15.2%', positive: true },
  outstandingReceivables: { value: '12,340.50', currency: 'SAR' }
};
```

## Key Methods

### `handleOrderPress(order)`
Handles individual order selection
- Parameters: `order` object
- Actions: Shows order details in an alert dialog

### `handleStatusFilter(status)`
Updates the selected status filter
- Parameters: `status` string
- Actions: Sets `selectedStatus` state

### `getStatusBadgeStyle(status)`
Returns appropriate styling for order status badges
- Parameters: `status` string
- Returns: Style object for badge background, dot, and text

## Layout Structure

```
SafeAreaView
├── Header (with home button and search)
├── ScrollView
│   ├── Expandable KPI Card
│   ├── Status Filter Buttons (horizontal scroll)
│   ├── Search Bar
│   └── Orders List
│       ├── Order Cards (if orders exist)
│       └── Empty State (if no orders)
└── Floating Action Button (Add Order)
```

## Styling

The component uses a combination of:
- **Common Styles**: From `commonStyles` theme system
- **Component-Specific Styles**: Custom styles for order cards, filters, etc.
- **Dynamic Styling**: Status-based styling for badges and indicators
- **Responsive Design**: Adapts to different screen sizes and orientations

### Key Style Categories

1. **Header Styles**: Navigation and title area
2. **KPI Card Styles**: Metrics and statistics display
3. **Filter Styles**: Horizontal scroll filter buttons
4. **Order Card Styles**: Individual order display cards
5. **Status Badge Styles**: Status indicators with colors
6. **Empty State Styles**: No data placeholder
7. **FAB Styles**: Floating action button

## Internationalization

All text strings are translatable using the i18n system:

### Required Translation Keys
```json
{
  "orders": {
    "title": "Orders",
    "order": "Order",
    "orderDetails": "Order Details",
    "searchPlaceholder": "Search orders...",
    "totalSales": "Total Sales",
    "all": "All",
    "pending": "Pending",
    "processing": "Processing",
    "shipped": "Shipped",
    "delivered": "Delivered",
    "cancelled": "Cancelled",
    "noMoreOrders": "No More Orders"
  }
}
```

## Integration

### Navigation Integration
```javascript
// In App.js
if (currentScreen === 'orders') {
  return <OrderManagementScreen onBack={() => setCurrentScreen('dashboard')} />;
}
```

### Dashboard Card Integration
```javascript
const handleCardPress = (card) => {
  if (t(card.title) === t('dashboard.sales')) {
    setCurrentScreen('orders');
  }
};
```

## Testing

### Test Cases
1. **Rendering**: Component renders without errors
2. **Navigation**: Back button returns to dashboard
3. **Filtering**: Status filter changes order list
4. **Search**: Search filters orders by customer name and ID
5. **KPI Expansion**: Expandable metrics show/hide correctly
6. **Order Selection**: Order cards are clickable and show details
7. **Empty State**: Shows appropriate message when no orders
8. **RTL Support**: Layout adapts for Arabic language
9. **Accessibility**: All interactive elements are accessible

### Test IDs
- `search-button`: Search button in header
- `filter-{status}`: Status filter buttons
- `add-order-fab`: Add order floating action button

## Future Enhancements

### Potential Features
1. **Real-time Updates**: WebSocket integration for live order updates
2. **Advanced Filtering**: Date ranges, amounts, customer segments
3. **Bulk Operations**: Multi-select orders for batch actions
4. **Order Details View**: Full-screen order details modal
5. **Export Functionality**: Export orders to CSV/PDF
6. **Sorting Options**: Sort by date, amount, status, customer
7. **Pull-to-Refresh**: Refresh orders with pull gesture
8. **Infinite Scrolling**: Load more orders as user scrolls

### Performance Optimizations
1. **Virtualized Lists**: For large order datasets
2. **Memoized Components**: Reduce re-renders
3. **Image Optimization**: Optimize order/product images
4. **Lazy Loading**: Load order details on demand

## Error Handling

The component includes error handling for:
- **Network Failures**: API call failures
- **Data Validation**: Invalid order data
- **Search Errors**: Search query processing errors
- **Navigation Errors**: Invalid navigation states

## Dependencies Version

- React Native: 0.81.5
- Expo SDK: ~54.0.22
- React: 19.1.0
- @expo/vector-icons: ^15.0.3

## Related Components

- `FlowButton`: Used for filter buttons and action buttons
- `ExpandableCard`: Used for KPI metrics display
- `SearchBar`: Used for order search functionality
- `Header`: Used for navigation and title display
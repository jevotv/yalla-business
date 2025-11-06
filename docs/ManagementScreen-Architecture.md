# ManagementScreen Architecture Documentation

## Overview

This document describes the refactored architecture for order and purchase management screens using a generic `ManagementScreen` component to improve code reuse and maintainability.

## Architecture Overview

### Before Refactoring
- Each management screen (Order, Purchase) contained duplicate UI logic
- Separate implementations for similar functionality
- Difficult to maintain consistent user experience
- Code duplication increased maintenance burden

### After Refactoring
- **Generic Component**: `ManagementScreen` handles all UI rendering
- **Container Components**: `OrderManagementScreen` and `PurchaseManagementScreen` handle business logic
- **Prop-driven Configuration**: Screen-specific data and behavior passed via props
- **Clean Separation**: UI logic separated from business logic

## Component Structure

### 1. ManagementScreen (Generic UI Component)

**Purpose**: Pure UI component that renders the management interface
**Location**: `src/screens/ManagementScreen.js`

**Key Features**:
- Configurable through props
- No business logic or state management
- Handles all UI rendering and layout
- Supports custom renderers for advanced customization

**Responsibilities**:
- Render header, KPI card, filters, search, and list
- Handle user interactions (clicking, filtering, searching)
- Display items with configurable data mapping
- Show empty states and loading indicators

### 2. Container Components (Business Logic)

#### OrderManagementScreen
**Purpose**: Container component for order management
**Location**: `src/screens/OrderManagementScreen.js`

**Responsibilities**:
- Manage order-specific data and state
- Handle business logic (filtering, sorting, API calls)
- Configure ManagementScreen with order-specific props
- Handle order-related events and actions

#### PurchaseManagementScreen  
**Purpose**: Container component for purchase management
**Location**: `src/screens/PurchaseManagementScreen.js`

**Responsibilities**:
- Manage purchase-specific data and state
- Handle business logic (filtering, sorting, API calls)
- Configure ManagementScreen with purchase-specific props
- Handle purchase-related events and actions

## ManagementScreen Props Interface

### Required Props
```javascript
{
  // Basic configuration
  title: string,                    // Screen title
  data: Array<object>,             // Items to display
  statusOptions: Array<{key: string}>, // Available status filters
  kpiData: object,                 // KPI metrics data
  translations: object,            // Translation key configuration
  
  // Event handlers
  onItemPress: function,           // Handle item selection
  onAddNew: function,              // Handle add new item
  onBack?: function,               // Handle back navigation
  onStatusFilter?: function,       // Handle status filter changes
  onPeriodChange?: function        // Handle KPI period changes
}
```

### Optional Props with Defaults
```javascript
{
  // Data mapping
  itemLabelField: string = 'name',    // Field for primary item display
  itemValueField: string = 'value',   // Field for item value display
  entityKey: string = 'item',         // For translation keys
  
  // UI toggles
  showSearch: boolean = true,         // Show/hide search functionality
  showStatusFilter: boolean = true,   // Show/hide status filters
  showKPICard: boolean = true,        // Show/hide KPI card
  showFAB: boolean = true,            // Show/hide floating action button
  
  // Custom renderers
  renderCustomHeader?: function,      // Custom header renderer
  renderCustomItem?: function,        // Custom item card renderer
  renderCustomKPICard?: function      // Custom KPI card renderer
}
```

## Translation Configuration

### Translation Object Structure
```javascript
const translations = {
  titleKey: 'orders.title',           // Screen title translation key
  searchPlaceholderKey: 'orders.searchPlaceholder', // Search placeholder key
  entityPrefix: 'orders.order',       // Prefix for entity references
  statusPrefix: 'orders',             // Prefix for status translation keys
  kpiPrefix: 'orders',                // Prefix for KPI translation keys
  emptyState: {                       // Empty state messages
    title: 'orders.noMoreOrders',
    noSearchResults: 'orders.noSearchResults',
    endOfList: 'orders.endOfOrderList'
  }
};
```

### Translation Key Usage
The component automatically constructs translation keys using the provided prefixes:
- Status labels: `{statusPrefix}.{statusKey}` → `orders.pending`
- Entity references: `{entityPrefix}` → `orders.order`
- KPI metrics: `{kpiPrefix}.{metricKey}` → `orders.totalSales`

## Data Structure Requirements

### Item Data Format
```javascript
{
  id: string,              // Unique identifier
  [itemLabelField]: string, // Primary display field (customerName/supplierName)
  status: string,          // Status for filtering and badges
  date: string,           // Date string (optional)
  [itemValueField]: number | string, // Value field (total)
  currency: string        // Currency code (optional)
}
```

### KPI Data Format
```javascript
{
  totalSales: {
    value: string,
    currency?: string,
    period?: string
  },
  averageInvoiceValue?: {
    value: string,
    currency?: string
  },
  totalInvoices?: {
    value: string
  },
  topProduct?: {
    name: string
  },
  salesGrowth?: {
    percentage: string,
    positive: boolean
  },
  outstandingReceivables?: {
    value: string,
    currency?: string
  }
}
```

## Usage Examples

### Creating a New Management Screen

1. **Create Container Component**:
```javascript
import ManagementScreen from './ManagementScreen';

const NewEntityManagementScreen = ({ onBack }) => {
  const { t } = useTranslation();
  const [data, setData] = useState(mockData);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Handler functions
  const handleItemPress = (item) => { /* ... */ };
  const handleAddNew = () => { /* ... */ };
  const handleStatusFilter = (status) => setSelectedStatus(status);
  const handlePeriodChange = (period) => { /* ... */ };

  const statusOptions = [ /* ... */ ];
  const translations = { /* ... */ };

  return (
    <ManagementScreen
      title={t(translations.titleKey)}
      data={data}
      statusOptions={statusOptions}
      kpiData={kpiData}
      translations={translations}
      onItemPress={handleItemPress}
      onAddNew={handleAddNew}
      onBack={onBack}
      onStatusFilter={handleStatusFilter}
      onPeriodChange={handlePeriodChange}
      itemLabelField="nameField"
      itemValueField="valueField"
      entityKey="entity"
    />
  );
};
```

2. **Add Translation Keys**:
Update your translation files (en.json, ar.json) with required keys:
```json
{
  "entities": {
    "title": "Entities Management",
    "searchPlaceholder": "Search entities...",
    "entity": "Entity",
    "all": "All",
    "status1": "Status 1",
    "status2": "Status 2",
    "noMoreEntities": "No more entities",
    "noSearchResults": "No search results",
    "endOfEntityList": "End of entity list",
    "totalSales": "Total Sales",
    "thisMonth": "This Month",
    "averageInvoiceValue": "Average Value",
    "totalInvoices": "Total Items",
    "topProduct": "Top Item",
    "salesGrowth": "Growth",
    "outstandingReceivables": "Outstanding"
  }
}
```

## Benefits of This Architecture

### Code Reuse
- Single UI component eliminates duplication
- Consistent user experience across screens
- Easier to maintain and update

### Maintainability
- Changes to UI logic need to be made in one place
- Business logic remains isolated and testable
- Clear separation of concerns

### Extensibility
- Easy to create new management screens
- Customizable through props and renderers
- Supports different data structures and behaviors

### Testability
- UI component can be tested independently
- Container components focus on business logic
- Easier to write unit tests

## Status Badge Styling

The ManagementScreen supports custom status badge styling through the `getStatusBadgeStyle` function. Pre-defined styles include:

```javascript
const statusStyles = {
  shipped: { container: green, dot: green, text: green },
  processing: { container: yellow, dot: yellow, text: yellow },
  delivered: { container: blue, dot: blue, text: blue },
  cancelled: { container: red, dot: red, text: red },
  pending: { container: yellow, dot: yellow, text: yellow },
  received: { container: green, dot: green, text: green },
  approved: { container: blue, dot: blue, text: blue }
};
```

## Customization Options

### Custom Item Renderer
```javascript
const renderCustomItem = (item, onPress) => (
  <CustomCard item={item} onPress={onPress} />
);

<ManagementScreen
  // ... other props
  renderCustomItem={renderCustomItem}
/>
```

### Custom KPI Card
```javascript
const renderCustomKPICard = (kpiData) => (
  <CustomKPICard data={kpiData} />
);

<ManagementScreen
  // ... other props
  renderCustomKPICard={renderCustomKPICard}
/>
```

### Custom Header
```javascript
const renderCustomHeader = () => (
  <CustomHeader title="Custom Title" />
);

<ManagementScreen
  // ... other props
  renderCustomHeader={renderCustomHeader}
/>
```

## Future Enhancements

### Potential Improvements
1. **Advanced Filtering**: Date ranges, multi-select filters
2. **Sorting Options**: Column-based sorting
3. **Pagination**: For large datasets
4. **Bulk Actions**: Select multiple items for batch operations
5. **Export Functionality**: CSV/PDF export options
6. **Advanced Search**: Fuzzy search, saved searches

### Adding New Features
1. Extend ManagementScreen props interface
2. Add conditional rendering logic
3. Update container components to handle new functionality
4. Add corresponding translation keys

## Migration Guide

### From Legacy Implementation
1. Identify business logic in existing screens
2. Extract UI components to ManagementScreen
3. Create container components for business logic
4. Update translation keys
5. Test functionality thoroughly

### Best Practices
- Keep ManagementScreen focused on UI only
- Pass business logic through props
- Use translation keys for all user-facing text
- Test both container and generic components
- Document any custom renderers or props

---

This architecture provides a solid foundation for scalable, maintainable management screens while preserving existing functionality and improving code organization.
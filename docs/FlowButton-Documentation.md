# FlowButton Component Documentation

## Overview

The FlowButton component is a versatile, reusable button component designed for the Yalla Business app. It provides multiple variants, sizes, and styling options while maintaining consistency with the app's design system and supporting both light/dark themes and RTL layouts.

## Features

### Design Features
- **Multiple Variants**: Primary, Secondary, Ghost, Success, Warning, Danger
- **Size Options**: Small, Medium, Large
- **Icon Support**: Material Icons integration
- **Theme Compatibility**: Full light/dark mode support
- **RTL Support**: Right-to-left layout support
- **Disabled State**: Visual and functional disabled state
- **Accessibility**: Proper touch targets and screen reader support

### Customization
- **Flexible Styling**: Custom style prop support
- **Icon Positioning**: Automatic icon positioning based on text direction
- **Dynamic Text**: Support for both static text and translation functions
- **Test ID Support**: Built-in test identifier support

## Component Structure

### Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `onPress` | `function` | Yes | - | Callback function when button is pressed |
| `icon` | `string` | No | 'add' | Material Icons name for the button icon |
| `text` | `string` | No | - | Button text or translation key |
| `variant` | `string` | No | 'primary' | Button style variant |
| `size` | `string` | No | 'large' | Button size (small, medium, large) |
| `style` | `array\|object` | No | - | Additional custom styles |
| `disabled` | `boolean` | No | false | Whether the button is disabled |
| `testID` | `string` | No | - | Test identifier for testing |

### Variants

| Variant | Description | Use Case |
|---------|-------------|----------|
| `primary` | Main action button | Primary actions like "Add New", "Save" |
| `secondary` | Secondary actions | Less important actions |
| `ghost` | Outline button | Alternative to filled buttons |
| `success` | Success actions | Confirmations, approvals |
| `warning` | Warning actions | Cautious actions, alerts |
| `danger` | Destructive actions | Delete, cancel, remove |

### Sizes

| Size | Height | Padding | Icon Size | Use Case |
|------|--------|---------|-----------|----------|
| `small` | 32px | 12px | 16px | Compact interfaces, list items |
| `medium` | 40px | 16px | 20px | Standard form buttons |
| `large` | 48px | 20px | 24px | Primary actions, main buttons |

## Component Code Structure

```javascript
const FlowButton = ({ 
  onPress, 
  icon = 'add', 
  text, 
  variant = 'primary', 
  size = 'large',
  style,
  disabled = false,
  testID
}) => {
  // Component logic
};
```

## Styling System

### Base Styles
```javascript
const styles = StyleSheet.create({
  baseButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'transparent',
    gap: 8,
  },
  // ... variant and size specific styles
});
```

### Color Schemes

#### Light Theme
- **Primary**: `#135bec` (App primary color)
- **Secondary**: `#ffffff` with border
- **Ghost**: Transparent with primary border
- **Success**: `#7ED321` (Success green)
- **Warning**: `#fef3c7` with `#f59e0b` border
- **Danger**: `#D0021B` (Error red)

#### Dark Theme Support
- Automatically adapts colors for dark mode
- Maintains contrast ratios
- Preserves visual hierarchy

### RTL Support
```javascript
const getRTLStyles = () => {
  if (isRTL) {
    return {
      flexDirection: 'row-reverse',
      icon: { marginLeft: 4, marginRight: 0 },
      text: { textAlign: 'center' }
    };
  }
  return {};
};
```

## Usage Examples

### Basic Usage
```javascript
<FlowButton
  onPress={handleAdd}
  text="Add New"
  variant="primary"
/>
```

### With Icon
```javascript
<FlowButton
  onPress={handleSearch}
  icon="search"
  text="Search"
  variant="secondary"
  size="medium"
/>
```

### Small Filter Button
```javascript
<FlowButton
  onPress={() => setFilter('active')}
  text="Active"
  variant="primary"
  size="small"
  style={styles.filterButton}
/>
```

### Icon Only Button
```javascript
<FlowButton
  onPress={handleMenu}
  icon="menu"
  variant="ghost"
  size="small"
/>
```

### Disabled Button
```javascript
<FlowButton
  onPress={handleSubmit}
  text="Submit"
  variant="primary"
  disabled={!isValid}
/>
```

## Integration Examples

### Status Filter
```javascript
const statusOptions = [
  { key: 'all', label: 'All' },
  { key: 'active', label: 'Active' },
  { key: 'pending', label: 'Pending' }
];

<ScrollView horizontal>
  {statusOptions.map((option) => (
    <FlowButton
      key={option.key}
      text={option.label}
      onPress={() => handleStatusFilter(option.key)}
      variant={selectedStatus === option.key ? 'primary' : 'secondary'}
      size="small"
    />
  ))}
</ScrollView>
```

### Action Buttons
```javascript
<View style={styles.actionButtons}>
  <FlowButton
    onPress={handleSave}
    icon="save"
    text="Save"
    variant="primary"
  />
  <FlowButton
    onPress={handleCancel}
    text="Cancel"
    variant="secondary"
  />
</View>
```

### Danger Actions
```javascript
<FlowButton
  onPress={handleDelete}
  icon="delete"
  text="Delete"
  variant="danger"
  size="medium"
/>
```

## Theme Integration

### Color Integration
```javascript
import { colors } from '../theme/colors';

// Colors are used dynamically based on variant
const getIconColor = () => {
  switch (variant) {
    case 'primary':
      return colors.buttonText;
    case 'secondary':
      return colors.primary;
    case 'success':
      return colors.success;
    // ... more variants
  }
};
```

### Common Styles Integration
```javascript
import { commonStyles } from '../theme/styles';

// Button integrates with the app's style system
// Maintains consistent spacing, fonts, and theming
```

## Accessibility

### Touch Targets
- Minimum touch target size: 44px (iOS) / 48px (Android)
- Proper spacing between interactive elements
- Clear visual feedback on press

### Screen Reader Support
```javascript
<FlowButton
  testID="add-order-button"
  onPress={handleAdd}
  icon="add"
  text="Add New Order"
/>
```

### Visual Accessibility
- High contrast ratios for text and backgrounds
- Clear focus indicators
- Consistent icon sizing
- Proper color coding with text labels

## Testing

### Test Cases
1. **Rendering**: Component renders with all props
2. **Variants**: All button variants display correctly
3. **Sizes**: All button sizes have correct dimensions
4. **Icons**: Icons display and position correctly
5. **Text**: Text displays and is translatable
6. **Disabled**: Disabled state prevents interactions
7. **RTL**: Layout reverses for right-to-left languages
8. **OnPress**: Callback fires on button press
9. **Custom Styles**: Custom styles merge correctly

### Test Examples
```javascript
// Test primary button
<FlowButton
  testID="primary-button"
  onPress={handlePress}
  text="Primary"
  variant="primary"
/>

// Test disabled state
<FlowButton
  testID="disabled-button"
  onPress={handlePress}
  text="Disabled"
  disabled={true}
/>
```

## Performance Considerations

### Optimization Techniques
- **Style Objects**: Styles created outside render function
- **Conditional Styling**: Efficient conditional style application
- **Icon Optimization**: Uses @expo/vector-icons for performance
- **Memo Usage**: Consider React.memo for frequent re-renders

### Best Practices
```javascript
// Good: Style objects outside component
const buttonStyles = StyleSheet.create({
  primary: { backgroundColor: colors.primary },
  // ... more styles
});

// Bad: Styles inside render
const FlowButton = () => {
  const styles = StyleSheet.create({
    // This recreates styles on every render
  });
};
```

## Future Enhancements

### Potential Features
1. **Loading State**: Spinner/loading indicator
2. **Progress State**: Progress bar for long operations
3. **Badge Support**: Notification badges on buttons
4. **Grouped Buttons**: Button groups with automatic spacing
5. **Icon Positions**: Configurable icon positions (left, right, top, bottom)
6. **Animation Support**: Press animations and transitions
7. **Custom Icons**: Support for custom icon components
8. **Button Groups**: Toggle/radio button groups

### API Extensions
```javascript
// Future API concepts
<FlowButton
  onPress={handlePress}
  text="Save"
  variant="primary"
  size="medium"
  loading={isLoading}
  progress={uploadProgress}
  badge={3}
  position="right" // icon position
/>
```

## Dependencies

- React Native: 0.81.5
- @expo/vector-icons: ^15.0.3
- StyleSheet from react-native
- App theme system (colors, styles)

## Related Components

- **OrderManagementScreen**: Uses FlowButton for filters
- **DashboardCard**: May use similar button patterns
- **App Theme System**: Integrates with colors and styles
- **Translation System**: Works with i18n system

## Migration Guide

### From Custom Buttons
```javascript
// Old custom button
<TouchableOpacity style={styles.button}>
  <Text>{label}</Text>
</TouchableOpacity>

// New FlowButton
<FlowButton
  onPress={onPress}
  text={label}
  variant="primary"
/>
```

### Best Practices
1. Use FlowButton for consistency across the app
2. Choose appropriate variants for context
3. Maintain size consistency within sections
4. Test with both light and dark themes
5. Verify RTL layout works correctly
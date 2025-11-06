import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const FlowButton = ({ 
  onPress, 
  icon = 'add', 
  text, 
  variant = 'primary', 
  size = 'medium',
  style,
  disabled = false,
  testID
}) => {
  const getButtonStyle = () => {
    const baseStyle = [styles.button, styles[`${variant}Button`], styles[`${size}Button`]];
    if (disabled) {
      baseStyle.push(styles.disabledButton);
    }
    if (style) {
      baseStyle.push(style);
    }
    return baseStyle;
  };

  const getTextStyle = () => {
    const baseStyle = [styles.text, styles[`${variant}Text`], styles[`${size}Text`]];
    if (disabled) {
      baseStyle.push(styles.disabledText);
    }
    return baseStyle;
  };

  const getIconColor = () => {
    switch (variant) {
      case 'primary':
        return '#ffffff';
      case 'secondary':
        return '#135bec';
      case 'ghost':
        return '#135bec';
      case 'success':
        return '#ffffff';
      case 'warning':
        return '#92400e';
      case 'danger':
        return '#ffffff';
      default:
        return '#ffffff';
    }
  };

  const getIconSize = () => {
    switch (size) {
      case 'small':
        return 16;
      case 'medium':
        return 20;
      case 'large':
        return 24;
      default:
        return 20;
    }
  };

  return (
    <TouchableOpacity
      style={getButtonStyle()}
      onPress={onPress}
      disabled={disabled}
      testID={testID}
      activeOpacity={0.8}
    >
      {icon && (
        <MaterialIcons
          name={icon}
          size={getIconSize()}
          color={getIconColor()}
          style={styles.icon}
        />
      )}
      {text && (
        <Text style={getTextStyle()}>
          {text}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    borderWidth: 1,
    gap: 8,
  },
  
  // Variants
  primaryButton: {
    backgroundColor: '#135bec',
    borderColor: '#135bec',
  },
  secondaryButton: {
    backgroundColor: '#ffffff',
    borderColor: '#dbdfe6',
  },
  ghostButton: {
    backgroundColor: 'transparent',
    borderColor: '#135bec',
  },
  successButton: {
    backgroundColor: '#7ED321',
    borderColor: '#7ED321',
  },
  warningButton: {
    backgroundColor: '#fef3c7',
    borderColor: '#f59e0b',
  },
  dangerButton: {
    backgroundColor: '#D0021B',
    borderColor: '#D0021B',
  },
  
  // Sizes
  smallButton: {
    height: 32,
    paddingHorizontal: 12,
  },
  mediumButton: {
    height: 40,
    paddingHorizontal: 16,
  },
  largeButton: {
    height: 48,
    paddingHorizontal: 20,
  },
  
  // Text styles
  text: {
    fontWeight: '600',
    textAlign: 'center',
  },
  primaryText: {
    color: '#ffffff',
  },
  secondaryText: {
    color: '#616f89',
  },
  ghostText: {
    color: '#135bec',
  },
  successText: {
    color: '#ffffff',
  },
  warningText: {
    color: '#92400e',
  },
  dangerText: {
    color: '#ffffff',
  },
  
  // Size text styles
  smallText: {
    fontSize: 12,
  },
  mediumText: {
    fontSize: 14,
  },
  largeText: {
    fontSize: 16,
  },
  
  // Icon
  icon: {
    marginRight: 4,
  },
  
  // Disabled
  disabledButton: {
    backgroundColor: '#f3f4f6',
    borderColor: '#f3f4f6',
  },
  disabledText: {
    color: '#9ca3af',
  },
});

export default FlowButton;
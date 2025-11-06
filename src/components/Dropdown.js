import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Dimensions,
  ScrollView,
  Platform
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { iconSizes } from '../constants/icons';
import { commonStyles } from '../theme/styles';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const Dropdown = ({
  options,
  selectedOption,
  onOptionSelect,
  isVisible,
  onToggle,
  style,
  containerStyle,
  maxDropdownHeight = 200,
  dropdownOffset = { x: 0, y: 4 }
}) => {
  const [dropdownPosition, setDropdownPosition] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0
  });
  const [isPositioned, setIsPositioned] = useState(false);
  const dropdownButtonRef = useRef(null);
  const dropdownContentRef = useRef(null);

  // Calculate dropdown position with viewport boundary checks
  const calculatePosition = useCallback((buttonLayout) => {
    if (!buttonLayout) return;

    const { x, y, width, height } = buttonLayout;
    
    // Estimate dropdown content height
    const estimatedDropdownHeight = Math.min(
      maxDropdownHeight,
      options.length * 48 + 20 // 48px per item + padding
    );

    let finalX = x + dropdownOffset.x;
    let finalY = y + height + dropdownOffset.y;
    let finalWidth = width;

    // Horizontal boundary checks
    if (finalX + finalWidth > screenWidth - 16) {
      finalX = Math.max(16, screenWidth - finalWidth - 16);
    }

    // Vertical boundary checks - show above if not enough space below
    if (finalY + estimatedDropdownHeight > screenHeight - 100) {
      finalY = Math.max(16, y - estimatedDropdownHeight - dropdownOffset.y);
    }

    setDropdownPosition({
      x: finalX,
      y: finalY,
      width: finalWidth,
      height: estimatedDropdownHeight
    });
    
    setIsPositioned(true);
  }, [dropdownOffset.x, dropdownOffset.y, maxDropdownHeight, options.length]);

  const handleToggle = useCallback(() => {
    if (isVisible) {
      onToggle();
      setIsPositioned(false);
    } else {
      // Measure the dropdown button position
      if (dropdownButtonRef.current) {
        dropdownButtonRef.current.measure((x, y, width, height, pageX, pageY) => {
          const buttonLayout = { x: pageX, y: pageY, width, height };
          calculatePosition(buttonLayout);
        });
      }
      onToggle();
    }
  }, [isVisible, onToggle, calculatePosition]);

  const handleOptionSelect = useCallback((option) => {
    onOptionSelect(option);
    onToggle();
    setIsPositioned(false);
  }, [onOptionSelect, onToggle]);

  // Recalculate position on visibility change
  useEffect(() => {
    if (isVisible && dropdownButtonRef.current) {
      dropdownButtonRef.current.measure((x, y, width, height, pageX, pageY) => {
        const buttonLayout = { x: pageX, y: pageY, width, height };
        calculatePosition(buttonLayout);
      });
    }
  }, [isVisible, calculatePosition]);

  // Handle backdrop press
  const handleBackdropPress = useCallback(() => {
    onToggle();
    setIsPositioned(false);
  }, [onToggle]);

  return (
    <View style={containerStyle || style}>
      <TouchableOpacity
        ref={dropdownButtonRef}
        style={commonStyles.trendFilter}
        onPress={handleToggle}
        activeOpacity={0.7}
      >
        <Text
          style={commonStyles.trendFilterText}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {selectedOption}
        </Text>
        <MaterialIcons
          name={isVisible ? "expand-less" : "expand-more"}
          size={iconSizes.small}
          color="#616f89"
        />
      </TouchableOpacity>
      
      {/* Enhanced Modal with proper z-index management */}
      <Modal
        visible={isVisible}
        transparent={true}
        animationType="none"
        statusBarTranslucent={true}
        hardwareAccelerated={true}
        onRequestClose={handleBackdropPress}
      >
        {/* Enhanced backdrop with better z-index hierarchy */}
        <TouchableOpacity
          style={styles.enhancedModalOverlay}
          activeOpacity={1}
          onPress={handleBackdropPress}
        >
          {/* Dropdown positioned with enhanced positioning */}
          {isPositioned && (
            <View
              ref={dropdownContentRef}
              style={[
                styles.enhancedModalDropdown,
                {
                  left: dropdownPosition.x,
                  top: dropdownPosition.y,
                  width: dropdownPosition.width,
                  maxHeight: dropdownPosition.height,
                }
              ]}
            >
              {/* Dropdown arrow with proper positioning */}
              <View style={styles.enhancedDropdownArrow} />
              
              {/* Scrollable dropdown content */}
              <ScrollView
                style={styles.dropdownScrollView}
                nestedScrollEnabled={true}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
              >
                <View style={styles.dropdownContent}>
                  {options.map((option) => (
                    <TouchableOpacity
                      key={option}
                      style={[
                        styles.enhancedModalDropdownItem,
                        selectedOption === option && styles.enhancedModalDropdownItemSelected
                      ]}
                      onPress={() => handleOptionSelect(option)}
                      activeOpacity={0.7}
                    >
                      <Text
                        style={[
                          commonStyles.dropdownItemText,
                          selectedOption === option && commonStyles.dropdownItemTextSelected
                        ]}
                        numberOfLines={1}
                        ellipsizeMode="tail"
                      >
                        {option}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </ScrollView>
            </View>
          )}
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = {
  enhancedModalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    zIndex: 999999, // Highest z-index for modal overlay
  },
  enhancedModalDropdown: {
    position: 'absolute',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e1e5e9',
    boxShadow: `0px ${Platform.OS === 'ios' ? 8 : 4}px ${Platform.OS === 'ios' ? 16 : 8}px rgba(0, 0, 0, 0.15)`,
    elevation: Platform.OS === 'android' ? 12 : 0, // High elevation for Android
    zIndex: 1000000, // Higher than overlay
    overflow: 'hidden',
  },
  enhancedDropdownArrow: {
    position: 'absolute',
    top: -6,
    left: 20,
    width: 0,
    height: 0,
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderBottomWidth: 6,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#ffffff',
    zIndex: 1000001,
  },
  dropdownScrollView: {
    flex: 1,
  },
  dropdownContent: {
    paddingVertical: 4,
  },
  enhancedModalDropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f7f9',
    minHeight: 48,
    justifyContent: 'center',
  },
  enhancedModalDropdownItemSelected: {
    backgroundColor: '#f0f8ff',
  },
};

export default Dropdown;
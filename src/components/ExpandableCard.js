import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Modal, Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { textStyles } from '../theme/typography';
import { useTranslation } from '../i18n/LanguageContext';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const ExpandableCard = ({
  title,
  value,
  period,
  periods = [],
  expandedMetrics = [],
  onPeriodChange,
  style,
  customExpandedContent,
  isExpanded = false
}) => {
  const { t, isRTL } = useTranslation();
  const [expanded, setExpanded] = useState(isExpanded);
  const [selectedPeriod, setSelectedPeriod] = useState(period || periods[0]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ x: 0, y: 0, width: 0 });
  const dropdownButtonRef = useRef(null);
  const rotateAnim = useState(new Animated.Value(0))[0];

  const toggleExpanded = () => {
    const toValue = expanded ? 0 : 1;
    Animated.timing(rotateAnim, {
      toValue,
      duration: 200,
      useNativeDriver: true,
    }).start();
    setExpanded(!expanded);
  };

  const handlePeriodSelect = (period) => {
    setSelectedPeriod(period);
    setShowDropdown(false);
    onPeriodChange && onPeriodChange(period);
  };

  const toggleDropdown = () => {
    if (showDropdown) {
      setShowDropdown(false);
    } else {
      // Measure the dropdown button position
      dropdownButtonRef.current?.measure((x, y, width, height, pageX, pageY) => {
        setDropdownPosition({
          x: isRTL ? pageX : pageX + width - 120, // Align right for LTR, left for RTL
          y: pageY + height + 4,
          width: 120
        });
      });
      setShowDropdown(true);
    }
  };

  const closeDropdown = () => {
    setShowDropdown(false);
  };

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  // Get the periods to display, using provided periods or defaults
  const displayPeriods = periods.length > 0 ? periods : [
    t('time.thisMonth'),
    t('customer.last3Months'),
    t('customer.thisYear')
  ];

  return (
    <View style={[styles.container, style, isRTL && styles.containerRTL]}>
      <View style={styles.header}>
        <View style={[styles.headerLeft, isRTL && styles.headerLeftRTL]}>
          <View style={[styles.titleRow, isRTL && styles.titleRowRTL]}>
            <Text style={styles.title}>{title}</Text>
            <TouchableOpacity
              ref={dropdownButtonRef}
              style={[styles.dropdownButton, isRTL && styles.dropdownButtonRTL]}
              onPress={toggleDropdown}
            >
              <Text style={styles.periodText}>{selectedPeriod}</Text>
              <MaterialIcons
                name={showDropdown ? "expand-less" : "expand-more"}
                size={16}
                color={colors.textSecondary}
                style={[styles.dropdownIcon, isRTL && styles.dropdownIconRTL]}
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.value}>{value}</Text>
        </View>
        <TouchableOpacity style={styles.expandButton} onPress={toggleExpanded}>
          <Animated.View style={{ transform: [{ rotate }] }}>
            <MaterialIcons
              name="expand-more"
              size={24}
              color={colors.textSecondary}
            />
          </Animated.View>
        </TouchableOpacity>
      </View>

      {expanded && (
        <View style={styles.expandedContent}>
          <View style={styles.divider} />
          {customExpandedContent ? (
            customExpandedContent
          ) : (
            <View style={styles.metricsGrid}>
              {expandedMetrics.map((metric, index) => (
                <View key={index} style={styles.metricItem}>
                  <Text style={styles.metricLabel}>{metric.label}</Text>
                  <Text style={styles.metricValue}>{metric.value}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
      )}

      {/* Modal-style Period Dropdown Overlay */}
      <Modal
        visible={showDropdown}
        transparent={true}
        animationType="none"
        statusBarTranslucent={true}
        onRequestClose={closeDropdown}
      >
        {/* Full Screen Backdrop */}
        <TouchableOpacity 
          style={styles.modalOverlay} 
          activeOpacity={1}
          onPress={closeDropdown}
        >
          {/* Dropdown positioned absolutely */}
          <View 
            style={[
              styles.modalDropdown,
              {
                left: dropdownPosition.x,
                top: dropdownPosition.y,
                width: dropdownPosition.width,
              }
            ]}
          >
            <View style={styles.dropdownArrow} />
            {displayPeriods.map((periodOption) => (
              <TouchableOpacity
                key={periodOption}
                style={[
                  styles.modalDropdownItem,
                  selectedPeriod === periodOption && styles.modalDropdownItemSelected
                ]}
                onPress={() => handlePeriodSelect(periodOption)}
              >
                <Text style={[
                  styles.modalDropdownItemText,
                  selectedPeriod === periodOption && styles.modalDropdownItemTextSelected
                ]}>
                  {periodOption}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  headerLeft: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    ...textStyles.body,
    color: colors.textSecondary,
    marginRight: 8,
  },
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  periodText: {
    ...textStyles.caption,
    color: colors.text,
    marginRight: 4,
  },
  dropdownIcon: {
    marginLeft: 4,
  },
  value: {
    ...textStyles.valueLarge,
    color: colors.text,
  },
  expandButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Modal overlay styles for period dropdown
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    zIndex: 999999, // Ensure this is above everything
  },
  modalDropdown: {
    position: 'absolute',
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 6,
    boxShadow: '0px 6px 16px rgba(0, 0, 0, 0.4)',
    elevation: 100, // Maximum elevation for mobile
    zIndex: 1000000, // Higher than overlay
  },
  dropdownArrow: {
    position: 'absolute',
    top: -8,
    right: 16,
    width: 0,
    height: 0,
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderBottomWidth: 8,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: colors.card,
  },
  modalDropdownItem: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  modalDropdownItemSelected: {
    backgroundColor: '#f0f8ff',
  },
  modalDropdownItemText: {
    ...textStyles.body,
    color: colors.text,
  },
  modalDropdownItemTextSelected: {
    color: colors.primary,
    fontWeight: '500',
  },
  expandedContent: {
    marginTop: 16,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginBottom: 16,
  },
  metricsGrid: {
    gap: 12,
  },
  metricItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  metricLabel: {
    ...textStyles.caption,
    color: colors.textSecondary,
    flex: 1,
  },
  metricValue: {
    ...textStyles.value,
    color: colors.text,
  },
  // RTL styles
  containerRTL: {
    writingDirection: 'rtl',
  },
  headerLeftRTL: {
    alignItems: 'flex-end',
  },
  titleRowRTL: {
    flexDirection: 'row-reverse',
  },
  dropdownButtonRTL: {
    flexDirection: 'row-reverse',
  },
  dropdownIconRTL: {
    marginLeft: 4,
    marginRight: 0,
  },
});

export default ExpandableCard;
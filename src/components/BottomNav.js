import React from 'react';
import { View, Text, TouchableOpacity, Platform, StyleSheet } from 'react-native'; // Import StyleSheet
import { MaterialIcons } from '@expo/vector-icons';
import { useTranslation } from '../i18n/LanguageContext';
import { useTranslatedData } from '../i18n/translationUtils';
import { iconSizes, iconColors } from '../constants/icons';
import { commonStyles } from '../theme/styles';

const BottomNav = () => {
  const { getTranslatedNavigationItems } = useTranslatedData();
  const navigationItems = getTranslatedNavigationItems();
  const { t } = useTranslation();

  return (
    <View style={commonStyles.bottomNav}>
      <View style={commonStyles.navLeft}>
        {navigationItems.left.map((item, index) => (
          <TouchableOpacity key={index} style={commonStyles.navItem}>
            <MaterialIcons
              name={item.icon}
              size={iconSizes.regular}
              color={iconColors.secondary}
            />
            <Text style={commonStyles.navText}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={commonStyles.navCenter}>
        {/* CHANGES HERE:
          1. Replaced 'commonStyles.navItem' with '[styles.fabButton, styles.shadow]'
          2. Removed the <Text> component
          3. Changed icon name to 'smart-toy' (closest to a robot in MaterialIcons)
          4. Changed icon color to 'white'
        */}
        <TouchableOpacity style={[styles.fabButton, styles.shadow]}>
          <MaterialIcons
            name="smart-toy"
            size={iconSizes.large}
            color="white"
          />
        </TouchableOpacity>
      </View>

      <View style={commonStyles.navRight}>
        {navigationItems.right.map((item, index) => (
          <TouchableOpacity key={index} style={commonStyles.navItem}>
            <MaterialIcons
              name={item.icon}
              size={iconSizes.regular}
              color={iconColors.secondary}
            />
            <Text style={commonStyles.navText}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

// --- ADD THESE STYLES ---
const styles = StyleSheet.create({
  fabButton: {
    // Positioning
    position: 'relative', // Use 'relative' to lift it from its row position
    bottom: 20, // Lifts the button up (adjust this value as needed)

    // Shape & Color
    width: 60,
    height: 60,
    borderRadius: 30, // Makes it a perfect circle
    backgroundColor: '#007AFF', // Bright blue from the image

    // Icon Alignment
    alignItems: 'center',
    justifyContent: 'center',
  },
  shadow: {
    // Shadow using modern boxShadow property
    boxShadow: '0px 3px 4.65px rgba(0, 0, 0, 0.27)',
    // Elevation for Android
    elevation: 6,
  },
});

export default BottomNav;
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { iconSizes, getIconColor } from '../constants/icons';
import { commonStyles, getChangeStyle } from '../theme/styles';
import { useTranslation } from '../i18n/LanguageContext';

const DashboardCard = ({ card, onPress }) => {
  const iconColor = getIconColor('primary');
  const { t } = useTranslation();

  return (
    <TouchableOpacity style={commonStyles.dashboardCard} onPress={onPress}>
      <View style={commonStyles.cardHeader}>
        <View style={commonStyles.cardIconContainer}>
          <MaterialIcons
            name={card.icon}
            size={iconSizes.regular}
            color={iconColor}
          />
        </View>
        <Text style={commonStyles.cardTitle}>{t(card.title)}</Text>
      </View>
      
      {card.description ? (
        <Text style={commonStyles.cardDescription}>{t(card.subtitle)}</Text>
      ) : (
        <>
          <Text style={commonStyles.cardSubtitle}>{t(card.subtitle)}</Text>
          <Text style={commonStyles.cardValue}>{card.value}</Text>
          <Text style={[
            commonStyles.cardChange,
            getChangeStyle(card.changeType)
          ]}>
            {card.change}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
};

export default DashboardCard;
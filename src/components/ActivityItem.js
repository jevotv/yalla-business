import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { iconSizes, getIconColor } from '../constants/icons';
import { commonStyles, getActivityIconStyle } from '../theme/styles';
import { useTranslation } from '../i18n/LanguageContext';

const ActivityItem = ({ activity, onPress }) => {
  const iconColor = getIconColor(activity.type);
  const iconContainerStyle = getActivityIconStyle(activity.type);
  const { t } = useTranslation();

  return (
    <TouchableOpacity style={commonStyles.activityItem} onPress={onPress}>
      <View style={[
        commonStyles.activityIcon,
        iconContainerStyle
      ]}>
        <MaterialIcons
          name={activity.icon}
          size={iconSizes.medium}
          color={iconColor}
        />
      </View>
      <View style={commonStyles.activityContent}>
        <Text style={commonStyles.activityTitle}>{t(activity.title)}</Text>
        <Text style={commonStyles.activityTime}>{t(activity.time)}</Text>
      </View>
      <MaterialIcons
        name="chevron-right"
        size={iconSizes.medium}
        color="#616f89"
      />
    </TouchableOpacity>
  );
};

export default ActivityItem;
import { StyleSheet, Platform } from 'react-native';

export const commonStyles = StyleSheet.create({
  // Container styles
  container: {
    flex: 1,
    backgroundColor: '#f6f6f8',
  },
  
  scrollView: {
    flex: 1,
  },
  
  scrollContent: {
    paddingBottom: 100, // Space for bottom nav
  },

  // Card styles
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#dbdfe6',
  },
  
  cardSmall: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#dbdfe6',
  },

  // Header styles
  header: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#f6f6f8',
    borderBottomWidth: 1,
    borderBottomColor: '#dbdfe6',
  },
  
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 48,
  },
  
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111318',
    marginLeft: 12,
  },

  // Button styles
  iconButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  button: {
    height: 36,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#dbdfe6',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  buttonActive: {
    backgroundColor: '#135bec',
    borderColor: '#135bec',
  },
  
  buttonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111318',
  },
  
  buttonTextActive: {
    color: 'white',
    marginRight: 4,
  },

  // Period container styles
  periodContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 8,
    marginTop: 8,
  },

  // Grid styles
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    gap: 16,
    marginTop: 16,
  },

  // Dashboard card styles
  dashboardCard: {
    width: '47%',
    minHeight: 148,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#dbdfe6',
  },
  
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  
  cardIconContainer: {
    marginRight: 8,
  },
  
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111318',
  },
  
  cardSubtitle: {
    fontSize: 14,
    color: '#616f89',
    marginBottom: 8,
  },
  
  cardValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111318',
    marginBottom: 8,
  },
  
  cardChange: {
    fontSize: 14,
    fontWeight: '500',
  },
  
  cardDescription: {
    fontSize: 14,
    color: '#616f89',
    flex: 1,
  },

  // Section styles
  section: {
    paddingHorizontal: 16,
    marginTop: 16,
  },
  
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111318',
    marginBottom: 16,
  },

  // Goal styles
  goalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  
  goalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111318',
  },
  
  goalPercentage: {
    fontSize: 14,
    fontWeight: '500',
    color: '#616f89',
  },
  
  progressBar: {
    width: '100%',
    height: 10,
    backgroundColor: '#f6f6f8',
    borderRadius: 5,
    marginBottom: 8,
  },
  
  progress: {
    height: 10,
    backgroundColor: '#135bec',
    borderRadius: 5,
  },
  
  goalAmount: {
    fontSize: 14,
    color: '#616f89',
  },

  // Trend styles
  trendCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#dbdfe6',
  },
  
  trendHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  
  trendValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111318',
  },
  
  trendChange: {
    fontSize: 14,
    fontWeight: '500',
    color: '#7ED321',
  },
  
  trendFilter: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: '#dbdfe6',
    borderRadius: 6,
  },
  
  trendFilterText: {
    fontSize: 14,
    color: '#616f89',
    marginRight: 4,
  },

  // Chart styles
  chartPlaceholder: {
    height: 160,
    backgroundColor: '#f6f6f8',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  chartPlaceholderText: {
    fontSize: 16,
    color: '#616f89',
  },

  // Activity styles
  activityList: {
    gap: 12,
  },
  
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#dbdfe6',
  },
  
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  
  activityContent: {
    flex: 1,
  },
  
  activityTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111318',
    marginBottom: 4,
  },
  
  activityTime: {
    fontSize: 12,
    color: '#616f89',
  },

  // Navigation styles
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#dbdfe6',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: Platform.OS === 'ios' ? 20 : 16,
  },

  navLeft: {
    flexDirection: 'row',
    width: '30%',
    justifyContent: 'space-around',
  },

  navCenter: {
    flexDirection: 'row',
    width: '40%',
    justifyContent: 'center',
  },

  navRight: {
    flexDirection: 'row',
    width: '30%',
    justifyContent: 'space-around',
  },
  
  navItem: {
    alignItems: 'center',
    gap: 4,
  },
  
  navText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#616f89',
  },
  
  fab: {
    position: 'absolute',
    top: -24,
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#135bec',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0px 4px 4.65px rgba(0, 0, 0, 0.3)',
    elevation: 8,
  },

  // Status styles
  positive: {
    color: '#7ED321',
  },
  
  negative: {
    color: '#D0021B',
  },
  
  activityIconPositive: {
    backgroundColor: '#7ED32120',
  },
  
  activityIconNegative: {
    backgroundColor: '#D0021B20',
  },
  
  activityIconPrimary: {
    backgroundColor: '#135bec20',
  },

  // Dropdown styles
  dropdown: {
    position: 'absolute',
    top: 35,
    right: 0,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#dbdfe6',
    borderRadius: 6,
    minWidth: 100,
    boxShadow: '0px 2px 3.84px rgba(0, 0, 0, 0.1)',
    elevation: 5,
    zIndex: 1000,
  },

  dropdownItem: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f6f6f8',
  },

  dropdownItemText: {
    fontSize: 14,
    color: '#111318',
  },

  dropdownItemTextSelected: {
    color: '#135bec',
    fontWeight: '500',
  },

  // Customer screen styles
  customerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#dbdfe6',
    minHeight: 72,
  },

  customerCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  customerAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 16,
  },

  customerInfo: {
    flex: 1,
  },

  customerName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111318',
    marginBottom: 4,
  },

  customerEmail: {
    fontSize: 14,
    color: '#616f89',
    marginBottom: 8,
  },

  customerDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  customerSales: {
    fontSize: 14,
    fontWeight: '500',
    color: '#111318',
  },

  tierBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },

  tierDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },

  tierText: {
    fontSize: 12,
    fontWeight: '500',
  },

  // Search bar styles
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 48,
    backgroundColor: '#f6f6f8',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#dbdfe6',
  },

  searchIconContainer: {
    paddingLeft: 16,
    paddingRight: 12,
  },

  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#111318',
    paddingRight: 16,
  },

  // Expandable card styles
  expandableCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#dbdfe6',
  },

  expandableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },

  expandableHeaderLeft: {
    flex: 1,
  },

  expandableTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },

  expandableTitle: {
    fontSize: 14,
    color: '#616f89',
    marginRight: 8,
  },

  expandableDropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f6f6f8',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },

  expandablePeriodText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#111318',
    marginRight: 4,
  },

  expandableValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#111318',
  },

  expandableButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f6f6f8',
    justifyContent: 'center',
    alignItems: 'center',
  },

  expandableContent: {
    marginTop: 16,
  },

  expandableDivider: {
    height: 1,
    backgroundColor: '#dbdfe6',
    marginBottom: 16,
  },

  expandableMetricsGrid: {
    gap: 12,
  },

  expandableMetricItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  expandableMetricLabel: {
    fontSize: 12,
    color: '#616f89',
    flex: 1,
  },

  expandableMetricValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111318',
  },

  // Enhanced Return Tabs for better RTL support
  returnTabs: {
    flexDirection: 'row',
    backgroundColor: '#f1f3f4',
    borderRadius: 16,
    padding: 6,
    marginBottom: 20,
    marginHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  returnTab: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
    marginHorizontal: 2,
  },
  
  returnTabActive: {
    backgroundColor: 'white',
    boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.15)',
    elevation: 4,
    borderWidth: 2,
    borderColor: '#135bec',
  },
  
  returnTabInactive: {
    backgroundColor: 'transparent',
  },
  
  returnTabText: {
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  
  returnTabTextActive: {
    color: '#135bec',
    fontWeight: '700',
  },
  
  returnTabTextInactive: {
    color: '#6c757d',
    fontWeight: '500',
  },
  
  returnActionButtons: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  
  returnActionButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  
  returnPrimaryButton: {
    backgroundColor: '#135bec',
  },
  
  returnSecondaryButton: {
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#135bec',
  },
  
  returnButtonText: {
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'center',
  },
  
  returnButtonTextPrimary: {
    color: 'white',
  },
  
  returnButtonTextSecondary: {
    color: '#135bec',
  },
  
  // Status and metric styles
  returnStatusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 6,
  },
  
  returnStatusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  
  returnStatusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  
  returnMetricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  
  returnMetricItem: {
    flex: 1,
    minWidth: '45%',
  },
  
  returnMetricLabel: {
    fontSize: 12,
    color: '#616f89',
    marginBottom: 4,
  },
  
  returnMetricValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111318',
  },
});

// Utility functions for common style combinations
export const getButtonStyle = (isActive = false) => [
  commonStyles.button,
  isActive && commonStyles.buttonActive,
];

export const getButtonTextStyle = (isActive = false) => [
  commonStyles.buttonText,
  isActive && commonStyles.buttonTextActive,
];

export const getChangeStyle = (changeType) => {
  switch (changeType) {
    case 'positive':
      return commonStyles.positive;
    case 'negative':
      return commonStyles.negative;
    default:
      return {};
  }
};

export const getActivityIconStyle = (type) => {
  switch (type) {
    case 'positive':
      return commonStyles.activityIconPositive;
    case 'negative':
      return commonStyles.activityIconNegative;
    case 'primary':
      return commonStyles.activityIconPrimary;
    default:
      return {};
  }
};
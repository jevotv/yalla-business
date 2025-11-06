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
import SearchBar from '../components/SearchBar';
import ExpandableCard from '../components/ExpandableCard';
import FlowButton from '../components/FlowButton';

// Constants and theme
import { colors } from '../theme/colors';
import { textStyles } from '../theme/typography';
import { commonStyles, getButtonStyle, getButtonTextStyle } from '../theme/styles';
import { useTranslation } from '../i18n/LanguageContext';
import { useTranslatedData } from '../i18n/translationUtils';

const ManagementScreen = ({
  // Required props
  title,
  data,
  statusOptions,
  kpiData,
  translations,
  onItemPress,
  onAddNew,
  
  // Optional props with defaults
  onBack,
  onStatusFilter,
  onPeriodChange,
  itemLabelField = 'name',
  itemValueField = 'value',
  entityKey = 'item', // for translation keys
  showSearch = true,
  showStatusFilter = true,
  showKPICard = true,
  showFAB = true,
  
  // Navigation prop
  navigation,
  
  // Custom renderers (optional)
  renderCustomHeader,
  renderCustomItem,
  renderCustomKPICard,
}) => {
  const { t, currentLanguage, isRTL } = useTranslation();
  const { getTranslatedPeriods } = useTranslatedData();
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Handler functions
  const handleHomePress = () => {
    if (onBack) {
      onBack();
    }
  };

  const handleSearchPress = () => {
    console.log('Search pressed');
  };

  const handleItemPress = (item) => {
    // Check if this is an invoice/order item that should navigate to details
    const isInvoiceRelated = ['order', 'purchase', 'sales', 'invoice'].some(type =>
      translations.entityPrefix?.includes(type) ||
      translations.titleKey?.includes(type) ||
      entityKey === type
    );
    
    if (isInvoiceRelated && navigation) {
      // Navigate to invoice detail screen
      const invoiceType = translations.entityPrefix?.includes('purchase') || entityKey === 'purchase' ? 'purchase' : 'sales';
      navigation.navigate('invoice-detail', {
        invoiceId: item.id,
        invoiceType: invoiceType,
        invoiceData: item
      });
    } else if (onItemPress) {
      // Fall back to existing onItemPress handler
      onItemPress(item);
    }
  };

  const handleStatusFilter = (status) => {
    setSelectedStatus(status);
    if (onStatusFilter) {
      onStatusFilter(status);
    }
  };

  const handlePeriodChange = (period) => {
    if (onPeriodChange) {
      onPeriodChange(period);
    }
  };

  // Filter data based on selected status
  const filteredData = data.filter(item => {
    if (selectedStatus === 'all') return true;
    return item.status === selectedStatus;
  });

  // Filter by search query
  const searchedData = filteredData.filter(item => {
    const searchFields = [itemLabelField, 'id', itemValueField];
    return searchFields.some(field => {
      const value = item[field];
      if (typeof value === 'string') {
        return value.toLowerCase().includes(searchQuery.toLowerCase());
      }
      if (typeof value === 'number') {
        return value.toString().includes(searchQuery);
      }
      return false;
    });
  });

  const getStatusConfig = (status) => {
    const configs = {};
    statusOptions.forEach(option => {
      configs[option.key] = {
        label: t(`${translations.statusPrefix}.${option.key}`),
        active: selectedStatus === option.key
      };
    });
    configs['all'] = { 
      label: t(`${translations.statusPrefix}.all`), 
      active: selectedStatus === 'all' 
    };
    return configs[status] || configs.all;
  };

  const getStatusBadgeStyle = (status) => {
    const styles = {
      shipped: {
        container: { backgroundColor: '#dcfce7' },
        dot: { backgroundColor: '#16a34a' },
        text: { color: '#15803d' }
      },
      processing: {
        container: { backgroundColor: '#fef3c7' },
        dot: { backgroundColor: '#f59e0b' },
        text: { color: '#92400e' }
      },
      delivered: {
        container: { backgroundColor: '#dbeafe' },
        dot: { backgroundColor: '#3b82f6' },
        text: { color: '#1d4ed8' }
      },
      cancelled: {
        container: { backgroundColor: '#fee2e2' },
        dot: { backgroundColor: '#dc2626' },
        text: { color: '#b91c1c' }
      },
      pending: {
        container: { backgroundColor: '#fef3c7' },
        dot: { backgroundColor: '#f59e0b' },
        text: { color: '#92400e' }
      },
      received: {
        container: { backgroundColor: '#dcfce7' },
        dot: { backgroundColor: '#16a34a' },
        text: { color: '#15803d' }
      },
      approved: {
        container: { backgroundColor: '#dbeafe' },
        dot: { backgroundColor: '#3b82f6' },
        text: { color: '#1d4ed8' }
      }
    };
    return styles[status] || styles.processing;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(currentLanguage === 'ar' ? 'ar-SA' : 'en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const renderItemCard = (item) => {
    if (renderCustomItem) {
      return renderCustomItem(item, handleItemPress);
    }

    const statusConfig = getStatusBadgeStyle(item.status);
    
    return (
      <TouchableOpacity
        key={item.id}
        style={styles.itemCard}
        onPress={() => handleItemPress(item)}
        activeOpacity={0.7}
      >
        <View style={styles.itemCardContent}>
          <View style={styles.itemHeader}>
            <View style={styles.itemInfo}>
              <Text style={styles.itemId}>
                {t(translations.entityPrefix)} #{item.id}
              </Text>
              <Text style={styles.itemLabel}>{item[itemLabelField]}</Text>
            </View>
            
            {item.status && (
              <View style={[styles.statusBadge, statusConfig.container]}>
                <View style={[styles.statusDot, statusConfig.dot]} />
                <Text style={[styles.statusText, statusConfig.text]}>
                  {t(`${translations.statusPrefix}.${item.status}`)}
                </Text>
              </View>
            )}
          </View>
          
          <View style={styles.itemFooter}>
            {item.date && (
              <Text style={styles.itemDate}>
                {formatDate(item.date)}
              </Text>
            )}
            {item[itemValueField] && (
              <Text style={styles.itemValue}>
                {typeof item[itemValueField] === 'number' 
                  ? item[itemValueField].toLocaleString() 
                  : item[itemValueField]
                }
                {item.currency ? ` ${item.currency}` : ''}
              </Text>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderHeader = () => {
    if (renderCustomHeader) {
      return renderCustomHeader();
    }

    return (
      <View style={styles.header}>
        <View style={styles.headerTitleContainer}>
          <TouchableOpacity onPress={handleHomePress} style={styles.homeIconButton}>
            <MaterialIcons name="home" size={24} color="#111318" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{t(translations.titleKey)}</Text>
        </View>
        {showSearch && (
          <TouchableOpacity
            style={styles.searchButton}
            onPress={handleSearchPress}
            testID="search-button"
          >
            <MaterialIcons name="search" size={24} color="#616f89" />
          </TouchableOpacity>
        )}
      </View>
    );
  };

  const renderKPICard = () => {
    if (!showKPICard || !kpiData) return null;

    if (renderCustomKPICard) {
      return renderCustomKPICard(kpiData);
    }

    return (
      <View style={styles.kpiCard}>
        <ExpandableCard
          title={t(`${translations.kpiPrefix}.totalSales`)}
          value={kpiData.totalSales?.value || '0'}
          period={t(`${translations.kpiPrefix}.thisMonth`)}
          periods={getTranslatedPeriods()}
          onPeriodChange={handlePeriodChange}
          customExpandedContent={
            <View style={styles.metricsGrid}>
              {kpiData.averageInvoiceValue && (
                <View style={styles.metricItem}>
                  <Text style={styles.metricLabel}>{t(`${translations.kpiPrefix}.averageInvoiceValue`)}</Text>
                  <Text style={styles.metricValue}>
                    {kpiData.averageInvoiceValue.value} {kpiData.averageInvoiceValue.currency || ''}
                  </Text>
                </View>
              )}
              {kpiData.totalInvoices && (
                <View style={styles.metricItem}>
                  <Text style={styles.metricLabel}>{t(`${translations.kpiPrefix}.totalInvoices`)}</Text>
                  <Text style={styles.metricValue}>{kpiData.totalInvoices.value}</Text>
                </View>
              )}
              {kpiData.topProduct && (
                <View style={styles.metricItem}>
                  <Text style={styles.metricLabel}>{t(`${translations.kpiPrefix}.topProduct`)}</Text>
                  <Text style={styles.metricValue}>{kpiData.topProduct.name}</Text>
                </View>
              )}
              {kpiData.salesGrowth && (
                <View style={styles.metricItem}>
                  <Text style={styles.metricLabel}>{t(`${translations.kpiPrefix}.salesGrowth`)}</Text>
                  <View style={styles.growthContainer}>
                    <Text style={[styles.metricValue, styles.growthText]}>
                      {kpiData.salesGrowth.percentage}
                    </Text>
                    <MaterialIcons 
                      name="trending_up" 
                      size={16} 
                      color={kpiData.salesGrowth.positive ? '#16a34a' : '#dc2626'} 
                    />
                  </View>
                </View>
              )}
              {kpiData.outstandingReceivables && (
                <View style={styles.metricItemFull}>
                  <Text style={styles.metricLabel}>{t(`${translations.kpiPrefix}.outstandingReceivables`)}</Text>
                  <Text style={[styles.metricValue, styles.warningText]}>
                    {kpiData.outstandingReceivables.value} {kpiData.outstandingReceivables.currency || ''}
                  </Text>
                </View>
              )}
            </View>
          }
        />
      </View>
    );
  };

  const renderStatusFilters = () => {
    if (!showStatusFilter) return null;

    const filterOptions = [
      { key: 'all', label: t(`${translations.statusPrefix}.all`) },
      ...statusOptions.map(option => ({
        key: option.key,
        label: t(`${translations.statusPrefix}.${option.key}`)
      }))
    ];

    return (
      <View style={styles.filterContainer}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterScrollContent}
        >
          {filterOptions.map((option) => (
            <FlowButton
              key={option.key}
              text={option.label}
              onPress={() => handleStatusFilter(option.key)}
              variant={option.key === selectedStatus ? 'primary' : 'secondary'}
              size="small"
              style={styles.filterButton}
              testID={`filter-${option.key}`}
            />
          ))}
        </ScrollView>
      </View>
    );
  };

  const renderSearchBar = () => {
    if (!showSearch) return null;

    return (
      <View style={styles.searchContainer}>
        <SearchBar
          placeholder={t(`${translations.searchPlaceholderKey}`)}
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={styles.searchBar}
        />
      </View>
    );
  };

  const renderEmptyState = () => {
    const hasSearchQuery = searchQuery.length > 0;
    return (
      <View style={styles.emptyState}>
        <View style={styles.emptyIcon}>
          <MaterialIcons name="upcoming" size={48} color="#9ca3af" />
        </View>
        <Text style={styles.emptyTitle}>
          {t(`${translations.emptyState}.title`)}
        </Text>
        <Text style={styles.emptySubtitle}>
          {hasSearchQuery 
            ? t(`${translations.emptyState}.noSearchResults`) 
            : t(`${translations.emptyState}.endOfList`)
          }
        </Text>
      </View>
    );
  };

  const renderFAB = () => {
    if (!showFAB || !onAddNew) return null;

    return (
      <TouchableOpacity
        style={styles.fab}
        onPress={onAddNew}
        testID="add-item-fab"
        activeOpacity={0.8}
      >
        <MaterialIcons name="add" size={28} color="#ffffff" />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={commonStyles.container}>
      {/* Header */}
      {renderHeader()}

      <ScrollView style={commonStyles.scrollView} contentContainerStyle={commonStyles.scrollContent}>
        {/* KPI Card */}
        {renderKPICard()}

        {/* Status Filter Buttons */}
        {renderStatusFilters()}

        {/* Search Bar */}
        {renderSearchBar()}

        {/* Items List */}
        <View style={styles.itemsList}>
          {searchedData.length > 0 ? (
            searchedData.map(renderItemCard)
          ) : (
            renderEmptyState()
          )}
        </View>
      </ScrollView>

      {/* Floating Action Button */}
      {renderFAB()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  homeIconButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111318',
    lineHeight: 24,
    letterSpacing: -0.015,
  },
  searchButton: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  kpiCard: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  filterContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  filterScrollContent: {
    gap: 8,
  },
  filterButton: {
    flexShrink: 0,
  },
  searchContainer: {
    paddingHorizontal: 16,
  },
  searchBar: {
    marginBottom: 16,
  },
  itemsList: {
    paddingHorizontal: 16,
    gap: 12,
  },
  itemCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#f3f4f6',
    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  itemCardContent: {
    gap: 12,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  itemInfo: {
    flex: 1,
  },
  itemId: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111318',
    marginBottom: 4,
  },
  itemLabel: {
    fontSize: 14,
    color: '#616f89',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 6,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  itemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemDate: {
    fontSize: 14,
    color: '#616f89',
  },
  itemValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111318',
  },
  metricsGrid: {
    gap: 16,
    marginTop: 16,
  },
  metricItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  metricItemFull: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '100%',
  },
  metricLabel: {
    fontSize: 12,
    color: '#6b7280',
    flex: 1,
  },
  metricValue: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111318',
  },
  growthContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  growthText: {
    color: '#16a34a',
  },
  warningText: {
    color: '#f59e0b',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 64,
    paddingHorizontal: 32,
  },
  emptyIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111318',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#616f89',
    textAlign: 'center',
    lineHeight: 20,
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0px 4px 4.65px rgba(0, 0, 0, 0.3)',
    elevation: 8,
  },
});

export default ManagementScreen;
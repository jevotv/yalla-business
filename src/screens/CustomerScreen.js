import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

// Components
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import ExpandableCard from '../components/ExpandableCard';
import AddContactDialog from '../components/AddContactDialog';
import FlowButton from '../components/FlowButton';

// Constants and theme
import { customers, customerKPIs } from '../constants/data';
import { colors } from '../theme/colors';
import { textStyles } from '../theme/typography';
import { commonStyles } from '../theme/styles';
import { useTranslation } from '../i18n/LanguageContext';

const CustomerScreen = ({ onBack }) => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('customers');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newContacts, setNewContacts] = useState([]);
  const [currentType, setCurrentType] = useState('customer');

  // Handler functions
  const handleMenuPress = () => {
    if (onBack) {
      onBack();
    }
  };

  const handleHomePress = () => {
    if (onBack) {
      onBack();
    }
  };

  const handleAddNewPress = () => {
    console.log('Add New pressed');
    setCurrentType(activeTab === 'customers' ? 'customer' : 'vendor');
    setShowAddDialog(true);
  };

  const handleSaveContact = (contactData) => {
    console.log('Saving contact:', contactData);
    
    // Add the new contact to the list
    const newContact = {
      id: Date.now().toString(),
      ...contactData,
      createdAt: new Date().toISOString(),
    };

    setNewContacts(prev => [...prev, newContact]);
    setShowAddDialog(false);
    
    // Show success message
    Alert.alert(
      t('common.success'),
      `${contactData.type === 'customer' ? t('common.customer') : t('common.vendor')} "${contactData.name}" was added successfully!`,
      [{ text: 'OK' }]
    );
  };

  const handleCustomerPress = (customer) => {
    console.log('Customer pressed:', customer.name);
  };

  const handlePeriodChange = (period) => {
    console.log('Period changed to:', period);
  };

  // Filter customers based on search query
  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
      <SafeAreaView style={commonStyles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerTitleContainer}>
            <TouchableOpacity onPress={handleHomePress} style={styles.homeIconButton}>
              <MaterialIcons name="home" size={24} color="#111318" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>{t('header.contacts')}</Text>
          </View>
        </View>

      <ScrollView style={commonStyles.scrollView} contentContainerStyle={commonStyles.scrollContent}>
        {/* Expandable KPI Card */}
        <ExpandableCard
          title={t('customer.kpiCard.newCustomers')}
          value="12"
          period={t('customer.thisMonth')}
          onPeriodChange={handlePeriodChange}
          customExpandedContent={
            <View style={styles.metricsGrid}>
              <View style={styles.metricItem}>
                <Text style={styles.metricLabel}>{t('customer.kpiCard.totalCustomers')}</Text>
                <Text style={styles.metricValue}>152</Text>
              </View>
              <View style={styles.metricItem}>
                <Text style={styles.metricLabel}>{t('customer.kpiCard.totalReceivables')}</Text>
                <Text style={styles.metricValue}>$15,430</Text>
              </View>
              <View style={styles.metricItem}>
                <Text style={styles.metricLabel}>{t('customer.kpiCard.activeThisMonth')}</Text>
                <Text style={styles.metricValue}>45</Text>
              </View>
              <View style={styles.metricItemFull}>
                <Text style={styles.metricLabel}>{t('customer.kpiCard.topCustomers')}</Text>
                <View style={styles.topCustomersList}>
                  <View style={styles.topCustomerItem}>
                    <Text style={styles.topCustomerName}>1. Eleanor Vance</Text>
                    <Text style={styles.topCustomerValue}>$2,400</Text>
                  </View>
                  <View style={styles.topCustomerItem}>
                    <Text style={styles.topCustomerName}>2. Marcus Holloway</Text>
                    <Text style={styles.topCustomerValue}>$1,850</Text>
                  </View>
                  <View style={styles.topCustomerItem}>
                    <Text style={styles.topCustomerName}>3. Clara Oswald</Text>
                    <Text style={styles.topCustomerValue}>$1,200</Text>
                  </View>
                </View>
              </View>
            </View>
          }
        />

        {/* Tab Selector and Search */}
        <View style={styles.tabContainer}>
          <View style={styles.tabButtons}>
            <TouchableOpacity
              style={[styles.tabButton, activeTab === 'customers' && styles.tabButtonActive]}
              onPress={() => setActiveTab('customers')}
            >
              <Text style={[styles.tabText, activeTab === 'customers' && styles.tabTextActive]}>
                {t('common.customers')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tabButton, activeTab === 'vendors' && styles.tabButtonActive]}
              onPress={() => setActiveTab('vendors')}
            >
              <Text style={[styles.tabText, activeTab === 'vendors' && styles.tabTextActive]}>
                {t('common.vendors')}
              </Text>
            </TouchableOpacity>
          </View>

          <SearchBar
            placeholder={t('customer.searchPlaceholder')}
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={styles.searchBar}
          />
        </View>

        {/* Customer List */}
        {activeTab === 'customers' ? (
          <View style={styles.customerList}>
            {filteredCustomers.map((customer) => (
              <TouchableOpacity key={customer.id} style={styles.customerCard} onPress={() => handleCustomerPress(customer)}>
                <View style={styles.customerCardContent}>
                  <Image source={{ uri: customer.avatar }} style={styles.customerAvatar} />
                  <View style={styles.customerInfo}>
                    <Text style={styles.customerName}>{customer.name}</Text>
                    <Text style={styles.customerEmail}>{customer.email}</Text>
                    <View style={styles.customerDetails}>
                      <Text style={styles.customerSales}>{t('customer.totalSales')}: ${customer.totalSales.toLocaleString()}</Text>
                      <View style={[styles.tierBadge, {
                        backgroundColor: customer.tier === 'gold' ? '#fef3c7' :
                                       customer.tier === 'silver' ? '#f3f4f6' : '#fef3c7'
                      }]}>
                        <View style={[styles.tierDot, {
                          backgroundColor: customer.tier === 'gold' ? '#eab308' :
                                         customer.tier === 'silver' ? '#9ca3af' : '#cd7f32'
                        }]} />
                        <Text style={[styles.tierText, {
                          color: customer.tier === 'gold' ? '#92400e' :
                                customer.tier === 'silver' ? '#374151' : '#92400e'
                        }]}>
                          {t(`customer.${customer.tier}Tier`)}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
                <MaterialIcons name="chevron-right" size={24} color="#9ca3af" />
              </TouchableOpacity>
            ))}
            
            {/* Display newly added contacts */}
            {newContacts.filter(contact => contact.type === 'customer').map((contact) => (
              <TouchableOpacity key={contact.id} style={styles.customerCard}>
                <View style={styles.customerCardContent}>
                  <View style={[styles.customerAvatar, styles.newContactAvatar]}>
                    <MaterialIcons name="person" size={24} color="#ffffff" />
                  </View>
                  <View style={styles.customerInfo}>
                    <Text style={styles.customerName}>{contact.name}</Text>
                    <Text style={styles.customerEmail}>{contact.phone || t('customer.noPhone')}</Text>
                    <View style={styles.customerDetails}>
                      <Text style={styles.customerSales}>{t('customer.newContact')}</Text>
                      <View style={[styles.tierBadge, { backgroundColor: '#dcfce7' }]}>
                        <View style={[styles.tierDot, { backgroundColor: '#16a34a' }]} />
                        <Text style={[styles.tierText, { color: '#15803d' }]}>
                          {t('customer.new')}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
                <MaterialIcons name="chevron-right" size={24} color="#9ca3af" />
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <View style={styles.emptyState}>
            <View style={styles.emptyIcon}>
              <MaterialIcons name="group-add" size={32} color="#135bec" />
            </View>
            <Text style={styles.emptyTitle}>{t('customer.noVendorsYet')}</Text>
            <Text style={styles.emptySubtitle}>
              {t('customer.addFirstVendor')}
            </Text>
            
            {/* Display newly added vendors */}
            {newContacts.filter(contact => contact.type === 'vendor').map((contact) => (
              <View key={contact.id} style={styles.customerCard}>
                <View style={styles.customerCardContent}>
                  <View style={[styles.customerAvatar, styles.newContactAvatar]}>
                    <MaterialIcons name="business" size={24} color="#ffffff" />
                  </View>
                  <View style={styles.customerInfo}>
                    <Text style={styles.customerName}>{contact.name}</Text>
                    <Text style={styles.customerEmail}>{contact.phone || t('customer.noPhone')}</Text>
                    <View style={styles.customerDetails}>
                      <Text style={styles.customerSales}>{t('customer.newVendor')}</Text>
                      <View style={[styles.tierBadge, { backgroundColor: '#dcfce7' }]}>
                        <View style={[styles.tierDot, { backgroundColor: '#16a34a' }]} />
                        <Text style={[styles.tierText, { color: '#15803d' }]}>
                          {t('customer.new')}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      {/* Add Contact Dialog */}
      <AddContactDialog
        isVisible={showAddDialog}
        onClose={() => setShowAddDialog(false)}
        onSave={handleSaveContact}
        contactType={currentType}
      />

      {/* Floating Action Button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={handleAddNewPress}
        testID="add-contact-fab"
        activeOpacity={0.8}
      >
        <MaterialIcons name="add" size={28} color="#ffffff" />
      </TouchableOpacity>
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
  tabContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  tabButtons: {
    flexDirection: 'row',
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    padding: 4,
    marginBottom: 16,
    gap: 4,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 6,
  },
  tabButtonActive: {
    backgroundColor: '#ffffff',
    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6b7280',
  },
  tabTextActive: {
    color: '#135bec',
  },
  searchBar: {
    marginBottom: 16,
  },
  customerList: {
    paddingHorizontal: 16,
    gap: 12,
  },
  customerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#f3f4f6',
    minHeight: 72,
    justifyContent: 'space-between',
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
    lineHeight: 24,
    marginBottom: 4,
  },
  customerEmail: {
    fontSize: 14,
    color: '#616f89',
    lineHeight: 20,
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
    marginRight: 12,
  },
  tierBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    gap: 6,
  },
  tierDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  tierText: {
    fontSize: 12,
    fontWeight: '500',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 64,
    paddingHorizontal: 32,
  },
  emptyIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#135bec20',
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
    marginBottom: 24,
    lineHeight: 20,
  },
  metricsGrid: {
    gap: 16,
  },
  metricItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  metricItemFull: {
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
  topCustomersList: {
    marginTop: 8,
    gap: 8,
  },
  topCustomerItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  topCustomerName: {
    fontSize: 14,
    color: '#374151',
  },
  topCustomerValue: {
      fontSize: 14,
      fontWeight: '500',
      color: '#6b7280',
    },
    newContactAvatar: {
      backgroundColor: '#135bec',
      justifyContent: 'center',
      alignItems: 'center',
    },
    fab: {
      position: 'absolute',
      bottom: 24,
      right: 24,
      width: 56,
      height: 56,
      borderRadius: 28,
      backgroundColor: '#135bec',
      justifyContent: 'center',
      alignItems: 'center',
      boxShadow: '0px 4px 4.65px rgba(0, 0, 0, 0.3)',
      elevation: 8,
    },
  });

export default CustomerScreen;
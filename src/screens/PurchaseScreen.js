import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TextInput,
  Alert,
  Image
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';

// Components
import FlowButton from '../components/FlowButton';

// Constants and theme
import { colors } from '../theme/colors';
import { products, categories } from '../constants/data';

// Mock purchase product data
const mockPurchaseProducts = [
  {
    id: 1,
    name: 'Office Supplies Bulk Pack',
    grade: 'A',
    stock: 5,
    price: 250.00,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDcUGXdOqy59BZqpt4YKeG56omTut30s0_B3pSdDOn80HQREEfHA1BHBogZUA1JeAvjv62-PkM85mWjF04GF8apg9f7Afm3X8WhNXq3_Yxw9eDooKkAF2Sv-MP5I0uAqRzh9QvVU2pxR7umq2Qreo5CXQpe35LtJRINnfeWoCqO2E9bNRwSgnMpKjYL3tVXDD2w1CbwXA9gDU-vhzrRvSwCZGGQWYWkGVj-r2D4C9BpEheNukSknmMfNXYVQWAGiSvTqzDoZT2XpA',
    sku: 'OFF-BULK-001',
    category: 'office'
  },
  {
    id: 2,
    name: 'Raw Materials - Type B',
    grade: 'B',
    stock: 2,
    price: 180.50,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA2Qq9Lb-0793umEGf9K8KTYCalPY9qqE8UpfcFeg91ZpnCJOd4R2KCgEe9gzxvffSAXTQhpbI1zVhVJIRd59QSS13twUzZaCZes2zpJOB3niIGN2fQlfu0MRX5M58RhTVHCI2RxgqG9_HyiTYpr58mmzTUiqr-InCZ_NHRi5afFtrM0389wvR2VdoXteTTnEmuh37YjWVTSEV5QVSbZyfgsT06TT-UGZ6SAlYgeIWACaqwW4rAcms4wNfEj5zDTsx2o_OeYHB7aA',
    sku: 'RAW-TYPEB-002',
    category: 'materials'
  },
  {
    id: 3,
    name: 'Manufacturing Components',
    grade: 'A',
    stock: 0,
    price: 320.00,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAdn66NxYAvqGYeQHW-QzJOvlegquckaUQgpL1AM5l2eEoAP6cwWdxZsNYGP0qOXOGgmo2xq_yZZdt7HI1u1aG7gZF0qtcryim4X2ImDSANZYqV7Xi6tH1qSCA3z27b6W4D2R2fyqoZG5z3o-hhNKDBklVZyI26dupIdgf_8gUug58--MegMBDhX8cA6gm26R_4D2YMAPqBFvZW-AJ5EC8B4-n8sXti47gSmzUebcJluceRh2uSgR19s5RHMGRhYoxyX_bZ0JNccA',
    sku: 'MAN-COMP-003',
    category: 'manufacturing'
  },
  {
    id: 4,
    name: 'Packaging Materials',
    grade: 'C',
    stock: 12,
    price: 75.00,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDJD5DNu2ap09WE3G0h7jKA7G0dG3MfQ96eUp8-RO5NvVuOT1AQLIN0gbVC1n2z855Xk3afxzs_Nrf7QBPGBWmvi5JO32Z1CC0XAc84xMTKS1KL252VvrVXArmZs4ThBzPwWOjoJan9_DSuZmuRkK2mn1WSokQCPHl5BWcxxO0023KWPTHuz2HyeggGuvKTLeQPa1-Kt5zP_5nv-Q5v-5-EGGGEU0T516tne_gVmTtz1wJfzlsqDoayrTe6neBynE4hTm_wJiRSfg',
    sku: 'PAC-MAT-004',
    category: 'packaging'
  }
];

// Render product card for purchase orders
const renderPurchaseProductCard = (product, purchaseOrders, setPurchaseOrders, t) => {
  const [quantity, setQuantity] = useState(1);
  
  const handleAddToPurchase = () => {
    const existingItem = purchaseOrders.find(item => item.id === product.id);
    
    if (existingItem) {
      setPurchaseOrders(purchaseOrders.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      ));
    } else {
      setPurchaseOrders([...purchaseOrders, { ...product, quantity }]);
    }

    Alert.alert(
      t('purchase.addedToPurchaseOrder'),
      t('purchase.addedToPurchaseOrderMessage', {
        quantity,
        productName: product.name
      }),
      [{ text: 'OK', style: 'default' }]
    );
  };

  const adjustQuantity = (delta) => {
    const newQuantity = Math.max(1, quantity + delta);
    setQuantity(newQuantity);
  };

  const gradeColors = {
    'A': { bg: '#dcfce7', text: '#16a34a' },
    'B': { bg: '#fef3c7', text: '#f59e0b' },
    'C': { bg: '#fee2e2', text: '#dc2626' }
  };

  const gradeConfig = gradeColors[product.grade] || gradeColors['A'];

  return (
    <View style={styles.productCard}>
      <Image source={{ uri: product.image }} style={styles.productImage} />
      
      <View style={styles.productInfo}>
        <Text style={styles.productName} numberOfLines={2}>{product.name}</Text>
        <Text style={styles.productGrade}>Grade: {product.grade}</Text>
        <Text style={styles.productStock}>Stock: {product.stock}</Text>
        <Text style={styles.productPrice}>${product.price.toFixed(2)}</Text>
      </View>
      
      <View style={styles.productActions}>
        <View style={styles.quantityControls}>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => adjustQuantity(-1)}
          >
            <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>
          
          <TextInput
            style={styles.quantityInput}
            value={quantity.toString()}
            onChangeText={(text) => setQuantity(parseInt(text) || 1)}
            keyboardType="numeric"
            textAlign="center"
          />
          
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => adjustQuantity(1)}
          >
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity style={styles.addToPurchaseButton} onPress={handleAddToPurchase}>
          <MaterialIcons name="add-shopping-cart" size={16} color="#ffffff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Render inventory stats header
const renderInventoryStats = (inventoryStats, t) => (
  <View style={styles.statsContainer}>
    <View style={styles.statItem}>
      <Text style={styles.statNumber}>{inventoryStats.totalProducts}</Text>
      <Text style={styles.statLabel}>{t('purchase.totalProducts')}</Text>
    </View>
    <View style={styles.statItem}>
      <Text style={[styles.statNumber, { color: '#16a34a' }]}>{inventoryStats.inStock}</Text>
      <Text style={styles.statLabel}>{t('purchase.inStock')}</Text>
    </View>
    <View style={styles.statItem}>
      <Text style={[styles.statNumber, { color: '#f59e0b' }]}>{inventoryStats.lowStock}</Text>
      <Text style={styles.statLabel}>{t('purchase.lowStock')}</Text>
    </View>
    <View style={styles.statItem}>
      <Text style={[styles.statNumber, { color: '#6b7280' }]}>{inventoryStats.outOfStock}</Text>
      <Text style={styles.statLabel}>{t('purchase.outOfStock')}</Text>
    </View>
  </View>
);

// Render category filter buttons
const renderCategoryFilters = (selectedCategory, setSelectedCategory, t) => {
  const filters = [
    { key: 'all', label: 'All' },
    { key: 'office', label: 'Office' },
    { key: 'materials', label: 'Materials' },
    { key: 'manufacturing', label: 'Manufacturing' },
    { key: 'packaging', label: 'Packaging' }
  ];

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.filtersContainer}
    >
      {filters.map((filter) => (
        <TouchableOpacity
          key={filter.key}
          style={[
            styles.filterButton,
            selectedCategory === filter.key && styles.filterButtonActive
          ]}
          onPress={() => setSelectedCategory(filter.key)}
        >
          <Text style={[
            styles.filterButtonText,
            selectedCategory === filter.key && styles.filterButtonTextActive
          ]}>
            {filter.label}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

// Render purchase order summary at bottom
const renderPurchaseSummary = (purchaseOrders, purchaseTotal, purchaseItemCount, navigateToCheckout, t) => {
  if (purchaseOrders.length === 0) return null;

  return (
    <View style={styles.purchaseSummary}>
      <TouchableOpacity
        style={styles.purchaseButton}
        onPress={() => navigateToCheckout(purchaseOrders, 'purchase')}
      >
        <View style={styles.purchaseButtonLeft}>
          <Text style={styles.purchaseButtonText}>{t('purchase.createPurchaseOrder')}</Text>
          <View style={styles.purchaseBadge}>
            <Text style={styles.purchaseBadgeText}>
              {purchaseItemCount} {t('purchase.items')}
            </Text>
          </View>
        </View>
        <View style={styles.purchaseButtonRight}>
          <Text style={styles.purchaseTotalText}>${purchaseTotal.toFixed(2)}</Text>
          <MaterialIcons name="arrow-forward" size={20} color="#ffffff" />
        </View>
      </TouchableOpacity>
    </View>
  );
};

// Render empty state
const renderEmptyState = (searchQuery, searchedProducts, t, navigateToAddProduct) => {
  if (searchedProducts.length > 0) return null;

  return (
    <View style={styles.emptyState}>
      <View style={styles.emptyIcon}>
        <MaterialIcons name="inventory_2" size={48} color="#9ca3af" />
      </View>
      <Text style={styles.emptyTitle}>
        {searchQuery ? t('purchase.noProductsFound') : t('purchase.noProductsAvailable')}
      </Text>
      <Text style={styles.emptySubtitle}>
        {searchQuery
          ? t('purchase.tryAdjustingSearch')
          : t('purchase.productsAppearHere')
        }
      </Text>
      {searchQuery && (
        <FlowButton
          text={t('purchase.addProduct')}
          onPress={navigateToAddProduct}
          variant="primary"
          style={styles.addProductButton}
        />
      )}
    </View>
  );
};

// Render header
const renderHeader = (onBack, t) => (
  <View style={styles.header}>
    <TouchableOpacity style={styles.menuButton} onPress={onBack}>
      <MaterialIcons name="home" size={24} color={colors.text} />
    </TouchableOpacity>
    
    <Text style={styles.headerTitle}>{t('purchase.title')}</Text>
    
    <View style={styles.headerPlaceholder} />
  </View>
);

// Render search bar
const renderSearchBar = (searchQuery, setSearchQuery, t) => (
  <View style={styles.searchContainer}>
    <View style={styles.searchBarContainer}>
      <View style={styles.searchIconContainer}>
        <MaterialIcons name="search" size={20} color="#616f89" />
      </View>
      <TextInput
        style={styles.searchInput}
        placeholder={t('purchase.searchPlaceholder')}
        placeholderTextColor="#616f89"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <TouchableOpacity style={styles.filterIconButton}>
        <MaterialIcons name="filter-list" size={20} color={colors.primary} />
      </TouchableOpacity>
    </View>
  </View>
);

// Render header content
const renderHeaderContent = (
  inventoryStats,
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  t
) => (
  <View style={styles.headerContent}>
    {/* Inventory Stats */}
    {renderInventoryStats(inventoryStats, t)}

    {/* Search Bar */}
    {renderSearchBar(searchQuery, setSearchQuery, t)}

    {/* Category Filters */}
    {renderCategoryFilters(selectedCategory, setSelectedCategory, t)}
  </View>
);

const PurchaseScreen = ({ onBack, navigateToCheckout, navigateToAddProduct }) => {
  const { t } = useTranslation();
  const [purchaseOrders, setPurchaseOrders] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter products by category and search
  const searchedProducts = mockPurchaseProducts.filter(product => {
    const categoryMatch = selectedCategory === 'all' ||
      product.category === selectedCategory;
    
    const searchMatch = !searchQuery ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchQuery.toLowerCase());
    
    return categoryMatch && searchMatch;
  });

  // Calculate purchase order totals
  const purchaseTotal = purchaseOrders.reduce((total, item) => total + (item.price * item.quantity), 0);
  const purchaseItemCount = purchaseOrders.reduce((total, item) => total + item.quantity, 0);

  // Get inventory status
  const getInventoryStats = () => {
    const totalProducts = mockPurchaseProducts.length;
    const lowStock = mockPurchaseProducts.filter(p => p.stock <= 5).length;
    const outOfStock = mockPurchaseProducts.filter(p => p.stock === 0).length;
    const inStock = mockPurchaseProducts.filter(p => p.stock > 5).length;
    
    return { totalProducts, lowStock, outOfStock, inStock };
  };

  const inventoryStats = getInventoryStats();

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      {renderHeader(onBack, t)}

      {/* Scrollable Content */}
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {renderHeaderContent(
          inventoryStats,
          searchQuery,
          setSearchQuery,
          selectedCategory,
          setSelectedCategory,
          t
        )}

        {/* Products Grid */}
        <View style={styles.productsGrid}>
          {searchedProducts.length > 0 ? (
            searchedProducts.map((product) =>
              renderPurchaseProductCard(product, purchaseOrders, setPurchaseOrders, t)
            )
          ) : (
            renderEmptyState(searchQuery, searchedProducts, t, navigateToAddProduct)
          )}
        </View>
      </ScrollView>

      {/* Purchase Order Summary */}
      {renderPurchaseSummary(purchaseOrders, purchaseTotal, purchaseItemCount, navigateToCheckout, t)}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f6f8',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#f6f6f8',
    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  menuButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    flex: 1,
    textAlign: 'center',
  },
  headerPlaceholder: {
    width: 32,
    height: 32,
  },
  headerContent: {
    backgroundColor: '#f6f6f8',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
    backgroundColor: '#ffffff',
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
    borderRadius: 12,
    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 48,
    backgroundColor: '#f0f2f4',
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  searchIconContainer: {
    paddingRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1f2937',
    paddingVertical: 0,
  },
  filterIconButton: {
    paddingLeft: 8,
  },
  filtersContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
    gap: 8,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    backgroundColor: '#e5e7eb',
    borderRadius: 20,
  },
  filterButtonActive: {
    backgroundColor: '#135bec',
  },
  filterButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },
  filterButtonTextActive: {
    color: '#ffffff',
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    gap: 16,
    paddingBottom: 16,
  },
  productCard: {
    width: '47%',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 12,
    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  productImage: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 6,
    marginBottom: 8,
  },
  productInfo: {
    marginBottom: 12,
  },
  productName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1f2937',
    marginBottom: 4,
  },
  productGrade: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 2,
  },
  productStock: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  productActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  quantityButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#e5e7eb',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#374151',
  },
  quantityInput: {
    width: 24,
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
    color: '#1f2937',
    backgroundColor: 'transparent',
    padding: 0,
  },
  addToPurchaseButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#135bec',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 64,
    width: '100%',
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
    color: '#1f2937',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 16,
  },
  purchaseSummary: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: '#f6f6f8',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    boxShadow: '0px -2px 4px rgba(0, 0, 0, 0.1)',
    elevation: 4,
  },
  purchaseButton: {
    backgroundColor: '#135bec',
    borderRadius: 8,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0px 4px 4.65px rgba(0, 0, 0, 0.3)',
    elevation: 8,
  },
  purchaseButtonLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  purchaseButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
    marginRight: 8,
  },
  purchaseBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  purchaseBadgeText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  purchaseButtonRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  purchaseTotalText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  addProductButton: {
    marginTop: 16,
    minWidth: 200,
  },
});

export default PurchaseScreen;
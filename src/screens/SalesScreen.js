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

// Mock product data matching HTML design
const mockProducts = [
  {
    id: 1,
    name: 'Premium Product A',
    grade: 'A',
    stock: 15,
    price: 150.00,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDcUGXdOqy59BZqpt4YKeG56omTut30s0_B3pSdDOn80HQREEfHA1BHBogZUA1JeAvjv62-PkM85mWjF04GF8apg9f7Afm3X8WhNXq3_Yxw9eDooKkAF2Sv-MP5I0uAqRzh9QvVU2pxR7umq2Qreo5CXQpe35LtJRINnfeWoCqO2E9bNRwSgnMpKjYL3tVXDD2w1CbwXA9gDU-vhzrRvSwCZGGQWYWkGVj-r2D4C9BpEheNukSknmMfNXYVQWAGiSvTqzDoZT2XpA',
    sku: 'PREM-001'
  },
  {
    id: 2,
    name: 'Standard Product B',
    grade: 'B',
    stock: 8,
    price: 99.50,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA2Qq9Lb-0793umEGf9K8KTYCalPY9qqE8UpfcFeg91ZpnCJOd4R2KCgEe9gzxvffSAXTQhpbI1zVhVJIRd59QSS13twUzZaCZes2zpJOB3niIGN2fQlfu0MRX5M58RhTVHCI2RxgqG9_HyiTYpr58mmzTUiqr-InCZ_NHRi5afFtrM0389wvR2VdoXteTTnEmuh37YjWVTSEV5QVSbZyfgsT06TT-UGZ6SAlYgeIWACaqwW4rAcms4wNfEj5zDTsx2o_OeYHB7aA',
    sku: 'STD-002'
  },
  {
    id: 3,
    name: 'Basic Product C',
    grade: 'C',
    stock: 22,
    price: 45.00,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAdn66NxYAvqGYeQHW-QzJOvlegquckaUQgpL1AM5l2eEoAP6cwWdxZsNYGP0qOXOGgmo2xq_yZZdt7HI1u1aG7gZF0qtcryim4X2ImDSANZYqV7Xi6tH1qSCA3z27b6W4D2R2fyqoZG5z3o-hhNKDBklVZyI26dupIdgf_8gUug58--MegMBDhX8cA6gm26R_4D2YMAPqBFvZW-AJ5EC8B4-n8sXti47gSmzUebcJluceRh2uSgR19s5RHMGRhYoxyX_bZ0JNccA',
    sku: 'BAS-003'
  },
  {
    id: 4,
    name: 'Open-Box Gadget D',
    grade: 'A',
    stock: 5,
    price: 120.00,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDJD5DNu2ap09WE3G0h7jKA7G0dG3MfQ96eUp8-RO5NvVuOT1AQLIN0gbVC1n2z855Xk3afxzs_Nrf7QBPGBWmvi5JO32Z1CC0XAc84xMTKS1KL252VvrVXArmZs4ThBzPwWOjoJan9_DSuZmuRkK2mn1WSokQCPHl5BWcxxO0023KWPTHuz2HyeggGuvKTLeQPa1-Kt5zP_5nv-Q5v-5-EGGGEU0T516tne_gVmTtz1wJfzlsqDoayrTe6neBynE4hTm_wJiRSfg',
    sku: 'OPEN-004'
  }
];

// Render product card matching HTML design
const renderProductCard = (product, cart, setCart, t) => {
  const [quantity, setQuantity] = useState(1);
  
  const handleAddToCart = () => {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity }]);
    }

    Alert.alert(
      t('sales.addedToCart'),
      t('sales.addedToCartMessage', {
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
        
        <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
          <MaterialIcons name="add-shopping-cart" size={16} color="#ffffff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Render category filter buttons matching HTML design
const renderCategoryFilters = (selectedCategory, setSelectedCategory, t) => {
  const filters = [
    { key: 'all', label: 'All' },
    { key: 'electronics', label: 'Electronics' },
    { key: 'accessories', label: 'Accessories' },
    { key: 'refurbished', label: 'Refurbished' }
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
            {t(`categories.${filter.key}`) || filter.label}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

// Render cart summary at bottom matching HTML design
const renderCartSummary = (cart, cartTotal, cartItemCount, navigateToCheckout, t) => {
  if (cart.length === 0) return null;

  return (
    <View style={styles.cartSummary}>
      <TouchableOpacity
        style={styles.cartButton}
        onPress={() => navigateToCheckout(cart, 'sales')}
      >
        <View style={styles.cartButtonLeft}>
          <Text style={styles.cartButtonText}>{t('sales.viewCart')}</Text>
          <View style={styles.cartBadge}>
            <Text style={styles.cartBadgeText}>
              {cartItemCount} {t('sales.items')}
            </Text>
          </View>
        </View>
        <View style={styles.cartButtonRight}>
          <Text style={styles.cartTotalText}>${cartTotal.toFixed(2)}</Text>
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
        <MaterialIcons name="inventory" size={48} color="#9ca3af" />
      </View>
      <Text style={styles.emptyTitle}>
        {searchQuery ? t('sales.noProductsFound') : t('sales.noProductsAvailable')}
      </Text>
      <Text style={styles.emptySubtitle}>
        {searchQuery
          ? t('sales.tryAdjustingSearch')
          : t('sales.productsAppearHere')
        }
      </Text>
      {searchQuery && (
        <FlowButton
          text={t('sales.addProduct')}
          onPress={navigateToAddProduct}
          variant="primary"
          style={styles.addProductButton}
        />
      )}
    </View>
  );
};

// Render header matching HTML design
const renderHeader = (onBack, t) => (
  <View style={styles.header}>
    <TouchableOpacity style={styles.menuButton}>
      <MaterialIcons name="menu" size={24} color={colors.text} />
    </TouchableOpacity>
    
    <Text style={styles.headerTitle}>{t('sales.title')}</Text>
    
    <View style={styles.headerPlaceholder} />
  </View>
);

// Render search bar matching HTML design
const renderSearchBar = (searchQuery, setSearchQuery, t) => (
  <View style={styles.searchContainer}>
    <View style={styles.searchBarContainer}>
      <View style={styles.searchIconContainer}>
        <MaterialIcons name="search" size={20} color="#616f89" />
      </View>
      <TextInput
        style={styles.searchInput}
        placeholder={t('sales.searchPlaceholder')}
        placeholderTextColor="#616f89"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <TouchableOpacity style={styles.barcodeButton}>
        <MaterialIcons name="qr-code-scanner" size={20} color={colors.primary} />
      </TouchableOpacity>
    </View>
  </View>
);

// Render header content
const renderHeaderContent = (searchQuery, setSearchQuery, selectedCategory, setSelectedCategory, t) => (
  <View style={styles.headerContent}>
    {/* Search Bar */}
    {renderSearchBar(searchQuery, setSearchQuery, t)}

    {/* Category Filters */}
    {renderCategoryFilters(selectedCategory, setSelectedCategory, t)}
  </View>
);

const SalesScreen = ({ onBack, navigateToCheckout, navigateToAddProduct }) => {
  const { t } = useTranslation();
  const [cart, setCart] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter products by category and search
  const searchedProducts = mockProducts.filter(product => {
    const categoryMatch = selectedCategory === 'all' ||
      product.name.toLowerCase().includes(selectedCategory.toLowerCase());
    
    const searchMatch = !searchQuery ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchQuery.toLowerCase());
    
    return categoryMatch && searchMatch;
  });

  // Calculate cart totals
  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      {renderHeader(onBack, t)}

      {/* Scrollable Content */}
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* Search Bar */}
        {renderSearchBar(searchQuery, setSearchQuery, t)}

        {/* Category Filters */}
        {renderCategoryFilters(selectedCategory, setSelectedCategory, t)}

        {/* Products Grid */}
        <View style={styles.productsGrid}>
          {searchedProducts.length > 0 ? (
            searchedProducts.map((product) =>
              renderProductCard(product, cart, setCart, t)
            )
          ) : (
            renderEmptyState(searchQuery, searchedProducts, t, navigateToAddProduct)
          )}
        </View>
      </ScrollView>

      {/* Cart Summary */}
      {renderCartSummary(cart, cartTotal, cartItemCount, navigateToCheckout, t)}
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
  barcodeButton: {
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
  addToCartButton: {
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
  cartSummary: {
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
  cartButton: {
    backgroundColor: '#135bec',
    borderRadius: 8,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0px 4px 4.65px rgba(0, 0, 0, 0.3)',
    elevation: 8,
  },
  cartButtonLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cartButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
    marginRight: 8,
  },
  cartBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  cartBadgeText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  cartButtonRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  cartTotalText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  addProductButton: {
    marginTop: 16,
    minWidth: 200,
  },
});

export default SalesScreen;
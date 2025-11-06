import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView, 
  StyleSheet, 
  SafeAreaView,
  Image,
  Alert 
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';

// Components
import SearchBar from '../components/SearchBar';
import FlowButton from '../components/FlowButton';

// Constants and theme
import { colors } from '../theme/colors';
import { textStyles } from '../theme/typography';
import { commonStyles } from '../theme/styles';

const ProductManagementScreen = ({ onBack, navigation }) => {
  const { t, currentLanguage, isRTL } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [isInventoryExpanded, setIsInventoryExpanded] = useState(false);

  // Mock product data based on the HTML design
  const products = [
    {
      id: 1,
      name: 'Ergonomic Office Chair',
      sku: 'OC-BLK-001',
      stock: 52,
      price: 299.99,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAbPHSTL3303ohv-e8bryYi03uIdeLG69EzO57c7D-0q9p5dS6tFagaE_SkPstdEkW8p3fHYoMJoUreu86SaBcknzZW2b3CGYR2f_mcyNKOrnOFXKDuUd3V5S-63QknKLo5Ro2IA_L08h7DGbpE41EaHuryZ2PkaTtt-VDa23KHB9H9m_J5_602PIPbUukcGbqzR7xLx1Hvdb4v8IG7AdWkoOIj08zNKRewK0STvx4pNhpNpg40Gzd1AlxflvETuSGDFKtIDg5HyA',
      status: 'inStock'
    },
    {
      id: 2,
      name: 'Wireless Mechanical Keyboard',
      sku: 'KB-WL-MEC-004',
      stock: 12,
      price: 120.00,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCMqqTLIifqVdslEf8vGQdCtUyxmnr-TZlUJKsCFNnso68I5BcaxGRXWrxy2AoPmGQa3z5_AUicR0fr2jzt4pa83lSkhjIxgW1EoH29fht4OkCclpisUtGzY-K7laSKCOcf08WA9zLutkrGnXr2SLrfACIc8MaZTgwQlCqLrV7EFcN7JN3BdrjU8dKgi-Gl9sGYDUsP9mYYSEcnOgdZPQKV7FDdbQ797eA0aOJiTJD5AJULxI-Pb_yjt33vYMWEtqip0buFMeQKQQ',
      status: 'lowStock'
    },
    {
      id: 3,
      name: 'Adjustable Standing Desk',
      sku: 'DSK-ADJ-WHT-01',
      stock: 0,
      price: 450.00,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAcnC5fHzQtHvBqr_abLa3Qj6K33OpxmRfqZKVXMqOj17k2Qm31XiLhtLnOKoNZvqGOqMRABN6_YdxxNT1-QiM8DvYJ8hVP0Dz1WgZ3pbjRk4RchtR3xLwKzwHfMwWOeyq4DTyhFDWv5VCTbJICGwdHVqiNFTzZa9mlb0TipScfzaGLG_VkC0Sp2OspiJ9gHE15vwGsbjtdnOq-S8mfUO9VMbXw5cAP_YD6tKLgNuefzmos6HBup1p_Azc0tyV3ZYw5EKBeOR1qyA',
      status: 'outOfStock'
    },
    {
      id: 4,
      name: '32" 4K Monitor',
      sku: 'MON-4K-32-002',
      stock: 28,
      price: 399.00,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA0RrtacCgZF6q4zgvlfWeI0gGeE5JrlFnQJ0qqn6z-7glOjRSkq9knEFQGOHjtekyqaGHqSE_X2V-qyfzvZV7Ggw1TD9DhSFoaC0jdr1W4ah4Xxp7RO5ypmk45lrJBeBNxyCJRGeAwvKlKDM1mFo2UrtUQd7QNxvRgN80GvZqqn4-xyzpKdfhBbl5oVC6kXekLsoXm-OqzeMMEPNBfGJ6qUn-fnyqcsC8s57JPdgzLCP2rX9WE2vPTWBiYk8-5_VDFkjqgXcV74Q',
      status: 'inStock'
    }
  ];

  // Mock top selling products for inventory card
  const topSellingProducts = [
    {
      id: 1,
      name: 'Ergonomic Office Chair',
      unitsSold: 124,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAbPHSTL3303ohv-e8bryYi03uIdeLG69EzO57c7D-0q9p5dS6tFagaE_SkPstdEkW8p3fHYoMJoUreu86SaBcknzZW2b3CGYR2f_mcyNKOrnOFXKDuUd3V5S-63QknKLo5Ro2IA_L08h7DGbpE41EaHuryZ2PkaTtt-VDa23KHB9H9m_J5_602PIPbUukcGbqzR7xLx1Hvdb4v8IG7AdWkoOIj08zNKRewK0STvx4pNhpNpg40Gzd1AlxflvETuSGDFKtIDg5HyA'
    },
    {
      id: 2,
      name: 'Wireless Mechanical Keyboard',
      unitsSold: 98,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCMqqTLIifqVdslEf8vGQdCtUyxmnr-TZlUJKsCFNnso68I5BcaxGRXWrxy2AoPmGQa3z5_AUicR0fr2jzt4pa83lSkhjIxgW1EoH29fht4OkCclpisUtGzY-K7laSKCOcf08WA9zLutkrGnXr2SLrfACIc8MaZTgwQlCqLrV7EFcN7JN3BdrjU8dKgi-Gl9sGYDUsP9mYYSEcnOgdZPQKV7FDdbQ797eA0aOJiTJD5AJULxI-Pb_yjt33vYMWEtqip0buFMeQKQQ'
    }
  ];

  // Filter options based on the HTML design
  const filterOptions = [
    { key: 'all', label: t('products.filters.all') },
    { key: 'inStock', label: t('products.filters.inStock') },
    { key: 'lowStock', label: t('products.filters.lowStock') },
    { key: 'outOfStock', label: t('products.filters.outOfStock') }
  ];

  const getStockStatusConfig = (status) => {
    switch (status) {
      case 'inStock':
        return {
          color: '#16a34a',
          bgColor: '#dcfce7',
          text: t('products.stockStatus.inStock'),
          dotColor: '#16a34a'
        };
      case 'lowStock':
        return {
          color: '#f59e0b',
          bgColor: '#fef3c7',
          text: t('products.stockStatus.lowStock'),
          dotColor: '#f59e0b'
        };
      case 'outOfStock':
        return {
          color: '#dc2626',
          bgColor: '#fee2e2',
          text: t('products.stockStatus.outOfStock'),
          dotColor: '#dc2626'
        };
      default:
        return {
          color: '#6b7280',
          bgColor: '#f3f4f6',
          text: 'Unknown',
          dotColor: '#6b7280'
        };
    }
  };

  const filteredProducts = products.filter(product => {
    if (selectedFilter === 'all') return true;
    return product.status === selectedFilter;
  });

  const searchedProducts = filteredProducts.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.sku.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleHomePress = () => {
    if (onBack) {
      onBack();
    }
  };

  const handleEditProduct = (productId) => {
    Alert.alert('Edit Product', `Edit product with ID: ${productId}`);
  };

  const handleAddProduct = () => {
    if (navigation && navigation.navigate) {
      navigation.navigate('add-product');
    } else {
      Alert.alert('Add Product', 'Add new product functionality');
    }
  };

  const renderInventoryCard = () => (
    <View style={styles.inventoryCard}>
      <TouchableOpacity
        style={styles.inventoryHeader}
        onPress={() => setIsInventoryExpanded(!isInventoryExpanded)}
        activeOpacity={0.7}
      >
        <View style={styles.inventoryHeaderContent}>
          <View style={styles.inventoryIcon}>
            <MaterialIcons name="inventory" size={24} color={colors.primary} />
          </View>
          <View style={styles.inventoryInfo}>
            <Text style={styles.inventoryLabel}>
              {t('products.inventory.totalValue')}
            </Text>
            <Text style={styles.inventoryValue}>$1,245,670.50</Text>
          </View>
        </View>
        <MaterialIcons
          name="expand-more"
          size={24}
          color={colors.textSecondary}
          style={[
            styles.expandIcon,
            isInventoryExpanded && styles.expandedIcon
          ]}
        />
      </TouchableOpacity>

      {isInventoryExpanded && (
        <View style={styles.inventoryExpanded}>
          <View style={styles.inventoryDivider} />
          
          <View style={styles.metricsGrid}>
            <View style={styles.metricRow}>
              <Text style={styles.metricLabel}>
                {t('products.inventory.totalItems')}
              </Text>
              <Text style={styles.metricValue}>1,320</Text>
            </View>
            
            <View style={styles.sectionDivider} />
            
            {/* Top Selling Products */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>
                  {t('products.inventory.topSelling')}
                </Text>
                <TouchableOpacity style={styles.periodButton}>
                  <Text style={styles.periodText}>
                    {t('products.inventory.last30Days')}
                  </Text>
                  <MaterialIcons name="arrow-drop-down" size={16} color={colors.primary} />
                </TouchableOpacity>
              </View>
              
              <View style={styles.topProductsList}>
                {topSellingProducts.map((product) => (
                  <View key={product.id} style={styles.topProductItem}>
                    <Image 
                      source={{ uri: product.image }} 
                      style={styles.topProductImage}
                    />
                    <View style={styles.topProductInfo}>
                      <Text style={styles.topProductName}>
                        {product.name}
                      </Text>
                      <Text style={styles.topProductSales}>
                        {product.unitsSold} {t('products.inventory.unitsSold')}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>
            
            <View style={styles.sectionDivider} />
            
            {/* Out of Stock Products */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>
                {t('products.inventory.outOfStock')} (3)
              </Text>
              <View style={styles.outOfStockList}>
                <View style={styles.outOfStockItem}>
                  <Text style={styles.outOfStockName}>
                    Adjustable Standing Desk
                  </Text>
                  <TouchableOpacity style={styles.restockButton}>
                    <Text style={styles.restockButtonText}>
                      {t('products.inventory.restock')}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            
            <View style={styles.sectionDivider} />
            
            {/* Slow Moving Products */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>
                {t('products.inventory.slowMoving')}
              </Text>
              <View style={styles.slowMovingList}>
                <View style={styles.slowMovingItem}>
                  <Text style={styles.slowMovingName}>
                    Vintage Leather Journal
                  </Text>
                  <TouchableOpacity style={styles.offerButton}>
                    <Text style={styles.offerButtonText}>
                      {t('products.inventory.createOffer')}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            
            <View style={styles.sectionDivider} />
            
            {/* Top 5 Profitable Products */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>
                  {t('products.inventory.topProfitable')}
                </Text>
                <TouchableOpacity style={styles.viewAllButton}>
                  <MaterialIcons name="chevron-right" size={20} color={colors.textSecondary} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      )}
    </View>
  );

  const renderProductCard = (product) => {
    const statusConfig = getStockStatusConfig(product.status);
    
    return (
      <View key={product.id} style={styles.productCard}>
        <View style={styles.productContent}>
          <Image source={{ uri: product.image }} style={styles.productImage} />
          
          <View style={styles.productInfo}>
            <Text style={styles.productName}>{product.name}</Text>
            <Text style={styles.productSku}>
              {t('products.product.sku')}: {product.sku}
            </Text>
            
            <View style={styles.stockContainer}>
              <View style={styles.stockIndicator}>
                <View style={[
                  styles.stockDot,
                  { backgroundColor: statusConfig.dotColor }
                ]} />
                <Text style={[
                  styles.stockText,
                  { color: statusConfig.color }
                ]}>
                  {product.status === 'outOfStock' 
                    ? statusConfig.text 
                    : `${product.status === 'lowStock' ? product.stock : product.stock} ${t('products.product.inStock')}`
                  }
                </Text>
              </View>
            </View>
            
            <Text style={styles.productPrice}>
              ${product.price.toFixed(2)}
            </Text>
          </View>
        </View>
        
        <TouchableOpacity 
          style={styles.editButton}
          onPress={() => handleEditProduct(product.id)}
        >
          <MaterialIcons name="edit" size={18} color={colors.textSecondary} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={commonStyles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={handleHomePress} style={styles.homeButton}>
            <MaterialIcons name="home" size={24} color={colors.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>
            {t('products.screenTitle')}
          </Text>
        </View>
        
        <TouchableOpacity style={styles.moreButton}>
          <MaterialIcons name="more-vert" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      <ScrollView style={commonStyles.scrollView} contentContainerStyle={styles.content}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <SearchBar
            placeholder={t('products.search.placeholder')}
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={styles.searchBar}
          />
          
          <TouchableOpacity style={styles.filterButton}>
            <MaterialIcons name="filter-list" size={24} color={colors.textSecondary} />
          </TouchableOpacity>
        </View>

        {/* Filter Buttons */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersContainer}
        >
          {filterOptions.map((option) => (
            <FlowButton
              key={option.key}
              text={option.label}
              onPress={() => setSelectedFilter(option.key)}
              variant={option.key === selectedFilter ? 'primary' : 'secondary'}
              size="small"
              style={styles.filterOption}
            />
          ))}
        </ScrollView>

        {/* Inventory Summary Card */}
        {renderInventoryCard()}

        {/* Products List */}
        <View style={styles.productsContainer}>
          {searchedProducts.length > 0 ? (
            searchedProducts.map(renderProductCard)
          ) : (
            <View style={styles.emptyState}>
              <MaterialIcons name="inventory_2" size={48} color={colors.textSecondary} />
              <Text style={styles.emptyTitle}>
                {t('products.emptyState.title')}
              </Text>
              <Text style={styles.emptySubtitle}>
                {t('products.emptyState.subtitle')}
              </Text>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Add Product FAB */}
      <TouchableOpacity style={styles.fab} onPress={handleAddProduct}>
        <MaterialIcons name="add" size={28} color="#ffffff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  homeButton: {
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
  },
  moreButton: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    paddingBottom: 100,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  searchBar: {
    flex: 1,
  },
  filterButton: {
    width: 48,
    height: 48,
    backgroundColor: colors.card,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  filtersContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },
  filterOption: {
    flexShrink: 0,
  },
  inventoryCard: {
    marginHorizontal: 16,
    marginTop: 16,
    backgroundColor: colors.card,
    borderRadius: 12,
    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  inventoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  inventoryHeaderContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  inventoryIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#135bec20',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  inventoryInfo: {
    flex: 1,
  },
  inventoryLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  inventoryValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
  },
  expandIcon: {
    transform: [{ rotate: '0deg' }],
  },
  expandedIcon: {
    transform: [{ rotate: '180deg' }],
  },
  inventoryExpanded: {
    overflow: 'hidden',
  },
  inventoryDivider: {
    height: 1,
    backgroundColor: colors.border,
    marginHorizontal: 16,
  },
  metricsGrid: {
    padding: 16,
    gap: 16,
  },
  metricRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  metricLabel: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  metricValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
  },
  sectionDivider: {
    height: 1,
    backgroundColor: colors.border,
  },
  section: {
    gap: 8,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  periodButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f6f6f8',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    gap: 4,
  },
  periodText: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: '500',
  },
  topProductsList: {
    gap: 8,
  },
  topProductItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  topProductImage: {
    width: 40,
    height: 40,
    borderRadius: 8,
  },
  topProductInfo: {
    flex: 1,
  },
  topProductName: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
    marginBottom: 2,
  },
  topProductSales: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  outOfStockList: {
    gap: 8,
  },
  outOfStockItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  outOfStockName: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  restockButton: {
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  restockButtonText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '500',
  },
  slowMovingList: {
    gap: 8,
  },
  slowMovingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  slowMovingName: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  offerButton: {
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  offerButtonText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '500',
  },
  viewAllButton: {
    padding: 4,
  },
  productsContainer: {
    paddingHorizontal: 16,
    paddingTop: 12,
    gap: 12,
  },
  productCard: {
    flexDirection: 'row',
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.1)',
    elevation: 2,
  },
  productContent: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  productImage: {
    width: 64,
    height: 64,
    borderRadius: 8,
    marginRight: 16,
  },
  productInfo: {
    flex: 1,
    gap: 4,
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  productSku: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  stockContainer: {
    marginTop: 4,
  },
  stockIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  stockDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  stockText: {
    fontSize: 12,
    fontWeight: '500',
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
    marginTop: 4,
  },
  editButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.backgroundLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 64,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
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

export default ProductManagementScreen;
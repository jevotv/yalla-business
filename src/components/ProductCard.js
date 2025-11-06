import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, TextInput } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { colors } from '../theme/colors';

const ProductCard = ({
  product,
  onAddToCart,
  style
}) => {
  const { t } = useTranslation();
  const [quantity, setQuantity] = useState(product.quantity || 1);

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart(product, quantity);
    }
  };

  const getStockStatus = (stock) => {
    if (stock <= 5) return { text: t('stock.lowStock'), color: '#dc2626' };
    if (stock <= 10) return { text: t('stock.mediumStock'), color: '#f59e0b' };
    return { text: t('stock.inStock'), color: '#16a34a' };
  };

  const stockStatus = getStockStatus(product.stock);

  return (
    <View style={[styles.card, style]}>
      {/* Product Image */}
      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: product.image }}
          style={styles.productImage}
          resizeMode="cover"
        />
      </View>

      {/* Product Info */}
      <View style={styles.infoContainer}>
        <Text style={styles.productName} numberOfLines={1}>
          {product.name}
        </Text>
        <View style={styles.detailsRow}>
          <Text style={[styles.stockText, { color: stockStatus.color }]}>
            {stockStatus.text}
          </Text>
          <Text style={styles.stockCount}>
            {t('stock.stock')}: {product.stock}
          </Text>
        </View>
        <Text style={styles.price}>
          ${product.price.toFixed(2)}
        </Text>
      </View>

      {/* Quantity and Add to Cart */}
      <View style={styles.actionContainer}>
        <View style={styles.quantityContainer}>
          <TouchableOpacity 
            style={styles.quantityButton}
            onPress={handleDecrease}
            disabled={quantity <= 1}
          >
            <MaterialIcons 
              name="remove" 
              size={16} 
              color={quantity <= 1 ? '#9ca3af' : colors.text} 
            />
          </TouchableOpacity>
          
          <TextInput
            style={styles.quantityInput}
            value={quantity.toString()}
            onChangeText={(text) => {
              const newQuantity = parseInt(text) || 1;
              setQuantity(Math.max(1, newQuantity));
            }}
            keyboardType="numeric"
            textAlign="center"
          />
          
          <TouchableOpacity 
            style={styles.quantityButton}
            onPress={handleIncrease}
          >
            <MaterialIcons 
              name="add" 
              size={16} 
              color={colors.text} 
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          style={styles.addToCartButton}
          onPress={handleAddToCart}
        >
          <MaterialIcons 
            name="add-shopping-cart" 
            size={18} 
            color="#ffffff" 
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 12,
    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.1)',
    elevation: 2,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    flex: 1,
    minWidth: '47%',
  },
  imageContainer: {
    aspectRatio: 1,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: colors.background,
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  infoContainer: {
    flex: 1,
    marginTop: 8,
    gap: 4,
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    lineHeight: 20,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  stockText: {
    fontSize: 12,
    fontWeight: '500',
  },
  stockCount: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginTop: 4,
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    gap: 8,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderRadius: 16,
    paddingHorizontal: 8,
    paddingVertical: 4,
    gap: 4,
  },
  quantityButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityInput: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
    width: 32,
    textAlign: 'center',
    padding: 0,
  },
  addToCartButton: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProductCard;
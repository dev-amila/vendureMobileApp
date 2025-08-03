import { GET_SLIDERS } from "@/src/api/mutation/home";
import { useQuery } from "@apollo/client";
import React, { useState } from "react";
import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";
import { moderateScale } from "react-native-size-matters";

import Swiper from 'react-native-swiper';

interface SliderProductVariant {
  product: {
    id: string;
    name: string;
    assets: {
      source: string;
    }[];
  };
}

export default function Slider(){

  const { data, loading, error } = useQuery<{ collection: { productVariants: { items: SliderProductVariant[] } } }>(GET_SLIDERS);
  const [imageErrors, setImageErrors] = useState<{[key: string]: boolean}>({});

  const productVariants: SliderProductVariant[] = data?.collection?.productVariants?.items || [];

  const handleImageError = (productId: string) => {
    setImageErrors(prev => ({ ...prev, [productId]: true }));
  };

  const handleImageLoad = (productId: string) => {
    console.log(`Image loaded successfully for product ${productId}`);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1D4ED8" />
        <Text>Loading slider...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text>Error loading slider: {error.message}</Text>
      </View>
    );
  }

  if (productVariants.length === 0) {
    return (
      <View style={styles.errorContainer}>
        <Text>No products found for slider</Text>
      </View>
    );
  }



  return (
    <View style={styles.container}>

      <Swiper 
        style={styles.wrapper} 
        showsPagination={true} 
        activeDotColor="#1D4ED8" 
        dotColor="#E5E7EB"
        autoplay={true}
      >
        {productVariants.map((variant: SliderProductVariant) => (
          <View key={variant.product.id} style={styles.swiperItem}>
            {variant.product.assets && variant.product.assets.length > 0 && !imageErrors[variant.product.id] ? (
              <Image
                source={{ uri: variant.product.assets[0].source }}
                style={styles.swiperImage}
                resizeMode="cover"
                // onLoad={() => }
                onError={() => handleImageError(variant.product.id)}
              />
            ) : (
              <View style={styles.swiperErrorContainer}>
                <Text style={styles.errorText}>Image not available</Text>
              </View>
            )}
          </View>
        ))}
      </Swiper>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: moderateScale(6, 0.1),
    borderRadius: moderateScale(10, 0.1),
    overflow: 'hidden',
  },
  loadingContainer: {
    height: moderateScale(200, 0.1),
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    height: moderateScale(200, 0.1),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FEF2F2',
  },
  productContainer: {
    marginBottom: moderateScale(10, 0.1),
    padding: moderateScale(10, 0.1),
    backgroundColor: '#F9FAFB',
    borderRadius: moderateScale(8, 0.1),
  },
  imageContainer: {
    height: moderateScale(150, 0.1),
    borderRadius: moderateScale(8, 0.1),
    overflow: 'hidden',
    marginTop: moderateScale(5, 0.1),
  },
  image: {
    width: '100%',
    height: '100%',
  },
  errorImageContainer: {
    height: moderateScale(150, 0.1),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FEF2F2',
    borderRadius: moderateScale(8, 0.1),
  },
  noImageContainer: {
    height: moderateScale(150, 0.1),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: moderateScale(8, 0.1),
  },
  noImageText: {
    color: '#6B7280',
    fontSize: moderateScale(14, 0.1),
  },
  errorText: {
    color: '#DC2626',
    fontSize: moderateScale(14, 0.1),
  },
  wrapper: {
    height: moderateScale(200, 0.1),
  },
  swiperItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  swiperImage: {
    width: '100%',
    height: '100%',
  },
  swiperErrorContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FEF2F2',
  },
});
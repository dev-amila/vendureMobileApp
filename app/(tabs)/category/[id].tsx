import ProductCard from "@/components/product/productCard/ProductCard";
import styles from "@/components/styles/CategoriesStyles";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

export default function CategorySectionScreen() {
  const { id } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <View style={styles.content } >
        <View style={styles.productsContainer}>
          <ProductCard categoryID={id} />
        </View>
      </View>
    </View>
  );
}

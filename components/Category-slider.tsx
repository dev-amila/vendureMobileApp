import { useQuery } from "@apollo/client";
import { FlashList } from '@shopify/flash-list';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { GET_ALL_COLLECTIONS_QUERY } from '@/src/api/mutation/category';
import { Category } from '@/src/utils/interface';
import { moderateScale } from 'react-native-size-matters';
import FeedSectionContainer from './FeedSectionContainer';

const Categories = () => {
  const { loading, error, data } = useQuery<{ collections: { items: Category[] } }>(
    GET_ALL_COLLECTIONS_QUERY,
    { variables: { skip: 0, take: 9 } }
  );  

  if (loading || error || !data || !data.collections) {
    return null;
  }

  const categories: Category[] = data.collections.items || [];

  return (
    <FeedSectionContainer title="Category">
      <FlashList
        data={categories}
        horizontal
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.categoryItem}
            onPress={() => {
         
            }}
          >
            <View style={styles.imageContainer}>
              <Image
                source={{
                  uri: item.assets[0].source || '',
                }}
                style={styles.image}
              />
            </View>
            <Text style={styles.text}>{item.name}</Text>
          </TouchableOpacity>
        )}
        showsHorizontalScrollIndicator={false}
      />
    </FeedSectionContainer>
  );
};

const styles = StyleSheet.create({
  categoryItem: {
    flexDirection: "column",
    alignItems: "center",
    marginRight: moderateScale(15, 0.1),
  },
  imageContainer: {
    width: moderateScale(70, 0.1),
    height: moderateScale(70, 0.1),
    borderRadius: moderateScale(35, 0.1),
    borderWidth: moderateScale(2, 0.1),
    borderColor: "#d6d6d6",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  text: {
    color: "#4d4d4d",
    maxWidth: moderateScale(90, 0.1),
    textAlign: "center",
  },
});

export default Categories;


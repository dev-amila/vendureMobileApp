import { useQuery } from "@apollo/client";
import { FlashList } from "@shopify/flash-list";
import React from "react";
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import { Product } from "@/src/utils/interface";
import { moderateScale } from "react-native-size-matters";
import FeedSectionContainer from "./FeedSectionContainer";
import ProductPrice from "./ProductPrice";

export interface BannerProps {
//   navigation: any;
  query: any;
  title: string;
}

const Banner: React.FC<BannerProps> = ({  query, title }) => {
  const { data, loading, error } = useQuery(query);

  if (loading || error) {
    return null;
  }

  const products: Product[] =
    data?.collection?.productVariants?.items?.map((item: { product: any; }) => item.product) || [];

  return (
    <FeedSectionContainer title={title}>
      <FlashList
        data={products}
        renderItem={({ item, index }) => {
          const items_ = data?.collection?.productVariants?.items[index];
          const categoryID = data?.collection?.id;

          return (
            <TouchableOpacity
              onPress={() => {
                // navigation.navigate("Products", {
                //   products: data?.collection?.productVariants?.items,
                //   selectedIndex: index,
                //   productVariantId: items_.id,
                //   price: item.variants.priceWithTax,
                //   categoryID: categoryID
                // });
              }}
            >
              <View
                style={[styles.imageContainer, { width: moderateScale(250, 0.1) }]}
                key={items_.id}
              >
                <Image
                  source={{ uri: item.featuredAsset.source || "" }}
                  style={styles.image}
                  resizeMode="cover"
                />
              </View>
              <View>
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={styles.text}
                >
                  {items_.name}
                </Text>

                <View style={styles.priceContainer}>
                  <Text style={styles.priceText}>Price: </Text>
                  <ProductPrice price={item.variants.priceWithTax} />
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    </FeedSectionContainer>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    height: "70%",
    marginRight: moderateScale(-95, 0.1),
  },
  image: {
    width: "60%",
    height: "100%",
    borderRadius: moderateScale(10, 0.1),
  },
  text: {
    color: "#4d4d4d",
    maxWidth: moderateScale(155, 0.1),
    marginTop: moderateScale(3, 0.1),
    textAlign: "left",
  },
  priceText: {
    marginRight: moderateScale(5, 0.1),
    color: "#4d4d4d",
  },
  priceContainer: {
    marginTop: moderateScale(-1, 0.1),
    flexDirection: "row",
  },
});

export default Banner;
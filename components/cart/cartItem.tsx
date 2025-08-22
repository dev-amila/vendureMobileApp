import formatNumber from "@/src/utils/formatNumber";
import React, { memo } from "react";
import { Text, View, Image } from "react-native";
import { moderateScale } from "react-native-size-matters";
import CartButtons from "./cartButton";
import styles from "@/components/styles/cartStyle";
import { OrderLine } from "@/src/utils/interface";

interface CartItemProps {
  item: OrderLine;
  refetchCart: () => void;
}

const CartItem = memo(({ item, refetchCart }: CartItemProps) => {
  const unitPriceWithTax = item.productVariant.priceWithTax ?? 0;
  const discountAmountWithTax = item.discounts[0]?.amountWithTax ?? 0;
  const totalPriceWithDiscountAndQuantity =
    (unitPriceWithTax - discountAmountWithTax) * item.quantity;
  const priceWithDiscountAndQuantityFormatted = formatNumber(
    totalPriceWithDiscountAndQuantity
  );
  const totalPriceFormatted = formatNumber(
    (item.productVariant.priceWithTax ?? 0) * item.quantity
  );
  const discountFormatted = formatNumber(discountAmountWithTax);

  return (
    <View style={styles.containerItem}>
      <View style={[styles.imageContainer, { width: moderateScale(31, 0.1) }]}>
        <Image
          source={{ uri: item.featuredAsset?.source || "" }}
          style={styles.image}
          resizeMode="cover"
        />

        <CartButtons
          itemID={item.id}
          quantity={item.quantity}
          refetchCart={refetchCart}
        />
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.info}>
          <View style={styles.infoRow}>
            <Text style={[styles.infoText, { textAlign: "right" }]}>
              {item.productVariant.name}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={[styles.infoText, { color: "green" }]}>In stock</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoText}>Price: Rs. {totalPriceFormatted}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoText}>Discounts:  {discountFormatted}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoText}>
              Total: Rs. {priceWithDiscountAndQuantityFormatted}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
});

export default CartItem;
import React from "react";
import { View, Text, ScrollView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useQuery } from "@apollo/client";

import { FlashList } from "@shopify/flash-list";
import { moderateScale } from "react-native-size-matters";
import { SHOW_ORDER } from "@/src/api/mutation/order";
import { GET_CUSTOMER } from "@/src/api/mutation/customer";
import PageLoading from "@/components/loading/PageLoading";
import CartItem from "@/components/cart/cartItem";
import CartInfo from "@/components/cart/cartInfo";
import formatNumber from "@/src/utils/formatNumber";
import { Button } from "@/components/Button";

import styles from "@/components/styles/cartStyle";
import { OrderLine } from "@/src/utils/interface";
import { router } from "expo-router";

export default function Cart() {
  const { data, loading, error, refetch } = useQuery(SHOW_ORDER);
  const { refetch: refetchCartCustomer } = useQuery(GET_CUSTOMER);
  const insets = useSafeAreaInsets();

  if (error) return <Text>Error: {error.message}</Text>;

  const order = data?.activeOrder;

  const refetchCart = () => {
    refetch();
    refetchCartCustomer();
  };

  return (
    <>
      {loading ? (
        <>
          <PageLoading />
        </>
      ) : !order || !order.lines || order.lines.length === 0 ? (
        <>
          <View style={{ marginTop: moderateScale(50, 0.1) }}>
            <View
              style={[
                styles.scroolViewContainer,
                { marginTop: moderateScale(50, 0.1) + 250 },
              ]}
            >
              <View style={styles.text_view}>
                <Text style={styles.text_}>
                  Make purchases to get the best out of the app
                </Text>
              </View>
            </View>
          </View>
        </>
      ) : (
        <>
          <View style={{ marginTop: insets.top }}>
            <ScrollView style={styles.scrollView}>
              <View style={styles.cartItemsContainer}>
                <View style={styles.cartTitleContainer}>
                  <Text style={styles.cartTitleText}>Your Cart</Text>
                  <Text>{order?.lines.length} items</Text>
                </View>
                <View style={styles.cartItems}>
                  <FlashList<OrderLine>
                    data={order?.lines}
                    renderItem={({ item }) => (
                      <CartItem
                        item={item}
                        key={item.id}
                        refetchCart={refetchCart}
                      />
                    )}
                    estimatedItemSize={900}
                    showsVerticalScrollIndicator={false}
                  />
                </View>
              </View>

              {/* cart Info */}
              <View>
                <CartInfo taxSummary={order?.taxSummary || []} />
              </View>
            </ScrollView>

            {/* to Shipping */}
            <View style={styles.bottomContainer}>
              <Text style={styles.totalText}>Total:</Text>
              <View style={styles.totalPriceContainer}>
                <Text style={styles.totalPriceWithTax}>
                  Rs. {formatNumber(order?.totalWithTax)}
                </Text>
                <Text style={styles.totalPrice}>
                  Rs. {formatNumber(order?.total)}
                </Text>
              </View>
              <Button
                style={styles.continueButton}
                onPress={() => {
                  // navigation.navigate("Payments");
                  router.push('/(tabs)/payment')
                }}
              >
                <Text>Payment</Text>
              </Button>
            </View>
          </View>
        </>
      )}
    </>
  );
}
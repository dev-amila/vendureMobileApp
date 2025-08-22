import { useMutation, useQuery } from "@apollo/client";
import { FlashList } from "@shopify/flash-list";
import React, { useEffect, useState } from "react";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";

import CartItem from "@/components/cart/cartItem";
import Icons from "@/components/icons/icons";
import PageLoading from "@/components/loading/PageLoading";
import styles from "@/components/styles/paymentStyles";
import { GET_CUSTOMER } from "@/src/api/mutation/customer";
import { SHOW_ORDER } from "@/src/api/mutation/order";
import {
  ADD_PAYMENT_TO_ORDER,
  GET_METHOD_SHIPPING,
  SET_ORDER_SHIPPING_ADDRESS,
  SET_ORDER_SHIPPING_METHOD,
  TRANSITION_ORDER_TO_ARRAINGING_PAYMENT,
} from "@/src/api/mutation/payment";
import formatNumber, { safeAdd } from "@/src/utils/formatNumber";
import { Address, OrderLine, ShippingMethod } from "@/src/utils/interface";
import { safeScale } from "@/src/utils/safeScale";
import { Feather, Fontisto } from "@expo/vector-icons";
import { router } from "expo-router";
import Auth from "@/app/(auth)/auth";

export default function Index() {
  const { data, refetch: refetchCustomer } = useQuery(GET_CUSTOMER);
  const { data: DataOrder, refetch: refetchCart } = useQuery(SHOW_ORDER);

  const order = DataOrder?.activeOrder || {};

  const activeCustomer = data?.activeCustomer;
  const addresses: Address[] = activeCustomer?.addresses || [];

  const { data: DataShipping, loading: loadingShipping } = useQuery(
    GET_METHOD_SHIPPING,
    {
      onCompleted: (data) => {
        if (
          data &&
          data.eligibleShippingMethods &&
          data.eligibleShippingMethods.length > 0
        ) {
          setSelectedShippingMethod(data.eligibleShippingMethods[0]);
        }
      },
    }
  );

  const shippingMethods = DataShipping?.eligibleShippingMethods || [];

  const firstAddressId = addresses.length > 0 ? addresses[0].id : null;
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(
    firstAddressId
  );

  const [selectedShippingMethod, setSelectedShippingMethod] =
    useState<ShippingMethod | null>(null);

  const [setOrderShippingAddress] = useMutation(SET_ORDER_SHIPPING_ADDRESS);
  const [setOrderShippingMethod] = useMutation(SET_ORDER_SHIPPING_METHOD);
  const [transitionOrderToArraingingPayment] = useMutation(
    TRANSITION_ORDER_TO_ARRAINGING_PAYMENT
  );
  const [addPaymentToOrder] = useMutation(ADD_PAYMENT_TO_ORDER);

  const handleCreateOrder = async () => {
    if (!selectedAddressId || !selectedShippingMethod) {
      Alert.alert(
        "Shipping information missing",
        "Please select a shipping address and method."
      );
      return;
    }
  
    const selectedAddress = addresses.find(
      (address) => address.id === selectedAddressId
    );
    if (!selectedAddress) {
      Alert.alert(
        "Address information missing",
        "Please add a address in your account."
      );
      return;
    }

    // Validate that we have valid price data
    if (typeof order.totalWithTax !== 'number' || isNaN(order.totalWithTax)) {
      Alert.alert(
        "Invalid order data",
        "Order total is invalid. Please refresh and try again."
      );
      return;
    }

    if (typeof selectedShippingMethod.price !== 'number' || isNaN(selectedShippingMethod.price)) {
      Alert.alert(
        "Invalid shipping data",
        "Shipping price is invalid. Please refresh and try again."
      );
      return;
    }

    try {
      await setOrderShippingAddress({
        variables: {
          fullName: selectedAddress.fullName,
          company: selectedAddress.company,
          streetLine1: selectedAddress.streetLine1,
          city: selectedAddress.city,
          province: selectedAddress.province,
          postalCode: selectedAddress.postalCode,
          countryCode: selectedAddress.country.code,
          phoneNumber: selectedAddress.phoneNumber,
        },
      });
    } catch (error) {
      console.error("Error setting shipping address:", error);
      Alert.alert(
        "Error",
        "Failed to set shipping address. Please try again."
      );
      return;
    }

    const selectedMethodId = selectedShippingMethod?.id;

    try {
      await setOrderShippingMethod({
        variables: {
          id: selectedMethodId,
        },
      });
    } catch (error) {
      console.error("Error setting shipping method:", error);
      Alert.alert(
        "Error",
        "Failed to set shipping method. Please try again."
      );
      return;
    }

    try {
      await transitionOrderToArraingingPayment({
        variables: { state: "ArrangingPayment" },
      });
    } catch (error) {
      console.error("Error transitioning order to ArrangingPayment:", error);
      Alert.alert(
        "Error",
        "Failed to process order. Please try again."
      );
      return;
    }

    try {
      await addPaymentToOrder({
        variables: { method: "standard-payment" },
      });
        // navigation.navigate("PaymentConfirmationScreen");
      router.push("/(tabs)/payment/paymentConfirmation");
      refetchCart();
      refetchCustomer();
    } catch (error) {
      console.error("Error adding payment to order:", error);
      Alert.alert(
        "Error",
        "Failed to process payment. Please try again."
      );
      return;
    }
  };

  const selectedMethodPrice = selectedShippingMethod?.price;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);


  if (loading || loadingShipping) return <PageLoading />;

  return (

    // <Auth>
      <View style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.section}>
            <Text style={styles.title}>Contact Information</Text>
            <View
              style={{
                borderWidth: 1,
                borderColor: "#e0e0e0",
                borderRadius: safeScale(10),
                paddingVertical: safeScale(10),
                paddingHorizontal: safeScale(10),
              }}
            >
              <Text>
                {activeCustomer?.firstName + " " + activeCustomer?.lastName}
              </Text>
              <Text>{activeCustomer?.emailAddress}</Text>
            </View>

            <View style={{ marginBottom: safeScale(10) }} />

            <Text style={styles.title}>Shopping</Text>
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
                contentContainerStyle={{ paddingBottom: safeScale(0) }}
              />
            </View>

            <View style={{ marginBottom: safeScale(10) }} />
            <Text style={styles.title}>Address</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {addresses.map((address) => (
                <TouchableOpacity
                  key={address.id}
                  style={[
                    styles.addressContainer,
                    selectedAddressId === address.id &&
                      styles.selectedAddressContainer,
                  ]}
                  onPress={() => setSelectedAddressId(address.id)}
                >
                  <Text>{address.fullName}</Text>
                  <Text>
                    {address.city}, {address.province}
                  </Text>
                  <Text>{address.streetLine1}</Text>
                  <Text>{address.postalCode}</Text>
                  <Text>
                    <Fontisto name="world-o" size={safeScale(14)} color="#000" />{" "}
                    {address.country.name}
                  </Text>
                  <Text>
                    <Feather name="phone" size={safeScale(14)} color="#000" />{" "}
                    {address.phoneNumber}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <View style={styles.productsContainer}>
              <Text style={styles.title}>Shipping Methods</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {shippingMethods &&
                  shippingMethods.map((method: ShippingMethod, index: number) => (
                    <TouchableOpacity
                      key={index}
                      style={[
                        styles.shippingMethod,
                        selectedShippingMethod === method &&
                          styles.selectedShippingMethod,
                      ]}
                      onPress={() => setSelectedShippingMethod(method)}
                    >
                      <Text style={styles.methodName}>{method.name}</Text>
                      <Text style={styles.methodPrice}>
                        Price: Rs. {(() => {
                          const price = method.price;
                          return isNaN(price) ? "0.00" : formatNumber(price);
                        })()}
                      </Text>
                    </TouchableOpacity>
                  ))}
              </ScrollView>
            </View>

            <View style={{ marginBottom: safeScale(10) }} />
            <Text style={styles.title}>Order Summary</Text>
            <View
              style={{
                marginTop: safeScale(8),
              }}
            >
              <View style={styles.infoRow}>
                <Text style={styles.label}>Subtotal</Text>
                <View style={styles.priceContainer}>
                  <Text>
                    Rs. {(() => {
                      const subtotal = order.totalWithTax || 0;
                      return isNaN(subtotal) ? "0.00" : formatNumber(subtotal);
                    })()}
                  </Text>
                  {/* <Text style={styles.currency}>€</Text> */}
                </View>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.label}>Shipping</Text>
                <View style={styles.priceContainer}>
                  <Text>
                    Rs. {(() => {
                      if (!selectedMethodPrice) return "Select a shipping method";
                      const shippingPrice = selectedMethodPrice;
                      return isNaN(shippingPrice) ? "0.00" : formatNumber(shippingPrice);
                    })()}
                  </Text>
                </View>
              </View>
              <View style={[styles.infoRow, { borderBottomColor: "#fff" }]}>
                <Text style={styles.label}>Total</Text>
                <View style={styles.priceContainer}>
                  <Text>
                    Rs. {(() => {
                      const total = safeAdd(order.totalWithTax || 0, selectedMethodPrice || 0);
                      return isNaN(total) ? "0.00" : formatNumber(total);
                    })()}
                  </Text>
                  {/* <Text style={styles.currency}>€</Text> */}
                </View>
              </View>
              <Text style={styles.title}>Payment Information</Text>
              <View>
                <Text style={styles.label}>
                  This is a fictitious payment for demonstration purposes only.
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
        <View
          style={[
            styles.bottomContainer,
            {
              paddingBottom: safeScale(31),
              paddingTop: safeScale(65),
            },
          ]}
        >
          <TouchableOpacity
            onPress={handleCreateOrder}
            style={styles.payButton}
          >
            <Icons.MaterialIcons
              name="payment"
              size={safeScale(25)}
              style={{ color: "#fff" }}
            />
            <Text style={styles.addToCartButtonText}>Pay</Text>
          </TouchableOpacity>
        </View>
      </View>
    //  </Auth>
  );
}

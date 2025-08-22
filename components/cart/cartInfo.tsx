import formatNumber from "@/src/utils/formatNumber";
import React from "react";
import { Text, View } from "react-native";
import styles from "@/components/styles/cartStyle";

interface TaxSummary {
  description: string;
  taxRate: number;
  taxBase: number;
  taxTotal: number;
}

interface Order {
  taxSummary: TaxSummary[];
}

const CartInfo: React.FC<Order> = ({ taxSummary }) => {
  return (
    <View style={styles.container}>
      {taxSummary.map((summary, index) => (
        <View key={index}>
          <View style={styles.infoRow_CartInfo}>
            <Text>Description</Text>
            <View style={styles.priceContainer}>
              <Text style={styles.label}>{summary.description}</Text>
            </View>
          </View>

          <View style={styles.infoRow_CartInfo}>
            <Text>Tax Rate</Text>
            <View style={styles.priceContainer}>
              <Text style={styles.label}>{summary.taxRate}%</Text>
            </View>
          </View>

          <View style={styles.infoRow_CartInfo}>
            <Text>Taxe Base</Text>
            <View style={styles.priceContainer}>
              <Text style={styles.label}> Rs. {formatNumber(summary.taxBase)}</Text>
              {/* <Text style={styles.currency}>€</Text> */}
            </View>
          </View>

          <View style={[styles.infoRow_CartInfo, {borderBottomColor: '#fff'}]}>
            <Text style={styles.label}>Total Taxes</Text>
            <View style={styles.priceContainer}>
              <Text>Rs. {formatNumber(summary.taxTotal)}</Text>
              {/* <Text style={styles.currency}>€</Text> */}
            </View>
          </View>
        </View>
      ))}
    </View>
  );
};

export default CartInfo;
import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import Slider from "@/components/Slider";
import { moderateScale } from "react-native-size-matters";
import { SafeAreaView } from "react-native-safe-area-context";
import CategorySlider from "@/components/Category-slider";
import { GET_BANNER_1_QUERY, GET_BANNER_2_QUERY, GET_BANNER_3_QUERY } from "@/src/api/mutation/home";
import Banner from "@/components/Banner";

export default function index() {
  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          <Slider />
          <CategorySlider />

          <Banner
            // navigation={navigation}
            query={GET_BANNER_1_QUERY}
            title="Topics of the day"
          />
          <Banner
            // navigation={navigation}
            query={GET_BANNER_2_QUERY}
            title="Recommended"
          />
          <Banner
            // navigation={navigation}
            query={GET_BANNER_3_QUERY}
            title="Favorites"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: moderateScale(3, 0.1),
  },
});

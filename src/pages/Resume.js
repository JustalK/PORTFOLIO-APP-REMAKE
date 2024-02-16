import React from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { styleMain } from "../styles/main";
import { colors } from "../styles/colors";

export default function Resume({ jumpTo }) {
  return (
    <View style={styleMain.pageContainer}>
      <ScrollView>
        <Text style={styles.wait}>In construction</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wait: {
    marginTop: 50,
    color: colors.cyan,
    textAlign: "center",
  },
});

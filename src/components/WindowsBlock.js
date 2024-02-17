import React from "react";
import { StyleSheet, Text } from "react-native";
import { colors } from "../styles/colors";

export default function WindowsFrame({ children }) {
  return <Text style={styles.block}>{children}</Text>;
}

const styles = StyleSheet.create({
  block: {
    color: colors.cyan,
    flexDirection: "row",
    alignItems: "center",
    height: 16,
  },
});

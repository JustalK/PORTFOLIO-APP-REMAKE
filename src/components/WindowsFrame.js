import React from "react";
import { StyleSheet, View } from "react-native";
import { colors } from "../styles/colors";

export default function WindowsFrame({ children, style = {} }) {
  return <View style={[styles.project, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  project: {
    borderWidth: 1,
    borderColor: colors.black,
    marginBottom: 20,
    borderRadius: 20,
  },
});

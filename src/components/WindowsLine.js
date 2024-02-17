import React from "react";
import { StyleSheet, View } from "react-native";
import { colors } from "../styles/colors";

export default function WindowsLine({ children, style = {} }) {
  return <View style={[styles.line, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  line: {
    backgroundColor: colors.darkBlue,
    height: 40,
    justifyContent: "center",
    paddingLeft: 20,
    paddingRight: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
});

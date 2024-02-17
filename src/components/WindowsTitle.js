import React from "react";
import { StyleSheet, View } from "react-native";
import { colors } from "../styles/colors";

export default function WindowsTitle({ children, style = {} }) {
  return <View style={[styles.title, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  title: {
    fontFamily: "LatoBold",
    backgroundColor: colors.clearBlue,
    textTransform: "uppercase",
    color: colors.white,
    zIndex: 2,
    height: 40,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    paddingLeft: 20,
    paddingRight: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

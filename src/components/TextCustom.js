import React from "react";
import { StyleSheet, Text } from "react-native";
import { colors } from "../styles/colors";

export default function TextCustom({ isTitle, children }) {
  return (
    <Text style={isTitle ? styles.title : styles.description}>{children}</Text>
  );
}

const styles = StyleSheet.create({
  description: {
    fontSize: 20,
    fontFamily: "LatoLight",
    textAlign: "center",
    color: colors.cyan,
    alignSelf: "flex-start",
    marginBottom: 50,
  },
  title: {
    marginTop: 40,
    fontSize: 50,
    fontWeight: "bold",
    fontFamily: "LatoLight",
    textAlign: "center",
    color: colors.white,
    textTransform: "uppercase",
    marginBottom: 40,
  },
});

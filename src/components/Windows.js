import React from "react";
import { StyleSheet, Text, Image, View } from "react-native";
import { colors } from "../styles/colors";
import { WEBSITE_URL } from "@env";
import WindowsFrame from "./WindowsFrame";

export default function Windows({ image, title }) {
  return (
    <WindowsFrame style={styles.project}>
      <Text style={styles.title}>{title}</Text>
      <Image source={{ uri: WEBSITE_URL + image }} style={styles.image} />
    </WindowsFrame>
  );
}

const styles = StyleSheet.create({
  project: {
    marginBottom: 50,
  },
  image: {
    height: 200,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
  title: {
    fontFamily: "LatoBold",
    backgroundColor: colors.clearBlue,
    height: 40,
    lineHeight: 40,
    color: colors.cyan,
    zIndex: 2,
    textAlign: "center",
    alignSelf: "stretch",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
});

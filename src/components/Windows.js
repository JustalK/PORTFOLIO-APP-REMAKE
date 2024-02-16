import React from "react";
import { StyleSheet, Text, Image, View } from "react-native";
import { colors } from "../styles/colors";
import { WEBSITE_URL } from "@env";

export default function Windows({ image, title }) {
  return (
    <View style={styles.project}>
      <Text style={styles.title}>{title}</Text>
      <Image source={{ uri: WEBSITE_URL + image }} style={styles.image} />
    </View>
  );
}

const styles = StyleSheet.create({
  project: {
    borderWidth: 1,
    borderColor: colors.black,
    marginBottom: 50,
    borderRadius: 20,
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
    textTransform: "uppercase",
    color: colors.white,
    zIndex: 2,
    textAlign: "center",
    alignSelf: "stretch",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
});

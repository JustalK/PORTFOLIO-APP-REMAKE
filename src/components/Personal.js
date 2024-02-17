import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "../styles/colors";
import TextWebsite from "./TextWebsite";
import WindowsFrame from "./WindowsFrame";
import WindowsLine from "./WindowsLine";
import WindowsTitle from "./WindowsTitle";
import WindowsBlock from "./WindowsBlock";

export default function Personal({ introduction, website }) {
  return (
    <WindowsFrame>
      <WindowsTitle>
        <Text style={styles.text}>{introduction}</Text>
      </WindowsTitle>
      <WindowsLine style={styles.spacing}>
        <WindowsBlock>
          <TextWebsite website={website} />
        </WindowsBlock>
      </WindowsLine>
    </WindowsFrame>
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: "LatoBold",
    color: colors.cyan,
  },
  spacing: {
    height: 40,
  },
});

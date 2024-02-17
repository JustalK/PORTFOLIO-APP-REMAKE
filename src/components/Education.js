import React from "react";
import { StyleSheet, Text, View, Linking } from "react-native";
import { colors } from "../styles/colors";
import { formatYearDate } from "../libs/utils";
import WindowsFrame from "./WindowsFrame";
import WindowsLine from "./WindowsLine";
import WindowsTitle from "./WindowsTitle";
import WindowsBlock from "./WindowsBlock";
import TextWebsite from "./TextWebsite";
import TextLocation from "./TextLocation";

export default function Education({
  diploma,
  location,
  graduation_date,
  website,
}) {
  return (
    <WindowsFrame>
      <WindowsTitle>
        <Text style={styles.text}>{diploma}</Text>
      </WindowsTitle>
      <WindowsLine style={styles.spacing}>
        <WindowsBlock>
          <Text style={styles.field}>Graduation date: </Text>
          {formatYearDate(graduation_date)}
        </WindowsBlock>
        <WindowsBlock>
          <TextLocation location={location} />
        </WindowsBlock>
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
  field: {
    color: colors.white,
  },
  spacing: {
    height: 80,
  },
});

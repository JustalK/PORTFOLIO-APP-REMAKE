import React, { useState, useRef } from "react";
import { StyleSheet, Text, View, Animated, Linking } from "react-native";
import { colors } from "../styles/colors";
import { formatDate } from "../libs/utils";
import { ListItem } from "@rneui/themed";
import WindowsFrame from "./WindowsFrame";
import WindowsLine from "./WindowsLine";
import WindowsTitle from "./WindowsTitle";
import WindowsBlock from "./WindowsBlock";
import TextWebsite from "./TextWebsite";
import TextLocation from "./TextLocation";
import TextRole from "./TextRole";

export default function Experience({
  title,
  location,
  role,
  is_remote,
  is_current,
  start_date,
  end_date,
  missions,
  website,
}) {
  const [isExpanded, setExpanded] = useState(false);
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const checkIndexIsEven = (n) => {
    return n % 2 == 0;
  };

  const rotate0 = () => {
    Animated.timing(rotateAnim, {
      toValue: 0,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  const rotate90 = () => {
    Animated.timing(rotateAnim, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "90deg"],
  });

  return (
    <WindowsFrame style={styles.project}>
      <WindowsTitle>
        <Text style={styles.text}>{title}</Text>
        <Text style={styles.text}>
          {is_current ? "Present" : formatDate(end_date)}-
          {formatDate(start_date)}
        </Text>
      </WindowsTitle>
      <WindowsLine style={styles.spacing}>
        <WindowsBlock>
          <TextRole role={role} />
        </WindowsBlock>
        <WindowsBlock>
          <TextLocation is_remote={is_remote} location={location} />
        </WindowsBlock>
        <WindowsBlock>
          <TextWebsite website={website} />
        </WindowsBlock>
      </WindowsLine>
      <ListItem.Accordion
        content={
          <>
            <ListItem.Content>
              <ListItem.Title style={styles.accordion}>Missions</ListItem.Title>
            </ListItem.Content>
            <Animated.View style={{ transform: [{ rotate: spin }] }}>
              <ListItem.Chevron />
            </Animated.View>
          </>
        }
        containerStyle={{
          backgroundColor: colors.clearBlue,
          color: colors.white,
          justifyContent: "center",
          paddingLeft: 20,
          paddingRight: 0,
          paddingTop: 10,
          paddingBottom: 10,
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
        }}
        noIcon={true}
        isExpanded={isExpanded}
        onPress={() => {
          isExpanded ? rotate0() : rotate90();
          setExpanded(!isExpanded);
        }}
      >
        {missions.map((mission, index) => {
          return (
            <View key={index} style={styles.missions}>
              <Text
                style={[
                  styles.mission,
                  {
                    backgroundColor: checkIndexIsEven(index)
                      ? colors.blue
                      : colors.darkBlue,
                  },
                ]}
              >
                {mission}
              </Text>
            </View>
          );
        })}
      </ListItem.Accordion>
    </WindowsFrame>
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: "LatoBold",
    color: colors.cyan,
  },
  accordion: {
    fontFamily: "LatoBold",
    color: colors.cyan,
  },
  missions: {
    backgroundColor: colors.clearBlue,
    justifyContent: "center",
  },
  mission: {
    fontFamily: "LatoBold",
    color: colors.cyan,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 10,
    paddingTop: 10,
  },
  spacing: {
    height: 80,
  },
});

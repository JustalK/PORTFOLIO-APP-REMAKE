import React, { useState, useRef } from "react";
import { StyleSheet, Text, View, Animated, Linking } from "react-native";
import { colors } from "../styles/colors";
import { formatDate } from "../libs/utils";
import { ListItem } from "@rneui/themed";

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
    <View style={styles.project}>
      <View style={styles.title}>
        <Text style={styles.text}>{title}</Text>
        <Text style={styles.text}>
          {is_current ? "Present" : formatDate(end_date)}-
          {formatDate(start_date)}
        </Text>
      </View>
      <View style={[styles.line, styles.spacing]}>
        <Text style={styles.role}>
          <Text style={styles.field}>
            Position{role.length > 1 ? "s" : ""}:
          </Text>{" "}
          {role.join(", ")}
        </Text>
        <Text style={styles.location}>
          <Text style={styles.field}>Location:</Text>{" "}
          {is_remote ? "Remote" : location}
        </Text>
        <Text style={styles.location}>
          <Text style={styles.field}>Website: </Text>
          <Text
            style={styles.link}
            onPress={() => {
              Linking.openURL(website);
            }}
          >
            {website}{" "}
          </Text>
        </Text>
      </View>
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
  text: {
    fontFamily: "LatoBold",
    color: colors.white,
    textTransform: "uppercase",
  },
  link: {
    textDecorationLine: "underline",
  },
  field: {
    color: colors.white,
  },
  role: {
    color: colors.cyan,
  },
  location: {
    color: colors.cyan,
    flexDirection: "row",
    alignItems: "center",
    height: 16,
  },
  accordion: {
    fontFamily: "LatoBold",
    color: colors.white,
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
  line: {
    backgroundColor: colors.darkBlue,
    height: 40,
    justifyContent: "center",
    paddingLeft: 20,
    paddingRight: 20,
  },
  spacing: {
    height: 80,
  },
  lineClear: {
    backgroundColor: colors.clearBlue,
  },
});

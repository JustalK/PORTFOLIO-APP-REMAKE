import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Icon } from "@rneui/themed";
import { colors } from "../styles/colors";

export default function Button({
  idProject,
  index,
  buttonTitle,
  updateIdProject,
  jumpTo,
}) {
  const checkIndexIsEven = (n) => {
    return n % 2 == 0;
  };

  const zoomProject = (id) => {
    updateIdProject(id);
    jumpTo("project");
  };

  return (
    <TouchableOpacity onPress={() => zoomProject(idProject)}>
      <View
        style={[
          styles.button,
          {
            backgroundColor: checkIndexIsEven(index)
              ? colors.clearBlue
              : colors.darkBlue,
          },
        ]}
      >
        <Text style={styles.buttonText}>{buttonTitle}</Text>
        <Icon name="chevron-right" type="evilicon" color={colors.white} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 0,
    backgroundColor: colors.cyan,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: "LatoLight",
    textTransform: "capitalize",
    color: colors.white,
    lineHeight: 40,
  },
});

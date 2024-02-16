import { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors } from "../styles/colors";

export default function WritingEffect({ data, predata, style }) {
  const [indexArray, setIndexArray] = useState(0);
  const [fullText, setFullText] = useState("");

  const writing = (actualText, indexActualArray) => {
    const i = actualText.length;
    if (i < data[indexActualArray].length) {
      const newFullText = actualText + data[indexActualArray].charAt(i);
      setFullText(newFullText);
      setTimeout(() => {
        writing(newFullText, indexActualArray);
      }, 30);
    } else {
      setTimeout(() => {
        const newIndexArray = (indexActualArray + 1) % data.length;
        setIndexArray(newIndexArray);
        setFullText("");
        writing("", newIndexArray);
      }, 1000);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      writing(fullText, indexArray);
    }, 100);
  }, []);

  return (
    <View>
      <Text style={style}>
        {predata + " "}
        <Text style={[style, styles.textStyle]}>{fullText}</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  textStyle: {
    borderRightWidth: 2,
    borderColor: colors.white,
    color: colors.white,
  },
});

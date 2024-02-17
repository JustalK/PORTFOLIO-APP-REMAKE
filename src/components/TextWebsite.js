import { Text, StyleSheet } from "react-native";
import { colors } from "../styles/colors";

export default function TextWebsite({ website }) {
  return (
    <>
      <Text style={styles.field}>Website: </Text>
      <Text
        style={styles.link}
        onPress={() => {
          Linking.openURL(website);
        }}
      >
        {website}{" "}
      </Text>
    </>
  );
}

const styles = StyleSheet.create({
  link: {
    textDecorationLine: "underline",
  },
  field: {
    color: colors.white,
  },
});

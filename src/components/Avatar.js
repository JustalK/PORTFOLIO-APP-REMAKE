import { Image, StyleSheet } from "react-native";
import { colors } from "../styles/colors";

export default function Avatar({ img }) {
  return <Image style={styles.portrait} source={img} />;
}

const styles = StyleSheet.create({
  portrait: {
    width: 200,
    height: 200,
    alignSelf: "center",
    marginBottom: 50,
    borderRadius: 200,
    borderWidth: 1,
    borderColor: colors.cyan,
  },
});

import { Image, StyleSheet } from "react-native";
import { colors } from "../styles/colors";

export default function Avatar({ img, borderColor = null }) {
  return <Image style={[styles.portrait, {borderColor:  borderColor || colors.cyan}]} source={img} />;
}

const styles = StyleSheet.create({
  portrait: {
    width: 200,
    height: 200,
    alignSelf: "center",
    borderRadius: 200,
    borderWidth: 1,
    borderColor: colors.cyan
  },
});

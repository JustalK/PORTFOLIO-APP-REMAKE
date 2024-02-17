import { Text, StyleSheet } from "react-native";
import { colors } from "../styles/colors";

export default function TextLocation({ location, is_remote = false }) {
  return (
    <>
      <Text style={styles.field}>Location:</Text>{" "}
      {is_remote ? "Remote" : location}
    </>
  );
}

const styles = StyleSheet.create({
  field: {
    color: colors.white,
  },
});

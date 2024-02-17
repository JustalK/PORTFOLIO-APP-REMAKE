import { Text, StyleSheet } from "react-native";
import { colors } from "../styles/colors";

export default function TextRole({ role }) {
  return (
    <>
      <Text style={styles.field}>Position{role.length > 1 ? "s" : ""}:</Text>{" "}
      {role.join(", ")}
    </>
  );
}

const styles = StyleSheet.create({
  field: {
    color: colors.white,
  },
});

import { ActivityIndicator, StyleSheet, View } from "react-native";
import { colors } from "../styles/colors";

export default function Loading({ isScreen }) {
  return (
    <View style={isScreen ? styles.loading : styles.loaderPadding}>
      <ActivityIndicator size="large" color={colors.white} />
    </View>
  );
}

const styles = StyleSheet.create({
  loaderPadding: {
    padding: 100,
  },
  loading: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
});

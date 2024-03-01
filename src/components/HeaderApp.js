import { useEffect, useState } from "react";
import { StyleSheet, Linking } from "react-native";
import { colors } from "../styles/colors";
import { Header } from "@rneui/themed";
import { apiGetMyself } from "../services/apiContact";

export default function HeaderApp({ title, navigation }) {
  const [email, setEmail] = useState("");

  const getMyself = async () => {
    const identity = await apiGetMyself();
    setEmail(identity.email);
  };

  const backToHome = () => {
    navigation.navigate("Home", { reset: true });
  };

  useEffect(() => {
    getMyself();
  }, []);

  return (
    <Header
      rightComponent={{
        icon: "envelope",
        type: "font-awesome",
        size: 30,
        ...styles.button,
        onPress: () => {
          Linking.openURL("mailto:" + email);
        },
      }}
      centerComponent={{
        ...{ text: title },
        ...{ style: styles.title },
      }}
      leftComponent={{
        icon: "home",
        type: "font-awesome",
        size: 30,
        ...styles.button,
        onPress: () => {
          backToHome();
        },
      }}
      containerStyle={styles.header}
    />
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.darkBlue,
    justifyContent: "space-around",
    alignItems: "center",
    paddingRight: 20,
    paddingLeft: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.darkBlue,
  },
  button: {
    color: colors.cyan,
  },
  title: {
    fontFamily: "LatoBold",
    fontSize: 14,
    lineHeight: 40,
    textTransform: "uppercase",
    color: colors.cyan,
    zIndex: 2,
    textAlign: "center",
    alignSelf: "stretch",
  },
});

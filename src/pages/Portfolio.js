import { StatusBar } from "expo-status-bar";
import { styleMain } from "../styles/main";
import { View } from "react-native";
import HeaderApp from "../components/HeaderApp";
import Main from "./Main";

export default function Portfolio({ navigation, route }) {
  return (
    <View style={styleMain.pageContainer}>
      <HeaderApp navigation={navigation} title={route.name} />
      <Main />
      <StatusBar style="auto" hidden />
    </View>
  );
}

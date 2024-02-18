import "react-native-gesture-handler";
import { useCallback } from "react";
import { styleMain } from "./styles/main";
import { StyleSheet, View, Animated } from "react-native";
import { registerRootComponent } from "expo";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();
import { SafeAreaProvider } from "react-native-safe-area-context";
import Home from "./pages/Home";
import Portfolio from "./pages/Portfolio";

import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import Loading from "./components/Loading";

SplashScreen.preventAutoHideAsync();

const forSlide = ({ current, next, inverted, layouts: { screen } }) => {
  console.log("azeae");
  const progress = Animated.add(
    current.progress.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
      extrapolate: "clamp",
    }),
    next
      ? next.progress.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 1],
          extrapolate: "clamp",
        })
      : 0
  );

  return {
    cardStyle: {
      transform: [
        {
          translateX: Animated.multiply(
            progress.interpolate({
              inputRange: [0, 1, 2],
              outputRange: [screen.width, 0, screen.width * -0.3],
              extrapolate: "clamp",
            }),
            inverted
          ),
        },
      ],
    },
  };
};

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    LatoRegular: require("../assets/fonts/Lato-Regular.ttf"),
    LatoBold: require("../assets/fonts/Lato-Bold.ttf"),
    LatoLight: require("../assets/fonts/Lato-Light.ttf"),
    Heebo: require("../assets/fonts/Heebo-Bold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return (
      <View style={styleMain.pageContainer}>
        <Loading isScreen={true} />
      </View>
    );
  }

  return (
    <SafeAreaProvider style={{ backgroundColor: "black" }}>
      <NavigationContainer style={styles.container} onReady={onLayoutRootView}>
        <Stack.Navigator sceneContainerStyle={{ backgroundColor: "black" }}>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ headerShown: false, cardStyleInterpolator: forSlide }}
          />
          <Stack.Screen
            name="Portfolio"
            component={Portfolio}
            options={{ headerShown: false, cardStyleInterpolator: forSlide }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

registerRootComponent(App);

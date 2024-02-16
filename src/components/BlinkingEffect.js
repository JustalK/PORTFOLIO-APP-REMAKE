import React, { useRef, useEffect } from "react";
import { Animated } from "react-native";

export default function BlinkingEffect({ children, style }) {
  const fadeValue = useRef(new Animated.Value(0)).current;

  const fadeAnim = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(fadeValue, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(fadeValue, {
          toValue: 0,
          duration: 1200,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  useEffect(() => {
    fadeAnim();
  }, []);

  return (
    <Animated.View style={[style, { opacity: fadeValue }]}>
      {children}
    </Animated.View>
  );
}

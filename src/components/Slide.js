import React from "react";
import { View } from "react-native";
import Windows from "./Windows";
import TextCustom from "./TextCustom";

export default function Slide({ title, firstText, secondText, image }) {
  return (
    <View>
      <Windows title={title} image={image} />
      <TextCustom>{firstText}</TextCustom>
      <TextCustom>{secondText}</TextCustom>
    </View>
  );
}

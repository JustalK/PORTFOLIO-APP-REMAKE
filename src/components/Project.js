import React from "react";
import { TouchableOpacity, View } from "react-native";
import Windows from "./Windows";

export default function Project({ id, title, image, updateIdProject, jumpTo }) {
  const zoomProject = (id) => {
    updateIdProject(id);
    jumpTo("project");
  };

  return (
    <TouchableOpacity onPress={() => zoomProject(id)}>
      <View>
        <Windows title={title} image={image} />
      </View>
    </TouchableOpacity>
  );
}

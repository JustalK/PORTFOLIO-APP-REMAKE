import React, { useState } from "react";
import { TabView, TabBar } from "react-native-tab-view";
import { StyleSheet, useWindowDimensions, Text } from "react-native";
import Listing from "./Listing";
import Menu from "./Menu";
import Resume from "./Resume";
import ProjectZoom from "./ProjectZoom";
import { colors } from "../styles/colors";
import { DEFAULT_PROJECT_ID } from "@env";

export default function Main() {
  const [isLoading, setIsLoading] = useState(true);
  const [idProject, setIdProject] = useState(DEFAULT_PROJECT_ID);
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(1);
  const [routes] = React.useState([
    { key: "menu", title: "Menu" },
    { key: "listing", title: "Projects" },
    { key: "project", title: "Zoom" },
    { key: "resume", title: "Resume" },
  ]);

  const projectLoaded = () => {
    setIsLoading(false);
  };

  const renderTabBar = (props) => {
    return (
      <TabBar
        {...props}
        indicatorStyle={styles.indicator}
        style={styles.tabBar}
      />
    );
  };

  const updateIdProject = (index) => {
    if (index !== idProject) {
      setIdProject(index);
      setIsLoading(true);
    }
  };

  const renderScene = (route, jumpTo) => {
    switch (route.key) {
      case "menu":
        return (
          <Menu updateIdProject={(id) => updateIdProject(id)} jumpTo={jumpTo} />
        );
      case "listing":
        return (
          <Listing
            updateIdProject={(id) => updateIdProject(id)}
            jumpTo={jumpTo}
          />
        );
      case "project":
        return (
          <ProjectZoom
            isLoading={isLoading}
            projectLoaded={projectLoaded}
            idProject={idProject}
            jumpTo={jumpTo}
          />
        );
      case "resume":
        return <Resume jumpTo={jumpTo} />;
    }
  };

  return (
    <TabView
      renderTabBar={renderTabBar}
      navigationState={{ index, routes }}
      renderScene={(rs) => renderScene(rs.route, rs.jumpTo)}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
    />
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.clearBlue,
    borderColor: colors.cyan,
    borderWidth: 1,
    borderRadius: 20,
    marginRight: 20,
    marginLeft: 20,
  },
  indicator: {
    backgroundColor: colors.white,
    borderBottomColor: colors.cyan,
    borderBottomWidth: 49,
    borderRadius: 20,
  },
});

import { useEffect, useState } from "react";
import {
  StyleSheet,
  TouchableWithoutFeedback,
  Text,
  View,
  ScrollView,
  Linking,
} from "react-native";
import { colors } from "../styles/colors";
import { Icon } from "@rneui/themed";
import Button from "../components/Button";
import { apiGetMyself } from "../services/apiContact";
import { apiGetMenu } from "../services/apiProject";
import { LINKEDIN_URL, RESUME_EN_URL } from "@env";

export default function Menu({ updateIdProject, jumpTo }) {
  const [projects, setProjects] = useState([]);
  const [email, setEmail] = useState();

  const init = async () => {
    const menus = await apiGetMenu();
    const identity = await apiGetMyself();
    setProjects(menus);
    setEmail(identity.email);
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <ScrollView>
      <View style={styles.section}>
        <Text style={styles.title}>Contact me</Text>
        <TouchableWithoutFeedback
          onPress={() => Linking.openURL("mailto:" + email)}
        >
          <View style={styles.button}>
            <Text style={styles.buttonText}>Send me an email</Text>
            <Icon name="chevron-right" type="evilicon" color={colors.white} />
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => Linking.openURL(LINKEDIN_URL)}>
          <View style={[styles.button, styles.dark]}>
            <Text style={styles.buttonText}>Linkedin</Text>
            <Icon name="chevron-right" type="evilicon" color={colors.white} />
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => Linking.openURL(RESUME_EN_URL)}
        >
          <View style={styles.button}>
            <Text style={styles.buttonText}>Download english resume</Text>
            <Icon name="chevron-right" type="evilicon" color={colors.white} />
          </View>
        </TouchableWithoutFeedback>
      </View>
      <View style={[styles.section, styles.end]}>
        <Text style={styles.title}>Projects</Text>
        {projects.map((project, index) => {
          return (
            <Button
              key={index}
              updateIdProject={updateIdProject}
              jumpTo={jumpTo}
              idProject={project.id}
              index={index}
              slug={project.slug}
              buttonTitle={project.title}
            />
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  section: {
    marginTop: 50,
    marginRight: 20,
    marginLeft: 20,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: colors.cyan,
  },
  end: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    marginBottom: 50,
  },
  button: {
    borderRadius: 0,
    backgroundColor: colors.clearBlue,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  dark: {
    backgroundColor: colors.darkBlue,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: "LatoLight",
    color: colors.white,
    lineHeight: 40,
  },
  title: {
    fontSize: 18,
    lineHeight: 40,
    fontFamily: "LatoBold",
    textAlign: "left",
    margin: 20,
    color: colors.cyan,
    textTransform: "uppercase",
  },
});

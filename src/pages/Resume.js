import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { styleMain } from "../styles/main";
import { colors } from "../styles/colors";
import { apiGetResume } from "../services/apiResume";
import { apiGetMyself } from "../services/apiContact";
import TextCustom from "../components/TextCustom";
import Experience from "../components/Experience";

export default function Resume({ jumpTo }) {
  const [currentWork, setCurrentWork] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [experiences, setExperiences] = useState([]);

  const loadResume = async () => {
    const resume = await apiGetResume();
    const identity = await apiGetMyself();
    setCurrentWork(identity.current_work);
    setIntroduction(resume.introduction);
    setExperiences(resume.experiences);
  };

  useEffect(() => {
    loadResume();
  }, []);

  return (
    <View style={styleMain.pageContainer}>
      <ScrollView style={styleMain.pagePadding}>
        <TextCustom isTitle={true}>{currentWork}</TextCustom>
        <TextCustom>{introduction}</TextCustom>
        <TextCustom style={styles.section}>Work Experiences</TextCustom>
        {experiences.map((exp) => {
          return (
            <Experience
              key={exp.company}
              title={exp.company}
              location={exp.location}
              role={exp.role}
              is_remote={exp.is_remote}
              is_current={exp.is_current}
              start_date={exp.start_date}
              end_date={exp.end_date}
              missions={exp.missions}
              website={exp.website}
            />
          );
        })}
        <TextCustom style={styles.section}>Education</TextCustom>
      </ScrollView>
      <StatusBar style="auto" hidden />
    </View>
  );
}

const styles = StyleSheet.create({
  wait: {
    marginTop: 50,
    color: colors.cyan,
    textAlign: "center",
  },
  section: {
    color: colors.white,
  },
});

import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import { styleMain } from "../styles/main";
import { colors } from "../styles/colors";
import { apiGetResume } from "../services/apiResume";
import { apiGetMyself } from "../services/apiContact";
import TextCustom from "../components/TextCustom";
import Experience from "../components/Experience";
import Education from "../components/Education";
import Personal from "../components/Personal";
import Avatar from "../components/Avatar";
import Bottom from "../components/Bottom";
import aloneImg from "../../assets/alone.jpg";
import { Icon } from "@rneui/themed";

export default function Resume({ jumpTo }) {
  const [fullname, setFullname] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [experiences, setExperiences] = useState([]);
  const [educations, setEducations] = useState([]);
  const [personals, setPersonals] = useState([]);

  const loadResume = async () => {
    const resume = await apiGetResume();
    const identity = await apiGetMyself();
    setFullname(identity.fullname);
    setIntroduction(resume.introduction);
    setExperiences(resume.experiences);
    setEducations(resume.educations);
    setPersonals(resume.personals);
  };

  useEffect(() => {
    loadResume();
  }, []);

  return (
    <View style={styleMain.pageContainer}>
      <ScrollView style={styleMain.pagePadding}>
        <TextCustom style={styles.title} isTitle={true}>
          {fullname}
        </TextCustom>
        <TouchableWithoutFeedback onPress={() => jumpTo("menu")}>
          <View style={styles.redirect}>
            <Icon
              name="download"
              type="font-awesome"
              color={colors.cyan}
              size={12}
            />
            <Text style={styles.link}>Download resume in PDF</Text>
          </View>
        </TouchableWithoutFeedback>
        <Avatar img={aloneImg} />
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
        {educations.map((ed, index) => {
          return (
            <Education
              key={index}
              diploma={ed.diploma}
              graduation_date={ed.graduation_date}
              location={ed.location}
              website={ed.website}
            />
          );
        })}
        <TextCustom style={styles.section}>Personal Experiences</TextCustom>
        {personals.map((ed, index) => {
          return (
            <Personal
              key={index}
              introduction={ed.introduction}
              website={ed.website}
            />
          );
        })}
        <Bottom />
      </ScrollView>
      <StatusBar style="auto" hidden />
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    color: colors.white,
    marginTop: 20,
    marginBottom: 50,
  },
  title: {
    marginBottom: 0,
  },
  link: {
    textDecorationLine: "underline",
    textAlign: "center",
    color: colors.cyan,
  },
  redirect: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 40,
    gap: 8,
  },
});

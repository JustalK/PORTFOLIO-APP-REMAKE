import { useCallback, useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { colors } from "../styles/colors";
import { StyleSheet, View, Text, TouchableWithoutFeedback } from "react-native";
import { styleMain } from "../styles/main";
import profileImg from "../../assets/me.jpeg";
import Loading from "../components/Loading";
import WritingEffect from "../components/WritingEffect";
import BlinkingEffect from "../components/BlinkingEffect";
import Avatar from "../components/Avatar";
import Background from "../components/Background";
import { apiGetMyself } from "../services/apiContact";
import { apiGetJobs } from "../services/apiJob";
import { Canvas } from '@react-three/fiber';

export default function Home({ navigation }) {
  const [isLoadingMyself, setLoadingMyself] = useState(true);
  const [isLoadingJobs, setLoadingJob] = useState(true);
  const [myself, setMyself] = useState([]);
  const [jobs, setJobs] = useState([]);

  const getMyself = async () => {
    const identity = await apiGetMyself();
    setMyself(identity);
    setLoadingMyself(false);
  };

  const getJobs = async () => {
    const jobs = await apiGetJobs();
    const jobs_title = jobs.map((job) => job.title);
    setJobs(jobs_title);
    setLoadingJob(false);
  };

  useEffect(() => {
    getMyself();
    getJobs();
  }, []);

  const renderHome = useCallback(() => {
    return (
      <View style={styles.screen}>
        <View style={styles.info}>
          <Avatar img={profileImg} />
          <Text style={styles.textStyle}>
            Hello World, I'm{" "}
            <Text style={styles.fullname}>{myself.fullname}</Text>
          </Text>
          <WritingEffect
            style={styles.textStyle}
            predata="I'm a"
            data={jobs}
          ></WritingEffect>
          <Text style={styles.textStyle}>
            For inquiries, contact me at {myself.email}
          </Text>
          <BlinkingEffect>
            <Text style={styles.intructions}>Press the screen</Text>
          </BlinkingEffect>
        </View>
        <Canvas style={styles.canvas}>
          <Background />
        </Canvas>
      </View>
    );
  }, [jobs, myself]);

  return (
    <TouchableWithoutFeedback onPress={() => navigation.navigate("Portfolio")}>
      <View style={styleMain.homeContainer}>
        {isLoadingMyself || isLoadingJobs ? (
          <Loading isScreen={true} />
        ) : (
          renderHome()
        )}
        <StatusBar style="auto" hidden />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    width: '100%'
  },
  info: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    position: 'relative',
    zIndex: 1
  },
  canvas: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    left: 0,
    top: 0
  },
  textStyle: {
    margin: 0,
    fontSize: 18,
    fontFamily: "LatoLight",
    textAlign: "center",
    color: colors.cyan,
  },
  fullname: {
    textTransform: "capitalize",
  },
  intructions: {
    marginTop: 100,
    textAlign: "center",
    fontFamily: "LatoLight",
    fontSize: 14,
    color: colors.white,
    textTransform: "uppercase",
  },
});

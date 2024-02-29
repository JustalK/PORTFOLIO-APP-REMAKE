import { useCallback, useEffect, useState, useRef } from "react";
import { StatusBar } from "expo-status-bar";
import { colors } from "../styles/colors";
import { StyleSheet, View, Text, Easing } from "react-native";
import { styleMain } from "../styles/main";
import profileImg from "../../assets/me.jpeg";
import Loading from "../components/Loading";
import WritingEffect from "../components/WritingEffect";
import BlinkingEffect from "../components/BlinkingEffect";
import Avatar from "../components/Avatar";
import Background from "../components/Background";
import { apiGetMyself } from "../services/apiContact";
import { apiGetJobs } from "../services/apiJob";
import { Canvas } from "@react-three/fiber";
import { useWindowDimensions } from "react-native";
import { AnimatedCircularProgress } from 'react-native-circular-progress';

export default function Home({ navigation }) {
  const [isLoadingMyself, setLoadingMyself] = useState(true);
  const [isLoadingJobs, setLoadingJob] = useState(true);
  const [myself, setMyself] = useState([]);
  const [jobs, setJobs] = useState([]);
  const { height, width } = useWindowDimensions();
  const mouse = useRef(null);
  const startPressTimestamp = useRef(null);
  const [percentHold, setPercentHold] = useState(0);
  const percentIncreaseHoldTimer = useRef(null);
  const percentDecreaseHoldTimer = useRef(null);
  const circularProgress = useRef(null);

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

  const handlePressStart = (event) => {
    startPressTimestamp.current = event.nativeEvent.timestamp;
    increasePercentHold();
  };

  const handleMove = (event) => {
    if (event.nativeEvent.timestamp - startPressTimestamp.current > 1000) {
      console.log("YEP");
    } else {
      console.log("NO");
    }
    mouse.current = {
      x: event.nativeEvent.pageX / width,
      y: 1.0 - event.nativeEvent.pageY / height,
    };
    // navigation.navigate("Portfolio")
  };

  const handlePressRelease = (event) => {
    clearInterval(percentIncreaseHoldTimer.current);
    decreasePercentHold();
  };

  const increasePercentHold = () => {
    if (percentDecreaseHoldTimer.current) {
      clearInterval(percentDecreaseHoldTimer.current);
      percentDecreaseHoldTimer.current = null;
    }
    percentIncreaseHoldTimer.current = setInterval(() => {
      setPercentHold(c => Math.min(c + 1, 100));
    }, 100)
  }

  const decreasePercentHold = () => {
    if (percentHold?.current === 0) {
      clearInterval(percentIncreaseHoldTimer.current);
      percentIncreaseHoldTimer.current = null;
    }
    percentDecreaseHoldTimer.current = setInterval(() => {
      setPercentHold(c => Math.max(c - 1, 0));
    }, 100)
  }

  useEffect(() => {
    getMyself();
    getJobs();
    if (circularProgress.current) {
      circularProgress.current.animate(percentHold, 80, Easing.quad);
    }
  }, [percentHold]);

  const renderHome = useCallback(() => {
    return (
      <View style={styles.screen}>
        <View style={styles.info}>
          <AnimatedCircularProgress
            ref={(ref) => circularProgress.current = ref}
            size={220}
            width={10}
            fill={0}
            tintColor="#61C3FF"
            style={styles.loader}>
            {
              () => (
                <Avatar img={profileImg} />
              )
            }
            </AnimatedCircularProgress>
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
            <Text style={styles.intructions}>Press and hold</Text>
          </BlinkingEffect>
        </View>
        <Canvas style={styles.canvas}>
          <Background mouse={mouse} height={height} width={width} />
        </Canvas>
      </View>
    );
  }, [jobs, myself]);

  return (
    <View
      style={styleMain.homeContainer}
      onStartShouldSetResponder={() => true}
      onResponderGrant={handlePressStart}
      onResponderMove={handleMove}
      onResponderRelease={handlePressRelease}
    >
      {isLoadingMyself || isLoadingJobs ? (
        <Loading isScreen={true} />
      ) : (
        renderHome()
      )}
      <StatusBar style="auto" hidden />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    width: "100%",
  },
  loader: {
    marginBottom: 50,
  },
  info: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    zIndex: 1,
  },
  canvas: {
    height: "100%",
    width: "100%",
    position: "absolute",
    left: 0,
    top: 0,
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

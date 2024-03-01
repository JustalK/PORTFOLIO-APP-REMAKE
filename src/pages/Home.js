import { useCallback, useEffect, useState, useRef, useMemo } from "react";
import { StatusBar } from "expo-status-bar";
import { colors } from "../styles/colors";
import { StyleSheet, View, Text, Easing } from "react-native";
import { styleMain } from "../styles/main";
import aloneImg from "../../assets/alone.jpg";
import Loading from "../components/Loading";
import WritingEffect from "../components/WritingEffect";
import BlinkingEffect from "../components/BlinkingEffect";
import Avatar from "../components/Avatar";
import Background from "../components/Background";
import Transition from "../components/Transition";
import { apiGetMyself } from "../services/apiContact";
import { apiGetJobs } from "../services/apiJob";
import { Canvas } from "@react-three/fiber";
import { useWindowDimensions } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";

export default function Home({ navigation }) {
  const [isLoadingMyself, setLoadingMyself] = useState(true);
  const [isLoadingJobs, setLoadingJob] = useState(true);
  const [velocity, setVelocity] = useState(true);
  const [myself, setMyself] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const { height, width } = useWindowDimensions();
  const mouse = useRef(null);
  const [percentHold, setPercentHold] = useState(0);
  const percentIncreaseHoldTimer = useRef(null);
  const percentDecreaseHoldTimer = useRef(null);
  const speed = useRef(1);
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
    increasePercentHold();
    mouse.current = {
      x: event.nativeEvent.pageX / width,
      y: 1.0 - event.nativeEvent.pageY / height,
    };
  };

  const handleMove = (event) => {
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
      speed.current = Math.min(speed.current + 1, 100);
      setPercentHold((c) => Math.min(c + speed.current, 100));
    }, 100);
  };

  const decreasePercentHold = () => {
    if (!loaded) {
      if (percentHold === 0) {
        clearInterval(percentIncreaseHoldTimer.current);
        percentIncreaseHoldTimer.current = null;
        speed.current = 1;
        return;
      }
      percentDecreaseHoldTimer.current = setInterval(() => {
        speed.current = Math.max(speed.current - 1, 1);
        setPercentHold((c) => Math.max(c - speed.current, 0));
      }, 100);
    }
  };

  const increaseVelocity = () => {
    setInterval(() => {
      setVelocity((c) => Math.min(c - 0.01, 1.0));
    }, 100);
  };

  const interpolate = useMemo(() => {
    const color1 = "#61C3FF";
    const color2 = "#FFFFFF";
    const percent = Math.min((percentHold * 1.5) / 100, 1.0);
    // Convert the hex colors to RGB values
    const r1 = parseInt(color1.substring(1, 3), 16);
    const g1 = parseInt(color1.substring(3, 5), 16);
    const b1 = parseInt(color1.substring(5, 7), 16);

    const r2 = parseInt(color2.substring(1, 3), 16);
    const g2 = parseInt(color2.substring(3, 5), 16);
    const b2 = parseInt(color2.substring(5, 7), 16);

    // Interpolate the RGB values
    const r = Math.round(r1 + (r2 - r1) * percent);
    const g = Math.round(g1 + (g2 - g1) * percent);
    const b = Math.round(b1 + (b2 - b1) * percent);

    // Convert the interpolated RGB values back to a hex color
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }, [percentHold]);

  useEffect(() => {
    getMyself();
    getJobs();
    if (circularProgress.current) {
      circularProgress.current.animate(percentHold, 100, Easing.linear);
    }
    if (percentHold === 100) {
      setLoaded(true);
      increaseVelocity();
    }
  }, [percentHold]);

  const renderHome = useCallback(() => {
    return (
      <View style={styles.screen}>
        <View style={styles.info}>
          <AnimatedCircularProgress
            ref={(ref) => (circularProgress.current = ref)}
            size={211}
            width={6}
            fill={0}
            tintColor={interpolate}
            style={styles.loader}
          >
            {() => <Avatar img={aloneImg} borderColor={interpolate} />}
          </AnimatedCircularProgress>
          <Text style={[styles.textStyle, { color: interpolate }]}>
            Hello World, I'm{" "}
            <Text style={styles.fullname}>{myself.fullname}</Text>
          </Text>
          {!loaded ? (
            <WritingEffect
              style={[styles.textStyle, { color: interpolate }]}
              predata="I'm a"
              data={jobs}
            ></WritingEffect>
          ) : (
            <Text style={[styles.textStyle, { color: interpolate }]}>
              I'm a developer
            </Text>
          )}
          <Text style={[styles.textStyle, { color: interpolate }]}>
            For inquiries, contact me at {myself.email}
          </Text>
          {!loaded ? (
            <BlinkingEffect>
              <Text style={styles.intructions}>Press and hold</Text>
            </BlinkingEffect>
          ) : (
            <Text style={styles.intructions}>WELCOME</Text>
          )}
        </View>
        <Canvas style={styles.canvas}>
          <Background
            mouse={mouse}
            height={height}
            width={width}
            percentHold={percentHold}
            loaded={loaded}
          />
        </Canvas>
        {loaded && (
          <Canvas style={styles.canvas2}>
            <Transition height={height} width={width} velocity={velocity} />
          </Canvas>
        )}
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
  canvas2: {
    height: "100%",
    width: "100%",
    position: "absolute",
    left: 0,
    top: 0,
    zIndex: 3,
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

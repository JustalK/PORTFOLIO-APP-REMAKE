import React, { useEffect, useState } from "react";
import { View, ScrollView } from "react-native";
import { styleMain } from "../styles/main";
import Loading from "../components/Loading";
import Slide from "../components/Slide";
import TextCustom from "../components/TextCustom";
import { apiGetOneProject } from "../services/apiProject";
import { apiGetSlides } from "../services/apiSlide";
import { isGoingDown } from "../libs/utils";
import Bottom from "../components/Bottom";

export default function ProjectZoom({ isLoading, idProject, projectLoaded }) {
  const [title, setTitle] = useState("");
  const [slides, setSlides] = useState([]);
  const [slideId, setSlideId] = useState([]);
  const [description, setDescription] = useState("");
  const [isLoadingMore, setIsLoadingMore] = useState(true);

  const loadProject = async () => {
    const project = await apiGetOneProject(idProject);
    let slides = [];

    if (project.slides !== null && project.slides.length > 0) {
      slides = [await loadSlide(project.slides[0])];
    }

    setTitle(project.title);
    setSlides(slides);
    setSlideId(project.slides);
    setDescription(project.long_description);
    setIsLoadingMore(true);
    projectLoaded();
  };

  const loadSlide = async (idSlide) => {
    const slide = await apiGetSlides(idSlide);
    return slide;
  };

  const nextSlide = async (idSlide) => {
    const s = await loadSlide(idSlide);
    setSlides([...slides, s]);
    setIsLoadingMore(true);
  };

  const lastSlide = () => {
    return slides.length === slideId.length;
  };

  useEffect(() => {
    loadProject();
  }, [idProject]);

  const renderProject = () => {
    return (
      <ScrollView
        onScroll={({ nativeEvent }) => {
          if (
            isGoingDown(
              isLoadingMore,
              nativeEvent.layoutMeasurement,
              nativeEvent.contentOffset,
              nativeEvent.contentSize,
              setIsLoadingMore
            ) &&
            !lastSlide()
          ) {
            const next = slides.length;
            nextSlide(slideId[next]);
          }
        }}
        style={styleMain.pagePadding}
      >
        <TextCustom isTitle={true}>{title}</TextCustom>
        <TextCustom>{description}</TextCustom>
        {slides.map((slide, index) => {
          return (
            <Slide
              key={index}
              firstText={slide.first_text}
              secondText={slide.second_text}
              title={slide.image.name}
              image={slide.image.path}
            />
          );
        })}
        {isLoadingMore && <Loading />}
        {lastSlide() && <Bottom />}
      </ScrollView>
    );
  };

  return (
    <View style={styleMain.pageContainer}>
      {isLoading ? <Loading isScreen={true} /> : renderProject()}
    </View>
  );
}

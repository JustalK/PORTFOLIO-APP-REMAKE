import { styleMain } from "../styles/main";
import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import Loading from "../components/Loading";
import { View, ScrollView } from "react-native";
import TextCustom from "../components/TextCustom";
import Project from "../components/Project";
import { apiGetProjects, apiCountProjects } from "../services/apiProject";
import { apiGetPortfolioInformation } from "../services/apiPage";
import Bottom from "../components/Bottom";
import { isGoingDown } from "../libs/utils";

export default function Listing({ updateIdProject, jumpTo }) {
  const [page, setPage] = useState(0);
  const [projects, setProjects] = useState([]);
  const [informations, setInformations] = useState({
    title: "",
    description: "",
  });
  const [pageLimit, setPageLimit] = useState(1);
  const [isLoading, setIsLoading] = useState(1);
  const [isLoadingMore, setIsLoadingMore] = useState(1);

  const getPageInformations = async () => {
    const infos = await apiGetPortfolioInformation();
    setInformations({
      ...infos[0],
    });
  };

  const getPageLimit = async () => {
    const total = await apiCountProjects();
    const pageMax = total.total / 4;
    setPageLimit({ pageLimit: pageMax });
  };

  const getProjectsInformations = async (page) => {
    const newProjects = await apiGetProjects(page);
    setProjects([...projects, ...newProjects]);
    setPage(page);
    setIsLoadingMore(true);
    setIsLoading(false);
  };

  const endOfPage = () => {
    return page + 1 > pageLimit;
  };

  const renderListing = () => {
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
            !endOfPage()
          ) {
            const nextPage = page + 1;
            getProjectsInformations(nextPage);
          }
        }}
        style={styleMain.pagePadding}
      >
        <TextCustom isTitle={true}>{informations.title}</TextCustom>
        <TextCustom>{informations.description}</TextCustom>
        {projects.map((project, index) => {
          return (
            <Project
              image={project.images[0].path}
              updateIdProject={updateIdProject}
              jumpTo={jumpTo}
              id={project._id}
              title={project.title}
              key={index}
            ></Project>
          );
        })}
        {isLoadingMore && <Loading />}
        {endOfPage() && <Bottom />}
      </ScrollView>
    );
  };

  const loading = async () => {
    await getPageInformations();
    await getProjectsInformations(0);
    await getPageLimit();
  };

  useEffect(() => {
    loading();
  }, []);

  return (
    <View style={styleMain.pageContainer}>
      {isLoading ? <Loading isScreen={true} /> : renderListing()}
      <StatusBar style="auto" hidden />
    </View>
  );
}

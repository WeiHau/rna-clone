import React, { useEffect } from "react";
import {
  Dimensions,
  View,
  Text,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  BackHandler,
  StatusBar,
  StyleSheet,
} from "react-native";

import Categories from "../components/anime/Categories";
import Details from "../components/anime/Details";
import About from "../components/anime/About";
import Characters from "../components/anime/Characters";

// redux
import { connect } from "react-redux";

const dimensions = Dimensions.get("window");
const screenHeight = Math.round(dimensions.height);

const STATUSBAR_HEIGHT = Platform.OS === "ios" ? 20 : StatusBar.currentHeight;

const ScrollContent = (props) => {
  return (
    <View>
      <ScrollView bounces={false}>
        <View style={styles.imageBackgroundFrontView} />
        <View style={styles.scrollContentBody}>
          <About />
          <Categories />
          <Details />
          <Characters />
        </View>
      </ScrollView>
    </View>
  );
};

const BackButton = (props) => {
  const { goBack } = props;

  return (
    <View style={styles.backButton}>
      <TouchableOpacity onPress={goBack} style={{ padding: 10 }}>
        <Text style={{ color: "white" }}>&lt;&lt;</Text>
      </TouchableOpacity>
    </View>
  );
};

const anime = (props) => {
  if (!props.anime) {
    return null;
  }
  const goBack = () => {
    props.navigation.goBack();
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        goBack();
        return true;
      }
    );

    return () => backHandler.remove();
  }, []);

  const { coverImage } = props.anime.attributes;
  const coverImageUrl = coverImage
    ? coverImage.original
    : "https://kitsu.io/images/default_cover-22e5f56b17aeced6dc7f69c8d422a1ab.png";

  return (
    <View style={{ marginTop: STATUSBAR_HEIGHT }}>
      <ImageBackground
        source={{ uri: coverImageUrl }}
        imageStyle={{ height: 200 }}
        style={{ height: screenHeight, backgroundColor: "grey" }}
        resizeMode={"cover"}
      >
        <BackButton goBack={goBack} />
        <ScrollContent />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  backButton: {
    backgroundColor: "rgba(0,0,0,0.2)",
    position: "absolute",
    borderRadius: 20,
    zIndex: 2,
  },
  imageBackgroundFrontView: {
    height: 200,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "flex-end",
  },
  scrollContentBody: {
    paddingHorizontal: 15,
    paddingBottom: 20,
    minHeight: screenHeight - 200,
    backgroundColor: "white",
    elevation: 1,
  },
});

const mapStateToProps = (state) => ({
  anime: state.anime,
});

export default connect(mapStateToProps)(anime);

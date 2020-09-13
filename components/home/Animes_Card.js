import React, { useState } from "react";
import {
  Text,
  View,
  TouchableWithoutFeedback,
  ImageBackground,
  StyleSheet,
  Dimensions,
} from "react-native";

import CardModal from "./Animes_Card_Modal";

// redux
import { connect } from "react-redux";
import { setAnime } from "../../redux/actions";

// navigation
import { useNavigation } from "@react-navigation/native";

const Card = (props) => {
  //if (!props.anime) return null;
  const { anime, setAnime } = props;
  const { attributes } = anime;
  const [modalVisible, setModalVisible] = useState(false);

  const navigation = useNavigation();

  let imgUrl = attributes.posterImage
    ? attributes.posterImage.medium
    : "https://media.kitsu.io/anime/poster_images/10577/medium.jpg?1460247156";

  let card = modalVisible ? (
    <CardModal modalVisible={modalVisible} anime={anime} />
  ) : (
    <View style={styles.animeTitle}>
      <Text numberOfLines={1} style={styles.cardTitle}>
        {attributes.canonicalTitle}
      </Text>
    </View>
  );

  const showModal = () => {
    setModalVisible(true);
  };
  const hideModal = () => {
    setModalVisible(false);
  };

  const selectAnime = () => {
    setAnime(anime);
    navigation.navigate("Anime");
  };

  return (
    <View style={styles.cardContainer}>
      <TouchableWithoutFeedback
        style={{ width: "100%" }}
        onLongPress={showModal}
        onPressOut={hideModal}
        onPress={selectAnime}
      >
        <View style={styles.card}>
          <ImageBackground
            source={{ uri: imgUrl }}
            style={styles.cardImage}
            resizeMode={"contain"}
          >
            {card}
          </ImageBackground>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const dimensions = Dimensions.get("window");
//"width":390,"height":554
const imageWidth = (dimensions.width * 45) / 100;
const ratio = imageWidth / 390;
const imageHeight = 554 * ratio;

const styles = StyleSheet.create({
  cardContainer: {
    alignItems: "center",
    width: "50%",
    marginBottom: 10,
  },
  card: {
    flex: 1,
    alignItems: "center",
    borderRadius: 4,
    overflow: "hidden",
  },
  animeTitle: {
    width: imageWidth,
    flex: 1,
    justifyContent: "flex-end",
  },
  cardTitle: {
    textAlign: "center",
    fontWeight: "600",
    color: "#333333",
    backgroundColor: "rgba(255,255,255,0.8)",
  },
  cardImage: {
    width: imageWidth,
    height: imageHeight,
  },
});

export default connect(null, { setAnime })(Card);

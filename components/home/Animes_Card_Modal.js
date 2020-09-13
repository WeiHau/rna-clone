import React, { useEffect, useRef } from "react";
import { Animated, Text, View, StyleSheet, Dimensions } from "react-native";

const CardModal = (props) => {
  const {
    canonicalTitle,
    averageRating,
    popularityRank,
    ratingRank,
    startDate,
  } = props.anime.attributes;
  const year = startDate.substring(0, 4);

  const slideAnim = useRef(new Animated.Value(200)).current;

  useEffect(() => {
    Animated.spring(slideAnim, {
      toValue: -25,
      friction: 7,
      tension: 60,
      useNativeDriver: true,
      //bounciness: 8,
      //speed:16
      // damping: 10,
      // stiffness: 80,
      // mass: 1,
    }).start();
  }, []);

  return (
    <Animated.View
      style={[styles.cardModal, { transform: [{ translateY: slideAnim }] }]}
    >
      <View style={styles.container}>
        <Text style={styles.title}>{canonicalTitle}</Text>
        <Text
          style={{ textAlign: "center", color: "#333333", fontWeight: "100" }}
        >
          {year}
        </Text>
      </View>
      <View style={{ marginHorizontal: "5%" }}>
        {averageRating && (
          <Text style={styles.averageRating}>{averageRating + "%"}</Text>
        )}
        {popularityRank && (
          <Text>{"#" + popularityRank + " Most Popular"}</Text>
        )}
        {ratingRank && <Text>{"#" + ratingRank + " Highest Rated"}</Text>}
      </View>
    </Animated.View>
  );
};

const dimensions = Dimensions.get("window");
//"width":390,"height":554
const imageWidth = (dimensions.width * 45) / 100;
const ratio = imageWidth / 390;
const imageHeight = 554 * ratio;

const styles = StyleSheet.create({
  cardModal: {
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.8)",
    height: imageHeight + 50,
  },
  container: {
    borderBottomWidth: 1,
    marginHorizontal: "5%",
    marginBottom: 5,
    paddingVertical: 8,
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    fontWeight: "600",
    color: "black",
  },
  averageRating: {
    color: "#069075",
    fontSize: 16,
    alignSelf: "flex-end",
    marginBottom: 5,
  },
});

export default CardModal;

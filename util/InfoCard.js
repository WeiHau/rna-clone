import React from "react";
import { View, Text, StyleSheet } from "react-native";

const InfoCard = (props) => (
  <View style={{ ...styles.container, ...props.style }}>
    {props.title && <Text style={styles.title}>{props.title}</Text>}
    {props.children}
  </View>
);

const styles = StyleSheet.create({
  container: {
    zIndex: 10,
    position: "relative",
    bottom: 20,
    borderWidth: 8,
    borderColor: "white",
    borderRadius: 8,
    backgroundColor: "white",
    shadowOffset: { width: 0, height: 0 },
    shadowColor: "black",
    shadowOpacity: 0.2,
    elevation: 5,
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 5,
    marginBottom: 10,
  },
});

export default InfoCard;

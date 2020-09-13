import React, { useState } from "react";
import { TouchableOpacity, StyleSheet } from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";

import Modal from "./CategoryBtn_Modal";

const CategoriesBtn = (props) => {
  const [modalVisible, setModalVisible] = useState(false);

  const showModal = () => {
    setModalVisible(true);
  };
  const hideModal = () => {
    setModalVisible(false);
  };

  return (
    <TouchableOpacity style={styles.button} onPress={showModal}>
      <MaterialCommunityIcons name="tag-plus" size={40} color="#333333" />
      <Modal modalVisible={modalVisible} hideModal={hideModal} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: "15%",
    backgroundColor: "#bbbbbb",
    alignItems: "center",
    justifyContent: "center",
    borderTopLeftRadius: 40,
    borderBottomLeftRadius: 40,
  },
});

export default CategoriesBtn;

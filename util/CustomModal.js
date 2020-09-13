import React from "react";
import {
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

const CustomModal = (props) => (
  <Modal
    transparent={true}
    animationType={"fade"}
    visible={props.visible}
    onShow={props.onShow}
  >
    <TouchableOpacity
      activeOpacity={1}
      style={{
        flex: 1,
        backgroundColor: "rgba(52, 52, 52, 0.5)",
        justifyContent: "center",
        alignItems: "center",
      }}
      onPress={props.hideModal}
    >
      <TouchableWithoutFeedback>
        <View
          style={{
            width: "85%",
            height: "85%",
            backgroundColor: "white",
            borderRadius: 8,
            overflow: "hidden",
            justifyContent: "space-around",
            ...props.styles,
          }}
        >
          {props.children}
        </View>
      </TouchableWithoutFeedback>
    </TouchableOpacity>
  </Modal>
);

export default CustomModal;

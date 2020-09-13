import React from "react";
import { Button, Text } from "react-native";

// redux
import { connect } from "react-redux";
import { appendText } from "./redux/actions";

const TempComponent = (props) => {
  return (
    <>
      <Text>{props.testData}</Text>
      <Button
        onPress={() => {
          props.appendText("new text des");
        }}
        title="append new txt des"
      />
    </>
  );
};

const mapStateToProps = (state) => ({
  testData: state.testData,
});

export default connect(mapStateToProps, { appendText })(TempComponent);

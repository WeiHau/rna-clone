import React, { useRef } from "react";
import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native";

import { Feather } from "@expo/vector-icons";

const SearchBar = (props) => {
  const textInputRef = useRef();

  const search = (e) => {
    props.search(e.nativeEvent.text);
  };

  const clearInput = () => {
    textInputRef.current.clear();
    if (!textInputRef.current.isFocused()) {
      props.search("");
    }
  };

  return (
    <View style={styles.searchBar}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search..."
        onEndEditing={search}
        ref={textInputRef}
      />
      <TouchableOpacity onPress={clearInput}>
        <Feather name="delete" size={24} color="grey" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  searchBar: {
    height: 40,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  searchInput: {
    flex: 1,
    fontSize: 20,
  },
});

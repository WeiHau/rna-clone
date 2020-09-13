import React from "react";
import { View, Text, StyleSheet } from "react-native";

// redux
import { connect } from "react-redux";
import { setCategories } from "../../redux/actions";

const SelectedCategories = (props) => {
  if (!props.categories || props.categories.length < 1) {
    return null;
  }

  const { categories, setCategories } = props;

  const removeCategory = (categoryId) => {
    setCategories(categories.filter((category) => category.id !== categoryId));
  };

  let returnVal = categories.map((category) => (
    <Text
      onPress={() => {
        removeCategory(category.id);
      }}
      key={category.id}
      style={styles.categoryText}
    >
      {category.title}
    </Text>
  ));

  return (
    <View style={styles.categoriesContainer}>
      <View>
        <Text>{`Tags: `}</Text>
      </View>
      <View
        style={{
          flexDirection: "row",
        }}
      >
        <>{returnVal}</>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  categoriesContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "#eeeeee",
  },
  categoryText: {
    margin: 1,
    marginHorizontal: 2,
    paddingHorizontal: 3,
    paddingVertical: 2,
    borderRadius: 4,
    backgroundColor: "#dddddd",
  },
});

const mapStateToProps = (state) => ({
  categories: state.categories,
});

export default connect(mapStateToProps, { setCategories })(SelectedCategories);

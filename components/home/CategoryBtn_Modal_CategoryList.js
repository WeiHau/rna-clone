import React from "react";
import { Text, TouchableOpacity, FlatList } from "react-native";

const CategoryCheckBox = React.memo(
  (props) => {
    const { category, selected } = props;

    const onPress = () => {
      if (props.selected) {
        props.removeCategory(category);
      } else {
        props.addCategory(category);
      }
    };

    return (
      <TouchableOpacity
        style={{
          alignItems: "center",
          backgroundColor: selected ? "orange" : "#aaaaaa",
          width: "45%",
          marginHorizontal: "2.5%",
          marginVertical: 2,
          borderRadius: 12,
          padding: 3,
        }}
        onPress={onPress}
      >
        <Text numberOfLines={1}>{category.title}</Text>
      </TouchableOpacity>
    );
  },
  (prevProps, nexProps) => {
    prevProps.selected === nexProps.selected;
  }
);

const CategoryList = (props) => {
  const {
    categoriesData,
    getCategories,
    selectedCategories,
    addCategory,
    removeCategory,
  } = props;

  const renderItem = ({ item }) => {
    let selected =
      selectedCategories &&
      selectedCategories.some(
        (selectedCategory) => selectedCategory.id === item.id
      );

    return (
      <CategoryCheckBox
        category={item}
        addCategory={addCategory}
        removeCategory={removeCategory}
        selected={selected}
      />
    );
  };

  return (
    <TouchableOpacity activeOpacity={1}>
      <FlatList
        data={categoriesData}
        style={{ height: "70%" }}
        contentContainerStyle={{ paddingBottom: 0 }}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        onEndReached={getCategories}
        onEndReachedThreshold={0.2}
      />
    </TouchableOpacity>
  );
};

export default CategoryList;

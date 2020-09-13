import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";

import CategoryList from "./CategoryBtn_Modal_CategoryList";

import { getCategories as fetchCategories } from "../../util/get_functions";

import Modal from "../../util/CustomModal";

// redux
import { connect } from "react-redux";
import { setCategories } from "../../redux/actions";

const Header = (props) => {
  return (
    <View style={{ overflow: "hidden", paddingBottom: 3 }}>
      <View style={{ elevation: 3, backgroundColor: "#fff" }}>
        <Text style={styles.header}>{"Tags/Categories"}</Text>
      </View>
    </View>
  );
};

const SelectedCategories = (props) => {
  const { selectedCategories, removeCategory } = props;

  let returnVal = selectedCategories.map((category) => (
    <Text
      onPress={() => {
        removeCategory(category);
      }}
      key={category.id}
      style={styles.selectedCategory}
    >
      {category.title}
    </Text>
  ));

  return (
    <View>
      <View style={{ overflow: "hidden", paddingTop: 3 }}>
        <View style={{ elevation: 10, backgroundColor: "#fff" }}>
          <Text style={{ paddingTop: 10 }}>{"Selected:"}</Text>
        </View>
      </View>
      <ScrollView>
        <TouchableOpacity style={{ flex: 1 }} activeOpacity={1}>
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            {returnVal}
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const ConfirmButton = (props) => {
  return (
    <View style={{ alignItems: "center", marginTop: 10 }}>
      <TouchableOpacity style={styles.confirmButton} onPress={props.onPress}>
        <Text>Confirm</Text>
      </TouchableOpacity>
    </View>
  );
};

const CategoryModal = (props) => {
  const [categoriesData, setCategoriesData] = useState([]);
  const { categories, setCategories } = props;
  const [selectedCategories, setSelectedCategories] = useState(categories);

  let fetchingData = false;
  const getCategories = async () => {
    if (!fetchingData) {
      fetchingData = true;
      const data = await fetchCategories(categoriesData.length);
      setCategoriesData([...categoriesData, ...data]);
      //setCategoriesData(categoriesData.slice(0, 20));
      fetchingData = false;
    }
  };

  const firstRender = useRef(true);
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      getCategories();
      return;
    }
  }, []);

  const addCategory = (category) => {
    setSelectedCategories([...selectedCategories, category]);
  };

  const removeCategory = (category) => {
    setSelectedCategories(
      selectedCategories.filter((item) => item.id !== category.id)
    );
  };

  const confirmCategories = () => {
    setCategories(selectedCategories);
    props.hideModal();
  };

  return (
    <Modal
      visible={props.modalVisible}
      onShow={() => {
        setSelectedCategories(categories);
      }}
      styles={{ padding: 10 }}
      hideModal={props.hideModal}
    >
      <Header />
      <CategoryList
        categoriesData={categoriesData}
        getCategories={getCategories}
        selectedCategories={selectedCategories}
        addCategory={addCategory}
        removeCategory={removeCategory}
      />
      <SelectedCategories
        selectedCategories={selectedCategories}
        removeCategory={removeCategory}
      />
      <ConfirmButton onPress={confirmCategories} />
    </Modal>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginHorizontal: 5,
    marginBottom: 10,
  },
  selectedCategory: {
    backgroundColor: "orange",
    margin: 1,
    paddingHorizontal: 3,
    borderRadius: 4,
  },
  confirmButton: {
    alignItems: "center",
    padding: 8,
    backgroundColor: "#cccccc",
    width: "30%",
    borderRadius: 12,
  },
});

const mapStateToProps = (state) => ({
  categories: state.categories,
});

export default connect(mapStateToProps, { setCategories })(CategoryModal);

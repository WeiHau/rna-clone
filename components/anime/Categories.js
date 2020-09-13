import React, { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

import { getCategories } from "../../util/get_functions";

import InfoCard from "../../util/InfoCard";

// redux
import { connect } from "react-redux";
import { setCategories } from "../../redux/actions";

// navigation
import { useNavigation } from "@react-navigation/native";

const Categories = (props) => {
  const { categories } = props.anime.relationships;
  const [categoryData, setCategoryData] = useState([]);
  const unmounted = useRef(false);

  const navigation = useNavigation();

  const apiPath = categories.links.related;
  useEffect(() => {
    getCategories(apiPath).then((data) => {
      if (!unmounted.current) setCategoryData(data);
    });
    return () => {
      unmounted.current = true;
    };
  }, []);

  const animeCategories = categoryData.map((category) => {
    return (
      <View style={styles.category} key={category.id}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
            props.setCategories([category]);
          }}
        >
          <Text>{category.title}</Text>
        </TouchableOpacity>
      </View>
    );
  });

  const returnVal =
    categoryData.length > 0 ? (
      <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
        {animeCategories}
      </View>
    ) : (
      <Text>Loading...</Text>
    );

  return <InfoCard title="Tags/Categories">{returnVal}</InfoCard>;
};

const styles = StyleSheet.create({
  category: {
    backgroundColor: "#dddddd",
    borderRadius: 10,
    paddingVertical: 4,
    paddingHorizontal: 6,
    margin: 2,
  },
});

const mapStateToProps = (state) => ({
  anime: state.anime,
});

export default connect(mapStateToProps, { setCategories })(Categories);

import React from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from "react-native";

import Card from "./Animes_Card";
//{/* title, Year, averageRating, popularityRank, ratingRank */}

const Animes = (props) => {
  const { fetchData, animeList, animeCount } = props;
  const numColumns = 2;

  const loadingSpinner = (
    <View style={{ padding: 50 }}>
      <ActivityIndicator size="large" color="#999999" />
    </View>
  );

  const listFooterComponent = () => {
    const msg =
      animeList.length !== animeCount ? (
        loadingSpinner
      ) : (
        <Text style={styles.endOfResultsText}>End of results</Text>
      );
    return <View>{msg}</View>;
  };

  let board;
  if (animeCount < 1) {
    const msg =
      animeCount === -1 ? loadingSpinner : <Text>No result found</Text>;
    board = (
      <View
        style={{
          height: 300,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {msg}
      </View>
    );
  } else {
    board = (
      <View>
        <FlatList
          style={styles.boardFlatList}
          contentContainerStyle={styles.boardContentFlatList}
          data={props.animeList}
          renderItem={({ item }) => <Card anime={item} key={item.id} />}
          keyExtractor={(anime) => anime.id}
          numColumns={numColumns}
          onEndReached={fetchData}
          onEndReachedThreshold={0.2}
          ListFooterComponent={listFooterComponent}
        />
      </View>
    );
  }

  return <View>{board}</View>;
};

const styles = StyleSheet.create({
  boardContentFlatList: {
    paddingBottom: 300,
  },
  boardFlatList: {
    paddingTop: 15,
  },
  endOfResultsText: {
    alignSelf: "center",
    margin: 15,
    color: "#cccccc",
    fontSize: 16,
  },
});

export default Animes;

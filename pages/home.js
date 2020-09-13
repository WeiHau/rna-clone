import React, { useState, useEffect, useRef } from "react";
import { View, StatusBar } from "react-native";

import Animes from "../components/home/Animes";
import SearchBar from "../components/home/SearchBar";
import SortBtn from "../components/home/SortBtn";
import Categories from "../components/home/Categories";
import CategoriesBtn from "../components/home/CategoryBtn";

import { getAnimes } from "../util/get_functions";

// redux
import { connect } from "react-redux";

const STATUSBAR_HEIGHT = Platform.OS === "ios" ? 20 : StatusBar.currentHeight;

const home = (props) => {
  const { categories } = props;

  const [animeList, setAnimeList] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [sort, setSort] = useState("popularityRank");

  //cant use normal variable cuz fetchdata cause re-render, and second time wont call fetchdata again
  const toggleResetAnimeList = useRef(false);
  const animeCount = useRef(-1); //total anime found - for displaying no results found
  const sortEnabled = useRef(true);
  const fetchingData = useRef(false);

  const fetchData = () => {
    if (fetchingData.current || animeList.length === animeCount.current) {
      // if fetching data / end of result, dont fetch
      return;
    }
    fetchingData.current = true;
    sortEnabled.current = !searchText && !categories.length; //disable sort if searched/categorized

    getAnimes(animeList.length, searchText, sort, categories)
      .then((data) => {
        animeCount.current = data.count;
        setAnimeList([...animeList, ...data.data]);
        fetchingData.current = false;
      })
      .catch((err) => {
        console.log(err);
        fetchingData.current = false;
      });
  };

  const search = (value) => {
    if (searchText !== value) {
      setSearchText(value);
    }
  };

  useEffect(() => {
    setAnimeList([]);
    toggleResetAnimeList.current = !toggleResetAnimeList.current;
  }, [searchText, sort, categories]);

  useEffect(() => {
    animeCount.current = -1;
    fetchData();
  }, [toggleResetAnimeList.current]);

  return (
    <View
      style={{
        marginTop: STATUSBAR_HEIGHT,
      }}
    >
      <SearchBar search={search} />
      <View style={{ flexDirection: "row", backgroundColor: "#dddddd" }}>
        <SortBtn
          selectedValue={sort}
          onValueChange={setSort}
          enabled={sortEnabled.current}
        />
        <CategoriesBtn />
      </View>
      <Categories />
      <Animes
        animeList={animeList}
        fetchData={fetchData}
        animeCount={animeCount.current}
      />
    </View>
  );
};

const mapStateToProps = (state) => ({
  categories: state.categories,
});

export default connect(mapStateToProps, {})(home);

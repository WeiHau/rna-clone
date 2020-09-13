import React, { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

import CharacterCards from "./Characters_Cards";
import CharacterModal from "./Characters_Modal";

import { getCharacters as fetchCharacters } from "../../util/get_functions";
import InfoCard from "../../util/InfoCard";

// redux
import { connect } from "react-redux";

const Characters = (props) => {
  const { characters } = props.anime.relationships;
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  if (!characters) {
    return null;
  }

  const [charactersData, setCharactersData] = useState([]);
  const [shownCharactersCount, setShownCharactersCount] = useState(0);

  const nextPath = useRef(
    `https://kitsu.io/api/edge/anime/${props.anime.id}/characters?sort=role&page[limit]=20&page[offset]=0`
  );
  const charactersCount = useRef(-1); // for displaying 'no characters found' if 0
  const unmounted = useRef(false);

  const getCharacters = async () => {
    let res = await fetchCharacters(nextPath.current, charactersData);
    charactersCount.current = res.count;

    if (!charactersCount.current) {
      setShownCharactersCount(0);
      return;
    }
    nextPath.current = res.nextPath;

    if (!unmounted.current) {
      setCharactersData(res.data);
    }
  };

  useEffect(() => {
    addShownCharactersCount();

    return () => {
      unmounted.current = true;
    };
  }, []);

  let loadingCharacters = false;
  const addShownCharactersCount = () => {
    if (loadingCharacters) return;

    if (
      shownCharactersCount >= charactersData.length - 16 &&
      nextPath.current
    ) {
      loadingCharacters = true;
      getCharacters().then(() => {
        loadingCharacters = false;
      });
    }

    setShownCharactersCount((shownCharactersCount) => shownCharactersCount + 8);
  };

  const reduceShownCharactersCount = () => {
    setShownCharactersCount((shownCharactersCount) => {
      if (shownCharactersCount % 8 !== 0) {
        return shownCharactersCount - (shownCharactersCount % 8);
      } else {
        return shownCharactersCount - 8;
      }
    });
  };

  let returnVal;
  if (charactersCount.current === -1) {
    returnVal = <Text>Loading...</Text>;
  } else if (charactersCount.current === 0) {
    returnVal = <Text>No character data found</Text>;
  } else {
    returnVal = (
      <View>
        <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
          <CharacterCards
            charactersData={charactersData}
            shownCharactersCount={shownCharactersCount}
            setSelectedCharacter={setSelectedCharacter}
          />
          <CharacterModal
            character={selectedCharacter}
            setSelectedCharacter={setSelectedCharacter}
          />
        </View>
        <View style={{ justifyContent: "center", paddingHorizontal: 50 }}>
          <View style={styles.buttonContainer}>
            {shownCharactersCount > 8 && (
              <TouchableOpacity
                onPress={reduceShownCharactersCount}
                style={styles.button}
              >
                <Text style={styles.buttonText}>LESS</Text>
              </TouchableOpacity>
            )}

            {shownCharactersCount < charactersData.length && (
              <TouchableOpacity
                onPress={addShownCharactersCount}
                style={styles.button}
              >
                <Text style={styles.buttonText}>MORE</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    );
  }

  return <InfoCard title="Characters">{returnVal}</InfoCard>;
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#eeeeee",
    marginTop: 10,
    borderRadius: 24,
    overflow: "hidden",
  },
  button: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    flex: 1,
    alignItems: "center",
  },
  buttonText: { fontSize: 16, color: "#666666" },
});

const mapStateToProps = (state) => ({
  anime: state.anime,
});

export default connect(mapStateToProps, null)(Characters);

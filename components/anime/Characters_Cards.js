import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

const imageNotFoundUrl =
  "https://www.teknozeka.com/wp-content/uploads/2020/03/wp-header-logo-21.png";

const CharacterCards = (props) => {
  const { charactersData, shownCharactersCount, setSelectedCharacter } = props;

  let shownCharacters = charactersData.slice(0, shownCharactersCount);
  let returnVal = shownCharacters.map((character) => {
    const { names, image } = character.attributes;

    const imageOutput = image ? image.original : imageNotFoundUrl;

    let cardWidth;

    return (
      <View
        key={character.id}
        style={styles.characterCard}
        onLayout={(e) => {
          cardWidth = e.nativeEvent.layout.width;
        }}
      >
        <TouchableOpacity
          onPress={() => {
            setSelectedCharacter(character);
          }}
        >
          <Image
            source={{ uri: imageOutput }}
            style={{ height: 120, width: cardWidth }}
            resizeMode="cover"
          />
          <Text numberOfLines={1}>{names.en}</Text>
        </TouchableOpacity>
      </View>
    );
  });

  return returnVal;
};

const styles = StyleSheet.create({
  characterCard: {
    width: "24%",
    marginHorizontal: ".5%",
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "white",
    elevation: 0.5,
    shadowOffset: { width: 0, height: 0 },
    shadowColor: "black",
    shadowOpacity: 0.2,
    backgroundColor: "white",
  },
});

export default CharacterCards;

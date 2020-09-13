import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";

import BasicInfo from "./Characters_Modal_BasicInfo";
import SpoilerContent from "./Characters_Modal_SpoilerContent";

import Modal from "../../util/CustomModal";

const formatDescription = (description) => {
  // replacing <br> with \n
  let returnVal = description.replace(/<br\s*\/?>/gm, "\n");

  //remove and reformat <p> tags
  let outerOffset = 0,
    stringArray = [];
  returnVal.replace(/<p>(.+?)<\/p>/gms, (match, contents, offset) => {
    if (outerOffset !== offset)
      stringArray.push(returnVal.slice(outerOffset, offset));
    stringArray.push(contents);
    outerOffset = offset + match.length;
  });
  stringArray.push(returnVal.substring(outerOffset, returnVal.length));
  returnVal = stringArray.join("\n");

  //replacing spoiler content with touchables, put them into an array
  outerOffset = 0;
  stringArray = [];
  returnVal.replace(
    /<(span\sclass=\\?\"spoiler\\?\"|spoiler)>(.+?)<\/(span|spoiler)>/gms,
    (match, dummy0, contents, dummy1, offset) => {
      // match is the whole thing including the tags
      // contents is the contents excluding the tags (in the parentheses)
      // offset is the location of the match (index at right before the match)

      if (!outerOffset) stringArray.push(returnVal.slice(outerOffset, offset));
      else stringArray.push("\n" + returnVal.slice(outerOffset, offset));

      stringArray.push(
        <SpoilerContent content={contents} id={stringArray.length} />
      );
      outerOffset = offset + match.length;
    }
  );
  if (outerOffset !== returnVal.length) {
    if (!outerOffset) {
      stringArray.push(returnVal.substring(outerOffset, returnVal.length));
    } else {
      stringArray.push(
        "\n" + returnVal.substring(outerOffset, returnVal.length)
      );
    }
  }

  returnVal = stringArray.map((text, index) => {
    return <Text key={index}>{text}</Text>;
  });

  return returnVal;
};

const CharacterModal = (props) => {
  const { character, setSelectedCharacter } = props;
  if (!character) return null;

  const onBack = () => {
    setSelectedCharacter(null);
  };

  const { description } = character.attributes;
  let formattedDescription = formatDescription(description);

  return (
    <Modal visible={!!character} hideModal={onBack}>
      <ScrollView>
        <TouchableOpacity style={{ padding: 20 }} activeOpacity={1}>
          <BasicInfo character={character} />
          <View style={{ marginTop: 10 }}>
            <Text>{formattedDescription}</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </Modal>
  );
};

export default CharacterModal;

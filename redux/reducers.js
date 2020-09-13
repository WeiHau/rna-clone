import { APPEND_TEXT, SET_CATEGORIES, SET_ANIME } from "./types";

const testData = (state = "some text for test", action) => {
  switch (action.type) {
    case APPEND_TEXT:
      return state + action.payload;
    default:
      return state;
  }
};

const anime = (state = null, action) => {
  switch (action.type) {
    case SET_ANIME:
      return action.payload;
    default:
      return state;
  }
};

const categories = (state = [], action) => {
  switch (action.type) {
    case SET_CATEGORIES:
      return action.payload;
    default:
      return state;
  }
};

export default { testData, anime, categories };

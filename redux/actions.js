import { SET_CATEGORIES, APPEND_TEXT, SET_ANIME } from "./types";

export const setAnime = (anime) => (dispatch) => {
  dispatch({ type: SET_ANIME, payload: anime });
};

export const setCategories = (newCategories) => (dispatch) => {
  dispatch({ type: SET_CATEGORIES, payload: newCategories });
};

export const appendText = (newText) => (dispatch) => {
  dispatch({ type: APPEND_TEXT, payload: newText });
};

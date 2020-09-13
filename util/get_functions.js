import axios from "axios";

const fetchData = async (apiPath) => {
  console.log("fetching from " + apiPath);
  try {
    let res = await axios.get(apiPath);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const getAnimes = async (pageOffset, searchText, sortBy, categories) => {
  const pageOffsetParam = "&page[offset]=" + pageOffset;
  const searchParam = searchText
    ? "&filter[text]=" + encodeURIComponent(searchText)
    : "";
  const sortParam = !searchText ? "&sort=" + sortBy : ""; // if searched, can't sort

  // categories is gonna be an array of objects (categories.slug is the text we want)
  let categoriesParam = "";
  if (categories.length) {
    let categorySlugs = categories.map((category) => category.slug);
    categoriesParam =
      "&filter[categories]=" + encodeURIComponent(categorySlugs.join());
  }

  const apiPath =
    "https://kitsu.io/api/edge/anime?page[limit]=20" +
    searchParam +
    sortParam +
    pageOffsetParam +
    categoriesParam;

  const res = await fetchData(apiPath);
  const animeList = {
    data: res.data,
    count: res.meta.count,
  };
  return animeList;
};

export const getCharacters = async (apiPath, prevData) => {
  console.log("called this func");
  try {
    let res = await fetchData(apiPath);

    let characterLinks = res.data.map(
      (character) => character.relationships.character.links.related
    );

    let tempArray = await Promise.all(
      //fetch all details using id
      characterLinks.map(async (path) => {
        let res = await fetchData(path);
        return res.data;
      })
    );

    let finalCharactersData = [...prevData, ...tempArray];

    //possible duplicate object, filter
    finalCharactersData = finalCharactersData.filter(
      (thing, index, self) => index === self.findIndex((t) => t.id === thing.id)
    );

    let characterList = {
      count: res.meta.count,
      nextPath: res.links.next,
      data: finalCharactersData,
    };

    return characterList;
  } catch (err) {
    console.log(err);
  }
};

export const getCategories = async (pathInfo) => {
  let apiPath =
    typeof pathInfo === "string"
      ? pathInfo
      : `https://kitsu.io/api/edge/categories?sort=title&page[limit]=20&page[offset]=${pathInfo}`;

  let data = await fetchData(apiPath);
  data = data.data.map((x) => {
    return {
      id: x.id,
      title: x.attributes.title,
      slug: x.attributes.slug,
    };
  });

  return data;
};

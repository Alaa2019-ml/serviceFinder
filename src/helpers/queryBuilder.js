import { CATEGORY_KEYWORDS } from "../constants/keywords.js";

export const buildMapsQuery = (category, city) => {
  const queries =
    CATEGORY_KEYWORDS[category] ?? CATEGORY_KEYWORDS.entertainment;
  // return queries[0].replace("{city}", city.toLowerCase());
  const keyword = queries[Math.floor(Math.random() * queries.length)];

  return `${keyword} in ${city.toLowerCase()}`;
};

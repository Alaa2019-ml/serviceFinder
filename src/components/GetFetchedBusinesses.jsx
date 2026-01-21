import { buildMapsQuery } from "../helpers/queryBuilder.js";
import {
  hasRequiredFields,
  dedupeWebsites,
  matchesSelectedCategory,
  matchesSelectedCity,
  rankProviders,
  getBestImageUrl,
} from "../helpers/filters.js";
import { CATEGORY_KEYWORDS } from "../constants/keywords.js";

//fetch  real buinsnesses

const googleSerpApiKey = import.meta.env.VITE_API_KEY;

export async function fetchSerpAPI(category, city) {
  const query = buildMapsQuery(category, city);

  const url =
    "/serpapi/search.json?" +
    new URLSearchParams({
      engine: "google_maps",
      type: "search",
      q: query,
      location: `${city}, Netherlands`,
      nearby: "true",
      hl: "en", // language
      gl: "nl", // country
      num: 30, // results per page
      z: "14",
      api_key: googleSerpApiKey,
    }).toString();

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    //get results
    const result = await response.json();

    return result.local_results ?? [];
  } catch (error) {
    console.log("Serp API error  ", query);
    console.error(error.message);
    return [];
  }
}

const normalizeBusinesses = (arr, category, city) => {
  return arr.map((buisness, index) => {
    const id =
      buisness.place_id ?? buisness.data_id ?? buisness.data_cid ?? index;

    const rawImage = buisness.serpapi_thumbnail || buisness.thumbnail || "";

    const primaryImage = buisness.thumbnail || ""; // clearer but sometimes slow/unavailable
    const backupImage = buisness.serpapi_thumbnail || ""; // always available but lower quality
    return {
      id,
      title: buisness.title ?? "",
      type:
        buisness.type ??
        (Array.isArray(buisness.types) ? buisness.types[0] : ""),
      category,
      city,
      address: buisness.address ?? "",
      phone: buisness.phone ?? "",
      website: buisness.website ?? "",
      rating: buisness.rating ?? null,
      reviews: buisness.reviews ?? null,

      // image: buisness.thumbnail || buisness.serpapi_thumbnail || "",

      image: getBestImageUrl(rawImage),
      imagePrimary: getBestImageUrl(primaryImage),
      imageBackup: getBestImageUrl(backupImage),
      photosLink: buisness.photos_link || "",
      raw: buisness,
    };
  });
};

export const GetFetchedBusinesses = async (category, city) => {
  const localResults = await fetchSerpAPI(category, city);

  const resultsWithAllRequiredFields = localResults.filter(hasRequiredFields);

  const dedupedResults = dedupeWebsites(resultsWithAllRequiredFields);

  // 4) category match score >= 1
  const resultsMatchedCategory = dedupedResults.filter(
    (r) => matchesSelectedCategory(r, category, CATEGORY_KEYWORDS) >= 1,
  );

  // 5) city match
  const resultsMatchedCategoryAndLocation = resultsMatchedCategory.filter((r) =>
    matchesSelectedCity(r, city),
  );

  const highlyRatedProviders = rankProviders(resultsMatchedCategoryAndLocation);

  return normalizeBusinesses(highlyRatedProviders, category, city);
};

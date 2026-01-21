//check if the url is not html.
const isNonHtmlLink = (url = "") => {
  return /\.(pdf|docx?|pptx?|xlsx?|zip|rar)$/i.test(url);
};

const hasValidContact = (obj) => {
  const website = (obj.website || "").trim();
  const phone = (obj.phone || "").trim();

  if (phone) return true;

  // No phone AND no website
  if (!website) return false;

  // Website exists but is not valid
  if (isNonHtmlLink(website)) return false;

  return true;
};

export const hasRequiredFields = (obj) => {
  return Boolean(obj.title && obj.address && hasValidContact(obj));
};

const getWebsiteDomain = (website) => {
  let domain = "";

  try {
    domain = new URL(website).hostname.toLowerCase();
    return domain.replace("www.", "");
  } catch (error) {
    console.warn(`Invalid URL ${website}`);
    return null;
  }
};

const getPostalCode = (address = "") => {
  const postalCode = address.match(/\b\d{4}\s?[a-z]{2}\b/i);
  return postalCode ? postalCode[0].toUpperCase().replace(/\s/, "") : null;
};

//this function returns unique service providers
export const dedupeWebsites = (providers) => {
  const uniqueResults = new Set();
  const results = [];
  for (const provider of providers) {
    const websiteDomain = getWebsiteDomain(provider.website);
    const address = (provider.address || "")
      .toLowerCase()
      .trim()
      .replace(/\s+/g, " ");
    const title = (provider.title || "")
      .toLowerCase()
      .trim()
      .replace(/\s+/g, " ");

    const postcode = getPostalCode(provider.address);
    const location = postcode || address; //if no postcode then the full address

    const idKey = provider.place_id || provider.data_id || provider.data_cid;

    const key = idKey
      ? `id:${idKey}`
      : websiteDomain
        ? `${websiteDomain}||${location}`
        : `${title}||${location}`;

    if (!uniqueResults.has(key)) {
      uniqueResults.add(key);
      results.push(provider);
    }
  }

  return results;
};

//the more words related to category it has the more accurate it is
export const matchesSelectedCategory = (
  resultObj,
  category,
  categoryKeywordsObj,
) => {
  if (!category || !categoryKeywordsObj) return 0;

  const text =
    `${resultObj.title} ${resultObj.type} ${(resultObj.types || []).join(" ")}`.toLowerCase();

  const categoryKeywords = categoryKeywordsObj[category.toLowerCase()];

  let count = 0;
  categoryKeywords.forEach((word) => {
    const regex = new RegExp(`\\b${word.toLowerCase()}\\b`, "g");
    const maches = text.match(regex);
    if (maches) count += maches.length;
  });

  return count;
};

export const matchesSelectedCity = (resultObj, city) => {
  const address = (resultObj.address || "").toLowerCase();

  if (address.includes((city || "").toLowerCase())) return true;

  return (
    address.includes("netherlands") ||
    address.includes("holland") ||
    address.includes("nederland")
  );
};

// Convert anything to a number
const toNumber = (v) => (Number.isFinite(Number(v)) ? Number(v) : 0);

const getScore = (rating, reviews) => {
  const r = toNumber(rating);
  const n = toNumber(reviews);

  if (r <= 0 || n <= 0) return 0;

  // log keeps growth slow
  return r * Math.log10(n + 1);
};

export const rankProviders = (providers) => {
  return [...providers].sort((a, b) => {
    const scoreA = getScore(a.rating, a.reviews);
    const scoreB = getScore(b.rating, b.reviews);

    // higher score first
    if (scoreA !== scoreB) return scoreB - scoreA;

    // tie-breaker: more reviews
    const reviewsA = toNumber(a.reviews);
    const reviewsB = toNumber(b.reviews);

    if (reviewsA !== reviewsB) return reviewsB - reviewsA;

    // final fallback: name
    return (a.title || "").localeCompare(b.title || "");
  });
};

export const getBestImageUrl = (url) => {
  if (!url) return "";
  let u = String(url).trim();

  u = u.replace(/w\d+-h\d+/g, "w1200-h800");
  u = u.replace(/=s\d+/g, "=s1200");
  u = u.replace(/size=\d+/g, "size=1200");
  u = u.replace(/maxwidth=\d+/g, "maxwidth=1600");
  u = u.replace(/maxheight=\d+/g, "maxheight=1200");

  return u;
};

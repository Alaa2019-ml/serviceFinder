import { Box } from "@mui/material";
import { servicesCardsSx } from "./ServicesCards.styles";
import ServiceCard from "./ServiceCard";

export default function ServicesCards({
  products = [],
  lastSearch,
  mode = "browse", // "browse" | "favorites"
  onToggleFavorite,
  isFavorited,
}) {
  if (!lastSearch && (!products || products.length === 0)) return null;

  const hasResults = products && products.length > 0;

  return (
    <Box sx={servicesCardsSx.root}>
      {hasResults && (
        <Box sx={servicesCardsSx.cardsWrap}>
          {products.map((p) => {
            const favored =
              typeof isFavorited === "function" ? isFavorited(p) : false;

            return (
              <ServiceCard
                key={p.id}
                p={p}
                favored={favored}
                onToggleFavorite={onToggleFavorite}
              />
            );
          })}
        </Box>
      )}
    </Box>
  );
}

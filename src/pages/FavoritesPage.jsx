import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";
import ServicesCards from "../components/ServicesCards/ServicesCards";

export default function FavoritesPage({
  favoritesByCategory,
  onToggleFavorite,
  isFavorited,
}) {
  const { categoryName } = useParams();
  const category = categoryName ? decodeURIComponent(categoryName) : "";

  const favorites = useMemo(() => {
    if (!category) return [];
    return favoritesByCategory?.[category] || [];
  }, [favoritesByCategory, category]);

  return (
    <Box sx={{ px: { xs: 2, sm: 4, md: 8 }, mt: 4 }}>
      <ServicesCards
        products={favorites}
        lastSearch={{ category, city: "" }}
        mode="favorites"
        onToggleFavorite={onToggleFavorite}
        isFavorited={isFavorited}
      />
    </Box>
  );
}

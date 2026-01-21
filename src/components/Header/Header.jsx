import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  Select,
  MenuItem,
} from "@mui/material";
import { useNavigate, useMatch } from "react-router-dom";
import { headerSx } from "./Header.styles";
import { useLocalStorage } from "../../hooks/useLocalStorage";

const FAVORITES_KEY = "favoritesByCategory";

export default function Header({ currentCategory }) {
  const navigate = useNavigate();

  //  works even though Header is outside <Routes>
  const favoritesMatch = useMatch("/favorites/:categoryName");
  const isFavoritesPage = Boolean(favoritesMatch);

  const urlCategory = favoritesMatch?.params?.categoryName
    ? decodeURIComponent(favoritesMatch.params.categoryName)
    : "";

  const [favoritesByCategory] = useLocalStorage(FAVORITES_KEY, {});
  const categories = Object.keys(favoritesByCategory || {}).filter(
    (c) => (favoritesByCategory?.[c] || []).length > 0,
  );

  const goFavorites = () => {
    const target = currentCategory || categories[0] || "";
    if (!target) return;
    navigate(`/favorites/${encodeURIComponent(target)}`);
  };

  const handleCategoryChange = (cat) => {
    navigate(`/favorites/${encodeURIComponent(cat)}`);
  };

  return (
    <AppBar position="sticky" color="inherit" elevation={1}>
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={headerSx.toolbar}>
          <Typography variant="h6" sx={headerSx.logo}>
            ServiceFinder{" "}
            <Box component="span" sx={headerSx.logoAccent}>
              Hub
            </Box>
          </Typography>

          <Box sx={headerSx.spacer} />

          <Button color="inherit" onClick={() => navigate("/")}>
            Home
          </Button>

          <Button color="inherit" onClick={goFavorites}>
            Favorites
          </Button>

          {/*  small dropdown only on favorites page */}
          {isFavoritesPage && categories.length > 0 && (
            <Select
              size="small"
              value={urlCategory || categories[0]}
              onChange={(e) => handleCategoryChange(e.target.value)}
              sx={{
                ml: 2,
                minWidth: 140,
                height: 34,
                fontSize: "0.85rem",
              }}
            >
              {categories.map((cat) => (
                <MenuItem key={cat} value={cat}>
                  {cat}
                </MenuItem>
              ))}
            </Select>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

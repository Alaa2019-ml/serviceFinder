import { useMemo, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Header from "./components/Header/Header";
import MainSection from "./components/MainSection/MainSection";
import ServicesCards from "./components/ServicesCards/ServicesCards";
import Footer from "./components/Footer/Footer";

import FavoritesPage from "./pages/FavoritesPage";
import { GetFetchedBusinesses } from "./components/GetFetchedBusinesses.jsx";
import { useLocalStorage } from "./hooks/useLocalStorage";

const FAVORITES_KEY = "favoritesByCategory";

function HomeView({
  onSearch,
  isLoading,
  error,
  productsToShow,
  lastSearch,
  onToggleFavorite,
  isFavorited,
}) {
  return (
    <>
      <MainSection onSearch={onSearch} />

      {isLoading && <div>Loading...!</div>}
      {error && <div>Something went wrong.</div>}

      {!isLoading && !error && (
        <ServicesCards
          products={productsToShow}
          lastSearch={lastSearch}
          onToggleFavorite={onToggleFavorite}
          isFavorited={isFavorited}
        />
      )}
    </>
  );
}

export default function App() {
  const [productsToShow, setProductsToShow] = useState([]);
  const [lastSearch, setLastSearch] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [favoritesByCategory, setFavoritesByCategory] = useLocalStorage(
    FAVORITES_KEY,
    {},
  );

  const currentCategory = lastSearch?.category || "";

  const handleSearch = async ({ category, city }) => {
    const trimmedCity = (city || "").trim().toLowerCase();

    setLastSearch({ category, city: trimmedCity });
    setError(null);

    if (!trimmedCity) {
      setProductsToShow([]);
      return;
    }

    setIsLoading(true);

    try {
      const results = await GetFetchedBusinesses(category, trimmedCity);
      setProductsToShow(results);
    } catch (error) {
      setError(error);
      setProductsToShow([]);
    } finally {
      setIsLoading(false);
    }
  };

  const isFavorited = (item) => {
    const cat = item?.category;
    if (!cat) return false;
    const list = favoritesByCategory?.[cat] || [];
    return list.some((x) => x.id === item.id);
  };

  const toggleFavorite = (item) => {
    const cat = item?.category;
    if (!cat) return;

    setFavoritesByCategory((prev) => {
      const current = Array.isArray(prev?.[cat]) ? prev[cat] : [];
      const exists = current.some((x) => x.id === item.id);

      const nextCatList = exists
        ? current.filter((x) => x.id !== item.id)
        : [...current, item];

      return { ...(prev || {}), [cat]: nextCatList };
    });
  };

  const memoHomeProps = useMemo(
    () => ({
      onSearch: handleSearch,
      isLoading,
      error,
      productsToShow,
      lastSearch,
      onToggleFavorite: toggleFavorite,
      isFavorited,
    }),
    [isLoading, error, productsToShow, lastSearch, favoritesByCategory],
  );

  return (
    <BrowserRouter>
      <Header currentCategory={currentCategory} />

      <Routes>
        <Route path="/" element={<HomeView {...memoHomeProps} />} />

        <Route
          path="/favorites/:categoryName"
          element={
            <FavoritesPage
              favoritesByCategory={favoritesByCategory}
              onToggleFavorite={toggleFavorite}
              isFavorited={isFavorited}
            />
          }
        />

        <Route
          path="/favorites"
          element={
            currentCategory ? (
              <Navigate
                to={`/favorites/${encodeURIComponent(currentCategory)}`}
                replace
              />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

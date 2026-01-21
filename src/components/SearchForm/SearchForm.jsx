import { useState } from "react";
import { Box, Select, MenuItem, TextField, Button } from "@mui/material";
import { searchFormSx } from "./SearchForm.styles";
import { categories } from "../../constants/keywords.js";

const SearchForm = ({ onSearch }) => {
  const [category, setCategory] = useState("");
  const [city, setCity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ category, city });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={searchFormSx.form}>
      {/* Category */}
      <Select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        displayEmpty
        fullWidth
      >
        <MenuItem value="">Select category</MenuItem>
        {categories.map((item) => (
          <MenuItem key={item} value={item}>
            {item}
          </MenuItem>
        ))}
      </Select>

      {/* City */}
      <TextField
        placeholder="City"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        required
        fullWidth
      />

      {/* Search button */}
      <Button type="submit" variant="contained" sx={searchFormSx.searchButton}>
        Search
      </Button>
    </Box>
  );
};

export default SearchForm;

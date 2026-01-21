import { Box, Container, Typography } from "@mui/material";
import SearchForm from "../SearchForm/SearchForm";
import { mainSectionSx } from "./MainSection.styles";

export default function MainSection({ onSearch }) {
  return (
    <Box sx={mainSectionSx.root}>
      {/* video */}
      <Box
        component="video"
        src="/main-video.mp4"
        autoPlay
        muted
        loop
        playsInline
        sx={mainSectionSx.video}
      />

      {/* Overlay */}
      <Box sx={mainSectionSx.overlay} />

      {/* Content */}
      <Container sx={mainSectionSx.content}>
        <Typography variant="h4" fontWeight={900} sx={mainSectionSx.title}>
          Find top-rated services in your city
        </Typography>

        <SearchForm onSearch={onSearch} />
      </Container>
    </Box>
  );
}

import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Stack,
  Rating,
  IconButton,
  Link as MuiLink,
} from "@mui/material";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import PlaceIcon from "@mui/icons-material/Place";
import RateReviewIcon from "@mui/icons-material/RateReview";
import LaunchIcon from "@mui/icons-material/Launch";
import { servicesCardsSx } from "./ServicesCards.styles";
import heartRegular from "../../assets/heart-regular.svg";
import heartSolid from "../../assets/heart-solid.svg";
import { useProgressiveImage } from "../../hooks/useProgressiveImage";

export default function ServiceCard({ p, onToggleFavorite, favored = false }) {
  const cardTitle = p.title || `${p.category} service` || "Service";
  const location = p.address || p.city || "Unknown location";
  const rating = p.rating;
  const reviews = p.reviews;
  const phone = p.phone;
  const website = p.website;
  const type = p.type || p.category;

  const imageSrc = useProgressiveImage(p.imagePrimary, p.imageBackup, 1000);

  const hasPhone = Boolean(phone);
  const hasWebsite = Boolean(website);

  return (
    <Box sx={servicesCardsSx.cardItem}>
      <Card
        elevation={3}
        sx={{ ...servicesCardsSx.card, position: "relative" }}
      >
        {typeof onToggleFavorite === "function" && (
          <IconButton
            onClick={() => onToggleFavorite(p)}
            sx={{
              position: "absolute",
              top: 12,
              right: 12,
              zIndex: 2,
              backgroundColor: "rgba(255,255,255,0.9)",
              "&:hover": { backgroundColor: "rgba(255,255,255,1)" },
            }}
          >
            <Box
              component="img"
              src={favored ? heartSolid : heartRegular}
              alt={favored ? "Unfavorite" : "Favorite"}
              sx={{ width: 22, height: 22 }}
            />
          </IconButton>
        )}

        <CardMedia
          component="img"
          image={imageSrc}
          alt={cardTitle}
          loading="lazy"
          onError={(e) => {
            // If current fails, try backup once, then placeholder
            if (p.imageBackup && e.currentTarget.src !== p.imageBackup) {
              e.currentTarget.src = p.imageBackup;
              return;
            }
            e.currentTarget.src =
              "https://via.placeholder.com/800x600?text=No+Image";
          }}
          sx={servicesCardsSx.cardMedia}
        />

        <CardContent sx={servicesCardsSx.cardContent}>
          <Stack direction="row" justifyContent="space-between" gap={2}>
            <Box sx={{ minWidth: 0 }}>
              <Typography
                variant="h6"
                fontWeight={900}
                sx={{
                  lineHeight: 1.15,
                  mb: 0.3,
                  display: "flex",
                  alignItems: "center",
                  gap: 0.6,
                  minWidth: 0,
                }}
              >
                <MuiLink
                  href={hasWebsite ? website : undefined}
                  target={hasWebsite ? "_blank" : undefined}
                  rel={hasWebsite ? "noopener noreferrer" : undefined}
                  underline="none"
                  sx={{
                    color: "text.primary",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    whiteSpace: "normal",
                    lineHeight: 1.2,
                  }}
                  aria-label={
                    hasWebsite ? `Open website for ${cardTitle}` : cardTitle
                  }
                >
                  {cardTitle}
                </MuiLink>

                {hasWebsite && (
                  <LaunchIcon sx={{ fontSize: 18, color: "text.secondary" }} />
                )}
              </Typography>

              {type && <Typography color="text.secondary">{type}</Typography>}
            </Box>
          </Stack>

          {(typeof rating === "number" || typeof reviews === "number") && (
            <Stack
              direction="row"
              alignItems="center"
              spacing={1}
              sx={servicesCardsSx.ratingRow}
            >
              {typeof rating === "number" && (
                <>
                  <Rating value={rating} precision={0.1} readOnly />
                  <Typography fontWeight={800}>
                    {Number(rating).toFixed(1)}
                  </Typography>
                </>
              )}

              {typeof reviews === "number" && (
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={0.6}
                  sx={{ ml: 0.5 }}
                >
                  <RateReviewIcon fontSize="small" />
                  <Typography color="text.secondary">
                    {reviews.toLocaleString()}{" "}
                    {reviews === 1 ? "review" : "reviews"}
                  </Typography>
                </Stack>
              )}
            </Stack>
          )}

          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            sx={servicesCardsSx.locationRow}
          >
            <PlaceIcon fontSize="small" />
            <Typography color="text.secondary">{location}</Typography>
          </Stack>

          {hasPhone && (
            <Stack
              direction="row"
              alignItems="center"
              spacing={1}
              sx={servicesCardsSx.locationRow}
            >
              <PhoneInTalkIcon fontSize="small" />
              <Typography
                component="a"
                href={`tel:${phone}`}
                sx={{
                  color: "text.secondary",
                  textDecoration: "none",
                  fontWeight: 600,
                  cursor: "pointer",
                  "&:hover": { textDecoration: "underline" },
                }}
              >
                {phone || ""}
              </Typography>
            </Stack>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}

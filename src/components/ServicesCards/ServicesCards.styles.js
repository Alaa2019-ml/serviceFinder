export const servicesCardsSx = {
  root: {
    width: "100vw",
    marginLeft: "calc(50% - 50vw)",
    py: 6,
  },

  cardsWrap: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 4,
    px: { xs: 1, sm: 3 },
  },

  cardItem: {
    flex: {
      xs: "0 0 92%",
      sm: "0 0 44%",
      lg: "0 0 28%",
    },
    maxWidth: {
      xs: "92%",
      sm: "44%",
      lg: "28%",
    },
  },

  card: {
    minHeight: 520,
    borderRadius: 4,
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },

  cardMedia: {
    width: "100%",
    aspectRatio: "16 / 9",
    objectFit: "cover",
    objectPosition: "center",
    backgroundColor: "rgba(0,0,0,0.04)",
    display: "block",
  },
  cardContent: {
    flexGrow: 1,
    p: 3,
  },

  ratingRow: {
    mt: 2,
  },

  locationRow: {
    mt: 2,
  },

  chipsRow: {
    mt: 3,
    flexWrap: "wrap",
  },
};

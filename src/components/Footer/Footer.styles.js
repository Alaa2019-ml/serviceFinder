export const footerSx = {
  root: {
    width: "100vw",
    marginLeft: "calc(50% - 50vw)", // full-bleed
    mt: 10,
    pt: 8,
    pb: 4,
    color: "#EDEDED",
    background:
      "radial-gradient(1200px 400px at 20% 0%, rgba(242,161,199,0.22), rgba(0,0,0,0) 55%), linear-gradient(180deg, #0B0B10 0%, #07070A 100%)",
    borderTop: "1px solid rgba(255,255,255,0.08)",
  },

  brandTitle: { fontWeight: 900, letterSpacing: 0.2 },
  brandAccent: { color: "primary.main" },

  brandDescription: {
    mt: 2,
    maxWidth: 420,
    color: "rgba(255,255,255,0.72)",
    lineHeight: 1.7,
  },

  socialRow: { mt: 3 },

  socialBtn: {
    color: "rgba(255,255,255,0.75)",
    border: "1px solid rgba(255,255,255,0.12)",
  },

  colTitle: { fontWeight: 800, mb: 2 },

  divider: { my: 5, borderColor: "rgba(255,255,255,0.10)" },

  link: {
    color: "rgba(255,255,255,0.72)",
    fontSize: 14,
    "&:hover": { color: "#FFFFFF" },
  },

  miniLink: {
    color: "rgba(255,255,255,0.55)",
    fontSize: 13,
    "&:hover": { color: "#FFFFFF" },
  },

  copyright: { color: "rgba(255,255,255,0.55)" },
};

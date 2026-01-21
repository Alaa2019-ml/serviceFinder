import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  Stack,
  Divider,
  IconButton,
} from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import XIcon from "@mui/icons-material/X";
import { footerSx } from "./Footer.styles";

export default function Footer() {
  return (
    <Box component="footer" sx={footerSx.root}>
      <Container maxWidth="lg">
        <Grid container spacing={6}>
          {/* brand */}
          <Grid item xs={12} md={5}>
            <Typography variant="h6" sx={footerSx.brandTitle}>
              ServiceFinder{" "}
              <Box component="span" sx={footerSx.brandAccent}>
                Hub
              </Box>
            </Typography>

            <Typography sx={footerSx.brandDescription}>
              Find top-rated service providers in your city — based on real
              reviews and ratings.
            </Typography>

            {/* Social */}
            <Stack direction="row" spacing={1} sx={footerSx.socialRow}>
              <IconButton aria-label="Instagram" sx={footerSx.socialBtn}>
                <InstagramIcon />
              </IconButton>
              <IconButton aria-label="LinkedIn" sx={footerSx.socialBtn}>
                <LinkedInIcon />
              </IconButton>
              <IconButton aria-label="X" sx={footerSx.socialBtn}>
                <XIcon />
              </IconButton>
            </Stack>
          </Grid>

          {/* Columns */}
          <Grid item xs={6} sm={4} md={2}>
            <Typography sx={footerSx.colTitle}>Company</Typography>
            <Stack spacing={1.2}>
              <Link href="#" underline="none" sx={footerSx.link}>
                About
              </Link>
              <Link href="#" underline="none" sx={footerSx.link}>
                Contact
              </Link>
              <Link href="#" underline="none" sx={footerSx.link}>
                Careers
              </Link>
            </Stack>
          </Grid>

          <Grid item xs={6} sm={4} md={2}>
            <Typography sx={footerSx.colTitle}>Explore</Typography>
            <Stack spacing={1.2}>
              <Link href="#" underline="none" sx={footerSx.link}>
                Top rated
              </Link>
              <Link href="#" underline="none" sx={footerSx.link}>
                Free sessions
              </Link>
              <Link href="#" underline="none" sx={footerSx.link}>
                Cities
              </Link>
            </Stack>
          </Grid>

          <Grid item xs={12} sm={4} md={3}>
            <Typography sx={footerSx.colTitle}>Legal</Typography>
            <Stack spacing={1.2}>
              <Link href="#" underline="none" sx={footerSx.link}>
                Privacy Policy
              </Link>
              <Link href="#" underline="none" sx={footerSx.link}>
                Terms
              </Link>
              <Link href="#" underline="none" sx={footerSx.link}>
                Cookies
              </Link>
            </Stack>
          </Grid>
        </Grid>

        <Divider sx={footerSx.divider} />

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
        >
          <Typography sx={footerSx.copyright} variant="body2">
            © {new Date().getFullYear()} ServiceFinder Hub. All rights reserved.
          </Typography>

          <Stack direction="row" spacing={2}>
            <Link href="#" underline="none" sx={footerSx.miniLink}>
              Privacy
            </Link>
            <Link href="#" underline="none" sx={footerSx.miniLink}>
              Terms
            </Link>
            <Link href="#" underline="none" sx={footerSx.miniLink}>
              Contact
            </Link>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}

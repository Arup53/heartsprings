import React from "react";
import { Box, Grid, Typography, Link } from "@mui/material";

const Footer = React.forwardRef((props, ref) => (
  <Box
    ref={ref}
    component="footer"
    sx={{
      backgroundColor: "#f5f5f5",
      color: "black",
      py: 4,
      px: 2,
      mt: "auto",
    }}
  >
    <Grid container spacing={4} justifyContent="center">
      {/* About */}
      <Grid item xs={12} sm={6} md={3}>
        <Typography variant="h6" gutterBottom>
          About Us
        </Typography>
        <Typography variant="body2">
          We are dedicated to providing the best service for our customers. Our
          platform offers a wide range of solutions tailored to your needs.
        </Typography>
      </Grid>
      {/* Quick Links */}
      <Grid item xs={12} sm={6} md={3}>
        <Typography variant="h6" gutterBottom>
          Quick Links
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Link href="#home" color="inherit" underline="hover">
            Home
          </Link>
          <Link href="#about" color="inherit" underline="hover">
            About
          </Link>
          <Link href="#services" color="inherit" underline="hover">
            Services
          </Link>
          <Link href="#contact" color="inherit" underline="hover">
            Contact
          </Link>
        </Box>
      </Grid>
      {/* Contact */}
      <Grid item xs={12} sm={6} md={3}>
        <Typography variant="h6" gutterBottom>
          Contact Us
        </Typography>
        <Typography variant="body2">Email: support@example.com</Typography>
        <Typography variant="body2">Phone: +123 456 7890</Typography>
        <Typography variant="body2">
          Address: 123 Main Street, City, Country
        </Typography>
      </Grid>
      {/* Social Media */}
      <Grid item xs={12} sm={6} md={3}>
        <Typography variant="h6" gutterBottom>
          Follow Us
        </Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Link href="https://facebook.com" color="inherit" underline="hover">
            Facebook
          </Link>
          <Link href="https://twitter.com" color="inherit" underline="hover">
            Twitter
          </Link>
          <Link href="https://instagram.com" color="inherit" underline="hover">
            Instagram
          </Link>
        </Box>
      </Grid>
    </Grid>
    {/* Footer Bottom */}
    <Box
      sx={{
        textAlign: "center",
        mt: 4,
        borderTop: "1px solid rgba(255, 255, 255, 0.1)",
        pt: 2,
      }}
    >
      <Typography variant="body2">
        &copy; {new Date().getFullYear()} Your Company. All rights reserved.
      </Typography>
    </Box>
  </Box>
));

export default Footer;

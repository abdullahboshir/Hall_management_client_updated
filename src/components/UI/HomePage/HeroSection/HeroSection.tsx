// import { assets } from "@/assets";
import { Box, Container, Typography } from "@mui/material";
// import Image from "next/image";
import React from "react";

const HeroSection = () => {
  return (
    <Container
      sx={{
        display: "flex",
        direction: "row",
        my: 16,
      }}
    >
      <Box>
        <Typography variant="h2">Left Section</Typography>
      </Box>
      <Box sx={{ flex: 1, position: "absolute" }}>
        <Box
          sx={{
            position: "absolute",
            width: "700px",
            top: "-90px",
            left: "-120px",
          }}
        >
          {/* <Image
            src={assets.images.heroImg}
            width={1280}
            height={853}
            alt="development"
          /> */}
        </Box>
      </Box>
      <Box>
        <Typography variant="h2">Right Section</Typography>
      </Box>
    </Container>
  );
};

export default HeroSection;

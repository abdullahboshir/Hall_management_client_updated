// import { assets } from "@/assets";
import { Box, Container, Typography } from "@mui/material";
// import Image from "next/image";
import React from "react";

const HeroSection = () => {
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        my: { xs: 4, sm: 8, md: 16 },
        gap: { xs: 2, md: 0 },
        position: "relative",
      }}
    >
      <Box 
        order={{ xs: 2, md: 1 }}
        textAlign={{ xs: "center", md: "left" }}
      >
        <Typography 
          variant="h2"
          fontSize={{ xs: "24px", sm: "32px", md: "48px" }}
        >
          Left Section
        </Typography>
      </Box>
      <Box 
        sx={{ 
          flex: 1, 
          position: { xs: "relative", md: "absolute" },
          order: { xs: 1, md: 2 }
        }}
      >
        <Box
          sx={{
            position: { xs: "relative", md: "absolute" },
            width: { xs: "100%", sm: "500px", md: "700px" },
            top: { xs: 0, md: "-90px" },
            left: { xs: 0, md: "-120px" },
            mx: { xs: "auto", md: 0 },
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
      <Box 
        order={{ xs: 3, md: 3 }}
        textAlign={{ xs: "center", md: "left" }}
      >
        <Typography 
          variant="h2"
          fontSize={{ xs: "24px", sm: "32px", md: "48px" }}
        >
          Right Section
        </Typography>
      </Box>
    </Container>
  );
};

export default HeroSection;

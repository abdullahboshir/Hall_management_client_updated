"use client";

import React from "react";
import { useRouter } from "next/navigation";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import { Box, Typography, Button } from "@mui/material";
import Image from "next/image";

const NotFoundPage = () => {
  const router = useRouter();

  return (
    <Box sx={{ width: "100%", height: "100vh", position: "relative" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          position: "fixed",
          ml: "24rem", // ~ml-96
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "100vh",
            mt: "150px",
            ml: "21px",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            position: "relative",
          }}
        >
          <Typography
            variant="h5"
            sx={{ fontWeight: 600, mb: 2 }}
          >
            AHHHHHHH! YOU FOUND ME!
          </Typography>

          <Typography
            sx={{ width: 384, textAlign: "center" }} // w-96 = 384px
          >
            Uh oh, we can&apos;t seem to find the page you&apos;re looking for. Try going back to the previous page!
          </Typography>

          <DirectionsRunIcon
            sx={{
              fontSize: 100,
              color: "#FC9933",
              transform: "scaleX(-1)",
              mt: 2,
            }}
          />

          <Button
            variant="outlined"
            onClick={() => router.push("/")}
            sx={{
              width: "144px", // w-36
              mt: 3,
              border: "3px solid #00c2ab",
              color: "#00c2ab",
              fontWeight: "bold",
              borderRadius: "8px",
              "&:hover": {
                backgroundColor: "#00c2ab",
                color: "#000",
              },
            }}
          >
            Go to Home
          </Button>
        </Box>

        {/* Right Image & Gradient */}
        <Box
          sx={{
            width: 384, // w-96
            position: "absolute",
            ml: "590px",
            height: "100vh",
          }}
        >
          <Box
            component="span"
            sx={{
              position: "absolute",
              width: "80px", // w-20
              height: "800px",
              top: 0,
              ml: "218px",
              background: "linear-gradient(0deg,#64646b,rgba(255,255,255,0))",
            }}
          />
          <Image
            src="https://i.ibb.co/27K8pPJ/pngegg.png"
            alt="Not found image"
            width={500}
            height={500}
            style={{
              position: "absolute",
              width: "280px",
              top: "348px",
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default NotFoundPage;

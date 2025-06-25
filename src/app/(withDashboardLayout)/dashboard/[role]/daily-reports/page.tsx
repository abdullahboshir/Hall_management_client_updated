// App Router (app/coming-soon/page.tsx)
"use client";

import { Typography, Button, Container } from "@mui/material";

export default function ComingSoon() {
  return (
    <Container
      maxWidth="sm"
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        flexDirection: "column",
      }}
    >
      <Typography variant="h2" gutterBottom>
        🚧 Coming Soon
      </Typography>
      <Typography variant="body1" gutterBottom>
        We’re working hard to bring something amazing. Stay tuned!
      </Typography>
      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 3 }}
        href="/dining"
      >
        Go Back Dining
      </Button>
    </Container>
  );
}

import { Box, Button, Container, Stack, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <Container>
      <Stack
        py={2}
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography
          component={Link}
          href="/login"
          variant="h5"
          fontWeight={600}
        >
          <Box component="span" color="primary.main">
            N
          </Box>
          azrul Hall
        </Typography>

        <Stack direction="row" justifyContent="space-between" gap={4}>
          <Typography>Home</Typography>
          <Typography>Dashbord</Typography>
          <Typography>Dining</Typography>
          <Typography>Notifications</Typography>
          <Typography>Declaration</Typography>
        </Stack>
        <Button component={Link} href="/login">
          Login
        </Button>
      </Stack>
    </Container>
  );
};

export default Navbar;

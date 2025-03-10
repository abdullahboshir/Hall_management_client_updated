"use client";
import { Box, Container, Stack, Typography } from "@mui/material";
import dynamic from "next/dynamic";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  const AuthButton = dynamic(
    () => import("@/components/UI/AuthButton/AuthButton"),
    { ssr: false }
  );
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
          <Typography component={Link} href="/">
            Home
          </Typography>
          <Typography component={Link} href="/dashboard">
            Dashbord
          </Typography>
          <Typography component={Link} href="/dining">
            Dining
          </Typography>
          <Typography component={Link} href="/login">
            Notifications
          </Typography>
          <Typography component={Link} href="/login">
            Declaration
          </Typography>
        </Stack>
        <AuthButton />
      </Stack>
    </Container>
  );
};

export default Navbar;

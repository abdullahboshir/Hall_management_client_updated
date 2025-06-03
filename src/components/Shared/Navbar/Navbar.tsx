"use client";
import AccountMenu from "@/components/Dashboard/AccountMenu/AccountMenu";
import { useGetSingleUserQuery } from "@/redux/api/userApi";
import {
  Avatar,
  Badge,
  Box,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import Link from "next/link";
import React from "react";
// import CircleNotificationsIcon from "@mui/icons-material/CircleNotifications";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DiningIcon from "@mui/icons-material/Dining";
import MarkEmailUnreadIcon from "@mui/icons-material/MarkEmailUnread";
import HomeIcon from "@mui/icons-material/Home";

const Navbar = () => {
  const { data, isLoading } = useGetSingleUserQuery({});
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
          bgcolor="primary.light"
          borderRadius={1}
          padding={1}
        >
          <Box component="span" color="primary.main">
            N
          </Box>
          azrul Hall
        </Typography>

        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          gap={2}
        >
          <Typography
            component={Link}
            href="/"
            bgcolor="primary.light"
            borderRadius={1}
          >
            <HomeIcon color="action" sx={{ fontSize: "45px" }} />
          </Typography>

          {/* <Typography component={Link} href="/login">
            Login
          </Typography> */}

          <Typography
            component={Link}
            href={`dashboard/${data?.user?.role}/notifications`}
            bgcolor="primary.light"
            borderRadius={1}
          >
            <Badge color="secondary" badgeContent={2}>
              {/* <CircleNotificationsIcon
                color="action"
                sx={{ fontSize: "45px" }}
              /> */}
              <MarkEmailUnreadIcon color="action" sx={{ fontSize: "45px" }} />
            </Badge>
          </Typography>

          <Typography
            component={Link}
            href="/dining"
            bgcolor="primary.light"
            borderRadius={1}
          >
            <DiningIcon color="action" sx={{ fontSize: "45px" }} />
          </Typography>

          <Typography
            component={Link}
            href="/dashboard"
            bgcolor="primary.light"
            borderRadius={1}
          >
            <DashboardIcon color="action" sx={{ fontSize: "45px" }} />
          </Typography>

          {isLoading ? (
            <Typography>Loading..</Typography>
          ) : (
            <Stack direction="row" gap={3}>
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                bgcolor="primary.light"
                sx={{ paddingX: "4px", paddingY: "2px" }}
                borderRadius={1}
              >
                <Avatar
                  alt={data?.name}
                  src="https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?t=st=1743484372~exp=1743487972~hmac=ebdaf94f961548443eaa01a75f238bce13e1a2d00767008fd702ec88337e6f7a&w=1380"
                  variant="rounded"
                />
                <Stack ml={1} display="flex" flexDirection="column" pr={1}>
                  <Typography> {data?.fullName} </Typography>
                  <Typography variant="caption" color="secondary.light">
                    {data?.designation} {data?.user?.role}
                  </Typography>
                </Stack>
                <AccountMenu />
              </Box>
            </Stack>
          )}
        </Stack>
      </Stack>
    </Container>
  );
};

export default Navbar;

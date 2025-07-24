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
  const { data, isLoading, refetch } = useGetSingleUserQuery({});
   React.useEffect(() => {refetch()}, [data, refetch]);
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
          href="/"
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
            href={data?.user?.role === "student" ? "/" : "/dining"}
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

          {!['moderator', 'student'].includes(data?.user?.role) && <Typography
            component={Link}
            href="/dining"
            bgcolor="primary.light"
            borderRadius={1}
          >
            <DiningIcon color="action" sx={{ fontSize: "45px" }} />
          </Typography>}

          <Typography
            component={Link}
            href={!['moderator', 'student', 'manager'].includes(data?.user?.role || data?.role)? `/dashboard/${data?.user?.role || data?.role}/student` : data?.user?.role === 'manager'? `/dashboard/${data?.user?.role}/dining` : `/dashboard/${data?.user?.role || data?.role}/notifications`}
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
                   src={data?.profileImg}
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

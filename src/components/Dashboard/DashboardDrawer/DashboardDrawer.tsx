"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import SideBar from "../SideBar/SideBar";
import { useGetSingleUserQuery } from "@/redux/api/userApi";
import { Avatar, Badge, Stack } from "@mui/material";
import CircleNotificationsIcon from "@mui/icons-material/CircleNotifications";
import AccountMenu from "../AccountMenu/AccountMenu";
import Link from "next/link";
import Spinner from "@/components/Shared/Spinner/Spinner";

const drawerWidth = 240;

export default function DashboardDrawer({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const { data, isLoading } = useGetSingleUserQuery({});
  console.log('single user goted', data)

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          background: "#F4F7FE",
          boxShadow: 0,
          borderBottom: "1px solid lightgray",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" }, color: "primary.main" }}
          >
            <MenuIcon />
          </IconButton>

          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            width="100%"
          >
            <Box>
              <Typography variant="body2" noWrap component="div" color="gray">
                Hey, {isLoading ? "Loading..." : data?.fullName}
              </Typography>
              <Typography variant="body2" noWrap component="div" color="black">
                Welcome to Nazrul hall
              </Typography>
            </Box>

            <Stack direction="row" gap={3}>
              <Badge color="secondary" overlap="circular" badgeContent={2}>
                <Link href={`/dashboard/${data?.role}/notifications`}>
                  <IconButton sx={{ background: "#ffffff" }}>
                    <CircleNotificationsIcon color="action" />
                  </IconButton>
                </Link>
              </Badge>

              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                bgcolor="primary.light"
                sx={{ paddingX: "3px", paddingY: "2px" }}
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
                    {data?.designation} {data?.user?.role} {data?.role}
                  </Typography>
                </Stack>
                <AccountMenu />
              </Box>
            </Stack>
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          slotProps={{
            root: {
              keepMounted: true, // Better open performance on mobile.
            },
          }}
        >
          <SideBar />
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          <SideBar />
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 2,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />

        <Box>{children}</Box>
      </Box>
    </Box>
  );
}

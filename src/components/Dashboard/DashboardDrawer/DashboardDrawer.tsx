"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import DiningIcon from "@mui/icons-material/Dining";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import SideBar from "../SideBar/SideBar";
import { useGetSingleUserQuery } from "@/redux/api/userApi";
import { Avatar, Stack } from "@mui/material";
import AccountMenu from "../AccountMenu/AccountMenu";
import Link from "next/link";
import Spinner from "@/components/Shared/Spinner/Spinner";
import HomeIcon from "@mui/icons-material/Home";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import { USER_ROLE } from "@/constant/role";

const drawerWidth = { xs: 280, sm: 240 };

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

  const { data, isLoading, refetch } = useGetSingleUserQuery({});

  React.useEffect(() => {
    refetch();
  }, [data, refetch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth.sm}px)` },
          ml: { sm: `${drawerWidth.sm}px` },
          background: "#F4F7FE",
          boxShadow: 0,
          borderBottom: "1px solid lightgray",
        }}
      >
        <Toolbar sx={{ px: { xs: 1, sm: 2 } }}>
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
            flexDirection={{ xs: "column", sm: "row" }}
            gap={{ xs: 1, sm: 0 }}
          >
            <Box textAlign={{ xs: "center", sm: "left" }}>
              <Typography 
                variant="body2" 
                noWrap 
                component="div" 
                color="gray"
                fontSize={{ xs: "12px", sm: "14px" }}
              >
                Hey, {isLoading ? "Loading..." : data?.fullName}
              </Typography>
              <Typography 
                variant="body2" 
                noWrap 
                component="div" 
                color="black"
                fontSize={{ xs: "12px", sm: "14px" }}
              >
                Welcome to Nazrul hall
              </Typography>
            </Box>

            <Stack 
              direction={{ xs: "row", sm: "row" }} 
              gap={{ xs: 1, sm: 2 }}
              flexWrap="wrap"
              justifyContent="center"
            >
              <Typography
                component={Link}
                href={`/dashboard/${data?.user?.role}/notifications`}
                display={"flex"}
                flexDirection={"column"}
                alignItems={"center"}
                lineHeight={0.8}
                sx={{ minWidth: { xs: "60px", sm: "auto" } }}
              >
                <NotificationsActiveIcon
                  color="action"
                  sx={{ fontSize: { xs: "20px", sm: "24px", md: "2vw" } }}
                />
                <Typography 
                  component={"span"} 
                  fontSize={{ xs: "10px", sm: "12px", md: "1vw" }} 
                  lineHeight={0.8}
                >
                  Notifications
                </Typography>
              </Typography>

              {data?.user?.role === USER_ROLE.student && (
                <Typography
                  component={Link}
                  href={`/mealOverview/${data?.user?._id}`}
                  display={"flex"}
                  flexDirection={"column"}
                  alignItems={"center"}
                  sx={{ minWidth: { xs: "60px", sm: "auto" } }}
                >
                  <AccountBalanceWalletIcon
                    color="action" 
                    sx={{ fontSize: { xs: "20px", sm: "24px", md: "2vw" } }} 
                  />
                  <Typography
                    component={"span"}
                    fontSize={{ xs: "10px", sm: "12px", md: "1vw" }}
                    lineHeight={0.8}
                  >
                    Meal Overview
                  </Typography>
                </Typography>
              )}

              <Typography
                component={Link}
                href={data?.user?.role === "student" ? "/" : "/dining"}
                borderRadius={1}
                display={"flex"}
                flexDirection={"column"}
                alignItems={"center"}
                sx={{ minWidth: { xs: "60px", sm: "auto" } }}
              >
                <HomeIcon 
                  color="action" 
                  sx={{ fontSize: { xs: "20px", sm: "24px", md: "2vw" } }} 
                />
                <Typography
                  component={"span"}
                  fontSize={{ xs: "10px", sm: "12px", md: "1vw" }}
                  lineHeight={0.8}
                >
                  Home
                </Typography>
              </Typography>

              {!["moderator", "student"].includes(data?.user?.role) && (
                <Typography
                  component={Link}
                  href={`/dining`}
                  display={"flex"}
                  flexDirection={"column"}
                  alignItems={"center"}
                  lineHeight={0.8}
                  sx={{ minWidth: { xs: "60px", sm: "auto" } }}
                >
                  <DiningIcon 
                    color="action" 
                    sx={{ fontSize: { xs: "20px", sm: "24px", md: "2vw" } }} 
                  />
                  <Typography
                    component={"span"}
                    fontSize={{ xs: "10px", sm: "12px", md: "1vw" }}
                    lineHeight={0.8}
                  >
                    Dining
                  </Typography>
                </Typography>
              )}

              {isLoading ? (
                <Typography>Loading..</Typography>
              ) : (
                <Stack 
                  display={'flex'} 
                  alignItems="end"
                  sx={{ minWidth: { xs: "120px", sm: "auto" } }}
                >
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    bgcolor="primary.light"
                    padding={{ xs: 0.2, sm: 0.4 }}
                    borderRadius={1}
                    flexDirection={{ xs: "column", sm: "row" }}
                    gap={{ xs: 0.5, sm: 0 }}
                  >
                    <Avatar
                      alt={data?.name}
                      src={data?.profileImg}
                      variant="rounded"
                      sx={{
                        width: { xs: 25, sm: 35 },
                        height: { xs: 25, sm: 35 },
                        '& img': {
                          objectFit: 'cover',
                          objectPosition: 'top',
                        },
                      }}
                    />

                    <Stack mx={{ xs: 0, sm: 1 }} textAlign={{ xs: "center", sm: "left" }}>
                      <Typography 
                        mt={{ xs: 0, sm: -1 }}
                        fontSize={{ xs: "10px", sm: "12px" }}
                      > 
                        {data?.fullName} 
                      </Typography>
                      <Typography 
                        variant="caption" 
                        color="secondary.light" 
                        lineHeight={'1vh'}
                        fontSize={{ xs: "8px", sm: "10px" }}
                      >
                        {data?.designation} {data?.user?.role}
                      </Typography>
                    </Stack>
                    <AccountMenu />
                  </Box>
                </Stack>
              )}
            </Stack>
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth.sm }, flexShrink: { sm: 0 } }}
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
              width: drawerWidth.xs,
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
              width: drawerWidth.sm,
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
          p:  1 ,
          // pt: 3,
          width: { sm: `calc(100% - ${drawerWidth.sm}px)` },
        }}
      >
        <Toolbar />

        <Box>{children}</Box>
      </Box>
    </Box>
  );
}

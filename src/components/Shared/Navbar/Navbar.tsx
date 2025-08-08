"use client";
import AccountMenu from "@/components/Dashboard/AccountMenu/AccountMenu";
import { useGetSingleUserQuery } from "@/redux/api/userApi";
import { Avatar, Box, Container, Stack, Typography, IconButton, Menu, MenuItem } from "@mui/material";
import Link from "next/link";
import React from "react";
// import CircleNotificationsIcon from "@mui/icons-material/CircleNotifications";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DiningIcon from "@mui/icons-material/Dining";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import HomeIcon from "@mui/icons-material/Home";
import { USER_ROLE } from "@/constant/role";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import MenuIcon from "@mui/icons-material/Menu";

const Navbar = () => {
  const { data, isLoading, refetch } = useGetSingleUserQuery({});
  const [mobileMenuAnchor, setMobileMenuAnchor] = React.useState<null | HTMLElement>(null);

  React.useEffect(() => {
    refetch();
  }, [data, refetch]);

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMenuAnchor(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuAnchor(null);
  };

  const navigationItems = [
    {
      href: "/",
      icon: HomeIcon,
      label: "Home"
    },
    {
      href: `dashboard/${data?.user?.role}/notifications`,
      icon: NotificationsActiveIcon,
      label: "Notifications"
    },
    ...(data?.user?.role === USER_ROLE.student ? [{
      href: `/mealOverview/${data?.user?._id}`,
      icon: AccountBalanceWalletIcon,
      label: "Meal Overview"
    }] : []),
    ...(![USER_ROLE.moderator, USER_ROLE.student].includes(data?.user?.role) ? [{
      href: "/dining",
      icon: DiningIcon,
      label: "Dining"
    }] : []),
    {
      href: !["moderator", "student", "manager"].includes(data?.user?.role || data?.role)
        ? `/dashboard/${data?.user?.role || data?.role}/student`
        : data?.user?.role === "manager"
        ? `/dashboard/${data?.user?.role}/dining`
        : `/dashboard/${data?.user?.role || data?.role}/notifications`,
      icon: DashboardIcon,
      label: "Dashboard"
    }
  ];

  return (
    <Container>
      <Stack
        py={{ xs: 0.5, sm: 1 }}
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box width={{ xs: "50%", sm: "30%" }}>
          <Typography
            component={Link}
            href="/"
            variant="h5"
            height={{ xs: 25, sm: 35 }}
            fontWeight={600}
            bgcolor="primary.light"
            borderRadius={1}
            padding={{ xs: 0.5, sm: 1 }}
            fontSize={{ xs: "14px", sm: "16px", md: "1.5vw" }}
          >
            <Box component="span" color="primary.main">
              N
            </Box>
            azrul Hall
          </Typography>
        </Box>

        <Box display={'flex'} alignItems={'center'} justifyContent={'end'} gap={2}>
          {/* Desktop Navigation */}
          <Stack display={{ xs: "none", md: "flex" }}>
            <Box   
              display={'flex'}     
              alignItems="center"
              gap={3}
            >
              {navigationItems.map((item, index) => (
                <Typography
                  key={index}
                  component={Link}
                  href={item.href}
                  borderRadius={1}
                  display={"flex"}
                  flexDirection={"column"}
                  alignItems={"center"}
                  lineHeight={0.8}
                >
                  <item.icon color="action" sx={{ fontSize: "2vw" }} />
                  <Typography component={"span"} fontSize={"1vw"} lineHeight={0.8}>
                    {item.label}
                  </Typography>
                </Typography>
              ))}
            </Box>
          </Stack>

          {/* Mobile Menu Button */}
          <IconButton
            sx={{ display: { xs: "flex", md: "none" }, color: "primary.main" }}
            onClick={handleMobileMenuOpen}
          >
            <MenuIcon />
          </IconButton>

          {/* Mobile Menu */}
          <Menu
            anchorEl={mobileMenuAnchor}
            open={Boolean(mobileMenuAnchor)}
            onClose={handleMobileMenuClose}
            sx={{
              display: { xs: "block", md: "none" },
              "& .MuiPaper-root": {
                minWidth: "200px"
              }
            }}
          >
            {navigationItems.map((item, index) => (
              <MenuItem 
                key={index} 
                component={Link} 
                href={item.href}
                onClick={handleMobileMenuClose}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  py: 1.5
                }}
              >
                <item.icon color="action" sx={{ fontSize: "20px" }} />
                <Typography fontSize="14px">{item.label}</Typography>
              </MenuItem>
            ))}
          </Menu>

          {isLoading ? (
            <Typography>Loading..</Typography>
          ) : (
            <Stack display={'flex'} alignItems="end">
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
        </Box>
      </Stack>
    </Container>
  );
};

export default Navbar;

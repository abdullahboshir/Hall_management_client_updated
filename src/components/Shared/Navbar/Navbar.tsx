"use client";
import AccountMenu from "@/components/Dashboard/AccountMenu/AccountMenu";
import { useGetSingleUserQuery } from "@/redux/api/userApi";
import { Avatar, Box, Container, Stack, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";
// import CircleNotificationsIcon from "@mui/icons-material/CircleNotifications";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DiningIcon from "@mui/icons-material/Dining";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import HomeIcon from "@mui/icons-material/Home";
import { USER_ROLE } from "@/constant/role";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";

const Navbar = () => {
  const { data, isLoading, refetch } = useGetSingleUserQuery({});
  React.useEffect(() => {
    refetch();
  }, [data, refetch]);
  return (
    <Container>
      <Stack
        py={1}
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box width={"30%"}>
          <Typography
            component={Link}
            href="/"
            variant="h5"
            height={35}
            fontWeight={600}
            bgcolor="primary.light"
            borderRadius={1}
            padding={1}
            fontSize="1.5vw"
          >
            <Box component="span" color="primary.main">
              N
            </Box>
            azrul Hall
          </Typography>
        </Box>

<Box display={'flex'} alignItems={'center'} justifyContent={'end'} gap={2}>

        <Stack
          // width={"40%"}
        >
          <Box   
          display={'flex'}     
          alignItems="center"
          gap={3}
          >
          <Typography
            component={Link}
            href={"/"}
            borderRadius={1}
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
          >
            <HomeIcon color="action" sx={{ fontSize: "2vw" }} />
            <Typography component={"span"} fontSize={"1vw"} lineHeight={0.8}>
              Home
            </Typography>
          </Typography>

          <Typography
            component={Link}
            href={`dashboard/${data?.user?.role}/notifications`}
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
            lineHeight={0.8}
          >
            <NotificationsActiveIcon
              color="action"
              sx={{ fontSize: "2vw" }}
            />

            <Typography component={"span"} fontSize={"1vw"} lineHeight={0.8}>
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
              lineHeight={0.8}
            >
              <AccountBalanceWalletIcon
                color="action"
                sx={{ fontSize: "2vw" }}
              />
              <Typography
                component={"span"}
                fontSize={"1vw"}
                lineHeight={0.8}
              >
                Meal Overview
              </Typography>
            </Typography>
          )}

          {![USER_ROLE.moderator, USER_ROLE.student].includes(
            data?.user?.role
          ) && (
            <Typography
              component={Link}
              href="/dining"
              display={"flex"}
              flexDirection={"column"}
              alignItems={"center"}
              lineHeight={0.8}
            >
              <DiningIcon color="action" sx={{ fontSize: "2vw" }} />

              <Typography
                component={"span"}
                fontSize={"1vw"}
                lineHeight={0.8}
              >
                Dining
              </Typography>
            </Typography>
          )}

          <Typography
            component={Link}
            href={
              !["moderator", "student", "manager"].includes(
                data?.user?.role || data?.role
              )
                ? `/dashboard/${data?.user?.role || data?.role}/student`
                : data?.user?.role === "manager"
                ? `/dashboard/${data?.user?.role}/dining`
                : `/dashboard/${data?.user?.role || data?.role}/notifications`
            }
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
            lineHeight={0.8}
          >
            <DashboardIcon color="action" sx={{ fontSize: "2vw" }} />

            <Typography component={"span"} fontSize={"1vw"} lineHeight={0.8}>
              Dashboard
            </Typography>
          </Typography>
          </Box>
        </Stack>

        {isLoading ? (
          <Typography>Loading..</Typography>
        ) : (
          <Stack display={'flex'} 
              alignItems="end"
              >
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              bgcolor="primary.light"
          padding={.4}
              borderRadius={1}
            >
                           <Avatar
                            alt={data?.name}
                            src={data?.profileImg}
                            variant="rounded"
                            sx={{
                              width: 35,
                              height: 35,
                              '& img': {
                                objectFit: 'cover',
                                objectPosition: 'top',
                              },
                            }}
                          />
              <Stack mx={1}>
                <Typography mt={-1}> {data?.fullName} </Typography>
                <Typography variant="caption" color="secondary.light" lineHeight={'1vh'}>
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

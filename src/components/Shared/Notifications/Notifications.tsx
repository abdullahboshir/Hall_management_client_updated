/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";

import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import Avatar from "@mui/material/Avatar";
// import SearchIcon from "@mui/icons-material/Search";
import MoreIcon from "@mui/icons-material/MoreVert";
// import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
// import FavoriteIcon from "@mui/icons-material/Favorite";
import PushPinIcon from "@mui/icons-material/PushPin";
import PushPinOutlinedIcon from "@mui/icons-material/PushPinOutlined";
// import CampaignIcon from "@mui/icons-material/Campaign";
import {
  convertToBDDate,
  currentDateBD,
  isYesterdayBD,
} from "@/utils/currentDateBD";
import { Chip, Stack } from "@mui/material";
import { useUpdateNoticePinnedMutation } from "@/redux/api/noticeApi";
import { toast } from "sonner";
import { useGetSingleUserQuery } from "@/redux/api/userApi";

export default function Notifications({ data, isLoading, refetch, setFilters}: any) {
  const [expandedId, setExpandedId] = React.useState<string | null>(null);
  const { currentDay } = currentDateBD();

  const [updateNoticePinned] = useUpdateNoticePinnedMutation();

    const { data: userData, isLoading: userIsLoading } = useGetSingleUserQuery(
      {}
    ); 

  const handlePin = async (id: string, payload: boolean) => {

    try {
      const res = await updateNoticePinned(id).unwrap();
      if (res?.id) {
        toast.success(
          `Notification ${
            res?.isPinned ? "Pinned" : "UnPinned"
          } updated has been Successfully!`
        );
        refetch();
      }
    } catch (error) {
      console.log("Got a Google", error);
    }
  };


  return (
    <React.Fragment>
      {isLoading ? (
        "Loading..."
      ) : (
        <Paper square sx={{ height: "88vh", overflow: "auto", p: -3, m: -3 }}>
          <Box
            height="50px"
            width="100%"
            bgcolor="primary.main"
            color="white"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            position="sticky"
            top={0}
            zIndex={10}
          >
            <Typography variant="h5" sx={{ p: 2 }}>
              Notifications
            </Typography>
            
            {/* <Typography onClick={() => setMyNotifications(false)} variant="h5" sx={{ p: 2 }}>
              My Notifications
            </Typography> */}

            <Toolbar>
              <Box sx={{ flexGrow: 1 }} />

              {/* <IconButton color="inherit">ME</IconButton> */}
              <IconButton onClick={() => setFilters({isAllNotication: false, isPinned: false})} color="inherit">Personal</IconButton>
              <IconButton onClick={() => setFilters({isAllNotication: true, isPinned: false})} color="inherit">All</IconButton>

              {/* <IconButton color="inherit">
                <SearchIcon />
              </IconButton> */}

              <IconButton onClick={() => setFilters({isAllNotication: false, isPinned: true})} color="inherit">Wishlist</IconButton>
              <IconButton color="inherit">
                <MoreIcon />
              </IconButton>
            </Toolbar>
          </Box>

          <List sx={{ mb: 2 }}>
            {Object.entries(
              data.reduce((acc: any, item: any) => {
                const date = convertToBDDate(item?.createdAt);
                const day = date.getDate();
                const month = date.getMonth() + 1;
                const year = date.getFullYear();

                const isToday = day === currentDay;
                const isYesterday = isYesterdayBD(item?.createdAt);

                const formattedDate = isToday
                  ? "Today"
                  : isYesterday
                  ? "Yesterday"
                  : `${year}/${String(month).padStart(2, "0")}/${String(
                      day
                    ).padStart(2, "0")}`;

                if (!acc[formattedDate]) acc[formattedDate] = [];
                acc[formattedDate].push(item);

                return acc;
              }, {})
            ).map(([dateLabel, items]: any) => (
              <React.Fragment key={dateLabel}>
                <ListSubheader sx={{ bgcolor: "background.paper" }}>
                  {dateLabel}
                </ListSubheader>

                {items.map((item: any) => {
                  return (
                    <ListItemButton key={item?.id}>
                      <Stack
                        width="100vw"
                        display="flex"
                        flexDirection="row"
                        justifyContent="space-between"
                      >
                        <ListItemAvatar>
                          <Box
                            display="flex"
                            flexDirection="column"
                            justifyContent="center"
                            alignItems="center"
                            marginRight={3}
                            width={50}
                          >
                            <Avatar
                              alt="Profile Picture"
                              src={item?.createdBy?.profileImg}
                              variant="rounded"
                            />
                            <Typography
                              variant="caption"
                              marginTop={0.5}
                              fontSize={10}
                            >
                              {item?.createdBy?.role !== "superAdmin" ? (
                                item?.createdBy?.role?.toUpperCase()
                              ) : (
                                <Typography
                                  display="flex"
                                  flexDirection="column"
                                  variant="caption"
                                  lineHeight="15px"
                                  fontSize={10}
                                >
                                  <span>
                                    {item?.createdBy?.role
                                      .slice(0, 5)
                                      ?.toUpperCase()}
                                  </span>
                                  <span>
                                    {item?.createdBy?.role
                                      .slice(5)
                                      ?.toUpperCase()}
                                  </span>
                                </Typography>
                              )}
                            </Typography>
                          </Box>
                        </ListItemAvatar>

                        <ListItemText
                          primary={
                            <Box display="flex" justifyContent="space-between">
                              <Typography>{item?.title}</Typography>

                              <Stack direction="row" spacing={1} mb={0.5}>
                                <Typography
                                  color={!item?.isPinned?.includes(userData?._id)? "error" : "success"}
                                >
                                  {!item?.isPinned?.includes(userData._id) ? (
                                    <PushPinOutlinedIcon
                                      sx={{ transform: "rotate(45deg)" }}
                                      onClick={() => handlePin(item?._id, true)}
                                    />
                                  ) : (
                                    // <FavoriteBorderIcon />
                                    // <FavoriteIcon />
                                    <PushPinIcon
                                      sx={{ transform: "rotate(45deg)" }}
                                      onClick={() =>
                                        handlePin(item?._id, false)
                                      }
                                    />
                                  )}
                                </Typography>

                                <Chip
                                  label={item?.noticeType}
                                  variant="outlined"
                                  color="primary"
                                  size="small"
                                />
                                <Chip
                                  label={item?.priority}
                                  variant="outlined"
                                  color="primary"
                                  size="small"
                                />
                              </Stack>
                            </Box>
                          }
                          secondary={
                            <Stack
                              display="flex"
                              flexDirection="row"
                              justifyContent="space-between"
                            >
                              <Box width="51vw">
                                {item?.description.length > 200 ? (
                                  <Typography
                                    component="span"
                                    variant="body2"
                                    color="text.secondary"
                                  >
                                    {expandedId === item.id
                                      ? item.description
                                      : item.description.slice(0, 200) + "... "}
                                    <span
                                      onClick={() =>
                                        setExpandedId(
                                          expandedId === item.id
                                            ? null
                                            : item.id
                                        )
                                      }
                                      style={{
                                        color: "blue",
                                        cursor: "pointer",
                                      }}
                                    >
                                      {expandedId === item.id
                                        ? " Read less"
                                        : "Read more"}
                                    </span>
                                  </Typography>
                                ) : (
                                  <Typography
                                    component="span"
                                    variant="body2"
                                    color="text.secondary"
                                  >
                                    {item?.description}
                                  </Typography>
                                )}
                              </Box>

                              <Typography>
                                {item?.createdBy?.fullName}
                              </Typography>
                            </Stack>
                          }
                        />
                      </Stack>
                    </ListItemButton>
                  );
                })}
              </React.Fragment>
            ))}
          </List>
        </Paper>
      )}
    </React.Fragment>
  );
}

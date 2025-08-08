import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid2,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import EditIcon from "@mui/icons-material/Edit";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import HomeIcon from "@mui/icons-material/Home";
import EventSeatIcon from "@mui/icons-material/EventSeat";
import PolicyIcon from "@mui/icons-material/Policy";
import Link from "next/link";

const ProfileDetails = ({ data }: any) => {
  const isStudent = data?.user?.role === "student";
  const statusColor = data?.user?.status === "active" ? "success" : "error";
  const statusText = data?.user?.status === "active" ? "Active" : "Inactive";

  return (
    <Stack
      width={{ xs: "100%", lg: "30%" }}
      p={{ xs: 1.5, md: "1vw" }}
      spacing={2}
      bgcolor={'primary.light'}
      borderRadius={3}
    >
      <Card
        sx={{
          // background: "linear-gradient(135deg, rgba(0,117,237,0.10) 0%, rgba(3,218,198,0.10) 100%)",
          borderRadius: 2,
          border: "1px solid rgba(0,117,237,0.12)",
          backdropFilter: "blur(6px)",
          boxShadow: 3,
        }}
      >
             <Box
  width="100%"
  height={140}
  borderRadius="0 0 10px 10px"
  sx={{
    bgcolor: "primary.main",
    backgroundImage:
      "repeating-linear-gradient(45deg, rgba(255, 255, 255, 0.07) 0 1px, transparent 1px 20px)",
  }}
>
</Box>

        <CardContent sx={{ p: { xs: 2, md: 2 } }}>
         
          <Box display="flex"  justifyContent="center" mb={2} mt={-13}>
            <Box
              sx={{
                position: "relative",
                borderRadius: "50%",
                overflow: "hidden",
                border: "6px solid #fff",
                boxShadow: "0 0 10px rgba(7, 7, 7, 0.25)",
              }}
            >
              <Avatar
                src={data?.profileImg}
                alt={data?.fullName}
                sx={{ 
                  width: { xs: 120, md: 150 }, 
                  height: { xs: 120, md: 150 },
                  fontSize: { xs: 56, md: 64 }
                }}
              >
                <PersonIcon sx={{ fontSize: { xs: 56, md: 64 } }} />
              </Avatar>
            </Box>

          </Box>

         
          <Box
            sx={{
              background: "#ffffff",
              borderRadius: 1,
              padding: 2,
              boxShadow: 1,
              border: "1px solid rgba(0,117,237,0.06)",
              mb: 2,
              transition: "all 0.25s ease",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: 1,
                border: "1px solid rgba(0,117,237,0.18)",
              },
            }}
          >
            <Box display="flex" justifyContent="center" alignItems="center" gap={1} mb={0.5}>
              <Typography
                fontSize={{ xs: 20, md: "1.5vw" }}
                fontWeight={800}
                color="primary.main"
                textAlign="center"
              >
                {data?.fullName?.toUpperCase()}
              </Typography>
              {data?.user?.role && (
                <Chip
                  label={String(data?.user?.role).toUpperCase()}
                  size="small"
                  color="primary"
                  variant="outlined"
                  sx={{ fontWeight: 700 }}
                />
              )}
            </Box>
            <Box display="flex" alignItems="center" justifyContent="center" gap={1}>
              <EmailIcon fontSize="small" sx={{ color: '#4caf50'}}/>
              <Typography fontSize={{ xs: 14, md: "1.05vw" }} color="text.secondary">
                {data?.email}
              </Typography>
            </Box>
          </Box>

          {/* Room / Seat */}
          <Grid2 container spacing={1.5} mb={2}>
            <Grid2 size={6}>
              <Box
                sx={{
                  background: "#ffffff",
                  borderRadius: 1,
                  padding: 2,
                  boxShadow: 1,
                  border: "1px solid rgba(0,117,237,0.06)",
                  transition: "all 0.25s ease",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: 4,
                    border: "1px solid rgba(0,117,237,0.18)",
                  },
                }}
              >
                <Box display="flex" flexDirection="column" alignItems="center" gap={.2}>
                  <HomeIcon color="primary" sx={{fontSize: '2.5vw'}}/>
                  <Typography fontSize={{ xs: 12, md: "1vw" }} fontWeight={700} color="text.secondary">
                    Room No.
                  </Typography>
                  <Typography fontSize={{ xs: 18, md: "1.3vw" }} fontWeight={800} color="primary.main">
                    {data?.roomNumber ?? "-"}
                  </Typography>
                </Box>
              </Box>
            </Grid2>

            <Grid2 size={6}>
              <Box
                sx={{
                  background: "#ffffff",
                  borderRadius: 1,
                  padding: 2,
                  boxShadow: 1,
                  border: "1px solid rgba(0,117,237,0.06)",
                  transition: "all 0.25s ease",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: 4,
                    border: "1px solid rgba(0,117,237,0.18)",
                  },
                }}
              >
                <Box display="flex" flexDirection="column" alignItems="center" gap={.2}>
                  <EventSeatIcon sx={{fontSize: '2.5vw', color: '#4caf50'}}/>
                  <Typography fontSize={{ xs: 12, md: "1vw" }} fontWeight={700} color="text.secondary">
                    Seat No.
                  </Typography>
                  <Typography fontSize={{ xs: 18, md: "1.3vw" }} fontWeight={800} color="success.light">
                    {data?.seatNumber < 9? '0' + data?.seatNumber : data?.seatNumber ?? "-"}
                  </Typography>
                </Box>
              </Box>
            </Grid2>
          </Grid2>

          {/* Actions */}
          <Grid2 container spacing={1.2} mb={2}>
            <Grid2 size={6}>
              <Link href={`${data?.user?.role}/profile`} style={{ textDecoration: "none" }}>
                <Button
                  fullWidth
                  startIcon={<EditIcon />}
                  sx={{
                    background: "primary.main",
                    borderRadius: 6,
                    border: "1px solid rgba(0,117,237,0.22)",
                    fontWeight: 700,
                    textTransform: "none",
                    fontSize: { xs: 12, md: "0.9vw" },
                    "&:hover": {
                      background: "#002884",
                      transform: "scale(1.02)",
                    },
                  }}
                >
                  Edit Profile
                </Button>
              </Link>
            </Grid2>
            <Grid2 size={6}>
              <Link href={`dashboard/${data?.user?.role}/profile`} style={{ textDecoration: "none" }}>
                <Button
                  fullWidth
                  startIcon={<ArrowOutwardIcon />}
                  sx={{
                    background: "primary.main",
                    borderRadius: 6,
                    border: "1px solid rgba(0,117,237,0.22)",
                    fontWeight: 700,
                    textTransform: "none",
                    fontSize: { xs: 12, md: "0.9vw" },
                         "&:hover": {
                      background: "#002884",
                      transform: "scale(1.02)",
                    },
                  }}
                >
                  View Profile
                </Button>
              </Link>
            </Grid2>
          </Grid2>

          {/* Policies */}
          <Box
            sx={{
              background: "#ffffff",
              borderRadius: 1,
              padding: 2,
              boxShadow: 1,
              transition: "all 0.25s ease",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: 4,
                border: "1px solid rgba(0,117,237,0.18)",
              },
            }}
          >
            <Box display="flex" flexDirection="row" alignItems="center" justifyContent={'center'} gap={1}>
              <PolicyIcon color="primary" />
              <Typography
                fontSize={{ xs: 14, md: "1.05vw" }}
                fontWeight={800}
                color="primary.main"
                textAlign="center"
                sx={{ 
                  cursor: "pointer", 
                  textDecoration: "underline", 
                  "&:hover": { color: "primary.dark" } 
                }}
              >
                View Hall Policies
              </Typography>
            </Box>
          </Box>

          {/* Student-only info */}
          {isStudent && data?.studentId && (
            <>
              <Divider sx={{ my: 2, borderColor: "rgba(0,117,237,0.2)" }} />
              <Box
                sx={{
                  background: "#ffffff",
                  borderRadius: 1,
                  padding: 2,
                  boxShadow: 1,
                  border: "1px solid rgba(0,117,237,0.06)",
                  transition: "all 0.25s ease",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: 4,
                    border: "1px solid rgba(0,117,237,0.18)",
                  },
                }}
              >
                <Box display="flex" flexDirection="column" alignItems="center" gap={0.5}>
                  <Typography fontSize={{ xs: 12, md: "0.9vw" }} fontWeight={700} color="text.secondary">
                    Student ID
                  </Typography>
                  <Typography fontSize={{ xs: 16, md: "1.2vw" }} fontWeight={800} color="primary.main">
                    {data?.studentId}
                  </Typography>
                </Box>
              </Box>
            </>
          )}
        </CardContent>
      </Card>
    </Stack>
  );
};

export default ProfileDetails;

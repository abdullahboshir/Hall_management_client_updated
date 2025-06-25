import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import EditIcon from "@mui/icons-material/Edit";
import Link from "next/link";


const ProfileDetails = ({data}: any) => {

  return (
    <Stack
      width="30%"
      // height="100vh"
      p='1vw'
      bgcolor="primary.light"
      borderRadius={2}
      spacing={2}
    >
      <Box>
        <Card sx={{ maxWidth: 345, backgroundColor: "primary.light" }}>
          <Box padding="12px" bgcolor="white" borderRadius={1}>
            <CardMedia
              component="img"
              alt="green iguana"
              height="140"
              image={data?.profileImg}
            />
          </Box>

          <CardContent sx={{ padding: 0, marginTop: 1 }}>
            <Box height="50vh">
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "15px",
                }}
              >
                <Typography fontSize="1.5vw" fontWeight="bold" lineHeight={1}>
                  {data?.fullName?.toUpperCase()}
                </Typography>

                <Typography
                  fontSize="1.2vw"
                  fontWeight="bold"
                  color="text.secondary"
                >
                  {data?.email}
                </Typography>
              </Card>

              <Box display="flex" justifyContent="space-between" gap={1} my={1}>
                <Card
                  sx={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "10px",
                  }}
                >
                  <Typography
                    fontSize="1.2vw"
                    fontWeight="bold"
                    color="text.secondary"
                  >
                    Room No. ({data?.roomNumber})
                  </Typography>
                </Card>

                <Card
                  sx={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    fontSize="1.4vw"
                    fontWeight="bold"
                    color="text.secondary"
                  >
                    Seat No. ({data?.seatNumber})
                  </Typography>
                </Card>
              </Box>

              <Box display="flex" justifyContent="space-between" gap={1} my={1}>
                <Card
                  sx={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "10px",
                  }}
                >
                  <Link href={`${data?.user?.role}/profile`}>
                    <Typography
                      fontSize="1.4vw"
                      fontWeight="bold"
                      color="text.secondary"
                    >
                      Edit <EditIcon fontSize="small" />
                    </Typography>
                  </Link>
                </Card>

                <Card
                  sx={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Link href={`dashboard/${data?.user?.role}/profile`}>
                    <Typography
                      fontSize="1.4vw"
                      fontWeight="bold"
                      color="text.secondary"
                    >
                      Profile <ArrowOutwardIcon />
                    </Typography>
                  </Link>
                </Card>
              </Box>

              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "15px",
                }}
              >
                <Typography
                  sx={{ textDecoration: "underline", cursor: "pointer" }}
                  fontSize="1.2vw"
                  fontWeight="bold"
                  color="text.secondary"
                  textAlign="center"
                >
                  See The Hall Policies
                </Typography>
              </Card>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Stack>
  );
};

export default ProfileDetails;

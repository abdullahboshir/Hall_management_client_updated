import { useGetSingleUserQuery } from "@/redux/api/userApi";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import Progress from "./Progress";

const ProfileDetails = () => {
  const { data, isLoading } = useGetSingleUserQuery({});
  console.log("dataaaaaaaaaaaaaaaa", data);

  return (
    <Stack
      width="30%"
      height="100vh"
      p={2}
      bgcolor="primary.light"
      borderRadius="3%"
      spacing={2}
    >
      <Box>
        <Card sx={{ maxWidth: 345, backgroundColor: "primary.light" }}>
          <Box padding="12px" bgcolor="white">
            <CardMedia
              component="img"
              alt="green iguana"
              height="140"
              image="https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?t=st=1743484372~exp=1743487972~hmac=ebdaf94f961548443eaa01a75f238bce13e1a2d00767008fd702ec88337e6f7a&w=1380"
            />
          </Box>

          <CardContent sx={{ padding: 0, marginTop: 1 }}>
            <Box height="50vh">
              <Card
                sx={{ display: "flex", alignItems: "center", padding: "15px" }}
              >
                <Typography fontSize='2vw' fontWeight="bold">
                  {data?.fullName.toUpperCase()}
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
                    fontSize='1.4vw'
                    fontWeight="bold"
                    color="text.secondary"
                  >
                    Room No. - {data?.roomNumber}
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
                     fontSize='1.4vw'
                    fontWeight="bold"
                    color="text.secondary"
                  >
                    Seat No. - {data?.seatNumber}
                  </Typography>
                </Card>
              </Box>

              <Box height='100%' >
                <Card   sx={{
                    display: "flex",
                    width: "100%",
                    height: '50%',
                    justifyContent: "center",
                    alignItems: "center",
                  }}>
               
                    {/* <Progress /> */}
                </Card>
              </Box>

            </Box>
          </CardContent>
          {/* <CardActions>
            <Button size="small">Share</Button>
            <Button size="small">Learn More</Button>
        //   </CardActions> */}
        </Card>
      </Box>
    </Stack>
  );
};

export default ProfileDetails;

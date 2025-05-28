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
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import Link from "next/link";

const ProfileDetails = () => {
  const { data, isLoading } = useGetSingleUserQuery({});


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
                sx={{ display: "flex",  flexDirection: 'column', padding: "15px" }}
                
              >
                <Typography fontSize='1.5vw' fontWeight="bold" lineHeight={1}>
                  {data?.fullName.toUpperCase()}
                </Typography>

                  <Typography fontSize='1.2vw' fontWeight="bold" color="text.secondary">
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
                    fontSize='1.4vw'
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
                     fontSize='1.4vw'
                    fontWeight="bold"
                    color="text.secondary"
                  >
                    Seat No.  ({data?.seatNumber})
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
                     fontSize='1.4vw'
                     fontWeight="bold"
                     color="text.secondary"
                     >
                Edit <ArrowOutwardIcon/>
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
                     fontSize='1.4vw'
                     fontWeight="bold"
                     color="text.secondary"
                     >
                Profile <ArrowOutwardIcon/>
                  </Typography>
                    </Link>

                </Card>
              </Box>

                    <Card
                sx={{ display: "flex",  flexDirection: 'column', padding: "15px" }}
                
              >
                  <Typography sx={{textDecoration: 'underline', cursor: 'pointer'}} fontSize='1.2vw' fontWeight="bold" color="text.secondary" textAlign='center'>
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

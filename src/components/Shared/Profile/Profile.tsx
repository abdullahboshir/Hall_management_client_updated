 'use client';
import { formattedDate } from "@/utils/currentDateBD";
import { Box, Stack, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";

const Profile = ({ data }:any) => {
 
  return (
    <Box>
      <Stack position="relative" width="100%" height="50vh">
        <Box
          bgcolor="primary.light"
          width="100%"
          height="50vh"
          position="absolute"
          boxShadow={3}
        >
          <Box
            width="70%"
            height="65vh"
            position="absolute"
            boxShadow={3}
            left={170}
            top={75}
            display="flex"
            flexDirection="column"
            bgcolor="white"
            pl={25}
            pt={3}
            // gap={1}
          >
            <Typography variant="h4" fontWeight="bold" color="primary.dark">
              {data?.fullName?.toUpperCase()}
            </Typography>
            <Typography variant="h5" fontWeight="500" color="text.secondary">
              {data?.designation}
            </Typography>
            <Box mt={2}>
              {data?.role !== 'superAdmin' && <Typography variant="h6">📌 Gender: {data?.gender}</Typography>}
              <Typography variant="h6">
                📞 Phone: {data?.phoneNumber}
              </Typography>
              <Typography variant="h6">📧 Email: {data?.email}</Typography>
              {data?.role !== 'superAdmin' && <Typography variant="h6">
                🚨 Emergency: {data?.emergencyContactNo}
              </Typography>}
              {data?.role !== 'superAdmin' && <Typography variant="h6">
                🎂 Date Of Birth: {formattedDate(data?.dateOfBirth)}
              </Typography>}
            { data?.role !== 'superAdmin' && <Typography variant="h6">
                🎂 Present Address: {typeof(data?.presentAddress) === 'string'? data?.presentAddress : `${data?.presentAddress?.village},  ${data?.presentAddress?.alliance},  ${data?.presentAddress?.subDistrict},  ${data?.presentAddress?.division}`}
              </Typography>}
              {data?.role !== 'superAdmin' && <Typography variant="h6">
                🎂 Present Address: {typeof(data?.permanentAddress) === 'string'? data?.permanentAddress : `${data?.permanentAddress?.village},  ${data?.permanentAddress?.alliance},  ${data?.permanentAddress?.subDistrict},  ${data?.permanentAddress?.division}`}
              </Typography>}
            </Box>
          </Box>
        </Box>
        <Box
          bgcolor="primary.light"
          width="22vw"
          height="65vh"
          position="absolute"
          top={30}
          left={30}
          boxShadow={3}
        >
          <Box width="22vw" height="65vh" position="absolute" boxShadow={3}>
            <Image
             src={data?.profileImg}
              width={500}
              height={500}
              alt="avator"
              className="absolute w-full h-full object-cover object-top scale-100"
            ></Image>
          </Box>

          <Box
            position="absolute"
            width="22vw"
            height="65vh"
            sx={{
              transition: "opacity 0.3s ease",
              "&:hover": {
                opacity: 1,
              },
            }}
          >
            <AddToPhotosIcon sx={{ fontSize: "100px" }} />
          </Box>
        </Box>
      </Stack>

      {/* <Stack ml={43} mt={2}>
        <Box
          height="27vh"
          width="80%"
          bgcolor="primary.light"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Typography variant="h5">
            {data?.designation} {data?.user?.role}
          </Typography>
          <Typography variant="h5">{data?.user?.role}</Typography>
        </Box>
      </Stack> */}
    </Box>
  );
};

export default Profile;

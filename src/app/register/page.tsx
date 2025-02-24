"use client";
import React from "react";
import { registerStudent } from "@/services/actions/registerStudent";
import { modifyPayload } from "@/utils/modifyPayload";
import {
  Box,
  Button,
  Container,
  Divider,
  Grid2,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { SubmitHandler, useForm } from "react-hook-form";

interface IName {
  firstName: string;
  middleName: string;
  lastName: string;
}
interface IGuardian {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
}

interface IAddress {
  division: string;
  district: string;
  subDistrict: string;
  alliance: string;
  village: string;
}

export interface IStudent {
  password: string;
  studentData: {
    email: string;
    name: IName;
    gender: string;
    dateOfBirth: string;
    phoneNumber: string;
    roomNumber: string;
    seatNumber: string;
    session: string;
    classRoll: string;
    admissionDetails: {
      admissionFee: string;
    };
    emergencyContact: string;
    guardian: IGuardian;
    presentAddress: IAddress;
    permanentAddress: IAddress;
    bloodGroup: string;
  };
}

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    // watch,
    // formState: { errors },
  } = useForm<IStudent>();
  const onSubmit: SubmitHandler<IStudent> = async (values) => {
    const data = modifyPayload(values);
    console.log("dataaaaaaaaaaa", data);

    try {
      const res = await registerStudent(data);
      console.log("ressssssssssssssssss", res);
    } catch (error) {
      console.log("errorrrrrrrrr", error);
    }
  };

  return (
    <Container>
      <Stack
        sx={{
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
          paddingTop: 45,
          paddingBottom: 5,
          overflow: "scroll",
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box
            sx={{
              maxWidth: 1000,
              width: "100%",
              boxShadow: 1,
              borderRadius: 1,
              p: 4,
              textAlign: "center",
            }}
          >
            <Typography
              variant="h5"
              component="h1"
              fontWeight={600}
              marginBottom={2}
            >
              Add a Student
            </Typography>

            <Box>
              <Grid2 container spacing={2}>
                <Grid2 size={3}>
                  <TextField
                    size="small"
                    label="First Name"
                    variant="outlined"
                    {...register("studentData.name.firstName")}
                  />
                </Grid2>
                <Grid2 size={3}>
                  <TextField
                    size="small"
                    label="Middle Name"
                    variant="outlined"
                    {...register("studentData.name.middleName")}
                  />
                </Grid2>
                <Grid2 size={3}>
                  <TextField
                    size="small"
                    label="Last Name"
                    variant="outlined"
                    {...register("studentData.name.lastName")}
                  />
                </Grid2>
                <Grid2 size={3}>
                  <TextField
                    size="small"
                    id="outlined-select-currency"
                    select
                    label="Select Your Gender"
                    defaultValue="Male"
                    fullWidth={true}
                    {...register("studentData.gender")}
                    sx={{ paddingRight: "7px" }}
                  >
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                  </TextField>
                </Grid2>
                <Grid2 size={3}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer
                      components={["DatePicker"]}
                      sx={{ paddingTop: "0", width: "97%", paddingLeft: "6px" }}
                    >
                      <DatePicker
                        label="Date of birth"
                        slotProps={{
                          textField: {
                            size: "small",
                          },
                        }}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </Grid2>
                <Grid2 size={3}>
                  <TextField
                    size="small"
                    label="Phone Number"
                    variant="outlined"
                    {...register("studentData.phoneNumber")}
                  />
                </Grid2>
                <Grid2 size={3}>
                  <TextField
                    size="small"
                    label="Email"
                    variant="outlined"
                    type="email"
                    {...register("studentData.email")}
                  />
                </Grid2>
                <Grid2 size={3}>
                  <TextField
                    size="small"
                    label="Password"
                    variant="outlined"
                    type="password"
                    {...register("password")}
                  />
                </Grid2>
                <Grid2 size={3}>
                  <TextField
                    size="small"
                    label="Room Number"
                    variant="outlined"
                    {...register("studentData.roomNumber")}
                  />
                </Grid2>
                <Grid2 size={3}>
                  <TextField
                    size="small"
                    label="Seat Number"
                    variant="outlined"
                    {...register("studentData.seatNumber")}
                  />
                </Grid2>
                <Grid2 size={3}>
                  <TextField
                    size="small"
                    label="Session"
                    variant="outlined"
                    {...register("studentData.session")}
                  />
                </Grid2>
                <Grid2 size={3}>
                  <TextField
                    size="small"
                    label="Class Roll"
                    variant="outlined"
                    {...register("studentData.classRoll")}
                  />
                </Grid2>
                <Grid2 size={3}>
                  <TextField
                    size="small"
                    label="Admission Fee"
                    variant="outlined"
                    {...register("studentData.admissionDetails.admissionFee")}
                  />
                </Grid2>
                <Grid2 size={3}>
                  <TextField
                    size="small"
                    label="Emergency Contact"
                    variant="outlined"
                    {...register("studentData.emergencyContact")}
                  />
                </Grid2>

                <Grid2 size={3}>
                  <TextField
                    size="small"
                    id="outlined-select-currency"
                    select
                    label="Blood Group"
                    defaultValue="A+"
                    fullWidth={true}
                    {...register("studentData.bloodGroup")}
                  >
                    <MenuItem value="A+">A+</MenuItem>
                    <MenuItem value="A-">A-</MenuItem>
                    <MenuItem value="B+">B+</MenuItem>
                    <MenuItem value="B-">B-</MenuItem>
                    <MenuItem value="AB+">AB+</MenuItem>
                    <MenuItem value="AB-">AB-</MenuItem>
                    <MenuItem value="O+">O+</MenuItem>
                    <MenuItem value="O-">O-</MenuItem>
                  </TextField>
                </Grid2>

                <Grid2
                  size={12}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Divider sx={{ width: "40%" }} />
                  <Typography padding={1} fontWeight="bold">
                    Gaurdian Information
                  </Typography>
                  <Divider sx={{ width: "40%" }} />
                </Grid2>

                <Grid2 size={3}>
                  <TextField
                    size="small"
                    label="Father Name"
                    variant="outlined"
                    {...register("studentData.guardian.fatherName")}
                  />
                </Grid2>
                <Grid2 size={3}>
                  <TextField
                    size="small"
                    label="Father Occupation"
                    variant="outlined"
                    {...register("studentData.guardian.fatherOccupation")}
                  />
                </Grid2>
                <Grid2 size={3}>
                  <TextField
                    size="small"
                    label="Father Contact Number"
                    variant="outlined"
                    {...register("studentData.guardian.fatherContactNo")}
                  />
                </Grid2>
                <Grid2 size={3}>
                  <TextField
                    size="small"
                    label="Mother Name"
                    variant="outlined"
                    {...register("studentData.guardian.motherName")}
                  />
                </Grid2>
                <Grid2 size={3}>
                  <TextField
                    size="small"
                    label="Mother Occupation"
                    variant="outlined"
                    {...register("studentData.guardian.motherOccupation")}
                  />
                </Grid2>
                <Grid2 size={3}>
                  <TextField
                    size="small"
                    label="Mother Contact Number"
                    variant="outlined"
                    {...register("studentData.guardian.motherContactNo")}
                  />
                </Grid2>

                <Grid2
                  size={12}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Divider sx={{ width: "40%" }} />
                  <Typography padding={1} fontWeight="bold">
                    Permanent Address
                  </Typography>
                  <Divider sx={{ width: "40%" }} />
                </Grid2>

                <Grid2 size={3}>
                  <TextField
                    size="small"
                    label="Division"
                    variant="outlined"
                    {...register("studentData.permanentAddress.division")}
                  />
                </Grid2>
                <Grid2 size={3}>
                  <TextField
                    size="small"
                    label="District"
                    variant="outlined"
                    {...register("studentData.permanentAddress.district")}
                  />
                </Grid2>
                <Grid2 size={3}>
                  <TextField
                    size="small"
                    label="Sub District"
                    variant="outlined"
                    {...register("studentData.permanentAddress.subDistrict")}
                  />
                </Grid2>
                <Grid2 size={3}>
                  <TextField
                    size="small"
                    label="Alliance"
                    variant="outlined"
                    {...register("studentData.permanentAddress.alliance")}
                  />
                </Grid2>
                <Grid2 size={3}>
                  <TextField
                    size="small"
                    label="Village"
                    variant="outlined"
                    {...register("studentData.permanentAddress.village")}
                  />
                </Grid2>

                <Grid2
                  size={12}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Divider sx={{ width: "40%" }} />
                  <Typography padding={1} fontWeight="bold">
                    Present Address
                  </Typography>
                  <Divider sx={{ width: "40%" }} />
                </Grid2>

                <Grid2 size={3}>
                  <TextField
                    size="small"
                    label="Division"
                    variant="outlined"
                    {...register("studentData.presentAddress.division")}
                  />
                </Grid2>
                <Grid2 size={3}>
                  <TextField
                    size="small"
                    label="District"
                    variant="outlined"
                    {...register("studentData.presentAddress.district")}
                  />
                </Grid2>
                <Grid2 size={3}>
                  <TextField
                    size="small"
                    label="Sub District"
                    variant="outlined"
                    {...register("studentData.presentAddress.subDistrict")}
                  />
                </Grid2>
                <Grid2 size={3}>
                  <TextField
                    size="small"
                    label="Alliance"
                    variant="outlined"
                    {...register("studentData.presentAddress.alliance")}
                  />
                </Grid2>
                <Grid2 size={3}>
                  <TextField
                    size="small"
                    label="Village"
                    variant="outlined"
                    {...register("studentData.presentAddress.village")}
                  />
                </Grid2>
              </Grid2>
            </Box>
            <Button
              type="submit"
              sx={{ padding: "10px 100px", marginTop: "10px" }}
            >
              Submit
            </Button>
          </Box>
        </form>
      </Stack>
    </Container>
  );
};

export default RegisterPage;

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { studentRegisterDefaultValues } from "@/app/(withDashboardLayout)/dashboard/constants/student.constant";
import HmDatePicker from "@/components/Form/HmDatePicker";
import HmForm from "@/components/Form/HmForm";
import HmInput from "@/components/Form/HmInput";
import HmSelectField from "@/components/Form/HmSelectField";
import {
  BloodGroup,
  Department,
  Faculty,
  Gender,
} from "@/constant/common.constant";
import {
  useGetSingleStudentQuery,
  useUpdateStudentMutation,
} from "@/redux/api/studentApi";

// import { modifyPayload } from "@/utils/modifyPayload";
import { Box, Button, Divider, Grid2, Typography } from "@mui/material";
// import dayjs from "dayjs";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

const StudentUpdatePage = () => {
  const params = useParams();
  const router = useRouter();
  const studentId = params?.studentId as string;
  const [selectedFaculty, setSelectedFaculty] = useState<
    keyof typeof Department | ""
  >("");
  const [department, setDepartment] = useState<string[]>([]);

  useEffect(() => {
    if (selectedFaculty && Department[selectedFaculty]) {
      setDepartment(Department[selectedFaculty]);
    } else {
      setDepartment([]);
    }
  }, [selectedFaculty]);

  const { data: userData, isLoading: userIsLoading } =
    useGetSingleStudentQuery(studentId);

  const [updateStudent] = useUpdateStudentMutation();

  if (userIsLoading) {
    <Typography>Loading...</Typography>;
  }

  const handleStudentUpdate = async (values: FieldValues) => {
    if (userIsLoading) {
      toast.error("Please wait, data is still loading...");
      return;
    }

    if (!userData?.id) {
      toast.error("Failed to fetch required data. Please try again.");
      return;
    }

    values.id = studentId;
    const studentData = { id: values.id, body: values };

    try {
      const res = await updateStudent(studentData).unwrap();

      if (res?.id) {
        toast.success("Student updated has been Successfully!!");
        router.back();
      }
    } catch (error: any) {
      console.log(error?.message);
    }
  };

  return (
    <Box>
      <Typography variant="h5" mb={2} ml={2}>
        Update Student
      </Typography>

      {userIsLoading ? (
        "Loading..."
      ) : (
        <HmForm
          onSubmit={handleStudentUpdate}
          defaultValues={userData ? studentRegisterDefaultValues(userData) : {}}
        >
          <Grid2 container spacing={3} paddingX={2} paddingY={2}>
            <Grid2 size={3}>
              <HmInput
                name="studentData.name.firstName"
                label="First Name"
                fullWidth={true}
              />
            </Grid2>
            <Grid2 size={3}>
              <HmInput name="studentData.name.middleName" label="Middle Name" />
            </Grid2>
            <Grid2 size={3}>
              <HmInput name="studentData.name.lastName" label="Last Name" />
            </Grid2>

            <Grid2 size={3}>
              <HmSelectField
                items={Gender}
                name="studentData.gender"
                label="Select Your Gender"
                fullWidth={true}
              ></HmSelectField>
            </Grid2>

            <Grid2 size={3}>
              <HmInput name="studentData.phoneNumber" label="Contact Number" />
            </Grid2>
            <Grid2 size={3}>
              <HmInput name="studentData.email" label="Email" />
            </Grid2>

            <Grid2 size={3}>
              <HmDatePicker
                name="studentData.dateOfBirth"
                label="Date of Birth"
              />
            </Grid2>

            <Grid2 size={3}>
              <HmSelectField
                items={BloodGroup}
                name="studentData.bloodGroup"
                label="Select Your Blood Group"
                fullWidth={true}
              ></HmSelectField>
            </Grid2>

            <Grid2 size={3}>
              <HmInput name="studentData.roomNumber" label="Room Number" />
            </Grid2>
            <Grid2 size={3}>
              <HmInput name="studentData.seatNumber" label="Seat Number" />
            </Grid2>

            <Grid2 size={3}>
              <HmSelectField
                items={Faculty}
                name="studentData.academicFaculty"
                label="Select your Faculty"
                fullWidth={true}
                onChange={(value) => setSelectedFaculty(value as any)}
              ></HmSelectField>
            </Grid2>

            <Grid2 size={3}>
              <HmSelectField
                items={
                  department.length
                    ? department
                    : [userData?.academicDepartment]
                }
                name="studentData.academicDepartment"
                label="Select Your Department"
                fullWidth={true}
              ></HmSelectField>
            </Grid2>

            <Grid2 size={3}>
              <HmInput name="studentData.session" label="Session" />
            </Grid2>
            <Grid2 size={3}>
              <HmInput name="studentData.classRoll" label="Class Roll" />
            </Grid2>

            <Grid2 size={3}>
              <HmInput
                name="studentData.emergencyContact"
                label="Emergency Contact"
              />
            </Grid2>

            {/* <Grid2 size={3}>
              <HmFileUploader
                name="file"
                label="Add Photo"
                sx={{ width: "100%" }}
              />
            </Grid2> */}

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
              <HmInput
                name="studentData.guardian.fatherName"
                label="Father Name"
              />
            </Grid2>
            <Grid2 size={3}>
              <HmInput
                name="studentData.guardian.fatherOccupation"
                label="Father Occupation"
              />
            </Grid2>
            <Grid2 size={3}>
              <HmInput
                name="studentData.guardian.fatherContactNo"
                label="Father Contact Number"
              />
            </Grid2>
            <Grid2 size={3}>
              <HmInput
                name="studentData.guardian.motherName"
                label="Mother Name"
              />
            </Grid2>
            <Grid2 size={3}>
              <HmInput
                name="studentData.guardian.motherOccupation"
                label="Mother Occupation"
              />
            </Grid2>
            <Grid2 size={3}>
              <HmInput
                name="studentData.guardian.motherContactNo"
                label="Mother Contact Number"
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
              <HmInput
                name="studentData.permanentAddress.division"
                label="Division"
              />
            </Grid2>
            <Grid2 size={3}>
              <HmInput
                name="studentData.permanentAddress.district"
                label="District"
              />
            </Grid2>
            <Grid2 size={3}>
              <HmInput
                name="studentData.permanentAddress.subDistrict"
                label="Sub District"
              />
            </Grid2>
            <Grid2 size={3}>
              <HmInput
                name="studentData.permanentAddress.alliance"
                label="Alliance"
              />
            </Grid2>
            <Grid2 size={3}>
              <HmInput
                name="studentData.permanentAddress.village"
                label="Village"
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
              <HmInput
                name="studentData.presentAddress.division"
                label="Division"
              />
            </Grid2>
            <Grid2 size={3}>
              <HmInput
                name="studentData.presentAddress.district"
                label="District"
              />
            </Grid2>
            <Grid2 size={3}>
              <HmInput
                name="studentData.presentAddress.subDistrict"
                label="Sub District"
              />
            </Grid2>
            <Grid2 size={3}>
              <HmInput
                name="studentData.presentAddress.alliance"
                label="Alliance"
              />
            </Grid2>
            <Grid2 size={3}>
              <HmInput
                name="studentData.presentAddress.village"
                label="Village"
              />
            </Grid2>

            <Grid2 size={12}>
              <Button
                type="submit"
                sx={{
                  padding: "10px 40px",
                  marginTop: "10px",
                  position: "fixed",
                  right: 20,
                  bottom: 20,
                }}
              >
                Submit
              </Button>
            </Grid2>
          </Grid2>
        </HmForm>
      )}
    </Box>
  );
};

export default StudentUpdatePage;

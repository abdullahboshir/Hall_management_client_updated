/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import HmDatePicker from "@/components/Form/HmDatePicker";
import HmFileUploader from "@/components/Form/HmFileUploader";
import HmForm from "@/components/Form/HmForm";
import HmInput from "@/components/Form/HmInput";
import HmSelectField from "@/components/Form/HmSelectField";
import { BloodGroup, Gender } from "@/constant/common.constant";
import {
  useGetSingleManagerQuery,
  useUpdateManagerMutation,
} from "@/redux/api/managerApi";
import { Box, Button, Grid2, Typography } from "@mui/material";
import dayjs from "dayjs";
import { useParams } from "next/navigation";
import { FieldValues } from "react-hook-form";

const AdminUpdatePage = () => {
  const params = useParams();
  const managerId = params?.managerId as string;

  const { data, isLoading } = useGetSingleManagerQuery(managerId);
  const [updateManager] = useUpdateManagerMutation();

  const handleFormSubmit = async (values: FieldValues) => {
    values.id = managerId;

    const managerData = { id: values.id, body: values };

    console.log("got valuessssssssss", data, params);
    try {
      const res = await updateManager(managerData);
      console.log("update managerrrrrrrrrr", res);
      //   if (res?.id) {
      //     toast.success("Manager created Successfully!!");
      //     setOpen(false);
      //   }
    } catch (error: any) {
      console.log(error?.message);
    }
  };

  const managerDefaultValues = {
    name: {
      firstName: data?.name?.firstName || "",
      middleName: data?.name?.middleName || "",
      lastName: data?.name?.lastName || "",
    },
    contactNumber: data?.contactNumber || "",
    email: data?.email || "",
    emergencyContactNo: data?.emergencyContactNo || "",
    bloodGroup: data?.bloodGroup || "",
    presentAddress: data?.presentAddress || "",
    permanentAddress: data?.permanentAddress || "",
    gender: data?.gender || "",
    dateOfBirth: data?.dateOfBirth ? dayjs(data.dateOfBirth) : dayjs(),
    file: null,
  };

  return (
    <Box>
      <Typography variant="h5" mb={2}>
        Update Manager
      </Typography>

      {isLoading ? (
        "Loading..."
      ) : (
        <HmForm
          onSubmit={handleFormSubmit}
          defaultValues={data && managerDefaultValues}
        >
          <Grid2 container spacing={2}>
            <Grid2 size={4}>
              <HmInput
                name="name.firstName"
                label="First Name"
                fullWidth={true}
              />
            </Grid2>
            <Grid2 size={4}>
              <HmInput name="name.middleName" label="Middle Name" />
            </Grid2>
            <Grid2 size={4}>
              <HmInput name="name.lastName" label="Last Name" />
            </Grid2>

            <Grid2 size={4}>
              <HmSelectField
                items={Gender}
                name="gender"
                label="Select Your Gender"
                fullWidth={true}
              ></HmSelectField>
            </Grid2>

            <Grid2 size={4}>
              <HmInput name="contactNumber" label="Contact Number" />
            </Grid2>
            <Grid2 size={4}>
              <HmInput name="email" label="Email" />
            </Grid2>
            <Grid2 size={4}>
              <HmInput
                name="emergencyContactNo"
                label="Emergency Contact Number"
              />
            </Grid2>

            <Grid2 size={4}>
              <HmInput name="presentAddress" label="Present Address" />
            </Grid2>
            <Grid2 size={4}>
              <HmInput name="permanentAddress" label="Permanent Address" />
            </Grid2>

            <Grid2 size={4}>
              <HmDatePicker name="dateOfBirth" label="Date of Birth" />
            </Grid2>

            <Grid2 size={4}>
              <HmSelectField
                items={BloodGroup}
                name="bloodGroup"
                label="Select Your Blood Group"
                fullWidth={true}
              ></HmSelectField>
            </Grid2>

            <Grid2 size={4}>
              <HmFileUploader name="file" label="Upload File" />
            </Grid2>

            {/* Add other fields like bloodGroup, addresses, etc. */}
            <Grid2 size={12}>
              <Button
                type="submit"
                sx={{ padding: "10px 50px", marginTop: "10px" }}
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

export default AdminUpdatePage;

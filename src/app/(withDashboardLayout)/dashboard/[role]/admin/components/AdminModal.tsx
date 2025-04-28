/* eslint-disable @typescript-eslint/no-explicit-any */
import HmDatePicker from "@/components/Form/HmDatePicker";
import HmFileUploader from "@/components/Form/HmFileUploader";
import HmForm from "@/components/Form/HmForm";
import HmInput from "@/components/Form/HmInput";
import HmSelectField from "@/components/Form/HmSelectField";
import HmModal from "@/components/Shared/HmModal/HmModal";
import Spinner from "@/components/Shared/Spinner/Spinner";
import { BloodGroup, Designation, Gender } from "@/constant/common.constant";
import { useCreateAdminMutation } from "@/redux/api/adminApi";
import { useGetAllDiningsQuery } from "@/redux/api/diningApi";
import { useGetAllHallsQuery } from "@/redux/api/hallApi";
import { useGetSingleUserQuery } from "@/redux/api/userApi";
import { modifyPayload } from "@/utils/modifyPayload";
import { Button, Grid2, Typography } from "@mui/material";
import dayjs from "dayjs";
import React, { useState } from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const AdminModal = ({ open, setOpen }: TProps) => {
  const [error, setError] = useState("");
  const { data: userData, isLoading: userIsLoading } = useGetSingleUserQuery(
    {}
  );

  const { data: hallData, isLoading: hallIsLoading } = useGetAllHallsQuery({});
  const { data: diningData, isLoading: diningIsLoading } =
    useGetAllDiningsQuery({});
  const [createAdmin, { isLoading: isCreateAdminLoading }] =
    useCreateAdminMutation();

  const handleFormSubmit = async (values: FieldValues) => {
    if (hallIsLoading || diningIsLoading || userIsLoading) {
      toast.error("Please wait, data is still loading...");
      return;
    }

    if (!hallData || !diningData || !userData?.id) {
      toast.error("Failed to fetch required data. Please try again.");
      return;
    }

    values.adminData.hall = hallData?._id;
    values.adminData.dining = diningData?._id;
    values.adminData.createdBy = userData?._id;

    const data = modifyPayload(values);

    try {
      const res = await createAdmin(data).unwrap();
      console.log("create managerrrrrr", res);

      if (res[0]?.id) {
        toast.success("Admin has been created Successfully!!");
        setOpen(false);
      }
    } catch (err: any) {
      console.log("got an error", err?.message || err?.data, err);

      const isDuplicate = err?.data?.includes("E11000");
      if (
        (isDuplicate && err?.data?.includes("index: email_1")) ||
        err?.data?.includes("index: phoneNumber_1")
      ) {
        setError("Email or Phone Number already has been registered!!");
      }
    }
  };

  const managerDefaultValues = {
    adminData: {
      name: {
        firstName: "",
        middleName: "",
        lastName: "",
      },
      phoneNumber: "",
      email: "",
      emergencyContactNo: "",
      bloodGroup: "",
      presentAddress: "",
      permanentAddress: "",
      gender: "",
      dateOfBirth: dayjs(),
    },
  };

  return (
    <HmModal
      open={open}
      setOpen={setOpen}
      setError={setError}
      title="Create Admin"
    >
      {hallIsLoading || diningIsLoading || userIsLoading ? (
        <p>Loading data, please wait...</p>
      ) : (
        <HmForm
          onSubmit={handleFormSubmit}
          defaultValues={managerDefaultValues}
        >
          <Grid2 container spacing={2}>
            <Grid2 size={6}>
              <HmInput
                name="adminData.name.firstName"
                label="First Name"
                fullWidth={true}
              />
            </Grid2>
            <Grid2 size={6}>
              <HmInput name="adminData.name.middleName" label="Middle Name" />
            </Grid2>
            <Grid2 size={6}>
              <HmInput name="adminData.name.lastName" label="Last Name" />
            </Grid2>

            <Grid2 size={6}>
              <HmSelectField
                items={Gender}
                name="adminData.gender"
                label="Select Your Gender"
                fullWidth={true}
              ></HmSelectField>
            </Grid2>

            <Grid2 size={6}>
              <HmInput name="adminData.phoneNumber" label="Contact Number" />
            </Grid2>
            <Grid2 size={6}>
              <HmInput name="adminData.email" label="Email" />
            </Grid2>

            <Grid2 size={6}>
              <HmInput name="password" label="Password" />
            </Grid2>

            <Grid2 size={6}>
              <HmInput
                name="adminData.emergencyContactNo"
                label="Emergency Contact Number"
              />
            </Grid2>

            <Grid2 size={6}>
              <HmInput
                name="adminData.presentAddress"
                label="Present Address"
              />
            </Grid2>
            <Grid2 size={6}>
              <HmInput
                name="adminData.permanentAddress"
                label="Permanent Address"
              />
            </Grid2>

            <Grid2 size={6}>
              <HmDatePicker
                name="adminData.dateOfBirth"
                label="Date of Birth"
              />
            </Grid2>

            <Grid2 size={6}>
              <HmSelectField
                items={BloodGroup}
                name="adminData.bloodGroup"
                label="Select Your Blood Group"
                fullWidth={true}
              ></HmSelectField>
            </Grid2>

            <Grid2 size={6}>
              <HmSelectField
                items={Designation}
                name="adminData.designation"
                label="Designation"
                fullWidth={true}
              ></HmSelectField>
            </Grid2>

            <Grid2 size={6}>
              <HmFileUploader
                name="file"
                label="Add Photo"
                sx={{ width: "100%" }}
              />
            </Grid2>

            <Grid2 size={12}>
              <Typography color="error.main">{error}</Typography>
            </Grid2>

            <Grid2 size={6} display="flex" justifyContent="end" width="100%">
              <Button
                type="submit"
                disabled={hallIsLoading || diningIsLoading || userIsLoading}
                sx={{
                  padding: "7px 20px",
                  marginTop: "10px",
                }}
              >
                {hallIsLoading ||
                diningIsLoading ||
                userIsLoading ||
                isCreateAdminLoading ? (
                  <Typography display="flex" gap={1} color="white">
                    Processing <Spinner />
                  </Typography>
                ) : (
                  "Create"
                )}
              </Button>
            </Grid2>
          </Grid2>
        </HmForm>
      )}
    </HmModal>
  );
};

export default AdminModal;

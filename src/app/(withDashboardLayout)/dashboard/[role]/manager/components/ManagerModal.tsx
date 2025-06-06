 
import HmDatePicker from "@/components/Form/HmDatePicker";
import HmFileUploader from "@/components/Form/HmFileUploader";
import HmForm from "@/components/Form/HmForm";
import HmInput from "@/components/Form/HmInput";
import HmSelectField from "@/components/Form/HmSelectField";
import HmModal from "@/components/Shared/HmModal/HmModal";
import { BloodGroup, Gender } from "@/constant/common.constant";
import { useGetAllDiningsQuery } from "@/redux/api/diningApi";
import { useGetAllHallsQuery } from "@/redux/api/hallApi";
import { useCreateManagerMutation } from "@/redux/api/managerApi";
import { useGetSingleUserQuery } from "@/redux/api/userApi";
import { modifyPayload } from "@/utils/modifyPayload";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Grid2, Typography } from "@mui/material";
import dayjs from "dayjs";
import React, { useState } from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { managerValidaionSchema } from "../../../validation/manager.validation";
import Spinner from "@/components/Shared/Spinner/Spinner";
import Progress from "@/components/Shared/Spinner/Progress";

type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const ManagerModal = ({ open, setOpen }: TProps) => {
  const [error, setError] = useState("");
  const { data: userData, isLoading: userIsLoading } = useGetSingleUserQuery(
    {}
  );
  const { data: hallData, isLoading: hallIsLoading } = useGetAllHallsQuery({});
  const { data: diningData, isLoading: diningIsLoading } =
    useGetAllDiningsQuery({});
  const [createManager, { isLoading: isCreateManagerLoading }] =
    useCreateManagerMutation();

  const handleFormSubmit = async (values: FieldValues) => {
    if (hallIsLoading || diningIsLoading || userIsLoading) {
        <Spinner/>
    }

    if (!hallData || !diningData || !userData?.id) {
      toast.error("Failed to fetch required data. Please try again.");
      return;
    }

    values.managerData.hall = hallData?._id;
    values.managerData.dining = diningData?._id;
    values.managerData.createdBy = userData?._id;

    const data = modifyPayload(values);

    try {
      const res = await createManager(data).unwrap();

      if (res[0]?.id) {
        toast.success("Manager created Successfully!!");
        setOpen(false);
        setError("");
      }
    } catch (err:any) {
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
    managerData: {
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
      title="Create Manager"
    >
      {hallIsLoading || diningIsLoading || userIsLoading ? (
        <p>Loading data, please wait...</p>
      ) : (
        <HmForm
          onSubmit={handleFormSubmit}
          defaultValues={managerDefaultValues}
          resolver={zodResolver(managerValidaionSchema)}
        >
          <Grid2 container spacing={2}>
            <Grid2 size={6}>
              <HmInput
                name="managerData.name.firstName"
                label="First Name"
                fullWidth={true}
              />
            </Grid2>
            <Grid2 size={6}>
              <HmInput name="managerData.name.middleName" label="Middle Name" />
            </Grid2>
            <Grid2 size={6}>
              <HmInput name="managerData.name.lastName" label="Last Name" />
            </Grid2>

            <Grid2 size={6}>
              <HmSelectField
                items={Gender}
                name="managerData.gender"
                label="Select Your Gender"
                fullWidth={true}
              ></HmSelectField>
            </Grid2>

            <Grid2 size={6}>
              <HmInput name="managerData.phoneNumber" label="Phone Number" />
            </Grid2>
            <Grid2 size={6}>
              <HmInput name="managerData.email" label="Email" />
            </Grid2>

            <Grid2 size={6}>
              <HmInput name="password" label="Password" />
            </Grid2>

            <Grid2 size={6}>
              <HmInput
                name="managerData.emergencyContactNo"
                label="Emergency Contact Number"
              />
            </Grid2>

            <Grid2 size={6}>
              <HmInput
                name="managerData.presentAddress"
                label="Present Address"
              />
            </Grid2>
            <Grid2 size={6}>
              <HmInput
                name="managerData.permanentAddress"
                label="Permanent Address"
              />
            </Grid2>

            <Grid2 size={6}>
              <HmDatePicker
                name="managerData.dateOfBirth"
                label="Date of Birth"
              />
            </Grid2>

            <Grid2 size={6}>
              <HmSelectField
                items={BloodGroup}
                name="managerData.bloodGroup"
                label="Select Your Blood Group"
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

            <Grid2 size={6}>
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
                isCreateManagerLoading ? (
                  <Typography display="flex" gap={1} color="white">
                    Processing <Progress />
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

export default ManagerModal;

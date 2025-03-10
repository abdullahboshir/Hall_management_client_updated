/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { Button, Grid2 } from "@mui/material";
import dayjs from "dayjs";
import React from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const AdminModal = ({ open, setOpen }: TProps) => {
  const { data: userData, isLoading: userIsLoading } = useGetSingleUserQuery(
    {}
  );
  const { data: hallData, isLoading: hallIsLoading } = useGetAllHallsQuery({});
  const { data: diningData, isLoading: diningIsLoading } =
    useGetAllDiningsQuery({});
  const [createManager] = useCreateManagerMutation();

  const handleFormSubmit = async (values: FieldValues) => {
    if (hallIsLoading || diningIsLoading || userIsLoading) {
      toast.error("Please wait, data is still loading...");
      return;
    }

    if (!hallData?.length || !diningData?.length || !userData?.id) {
      toast.error("Failed to fetch required data. Please try again.");
      return;
    }

    values.managerData.hall = hallData[0]?._id;
    values.managerData.dining = diningData[0]?._id;
    values.managerData.creator = userData?.id;

    const data = modifyPayload(values);

    try {
      const res = await createManager(data).unwrap();
      console.log("manager createdddddddddddd", res);

      if (res?.id) {
        toast.success("Manager created Successfully!!");
        setOpen(false);
      }
    } catch (error: any) {
      console.log(error?.message);
    }
  };

  const managerDefaultValues = {
    managerData: {
      name: {
        firstName: "",
        middleName: "",
        lastName: "",
      },
      contactNumber: "",
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
    <HmModal open={open} setOpen={setOpen} title="Add Manager">
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
              <HmInput
                name="managerData.contactNumber"
                label="Contact Number"
              />
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

            <Grid2 size={6} display="flex" justifyContent="end" width="100%">
              <Button
                type="submit"
                disabled={hallIsLoading || diningIsLoading || userIsLoading}
                sx={{
                  padding: "10px 50px",
                  marginTop: "10px",
                }}
              >
                {hallIsLoading || diningIsLoading || userIsLoading
                  ? "Loading..."
                  : "Submit"}
              </Button>
            </Grid2>
          </Grid2>
        </HmForm>
      )}
    </HmModal>
  );
};

export default AdminModal;

/* eslint-disable @typescript-eslint/no-explicit-any */
import HmDatePicker from "@/components/Form/HmDatePicker";
import HmFileUploader from "@/components/Form/HmFileUploader";
import HmForm from "@/components/Form/HmForm";
import HmInput from "@/components/Form/HmInput";
import HmOptionSelect from "@/components/Form/HmSelectField";
import HmFullScreenModal from "@/components/Shared/HmModal/HmFullScreenModal";
import { BloodGroup, Gender } from "@/constant/common.constant";
import { useCreateManagerMutation } from "@/redux/api/managerApi";
import { modifyPayload } from "@/utils/modifyPayload";
import { Button, Grid2 } from "@mui/material";
import React from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const StudentModal = ({ open, setOpen }: TProps) => {
  const [createManager] = useCreateManagerMutation();

  const handleFormSubmit = async (value: FieldValues) => {
    const data = modifyPayload(value, "managerData");
    console.log("got valuessssssssss", data);
    try {
      const res = await createManager(data).unwrap();
      if (res?.id) {
        toast.success("Manager created Successfully!!");
        setOpen(false);
      }
    } catch (error: any) {
      console.log(error?.message);
    }
  };

  return (
    <HmFullScreenModal open={open} setOpen={setOpen} title="Add Manager">
      <HmForm onSubmit={handleFormSubmit}>
        <Grid2
          container
          spacing={3}
          justifyContent="center"
          alignItems="center"
        >
          <Grid2 size={3}>
            <HmInput name="managerData.name.firstName" label="First Name" />
          </Grid2>
          <Grid2 size={3}>
            <HmInput name="managerData.name.middleName" label="Middle Name" />
          </Grid2>
          <Grid2 size={3}>
            <HmInput name="managerData.name.lastName" label="Last Name" />
          </Grid2>

          <Grid2 size={3}>
            <HmOptionSelect
              items={Gender}
              name="studentData.gender"
              label="Select Your Gender"
              fullWidth={true}
              sx={{ width: "75%" }}
            ></HmOptionSelect>
          </Grid2>

          <Grid2 size={6}>
            <HmInput name="managerData.contactNumber" label="Contact Number" />
          </Grid2>
          <Grid2 size={6}>
            <HmInput name="managerData.email" label="Email" />
          </Grid2>
          <Grid2 size={6}>
            <HmInput
              name="managerData.emergencyContactNo"
              label="Emergency Contact Number"
            />
          </Grid2>

          <Grid2 size={6}>
            <HmInput
              name="managerData.bloodGroup"
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

          <Grid2 size={5}>
            <HmDatePicker
              name="managerData.birthOfDate"
              label="Date of Birth"
            />
          </Grid2>

          <Grid2 size={5}>
            <HmOptionSelect
              items={BloodGroup}
              name="studentData.gender"
              label="Select Your Gender"
              fullWidth={true}
              sx={{ width: "95%" }}
            ></HmOptionSelect>
          </Grid2>

          <Grid2 size={6}>
            <HmFileUploader name="file" label="Upload File" />
          </Grid2>

          <Grid2 size={12}>
            <Button
              type="submit"
              sx={{
                padding: "10px 50px",
                marginTop: "10px",
                position: "absolute",
                right: 20,
                bottom: 20,
              }}
            >
              Submit
            </Button>
          </Grid2>
        </Grid2>
      </HmForm>
    </HmFullScreenModal>
  );
};

export default StudentModal;

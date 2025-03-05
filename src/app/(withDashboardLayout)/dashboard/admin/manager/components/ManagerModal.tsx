/* eslint-disable @typescript-eslint/no-explicit-any */
import HmFileUploader from "@/components/Form/HmFileUploader";
import HmForm from "@/components/Form/HmForm";
import HmInput from "@/components/Form/HmInput";
import HmOptionSelect from "@/components/Form/HmSelectField";
import HmModal from "@/components/Shared/HmModal/HmModal";
import { BloodGroup, Gender } from "@/constant/common.constant";
import { useCreateManagerMutation } from "@/redux/api/managerApi";
import { modifyPayload } from "@/utils/modifyPayload";
import { Button, Grid2 } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import React from "react";
import { Controller, FieldValues, useFormContext } from "react-hook-form";
import { toast } from "sonner";

type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const ManagerModal = ({ open, setOpen }: TProps) => {
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
    <HmModal open={open} setOpen={setOpen} title="Add Manager">
      <HmForm onSubmit={handleFormSubmit}>
        <Grid2 container spacing={2}>
          <Grid2 size={6}>
            <HmInput name="managerData.name.firstName" label="First Name" />
          </Grid2>
          <Grid2 size={6}>
            <HmInput name="managerData.name.middleName" label="Middle Name" />
          </Grid2>
          <Grid2 size={6}>
            <HmInput name="managerData.name.lastName" label="Last Name" />
          </Grid2>

          <Grid2 size={5}>
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
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer
                components={["DatePicker"]}
                sx={{ paddingTop: "0", width: "97%", paddingLeft: "6px" }}
              >
                <Controller
                  name="studentData.dateOfBirth"
                  control={useFormContext()?.control}
                  defaultValue={dayjs()} // Ensure a default value is set
                  render={({ field }) => (
                    <DatePicker
                      {...field}
                      label="Date of Birth"
                      value={field.value || dayjs()} // Ensure the value is set correctly
                      slotProps={{
                        textField: {
                          size: "small",
                        },
                      }}
                      onChange={(date) => field.onChange(date)} // Correctly handle the onChange
                    />
                  )}
                />
              </DemoContainer>
            </LocalizationProvider>
          </Grid2>

          <Grid2 size={5}>
            <HmOptionSelect
              items={BloodGroup}
              name="studentData.gender"
              label="Select Your Gender"
              fullWidth={true}
              sx={{ width: "75%" }}
            ></HmOptionSelect>
          </Grid2>

          <Grid2 size={6}>
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
    </HmModal>
  );
};

export default ManagerModal;

/* eslint-disable @typescript-eslint/no-explicit-any */
import HmDatePicker from "@/components/Form/HmDatePicker";
import HmFileUploader from "@/components/Form/HmFileUploader";
import HmForm from "@/components/Form/HmForm";
import HmInput from "@/components/Form/HmInput";
import HmSelectField from "@/components/Form/HmSelectField";
import HmFullScreenModal from "@/components/Shared/HmModal/HmFullScreenModal";
import { BloodGroup, Gender } from "@/constant/common.constant";
// import { useCreateManagerMutation } from "@/redux/api/managerApi";
import { registerStudent } from "@/services/actions/registerStudent";
import { modifyPayload } from "@/utils/modifyPayload";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Divider, Grid2, Typography } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import React from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

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
    dateOfBirth: Dayjs;
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

const studentRegisterValidationSchema = z.object({
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(20, "Password must be at most 20 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[@$!%*?&]/, "Password must contain at least one special character"),

  studentData: z.object({
    email: z
      .string()
      .email("Invalid email address")
      .min(1, "Email is required"),

    name: z.object({
      firstName: z.string().min(1, "First name is required"),
      middleName: z.string().min(1, "Middle name is required"),
      lastName: z.string().min(1, "Last name is required"),
    }),

    gender: z.string().min(1, "Gender is required"),

    // dateOfBirth: z
    //   .instanceof(Dayjs)
    //   .refine((date) => date.isValid(), {
    //     message: "Date of birth is required",
    //   })
    //   .nullable(),

    phoneNumber: z
      .string()
      .min(10, "Phone number must be at least 10 digits")
      .max(15, "Phone number must not exceed 15 digits")
      .regex(/^\d{11}$/, "Phone number must only contain digits"),

    roomNumber: z.string().min(1, "Room number is required"),
    seatNumber: z.string().min(1, "Seat number is required"),
    session: z.string().min(1, "Session is required"),
    classRoll: z.string().min(1, "Class roll is required"),

    admissionDetails: z.object({
      admissionFee: z.string().min(1, "Admission fee is required"),
    }),

    emergencyContact: z
      .string()
      .min(10, "Emergency contact number must be at least 10 digits")
      .max(15, "Emergency contact number must not exceed 15 digits")
      .regex(/^\d+$/, "Emergency contact number must only contain digits"),

    guardian: z.object({
      fatherName: z.string().min(1, "Father's name is required"),
      fatherOccupation: z.string().min(1, "Father's occupation is required"),
      fatherContactNo: z
        .string()
        .min(11, "Father's contact number must be at least 10 digits")
        .max(11, "Father's contact number must not exceed 15 digits")
        .regex(/^\d{11}$/, "Father's contact number must only contain digits"),

      motherName: z.string().min(1, "Mother's name is required"),
      motherOccupation: z.string().min(1, "Mother's occupation is required"),
      motherContactNo: z
        .string()
        .min(11, "Mother's contact number must be at least 10 digits")
        .max(11, "Mother's contact number must not exceed 15 digits")
        .regex(/^\d{11}$/, "Mother's contact number must only contain digits"),
    }),

    presentAddress: z.object({
      division: z.string().min(1, "Division is required"),
      district: z.string().min(1, "District is required"),
      subDistrict: z.string().min(1, "Sub-district is required"),
      alliance: z.string().min(1, "Alliance is required"),
      village: z.string().min(1, "Village is required"),
    }),

    permanentAddress: z.object({
      division: z.string().min(1, "Division is required"),
      district: z.string().min(1, "District is required"),
      subDistrict: z.string().min(1, "Sub-district is required"),
      alliance: z.string().min(1, "Alliance is required"),
      village: z.string().min(1, "Village is required"),
    }),

    bloodGroup: z
      .string()
      .min(1, "Blood group is required")
      .refine(
        (val) =>
          ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].includes(val),
        {
          message: "Invalid blood group",
        }
      ),
  }),
});

const studentRegisterDefaultValues = {
  password: "",
  studentData: {
    name: {
      firstName: "",
      middleName: "",
      lastName: "",
    },
    gender: "",
    dateOfBirth: dayjs(),
    phoneNumber: "",
    email: "",
    roomNumber: "",
    seatNumber: "",
    session: "",
    classRoll: "",
    admissionDetails: {
      admissionFee: "",
    },
    emergencyContact: "",
    guardian: {
      fatherName: "",
      fatherOccupation: "",
      fatherContactNo: "",
      motherName: "",
      motherOccupation: "",
      motherContactNo: "",
    },
    presentAddress: {
      division: "",
      district: "",
      subDistrict: "",
      alliance: "",
      village: "",
    },
    permanentAddress: {
      division: "",
      district: "",
      subDistrict: "",
      alliance: "",
      village: "",
    },
    bloodGroup: "",
  },
};

type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const StudentModal = ({ open, setOpen }: TProps) => {
  //   const handleFormSubmit = async (value: FieldValues) => {
  //     const data = modifyPayload(value, "managerData");
  //     console.log("got valuessssssssss", data);
  //     try {
  //       const res = await createManager(data).unwrap();
  //       if (res?.id) {
  //         toast.success("Manager created Successfully!!");
  //         setOpen(false);
  //       }
  //     } catch (error: any) {
  //       console.log(error?.message);
  //     }
  //   };

  const handleStudentRegistration = async (values: FieldValues) => {
    const data = modifyPayload(values, "studentData");
    console.log("dataaaaaaaaaaa", data);

    try {
      const res = await registerStudent(data);
      if (res?.data?.id) {
        toast.success(res?.message);
      }
      console.log("ressssssssssssssssss", res);
    } catch (error) {
      console.log("errorrrrrrrrr", error);
    }
  };

  return (
    <HmFullScreenModal open={open} setOpen={setOpen} title="Add Student">
      <HmForm
        onSubmit={handleStudentRegistration}
        resolver={zodResolver(studentRegisterValidationSchema)}
        defaultValues={studentRegisterDefaultValues}
      >
        <Grid2 container spacing={3} paddingX={12} paddingY={2}>
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
            <HmInput name="password" label="Password" type="password" />
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
            <HmInput name="studentData.session" label="Session" />
          </Grid2>
          <Grid2 size={3}>
            <HmInput name="studentData.classRoll" label="Class Roll" />
          </Grid2>
          <Grid2 size={3}>
            <HmInput
              name="studentData.admissionDetails.admissionFee"
              label="Admission Fee"
            />
          </Grid2>
          <Grid2 size={3}>
            <HmInput
              name="studentData.emergencyContact"
              label="Emergency Contact"
            />
          </Grid2>

          <Grid2 size={3}>
            <HmFileUploader
              name="file"
              label="Add Photo"
              sx={{ width: "100%" }}
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

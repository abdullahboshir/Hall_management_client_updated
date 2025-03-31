/* eslint-disable @typescript-eslint/no-explicit-any */
import HmDatePicker from "@/components/Form/HmDatePicker";
import HmFileUploader from "@/components/Form/HmFileUploader";
import HmForm from "@/components/Form/HmForm";
import HmInput from "@/components/Form/HmInput";
import HmSelectField from "@/components/Form/HmSelectField";
import HmFullScreenModal from "@/components/Shared/HmModal/HmFullScreenModal";
import {
  BloodGroup,
  Department,
  Faculty,
  Gender,
} from "@/constant/common.constant";
import { useGetAllDiningsQuery } from "@/redux/api/diningApi";
import { useGetAllHallsQuery } from "@/redux/api/hallApi";
import {
  useCreateStudentMutation,
  useGetSingleUserQuery,
} from "@/redux/api/userApi";
import { modifyPayload } from "@/utils/modifyPayload";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Divider, Grid2, Typography } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
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
    academicFaculty: z.string().min(1, "Academic Faculty is required"),
    academicDepartment: z.string().min(1, "Academic Department is required"),
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
    academicFaculty: "",
    academicDepartment: "",
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

  const { data: userData, isLoading: userIsLoading } = useGetSingleUserQuery(
    {}
  );
  const { data: hallData, isLoading: hallIsLoading } = useGetAllHallsQuery({});
  const { data: diningData, isLoading: diningIsLoading } =
    useGetAllDiningsQuery({});

  const [createStudent] = useCreateStudentMutation();

  const handleStudentRegistration = async (values: FieldValues) => {
    if (hallIsLoading || diningIsLoading || userIsLoading) {
      toast.error("Please wait, data is still loading...");
      return;
    }

    if (!hallData || !diningData || !userData?.id) {
      toast.error("Failed to fetch required data. Please try again.");
      return;
    }

    values.studentData.hall = hallData?._id;
    values.studentData.dining = diningData?._id;
    values.studentData.creator = userData?.id;
    const data = modifyPayload(values);

    try {
      const res = await createStudent(data).unwrap();

      if (res.id) {
        toast.success("Student has been created successfully");
        setOpen(false);
      }
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
              items={department}
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

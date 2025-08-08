 
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
import { useGetAllDiningQuery } from "@/redux/api/diningApi";
import { useGetAllHallsQuery } from "@/redux/api/hallApi";
import {
  useCreateStudentMutation,
  useGetSingleUserQuery,
} from "@/redux/api/userApi";
import { modifyPayload } from "@/utils/modifyPayload";
import { Button, Divider, Grid2, Typography } from "@mui/material";

import { useEffect, useState } from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

import { studentRegisterDefaultValues } from "../../../constants/student.constant";
import Spinner from "@/components/Shared/Spinner/Spinner";
import Progress from "@/components/Shared/Spinner/Progress";

type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const StudentModal = ({ open, setOpen }: TProps) => {
  const [error, setError] = useState("");
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
    useGetAllDiningQuery({});

  const [createStudent, { isLoading: isCreateStudentLoading }] =
    useCreateStudentMutation();

  const handleStudentRegistration = async (values: FieldValues) => {
    if (hallIsLoading || diningIsLoading || userIsLoading) {
      return <Spinner />;
    }
    
    if (!hallData || !diningData || !userData?.id) {
     return toast.error("Failed to fetch required data. Please try again.");;
    }

    
    values.studentData.hall = hallData?._id;
    values.studentData.dining = diningData?._id;
    values.studentData.createdBy = userData?._id;
    
    const data = modifyPayload(values);
 
    try {
      const res = await createStudent(data).unwrap();


      if (res[0]?.id) {
        toast.success("Student has been created successfully");
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

  return (
    <HmFullScreenModal
      open={open}
      setOpen={setOpen}
      setError={setError}
      title="Add Student"
    >
      <HmForm
        onSubmit={handleStudentRegistration}
        // resolver={zodResolver(studentRegisterValidationSchema)}
        defaultValues={studentRegisterDefaultValues()}
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

          <Grid2 size={6}>
            <Typography color="error.main">{error}</Typography>
          </Grid2>

          <Grid2 size={12} display="flex" justifyContent="end" width="100%">
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
              isCreateStudentLoading ? (
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
    </HmFullScreenModal>
  );
};

export default StudentModal;

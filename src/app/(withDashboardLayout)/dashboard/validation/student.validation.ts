import { z } from "zod";

export const studentRegisterValidationSchema = z.object({
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
      middleName: z.string().optional(),
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
        .max(11, "Mother's contact number exact 11 digits")
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

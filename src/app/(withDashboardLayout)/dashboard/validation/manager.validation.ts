import { z } from "zod";

export const managerValidaionSchema = z.object({
  password: z.string().min(6, "Password must be at least 6 characters long"),
  file: z.any().optional(),

  managerData: z.object({
    name: z.object({
      firstName: z.string().min(1, "First name is required"),
      middleName: z.string().optional(),
      lastName: z.string().min(1, "Last name is required"),
    }),
    phoneNumber: z
      .string()
      .min(10, "Contact number must be at least 10 digits")
      .max(15, "Contact number is too long"),
    email: z.string().email("Invalid email address"),
    emergencyContactNo: z
      .string()
      .min(10, "Emergency contact must be at least 10 digits")
      .max(15),
    bloodGroup: z.string().min(1, "Blood group is required"),
    presentAddress: z.string().min(1, "Present address is required"),
    permanentAddress: z.string().min(1, "Permanent address is required"),
    gender: z.string().min(1, "Gender is required"),
    dateOfBirth: z
      .any()
      .refine((val) => val && !isNaN(new Date(val).getTime()), {
        message: "Date of Birth is required",
      }),
  }),
});

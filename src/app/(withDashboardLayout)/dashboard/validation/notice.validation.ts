/* eslint-disable @typescript-eslint/no-explicit-any */
import dayjs from "dayjs";
import { z } from "zod";

// Zod validation schema
export const noticeValidationSchema = z.object({
  noticeData: z.object({
    audience: z.string().min(1, "Audience is required"),
    status: z.string().min(1, "Status is required"),
    priority: z.string().min(1, "Priority is required"),
    type: z.string().min(1, "Type is required"),

    schedule: z
      .union([
        z.string().min(1, "Schedule date is required"),
        z.custom((val: any) => dayjs(val).isValid(), {
          message: "Invalid schedule date",
        }),
      ])
      .optional(),
    expiryDate: z
      .union([
        z.string().optional(),
        z.custom((val: any) => dayjs(val).isValid(), {
          message: "Invalid expiry date",
        }),
      ])
      .optional(),

    location: z.string().optional(),
    attachments: z.array(z.any()).optional(),
    tags: z.array(z.string()).optional(),
    relatedNotices: z.array(z.string()).optional(),
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
  }),
});

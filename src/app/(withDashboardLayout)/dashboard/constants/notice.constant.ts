import dayjs from "dayjs";
import {
  NoticeAudience,
  NoticePriority,
  NoticeStatus,
  NoticeType,
} from "@/constant/common.constant";

// Default values for the form
export const noticeDefaultValues = {
  noticeData: {
    audience: NoticeAudience.length ? NoticeAudience[0] : "",
    status: NoticeStatus.length ? NoticeStatus[0] : "",
    priority: NoticePriority.length ? NoticePriority[0] : "",
    type: NoticeType ? NoticeType[0] : "",
    schedule: dayjs(), // ✅ Keep as a Day.js object
    expiryDate: dayjs().add(30, "days"),
    location: "",
    attachments: [],
    tags: [],
    relatedNotices: [],
    title: "",
    description: "",
  },
};

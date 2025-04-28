import dayjs from "dayjs";
import {
  NoticeAudience,
  NoticePriority,
  NoticeStatus,
  NoticeType,
  ScheduleType,
} from "@/constant/common.constant";

// Default values for the form
export const noticeDefaultValues = {
  noticeData: {
    audience: NoticeAudience.length ? NoticeAudience[0] : "",
    status: NoticeStatus.length ? NoticeStatus[0] : "",
    priority: NoticePriority.length ? NoticePriority[1] : "",
    noticeType: NoticeType.length ? NoticeType[0] : "",
    scheduleType: ScheduleType.length ? [ScheduleType[0]] : "",
    scheduleAt: dayjs(), // ✅ Keep as a Day.js object
    expiryDate: dayjs().add(30, "days"),
    attachments: [],
    tags: [],
    relatedNotices: [],
    title: "",
    description: "",
  },
};

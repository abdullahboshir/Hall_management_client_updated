// Interface for Notice Data
export interface NoticeData {
  audience: string;
  status: string;
  priority: string;
  type: string;
  scheduleAt: string;
  expiryDate?: string;
  location?: string;
  attachments?: File[];
  tags?: string[];
  relatedNotices?: string[];
  title: string;
  description: string;
}

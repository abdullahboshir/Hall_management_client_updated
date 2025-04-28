/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Notifications from "@/components/Shared/Notifications/Notifications";
import { useGetAllNoticesQuery } from "@/redux/api/noticeApi";

const NotificationsPage = () => {
  const { data, isLoading, refetch } = useGetAllNoticesQuery({});

  if (isLoading) {
    return "Loading...";
  }

  return (
    <div>
      <Notifications data={data} refetch={refetch} isLoading={isLoading} />
    </div>
  );
};

export default NotificationsPage;

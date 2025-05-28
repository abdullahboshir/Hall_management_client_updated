/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Notifications from "@/components/Shared/Notifications/Notifications";
import Spinner from "@/components/Shared/Spinner/Spinner";
import { useGetAllNoticesQuery } from "@/redux/api/noticeApi";
import { useState } from "react";

const NotificationsPage = () => {
  const [filters, setFilters] = useState({
    isAllNotication: true, 
    isPinned: false
  });
  const { data, isLoading, refetch } = useGetAllNoticesQuery(filters);


  if (isLoading) {
    return   <Spinner/>
  }

  return (
    <div>
      <Notifications data={data} refetch={refetch} isLoading={isLoading} setFilters={setFilters} />
    </div>
  );
};

export default NotificationsPage;

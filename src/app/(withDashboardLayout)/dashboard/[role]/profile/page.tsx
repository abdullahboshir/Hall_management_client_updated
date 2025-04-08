"use client";
import React from "react";
import Profile from "@/components/Shared/Profile/Profile";
import { useGetSingleUserQuery } from "@/redux/api/userApi";

const AdminProfile = () => {
  const { data, isLoading } = useGetSingleUserQuery({});
  console.log("dataaaaaaaaaaaaaaa", data);
  return (
    <>
      <Profile data={data} />
    </>
  );
};

export default AdminProfile;

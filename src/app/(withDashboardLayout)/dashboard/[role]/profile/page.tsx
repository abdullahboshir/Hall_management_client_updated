"use client";
import React from "react";
import Profile from "@/components/Shared/Profile/Profile";
import { useGetSingleUserQuery } from "@/redux/api/userApi";

const UserProfile = () => {
  const { data, isLoading } = useGetSingleUserQuery({});


  return <>{isLoading ? "Loading..." : <Profile data={data} />}</>;
};

export default UserProfile;

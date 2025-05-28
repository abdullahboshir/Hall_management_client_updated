"use client";
import React from "react";
import Profile from "@/components/Shared/Profile/Profile";
import { useGetSingleUserQuery } from "@/redux/api/userApi";
import Spinner from "@/components/Shared/Spinner/Spinner";

const UserProfile = () => {
  const { data, isLoading } = useGetSingleUserQuery({});


  return <>{isLoading ?   <Spinner/> : <Profile data={data} />}</>;
};

export default UserProfile;

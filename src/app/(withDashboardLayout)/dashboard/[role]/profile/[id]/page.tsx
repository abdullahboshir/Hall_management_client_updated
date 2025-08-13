"use client";
import React from "react";
import Profile from "@/components/Shared/Profile/Profile";
import { useGetSingleUserQuery } from "@/redux/api/userApi";
import Spinner from "@/components/Shared/Spinner/Spinner";
import { useGetSingleStudentQuery } from "@/redux/api/studentApi";
import { useParams } from "next/navigation";

const SelectedUserProfile = () => {
  const {id} = useParams();
  console.log('usessssssssssssssssssssssssssss11111111111111', id)
  const { data: studentData, isLoading: isStudentLoading } = useGetSingleStudentQuery(id);
  

  if(isStudentLoading) return <Spinner />;


  return <>{(isStudentLoading) ? <Spinner/> : <Profile data={studentData} />}</>;
};

export default SelectedUserProfile;

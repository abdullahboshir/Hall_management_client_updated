"use client";
import React from "react";
import MealDateCalender from "./MealDateCalender";
import ProfileDetails from "./ProfileDetails";
import { Box } from "@mui/material";
import { useGetAllDiningQuery } from "@/redux/api/diningApi";
import { useGetAllHallsQuery } from "@/redux/api/hallApi";
import { useGetSingleUserQuery } from "@/redux/api/userApi";
import { useGetSingleMealQuery } from "@/redux/api/mealApi";
import MiddleInformation from "./MiddleInformation";
import Spinner from "../Shared/Spinner/Spinner";
import { useParams } from "next/navigation";
import { useGetSingleStudentQuery } from "@/redux/api/studentApi";

const MealOverview = () => {
  const { id } = useParams();
  const { data: hallData, isLoading: isHallLoading } = useGetAllHallsQuery({});
  const { data: diningData, isLoading: isDiningLoading } =
    useGetAllDiningQuery({});

  const { data: userData, isLoading: userIsLoading } = useGetSingleUserQuery({});
  
  const {
    data: mealData,
    isLoading: isMealLoading,
    refetch,
  } = useGetSingleMealQuery<any>(userData?.meals || id);
  
  const { data: studentData, isLoading: isStudentLoading } = useGetSingleStudentQuery(mealData?.student?._id);

  if (userIsLoading || isMealLoading || isHallLoading || isDiningLoading || isStudentLoading) {
    return <Spinner />;
  }

  return (
    <Box
      display="flex"
      py={{ xs: 1, md: '.5vw' }}
      gap={{ xs: 2, md: 0 }}
      flexDirection={{ xs: 'column', md: 'row' }}
      justifyContent={{ xs: 'center', md: 'space-between' }}
    >
      <ProfileDetails data={studentData? studentData : userData} />

      <MiddleInformation
        mealData={mealData}
        refetch={refetch}
        isMealLoading={isMealLoading}
        hallData={hallData}
        diningData={diningData}
      />

      <MealDateCalender
        mealData={mealData}
        hallData={hallData}
        diningData={diningData}
        isMealLoading={isMealLoading}
        userIsLoading={userIsLoading}
        isHallLoading={isHallLoading}
        isDiningLoading
      />
    </Box>
  );
};

export default MealOverview;

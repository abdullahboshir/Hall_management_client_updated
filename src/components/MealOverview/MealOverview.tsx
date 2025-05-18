import React from 'react';
import MealDateCalender from './MealDateCalender';
import ProfileDetails from './ProfileDetails';
import { Box } from '@mui/material';
import { useGetAllDiningsQuery } from '@/redux/api/diningApi';
import { useGetAllHallsQuery } from '@/redux/api/hallApi';
import { useGetSingleUserQuery } from '@/redux/api/userApi';
import { useGetSingleMealQuery } from '@/redux/api/mealApi';
import MiddleInformation from './MiddleInformation';
import Spinner from '../Shared/Spinner/Spinner';

const MealOverview = () => {

        const { data: hallData, isLoading: isHallLoading } = useGetAllHallsQuery({});
        const { data: diningData, isLoading: isDiningLoading } = useGetAllDiningsQuery({});
    
      const { data: userData, isLoading: userIsLoading } = useGetSingleUserQuery({});
      const { data: mealData, isLoading: isMealLoading } =useGetSingleMealQuery<any>(userData?.meals);

      if(userIsLoading || isMealLoading || isHallLoading || isDiningLoading){
        return <Spinner/>
      }


    return (
        <Box display='flex' gap={2} p={2} justifyContent='space-between'>
            <ProfileDetails/>

            <MiddleInformation mealData={mealData} isMealLoading={isMealLoading} hallData={hallData}/>

            <MealDateCalender mealData={mealData} hallData={hallData} diningData={diningData} isMealLoading={isMealLoading} userIsLoading={userIsLoading} isHallLoading={isHallLoading} isDiningLoading/>
        </Box>
    );
};

export default MealOverview;
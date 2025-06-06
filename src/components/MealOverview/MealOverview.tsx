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
    
      const { data: userData, isLoading: userIsLoading, refetch: userRefetch } = useGetSingleUserQuery({});
      const { data: mealData, isLoading: isMealLoading, refetch } =useGetSingleMealQuery<any>(userData?.meals);

      React.useEffect(() => {userRefetch(), refetch()}, [userData, refetch, userRefetch]);

      
      if(userIsLoading || isMealLoading || isHallLoading || isDiningLoading){
        return <Spinner/>
      }


    return (
        <Box display='flex' gap={2} p={2} justifyContent='space-between'>
            <ProfileDetails/>

            <MiddleInformation mealData={mealData} refetch={refetch} isMealLoading={isMealLoading} hallData={hallData} diningData={diningData}/>

            <MealDateCalender mealData={mealData} hallData={hallData} diningData={diningData} isMealLoading={isMealLoading} userIsLoading={userIsLoading} isHallLoading={isHallLoading} isDiningLoading/>
        </Box>
    );
};

export default MealOverview;
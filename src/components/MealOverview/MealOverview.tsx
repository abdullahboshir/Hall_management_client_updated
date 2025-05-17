import React from 'react';
import MealDateCalender from './MealDateCalender';
import ProfileDetails from './ProfileDetails';
import { Box } from '@mui/material';
import Elevation from './MiddleInformation';
import DirectionStack from './MiddleInformation';

const MealOverview = () => {
    return (
        <Box display='flex' gap={2} p={2} justifyContent='space-between'>
            <ProfileDetails/>
            <DirectionStack/>
            <MealDateCalender/>
        </Box>
    );
};

export default MealOverview;
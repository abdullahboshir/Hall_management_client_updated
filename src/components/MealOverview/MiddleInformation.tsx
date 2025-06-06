"use client";

import * as React from "react";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import {
  Box,
  Button,
  Grid2,
  Typography,
} from "@mui/material";
import { currentDateBD } from "@/utils/currentDateBD";
import { calculateTotalmaintenanceFee } from "../Dining/calculateTotalmaintenanceFee";
import MealLoader from "./MealLoader";
import NotificationSlider from "./NotificationSlider";
import MealScheduleDatePicker from "./MealScheduleDatePicker";
import HmModal from "../Shared/HmModal/HmModal";


const ScrollBox = styled(Box)(() => ({
  overflowY: "scroll",
  height: "31.2vh",
  "&::-webkit-scrollbar": {
    width: "5px",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "#888",
    borderRadius: "4px",
  },
}));

export default function MiddleInformation({
  mealData,
  refetch,
  hallData,
  diningData,
}: any) {
  const [checked, setChecked] = React.useState(false);
  const [mealError, setMealError] = React.useState("");
  const [isScheduleMealOn, setIsScheduleMealOn] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const { currentMonth, currentYear } = currentDateBD();
  const baseMealObj = mealData?.mealInfo?.[currentYear]?.[currentMonth];
  const { monthsWithZeroMaintenance } =
    calculateTotalmaintenanceFee(mealData);


  React.useEffect(() => {
    const intervalId = setInterval(() => {
      refetch();
    }, 2000);

    return () => clearInterval(intervalId);
  }, [mealData, refetch, diningData]);


  React.useEffect(() => {
    if (mealData?.mealStatus) {
      setChecked(mealData.mealStatus === "on");
    }

    if (
      baseMealObj?.currentDeposit < diningData?.diningPolicies?.minimumDeposit
    ) {
      setMealError("Your current Deposit is very low, Please Deposit");
    } else {
      setMealError(""); // Optional: Clear error if condition no longer met
    }
  }, [
    mealData,
    baseMealObj?.currentDeposit,
    diningData?.diningPolicies?.minimumDeposit,
  ]);



  const isMealOn = mealData?.mealStatus === "off" || !mealData?.mealStatus ? false : true;
  console.log(isMealOn, mealData)

  return (
    <Stack bgcolor="primary.light" borderRadius={3} width="40%">
      <Grid2 container spacing={1} p={2}>
        {/* Current Deposit */}
        <Grid2
          size={6}
          p={2}
          bgcolor="white"
          borderRadius={1}
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <Typography fontSize="1em" fontWeight="bold">
            Your Current Deposit is
          </Typography>
          <Typography fontSize="2vw" fontWeight="bold">
            {baseMealObj?.currentDeposit}TK
          </Typography>
        </Grid2>

        {/* Total Deposit */}
        <Grid2
          size={6}
          p={2}
          bgcolor="white"
          borderRadius={1}
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <Typography fontSize="1em" fontWeight="bold">
            Total Deposit is
          </Typography>
          <Typography fontSize="2vw" fontWeight="bold">
            {baseMealObj?.totalDeposit} TK
          </Typography>
        </Grid2>

        <Grid2 container size={12} gap={1}>
          <Grid2 size={4}>
            <ScrollBox bgcolor="white" borderRadius={1}>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                flexDirection="column"
                gap={2}
                p={2}
                px={2}
              >
                <Typography fontSize="1vw" fontWeight="bold">
                  Maintenance Fee
                </Typography>

                <Typography
                  fontSize="2vw"
                  fontWeight="bold"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  borderRadius={1}
                  boxShadow={5}
                  p={2}
                  width="100%"
                  color={
                    baseMealObj?.maintenanceFee <
                    hallData?.hallPolicies?.maintenanceCharge
                      ? "error.main"
                      : "green"
                  }
                >
                  {baseMealObj?.maintenanceFee <
                  hallData?.hallPolicies?.maintenanceCharge || !baseMealObj?.maintenanceFee
                    ? "DUE"
                    : "PAID"}
                </Typography>

                {Object.entries(monthsWithZeroMaintenance).map(
                  ([year, months], index) => (
                    <Box
                      key={index}
                      display="flex"
                      flexDirection="column"
                      alignItems="center"
                      width="100%"
                      borderRadius={1}
                      boxShadow={5}
                      p={2}
                    >
                      <Typography
                        fontWeight="bold"
                        fontSize="2vw"
                        color="error.main"
                      >
                        {year}
                      </Typography>

                      <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                      >
                        {months.map((month, i) => (
                          <Typography
                            key={i}
                            fontWeight="bold"
                            color="error.main"
                            fontSize="1em"
                          >
                            {month}
                          </Typography>
                        ))}
                      </Box>
                    </Box>
                  )
                )}
              </Box>
            </ScrollBox>
          </Grid2>

          <Grid2 size={4}>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              gap={1}
            >
              <Box
                p={2}
                bgcolor="white"
                borderRadius={1}
                display="flex"
                flexDirection="column"
                alignItems="center"
                width="100%"
              >
                <Typography fontSize="1em" fontWeight="bold">
                  Regular Meals
                </Typography>
                <Typography fontSize="2vw" fontWeight="bold">
                  {baseMealObj?.totalMeals}
                </Typography>
              </Box>

              <Box
                p={2}
                bgcolor="white"
                borderRadius={1}
                display="flex"
                flexDirection="column"
                alignItems="center"
                width="100%"
              >
                <Typography fontSize="1em" fontWeight="bold">
                  Total Cost
                </Typography>
                <Typography fontSize="2vw" fontWeight="bold">
                  {baseMealObj?.totalCost} TK
                </Typography>
              </Box>
            </Box>
          </Grid2>

          <Grid2 size={4}>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              gap={1}
            >
              <Box
                p={2}
                bgcolor="white"
                borderRadius={1}
                display="flex"
                flexDirection="column"
                alignItems="center"
                width="100%"
              >
                <Typography fontSize="1em" fontWeight="bold">
                  Special Meals
                </Typography>
                <Typography fontSize="2vw" fontWeight="bold">
                  {baseMealObj?.totalSpecialMeals}
                </Typography>
              </Box>

              <Box
                p={2}
                bgcolor="white"
                borderRadius={1}
                display="flex"
                flexDirection="column"
                alignItems="center"
                width="100%"
              >
                <Typography fontSize="1em" fontWeight="bold">
                  Refunded
                </Typography>
                <Typography fontSize="2vw" fontWeight="bold">
                  {baseMealObj?.refunded} TK
                </Typography>
              </Box>
            </Box>
          </Grid2>
        </Grid2>

        <Grid2 size={12} container>
          <Grid2 size={4}>
            <Box
              display="flex"
              width="100%"
              // height="100%"
              justifyContent="center"
              alignItems="center"
              bgcolor="white"
              p={2}
              borderRadius={2}
            >
              <Box>
                <MealLoader isOn={isMealOn} />
              </Box>
            </Box>
          </Grid2>

          <Grid2 size={8}>
  <HmModal open={open} setOpen={setOpen} title={`Meal ${isScheduleMealOn.toUpperCase()} Schedule`}>
    <MealScheduleDatePicker isScheduleMealOn={isScheduleMealOn}/>
    </HmModal>
            <Box
          onClick={() => setOpen(!open)}
           sx={{cursor: 'pointer'}}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              bgcolor="white"
              borderRadius={2}
              p={1}
              mb={1}
            >
            <Button size="small" onClick={() => setIsScheduleMealOn('on')}>ON</Button>

              <Typography fontWeight="bold">
              Meal Schedule 
              </Typography>
                    {/* <Box width='100%' display='flex' justifyContent='space-between'> 
           </Box> */}
             <Button onClick={() => setIsScheduleMealOn('off')} size="small" sx={{bgcolor: '#fe5c00'}}>OFF</Button>
            </Box>

   <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        bgcolor="white"
        borderRadius={2}
        px={1}
        height='52%'
      >
        {/* <Typography fontSize='1vw' fontWeight="bold" padding={3}>
          This is Notification Slider, which is running
        </Typography> */}

        <NotificationSlider />
      </Box>
      
          </Grid2>
        </Grid2>

        <Grid2 size={12}>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            bgcolor="white"
            borderRadius={2}
            p={2}
          >
            {mealError ? (
              <Typography color="error.main" fontWeight="bold">
                {mealError}
              </Typography>
            ) : (
              <Typography color="green" fontWeight="bold">
                You have Healthy Deposit
              </Typography>
            )}
          </Box>
        </Grid2>
      </Grid2>
    </Stack>
  );
}

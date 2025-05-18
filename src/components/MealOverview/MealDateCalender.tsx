"use client";

import * as React from "react";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { DayCalendarSkeleton } from "@mui/x-date-pickers/DayCalendarSkeleton";
import {
  Box,
  FormControlLabel,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import {useUpdateMealStatusMutation} from "@/redux/api/mealApi";
import { currentDateBD } from "@/utils/currentDateBD";
import { toast } from "sonner";
import { MealToggleSwitch } from "./MealToggleSwitch";
import { MealDay } from "./MealDay";
import { calculateTotalmaintenanceFee } from "../Dining/calculateTotalmaintenanceFee";


const today = dayjs();



export default function MealDateCalendar({mealData, hallData, diningData, isMealLoading, userIsLoading, isHallLoading, isDiningLoading}: any) {
  const [mealDays, setMealDays] = React.useState<number[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [currentViewDate, setCurrentViewDate] = React.useState<Dayjs>(today);
  const [checked, setChecked] = React.useState(false);

  const { currentMonth, currentYear } = currentDateBD();


  const [updateMealStatus] = useUpdateMealStatusMutation();

      const baseMealObj = mealData?.mealInfo?.[currentYear]?.[currentMonth];

  React.useEffect(() => {
    if (!mealData || !currentViewDate) return;

    const monthName = currentViewDate.format("MMMM");
    const yearStr = currentViewDate.format("YYYY");

    const mealHistory: Record<string, number> =
      mealData?.mealInfo?.[yearStr]?.[monthName]?.dailyMealHistory || {};

    const activeDays = Object.entries(mealHistory)
      .filter(([_, value]) => value === 1)
      .map(([day]) => Number(day));

    setMealDays(activeDays);
  }, [mealData, currentViewDate]);

  const handleMonthChange = (date: Dayjs) => {
    setIsLoading(true);
    setCurrentViewDate(date);
    setTimeout(() => setIsLoading(false), 300);
  };


  // Set initial toggle state from server
  React.useEffect(() => {
    if (mealData?.mealStatus) {
      setChecked(mealData.mealStatus === "on");
    }
  }, [mealData]);



  const handleToggleChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newChecked = event.target.checked;



    if(baseMealObj?.currentDeposit < diningData?.diningPolicies?.minimumDeposit || baseMealObj?.maintenanceFee < hallData?.hallPolicies?.maintenanceCharge ){
      return toast.message('You need to deposite')
    }

    setChecked(newChecked);

    if (mealData?._id) {
      const updatedMealStatus = newChecked ? "on" : "off";
      const mealPayload = {
        id: mealData._id,
        body: { mealStatus: updatedMealStatus },
      };

      try {
        const res = await updateMealStatus(mealPayload).unwrap();
        if (res?.id) {
          toast.success(`Meal is ${res?.mealStatus}`);
        }
      } catch (error: any) {
        console.error("Error updating meal status:", error);
        toast.error(error?.data);
      }
    }
  };


      const {monthsWithZeroMaintenance, monthsArray} = calculateTotalmaintenanceFee(mealData)
      

  return (
    <Stack bgcolor="primary.light" p={2} borderRadius={2}>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        bgcolor="white"
        borderRadius={2}
        p={3}
      >
        <FormControlLabel
          control={
            <MealToggleSwitch checked={checked} onChange={handleToggleChange} />
          }
          label=""
        />
        <Typography fontWeight="bold">
          Toggle to Meal {checked ? "OFF" : "ON"}
        </Typography>
      </Box>


     <Box bgcolor="white" borderRadius={2} my={2} position="relative" display='flex' flexDirection='column' alignItems='center'>

     
          <Tooltip
  title={
    <Box>
      {Object.entries(monthsWithZeroMaintenance).map(
        ([year, months], index) => (
          <Box key={index} mb={0.5}>
            <Typography variant="caption" fontWeight="bold" display="block">
              {year}:
            </Typography>
            <Typography variant="caption" display="block">
              {months.map((month, i) => (
                <span key={i}>
                  {month}
                  {i !== months.length - 1 && " | "}
                </span>
              ))}
            </Typography>
          </Box>
        )
      )}
    </Box>
  }
  arrow
>
  <Box
    display="flex"
    alignItems="center"
    justifyContent="space-between"
    width="100%"
    gap={2}
    px={1}
    pt={1}
  >
    {/* Paid / Unpaid */}
    <Typography>
      {mealData && mealData.mealInfo[currentYear] ? (
        mealData.mealInfo[currentYear][currentMonth]?.maintenanceFee ===
        mealData.student.hall?.hallPolicies?.maintenanceCharge ? (
          <Typography color="success.main" component="span">
            Paid
          </Typography>
        ) : (
          <Typography color="error.main" component="span">
            Unpaid
          </Typography>
        )
      ) : (
        ""
      )}{" "}
      - {mealData.student.hall.hallPolicies.maintenanceCharge}
    </Typography>

    {/* Due and months list */}
    <Typography
      color={
        mealData.mealInfo[currentYear][currentMonth]?.dueMaintenanceFee > 0
          ? "error.main"
          : "textSecondary"
      }
    >
      DUE -{" "}
      {mealData.mealInfo[currentYear][currentMonth]?.dueMaintenanceFee} |{" "}
      {monthsArray.map((data, index) => (
        <span key={index}>
          {data?.month.slice(0, 3)}
          {index !== monthsArray.length - 1 && " | "}
        </span>
      ))}
    </Typography>
  </Box>
</Tooltip>

  







  <LocalizationProvider dateAdapter={AdapterDayjs}>
    {/* DUE in center of calendar box */}
    <Box
      position="absolute"
      top="10%"
      left="58%"
      sx={{
        transform: "translate(-50%, -50%)",
        zIndex: 10,
        pointerEvents: "none",
      }}
    >

          {/* <Typography color={baseMealObj?.maintenanceFee > 0? 'green' : 'red'} fontSize={15}fontWeight="bold">
                   {baseMealObj?.maintenanceFee > 0? 'PAID' : 'DUE'}
                  </Typography> */}
    </Box>

    {/* Calendar */}
    <DateCalendar
      value={null}
      loading={isLoading || isMealLoading || userIsLoading}
      onMonthChange={handleMonthChange}
      renderLoading={() => <DayCalendarSkeleton />}
      slots={{ day: MealDay }}
      slotProps={{
        day: {
          mealDays,
        } as any,
      }}
    />
  </LocalizationProvider>
</Box>



      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        bgcolor="white"
        borderRadius={2}
      >
        <Typography variant="h5" fontWeight="bold" padding={2}>
          Total Meals -{" "}
          {mealData?.mealInfo?.[currentYear]?.[currentMonth]?.totalMeals}
        </Typography>
      </Box>
    </Stack>
  );
}

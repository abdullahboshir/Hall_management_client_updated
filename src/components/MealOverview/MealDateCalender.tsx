"use client";
import * as React from "react";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { DayCalendarSkeleton } from "@mui/x-date-pickers/DayCalendarSkeleton";
import { Box, FormControlLabel, IconButton, Stack, Typography } from "@mui/material";
import { useUpdateMealStatusMutation } from "@/redux/api/mealApi";
import { currentDateBD } from "@/utils/currentDateBD";
import { toast } from "sonner";
import AddCardIcon from "@mui/icons-material/AddCard";
import { MealToggleSwitch } from "./MealToggleSwitch";
import { MealDay } from "./MealDay";
import DiningModal from "@/app/(withCommonLayout)/dining/components/DiningModal";

const today = dayjs();

export default function MealDateCalendar({
  mealData,
  hallData,
  diningData,
  isMealLoading,
  userIsLoading,
}:any) {
  const [mealDays, setMealDays] = React.useState<number[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
      const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
      const [mealSelectedId, setMealSelectedId] = React.useState(null);
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

const activeDays = Object.entries(mealHistory).reduce<number[]>((acc, [day, value]) => {
  if (value === 1) acc.push(Number(day));
  return acc;
}, []);

setMealDays(activeDays);

  }, [mealData, currentViewDate]);

  const handleMonthChange = (date: Dayjs) => {
    setIsLoading(true);
    setCurrentViewDate(date);
    setTimeout(() => setIsLoading(false), 300);
  };

 
  React.useEffect(() => {
    if (mealData?.mealStatus) {
      setChecked(mealData.mealStatus === "on");
    }
  }, [mealData]);

  const handleToggleChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newChecked = event.target.checked;

    if (
      baseMealObj?.currentDeposit <
        diningData?.diningPolicies?.minimumDeposit ||
      baseMealObj?.maintenanceFee < hallData?.hallPolicies?.maintenanceCharge
    ) {
      return toast.message("You need to deposite");
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
      } catch (error:any) {
        console.error("Error updating meal status:", error);
        toast.error(error?.data);
      }
    }
  };

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

      <Box
        bgcolor="white"
        borderRadius={2}
        my={1}
        position="relative"
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
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
                    p={1}
                  >
      
                <IconButton
                  onClick={() => {
                    setIsModalOpen(true);
                    setMealSelectedId(mealData?._id);
                  }}
                  aria-label="delete"
                >
               <Typography px={2} fontWeight='bold'>Add to Deposit</Typography>  <AddCardIcon />
                </IconButton>
      
      
            <Stack>
              <DiningModal
                open={isModalOpen}
                setOpen={setIsModalOpen}
                mealId={mealSelectedId}
              />
            </Stack>
      
                  </Box>
    </Stack>
  );
}

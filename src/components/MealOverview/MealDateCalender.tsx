import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import Badge from '@mui/material/Badge';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { PickersDay, PickersDayProps } from '@mui/x-date-pickers/PickersDay';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { DayCalendarSkeleton } from '@mui/x-date-pickers/DayCalendarSkeleton';
import { Box, Stack, Typography } from '@mui/material';
import FlatwareIcon from '@mui/icons-material/Flatware';

import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import { useGetSingleUserQuery } from '@/redux/api/userApi';
import { useGetSingleMealQuery } from '@/redux/api/mealApi';
import { currentDateBD } from '@/utils/currentDateBD';

const today = dayjs();

function MealDay(
  props: PickersDayProps<Dayjs> & {
    mealDays?: number[];
  }
) {
  const { mealDays = [], day, outsideCurrentMonth, ...other } = props;
  const isMealDay = !outsideCurrentMonth && mealDays.includes(day.date());

  return (
    <Badge
      key={day.toString()}
      overlap="circular"
      badgeContent={
        isMealDay ? (
          <FlatwareIcon sx={{ color: 'orange', fontSize: 16 }} />
        ) : undefined
      }
    >
      <PickersDay
        {...other}
        day={day}
        selected={false}
        outsideCurrentMonth={outsideCurrentMonth}
        sx={{
          ...(isMealDay && {
            bgcolor: 'primary.main',
            color: 'white',
            '&:hover': {
              bgcolor: 'primary.dark',
            },
          }),
        }}
      />
    </Badge>
  );
}

export default function MealDateCalendar() {
  const [mealDays, setMealDays] = React.useState<number[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [currentViewDate, setCurrentViewDate] = React.useState<Dayjs>(today);

  const {currentMonth, currentYear} = currentDateBD()

  const { data: userData, isLoading: userIsLoading } = useGetSingleUserQuery({});
  const { data: mealData, isLoading: isMealLoading } = useGetSingleMealQuery<any>(
    userData?.meals
  );


    const [alignment, setAlignment] = React.useState('web');

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string,
  ) => {
    setAlignment(newAlignment);
  };


  React.useEffect(() => {
    if (!mealData || !currentViewDate) return;

    const monthName = currentViewDate.format('MMMM'); // "May"
    const yearStr = currentViewDate.format('YYYY');   // "2025"

    const mealHistory: Record<string, number> =
      mealData?.mealInfo?.[yearStr]?.[monthName]?.dailyMealHistory || {};

    const activeDays = Object.entries(mealHistory)
      .filter(([_, value]) => value === 1)
      .map(([day]) => Number(day));

    setMealDays(activeDays);
  }, [mealData, currentViewDate]);

  const handleMonthChange = (date: Dayjs) => {
    setIsLoading(true);
    setCurrentViewDate(date); // ✅ Sync selected calendar view

    setTimeout(() => setIsLoading(false), 300);
  };

  return (
    <Stack bgcolor="primary.light" p={2} borderRadius={2}>

      <Box display='flex' justifyContent='center' alignItems='center' bgcolor='white' borderRadius={2}>

        <Typography variant='h5' fontWeight='bold' padding={2}> Total Meals- {mealData?.mealInfo?.[currentYear]?.[currentMonth]?.totalMeals}</Typography>
        
        </Box>

      <Box bgcolor='white' borderRadius={2} my={2}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
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

               <Box display='flex' justifyContent='center' alignItems='center' bgcolor='white' borderRadius={2}>

    <ToggleButtonGroup
      color="primary"
      value={alignment}
      exclusive
      onChange={handleChange}
      aria-label="Platform"
      
    >
      <ToggleButton value="off"><Typography fontWeight='bold' fontSize={30}>OFF</Typography></ToggleButton>
      <ToggleButton value="on"><Typography fontWeight='bold' fontSize={30}>ON</Typography></ToggleButton>
      {/* <ToggleButton value="schedule"><Typography fontWeight='bold'>SCHEDULE</Typography></ToggleButton> */}
    </ToggleButtonGroup>
  
        </Box>
    </Stack>
  );
}

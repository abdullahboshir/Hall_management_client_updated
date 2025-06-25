'use client';

import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { useAddMealSheduleMutation } from '@/redux/api/mealApi';
import { toast } from 'sonner';

export default function MealScheduleDatePicker({isScheduleMealOn}: any) {
  const [selectedDate, setSelectedDate] = React.useState<Dayjs | null>(dayjs());

    const [addMealShedule] = useAddMealSheduleMutation()

  const handleDateChange = (newDate: Dayjs | null) => {
    setSelectedDate(newDate);
  };

  const handleSubmit = async (acceptedDate: Dayjs | null) => {
    if (!acceptedDate) return;

    const body = {
      acceptedDate, 
      isScheduleMealOn
    }

        try {
          const res = await addMealShedule({ body }).unwrap();
          if (res?.id) {
            toast.success("Your Password Change has been Successfully!!");
          }
        } catch (error) {
          console.log("got errorrrrrrrrrrrrrrrrrr", error);
        }
    console.log('Submitted date:', acceptedDate.format('YYYY-MM-DD'));
 

  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <StaticDatePicker
        orientation="landscape"
        value={selectedDate}
        onChange={handleDateChange}
        onAccept={handleSubmit}
        minDate={dayjs()}
      />
    </LocalizationProvider>
  );
}

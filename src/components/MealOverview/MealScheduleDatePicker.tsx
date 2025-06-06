'use client';

import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';

export default function MealScheduleDatePicker({isScheduleMealOnly}: any) {
  const [selectedDate, setSelectedDate] = React.useState<Dayjs | null>(dayjs());

  const handleDateChange = (newDate: Dayjs | null) => {
    setSelectedDate(newDate);
  };

  const handleSubmit = (acceptedDate: Dayjs | null) => {
    if (!acceptedDate) return;
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

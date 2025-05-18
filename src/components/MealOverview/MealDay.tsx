import Badge from "@mui/material/Badge";
import { PickersDay, PickersDayProps } from "@mui/x-date-pickers/PickersDay";
import FlatwareIcon from "@mui/icons-material/Flatware";
import { Dayjs } from "dayjs";

export const MealDay = (
  props: PickersDayProps<Dayjs> & {
    mealDays?: number[];
  }
) => {
  const { mealDays = [], day, outsideCurrentMonth, ...other } = props;
  const isMealDay = !outsideCurrentMonth && mealDays.includes(day.date());

  return (
    <Badge
      key={day.toString()}
      overlap="circular"
      badgeContent={
        isMealDay ? (
          <FlatwareIcon sx={{ color: "orange", fontSize: 16 }} />
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
            bgcolor: "primary.main",
            color: "white",
            "&:hover": {
              bgcolor: "primary.dark",
            },
          }),
        }}
      />
    </Badge>
  );
}
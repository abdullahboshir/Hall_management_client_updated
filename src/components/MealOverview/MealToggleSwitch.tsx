import {
  styled,
  Switch,
} from "@mui/material";

export const MealToggleSwitch = styled(Switch)(({ theme }) => ({
  width: 80,
  padding: 1,
  "& .MuiSwitch-track": {
    borderRadius: 50 / 2,
    backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
    position: "relative",
    "&::before, &::after": {
      content: '"OFF"',
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      fontSize: 15,
      fontWeight: "bold",
      color: theme.palette.common.white,
      transition: "all 0.3s ease",
    },
    "&::before": {
      content: '"ON"',
      left: 10,
      opacity: 0,
    },
    "&::after": {
      content: '"OFF"',
      right: 10,
      opacity: 1,
    },
  },
  "& .Mui-checked + .MuiSwitch-track": {
    backgroundColor: theme.palette.primary.main,
    "&::before": {
      opacity: 1,
    },
    "&::after": {
      opacity: 0,
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "none",
    width: 28,
    height: 28,
  },
  "& .MuiSwitch-switchBase": {
    padding: 5,
    "&.Mui-checked": {
      transform: "translateX(41px)",
    },
  },
}));
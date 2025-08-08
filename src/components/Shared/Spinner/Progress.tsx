import * as React from "react";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";


function GradientCircularProgress() {
  return (
    <React.Fragment>
      <svg width={0} height={0}>
        <defs>
          <linearGradient id="my_gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#e91e63" />
            <stop offset="100%" stopColor="#aed581" />
          </linearGradient>
        </defs>
      </svg>
      <CircularProgress
        // size={{ xs: 10, sm: 10, md: 10 }}
        sx={{ "svg circle": { stroke: "url(#my_gradient)" } }}
      />
    </React.Fragment>
  );
}

export default function Progress() {
  return (
    <Stack sx={{ flexGrow: 1 }} alignItems={"center"} justifyContent={"center"}>
      <GradientCircularProgress />
    </Stack>
  );
}

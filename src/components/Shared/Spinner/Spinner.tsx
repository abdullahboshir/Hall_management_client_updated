import * as React from "react";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";

// From https://github.com/mui/material-ui/issues/9496#issuecomment-959408221
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
        size={{ xs: 30, sm: 40, md: 50 }}
        sx={{ "svg circle": { stroke: "url(#my_gradient)" } }}
      />
    </React.Fragment>
  );
}

export default function Spinner() {
  return (
    <Stack 
      width='100%' 
      height={{ xs: '50vh', sm: '100vh' }} 
      display='flex' 
      alignItems='center' 
      justifyContent='center' 
      sx={{ flexGrow: 1 }}
    >
      <GradientCircularProgress />
    </Stack>
  );
}

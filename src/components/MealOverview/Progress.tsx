import { Box, CircularProgress, Typography } from '@mui/material';
import * as React from 'react';

export default function Progress() {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10));
    }, 800);

    return () => clearInterval(timer);
  }, []);

  return (
    <Box sx={{ position: 'relative', width: 80, height: 80 }}>
      {/* Slower, larger background spinner */}
      <CircularProgress
        thickness={3}
        size={80}
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          animationDuration: '2s',
        }}
      />

   
      <CircularProgress
        variant="determinate"
        value={progress}
        size={60}
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          marginTop: '-40px', // half of size (80 / 2)
          marginLeft: '-40px',
        }}
      />

      {/* Centered Text */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="h5" component="div" color="textSecondary" fontWeight="bold">
          ON
        </Typography>
      </Box>
    </Box>
  );
}

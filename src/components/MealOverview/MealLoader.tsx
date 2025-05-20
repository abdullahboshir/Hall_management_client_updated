'use client';

import { Box, CircularProgress, Typography } from '@mui/material';
import { styled } from '@mui/system';

const LoaderContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
});

const MealLoader = ({ isOn = true }: { isOn?: boolean }) => {
  const size = 8; // base size in vw
  const ringGap = 0.5; // ring gap in vw
  

  return (
    <LoaderContainer>
      <Box position="relative" width={`${size}vw`} height={`${size}vw`}>

    <CircularProgress
  size={`${size}vw`}
  thickness={1}
  sx={{
    color: isOn ? '#9370DB' : 'inherit',
    position: 'absolute',
    top: 0,
    left: 0,
  }}
  variant={isOn ? 'indeterminate' : 'determinate'} 
  value={isOn ? undefined : 100}
/>

        {/* Only animate other rings if isOn is true */}
        {isOn && (
          <>
            {/* Middle Ring */}
            <CircularProgress
              size={`${size - 2 * ringGap}vw`}
              thickness={1}
              sx={{
                color: '#BA55D3',
                position: 'absolute',
                top: `${ringGap}vw`,
                left: `${ringGap}vw`,
                animationDuration: '3s',
              }}
            />

            {/* Inner Ring */}
            <CircularProgress
              size={`${size - 4 * ringGap}vw`}
              thickness={1}
              sx={{
                color: '#FF00FF',
                position: 'absolute',
                top: `${2 * ringGap}vw`,
                left: `${2 * ringGap}vw`,
                animationDuration: '1.5s',
              }}
            />
          </>
        )}

        {/* Center Text */}
        <Box
          position="absolute"
          top={0}
          left={0}
          width="100%"
          height="100%"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Typography
            sx={{
              fontSize: `${size * 0.3}vw`,
              color: '#000',
              fontWeight: 700,
              textShadow: '0 0 4px rgba(255,255,255,0.4)',
            }}
          >
            {isOn ? 'ON' : 'OFF'}
          </Typography>
        </Box>
      </Box>
    </LoaderContainer>
  );
};

export default MealLoader;

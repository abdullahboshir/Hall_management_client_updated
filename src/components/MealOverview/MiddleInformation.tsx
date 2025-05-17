import * as React from 'react';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { Box, Grid2 } from '@mui/material';

const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function DirectionStack() {
  return (
    <Stack
      bgcolor="primary.light"
      borderRadius={3}
      height="100vh"
      width="40%"
      direction="row"
      spacing={2}
      display="flex"
      justifyContent="center"
    //   alignItems="center" // was alignContent, which is for wrapping
    >
      <Box>
        <Grid2 container spacing={1} sx={{ width: '100%' }} p={2}>
          <Grid2 size={{xs: 8,  md: 4}}>
            <Item>size=8</Item>
          </Grid2>
          <Grid2 size={{xs: 8,  md: 4}}>
            <Item>size=4</Item>
          </Grid2>
          <Grid2 size={{xs: 8,  md: 4}}>
            <Item>size=4</Item>
          </Grid2>
          <Grid2 size={{xs: 8,  md: 4}}>
            <Item>size=8</Item>
          </Grid2>
          <Grid2 size={{xs: 8,  md: 4}}>
            <Item>size=8</Item>
          </Grid2>
          <Grid2 size={{xs: 8,  md: 4}}>
            <Item>size=8</Item>
          </Grid2>
          <Grid2 size={{xs: 8,  md: 4}}>
            <Item>size=8</Item>
          </Grid2>
          <Grid2 size={{xs: 8,  md: 4}}>
            <Item>size=8</Item>
          </Grid2>
        </Grid2>
      </Box>
    </Stack>
  );
}

'use client';

import { Box, Typography, CircularProgress, Paper } from '@mui/material';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';

const MyMealsPage = () => {
  return (
    <Box
      sx={{
        minHeight: '85vh',
        background: 'linear-gradient(to right, #f8fafc, #e0f7fa)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: 2,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          padding: 5,
          maxWidth: 500,
          width: '100%',
          textAlign: 'center',
          backdropFilter: 'blur(10px)',
          backgroundColor: 'rgba(255, 255, 255, 0.75)',
          borderRadius: 4,
        }}
      >
        <RestaurantMenuIcon sx={{ fontSize: 50, color: 'primary.main', mb: 2 }} />

        <Typography variant="h3" fontWeight="bold" color="primary.main" gutterBottom>
          My Meals
        </Typography>

        <Typography variant="h6" color="text.secondary" gutterBottom>
          This feature is <strong>coming soon</strong>! We&apos;re cooking up something delicious just for you. 🍽️
        </Typography>

        <Box mt={4}>
          <CircularProgress color="primary" />
        </Box>
      </Paper>
    </Box>
  );
};

export default MyMealsPage;

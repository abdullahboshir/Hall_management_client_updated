import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';

const AuditPage = () => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #1e1e2f, #111123)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
      }}
    >
      <Container maxWidth="sm">
        <Box
          sx={{
            textAlign: 'center',
            color: 'white',
            py: 5,
            px: 3,
            borderRadius: 4,
            background: 'rgba(255, 255, 255, 0.05)',
            boxShadow: '0 8px 30px rgba(0,0,0,0.5)',
            border: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontWeight: 'bold',
              mb: 2,
              animation: 'pulse 2s infinite',
              '@keyframes pulse': {
                '0%': { textShadow: '0 0 0px white' },
                '50%': { textShadow: '0 0 20px #00ffcc' },
                '100%': { textShadow: '0 0 0px white' },
              },
            }}
          >
            Coming Soon
          </Typography>
          <Typography variant="body1" sx={{ color: '#ccc', mb: 4 }}>
            The Audit Logs page is under construction. You’ll soon be able to monitor important system events.
          </Typography>
          <Button
            variant="outlined"
            sx={{
              color: 'white',
              borderColor: 'white',
              '&:hover': {
                backgroundColor: 'white',
                color: 'black',
              },
            }}
          >
            Stay Tuned
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default AuditPage;

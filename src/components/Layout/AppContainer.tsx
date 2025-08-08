import React from "react";
import { Box } from "@mui/material";

const AppContainer = ({ children }: {children: React.ReactNode}) => {
  return (
    <Box 
      mx='auto' 
      width='100%' 
      maxWidth={{ xs: '100%', sm: '100%', md: '1200px', lg: '1440px' }}
      px= {1}
      minHeight="100vh"
      display="flex"
      flexDirection="column"
    >
      {children}
    </Box>
  );
};

export default AppContainer;

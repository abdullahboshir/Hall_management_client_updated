"use client";

import * as React from "react";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import { Box, Grid2, Tooltip, Typography } from "@mui/material";
import { currentDateBD } from "@/utils/currentDateBD";
import { calculateTotalmaintenanceFee } from "../Dining/calculateTotalmaintenanceFee";

const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const ScrollBox = styled(Box)(({ theme }) => ({
  overflowY: "scroll",
  height: "30vh",
  // scrollbarWidth: "thin", // Firefox
  // scrollbarColor: "#888 transparent", // Firefox
  "&::-webkit-scrollbar": {
    width: "5px",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "#888",
    borderRadius: "4px",
  },
}));

export default function MiddleInformation({ mealData, hallData }: any) {
  const { currentMonth, currentYear } = currentDateBD();
  const baseMealObj = mealData?.mealInfo?.[currentYear]?.[currentMonth];
  const { monthsWithZeroMaintenance, monthsArray } =
    calculateTotalmaintenanceFee(mealData);

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
    >
      <Box>
        <Grid2 container spacing={1} sx={{ width: "100%" }} p={2}>
          {/* Current Deposit */}
          <Box
            width="55%"
            p={2}
            bgcolor="white"
            borderRadius={1}
            display="flex"
            flexDirection="column"
            alignItems="center"
          >
            <Typography fontSize={20} fontWeight="bold">
              Your Current Deposit is
            </Typography>
            <Typography fontSize={25} fontWeight="bold">
              {baseMealObj?.currentDeposit} TK
            </Typography>
          </Box>

          {/* Total Deposit */}
          <Box
            width="43%"
            p={2}
            bgcolor="white"
            borderRadius={1}
            display="flex"
            flexDirection="column"
            alignItems="center"
          >
            <Typography fontSize={19} fontWeight="bold">
              Total Deposit is
            </Typography>
            <Typography fontSize={25} fontWeight="bold">
              {baseMealObj?.totalDeposit} TK
            </Typography>
          </Box>

          {/* Zero Maintenance Months ScrollBox */}
          <ScrollBox width="28%" bgcolor="white" borderRadius={1}>
   
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                gap={2}
                px={1}
                pt={1}
              >
                <Box>
                  
                  <Typography fontSize={12} fontWeight='bold' my={1}>Maintenance Fee</Typography>

                  <Typography
                fontSize={20}
                    fontWeight="bold"
                        // mb={0.5}
                        display="flex"
                        // flexDirection="column"
                        alignItems="center"
                        justifyContent='center'
                        borderRadius={1}
                        boxShadow={5}
                        p={2}
                        
                        color={baseMealObj?.maintenanceFee < hallData?.hallPolicies?.maintenanceCharge? 'error.main' : 'green'}
                  >
                    {baseMealObj?.maintenanceFee < hallData?.hallPolicies?.maintenanceCharge? 'DUE': 'PAID'} 
                  </Typography>

                  {Object.entries(monthsWithZeroMaintenance).map(
                    ([year, months], index) => (
                      <Box
                        key={index}
                        // mb={0.5}
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        borderRadius={1}
                        boxShadow={5}
                        p={2}
                        my={3}
                      >
                        <Typography fontWeight="bold" fontSize={18} color="error.main">{year}</Typography>
                        <Box
                          display="flex"
                          flexDirection="column"
                          alignItems="center"
                        >
                          {months.map((month, i) => (
                            <Typography key={i} fontWeight="bold" color="error.main">
                              {month}
                            </Typography>
                          ))}
                        </Box>
                      </Box>
                    )
                  )}
                </Box>
              </Box>
          </ScrollBox>

          {/* Total Meals */}
          <Box
            width="43%"
            p={2}
            bgcolor="white"
            borderRadius={1}
            display="flex"
            flexDirection="column"
            alignItems="center"
          >
            <Typography fontSize={19} fontWeight="bold">
              Total Meals
            </Typography>
            <Typography fontSize={25} fontWeight="bold">
              {baseMealObj?.totalMeals}
            </Typography>
          </Box>

          {/* Special Meals */}
          <Box
            width="55%"
            p={2}
            bgcolor="white"
            borderRadius={1}
            display="flex"
            flexDirection="column"
            alignItems="center"
          >
            <Typography fontSize={19} fontWeight="bold">
              Total Special Meal is
            </Typography>
            <Typography fontSize={25} fontWeight="bold">
              {baseMealObj?.totalSpecialMeals} TK
            </Typography>
          </Box>

          {/* Total Cost */}
          <Box
            width="43%"
            p={2}
            bgcolor="white"
            borderRadius={1}
            display="flex"
            flexDirection="column"
            alignItems="center"
          >
            <Typography fontSize={19} fontWeight="bold">
              Total Cost
            </Typography>
            <Typography fontSize={25} fontWeight="bold">
              {baseMealObj?.totalCost} TK
            </Typography>
          </Box>

          {/* Refunded */}
          <Box
            width="43%"
            p={2}
            bgcolor="white"
            borderRadius={1}
            display="flex"
            flexDirection="column"
            alignItems="center"
          >
            <Typography fontSize={19} fontWeight="bold">
              Refunded Deposit
            </Typography>
            <Typography fontSize={25} fontWeight="bold">
              {baseMealObj?.refunded} TK
            </Typography>
          </Box>
        </Grid2>
      </Box>
    </Stack>
  );
}

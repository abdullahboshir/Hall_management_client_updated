"use client";
import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Divider,
  Button,
  Snackbar,
  Alert,
  Stack,
  Avatar,
  Grid2,
} from "@mui/material";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import DinnerDiningIcon from "@mui/icons-material/DinnerDining";
import HmForm from "@/components/Form/HmForm";
import HmInput from "@/components/Form/HmInput";
import {
  useGetAllDiningsQuery,
  useUpdateDiningMutation,
} from "@/redux/api/diningApi";
import { toast } from "sonner";
import Spinner from "@/components/Shared/Spinner/Spinner";

const DiningPage = () => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const { data, isLoading } = useGetAllDiningsQuery({});
  const [diningData, setDiningData] = useState(null) as any;
  const [updateDining] = useUpdateDiningMutation();

  useEffect(() => {
    if (data) {
      setDiningData({
        diningName: data?.diningName || "The Dining of Nazrul Hall",
        diningPolicies: {
          mealCharge: data?.diningPolicies?.mealCharge || 100,
          specialMealCharge: data?.diningPolicies?.specialMealCharge || 200,
          minimumDeposit: data?.diningPolicies?.minimumDeposit || 1000,
          reservedSafetyDeposit:
            data?.diningPolicies?.reservedSafetyDeposit || 500,
        },
        diningSummary: {
          totalMeals: data?.diningSummary?.totalMeals || 150,
          totalSpecialMeals: data?.diningSummary?.totalSpecialMeals || 30,
          totalDepositedAmount:
            data?.diningSummary?.totalDepositedAmount || 20000,
          totalExpendedAmount:
            data?.diningSummary?.totalExpendedAmount || 15000,
          remainingAmount: data?.diningSummary?.remainingAmount || 5000,
        },
      });
    }
  }, [data]);

  const handleSave = async (values: any) => {
    const diningDataToUpdate = {
      id: data?._id,
      body: values,
    };
    try {
      const res = await updateDining(diningDataToUpdate).unwrap();
      if (res?._id) {
        toast.success("Dining settings saved successfully!");
        setOpenSnackbar(true);
        setDiningData((prev: any) => ({
          ...prev,
          diningPolicies: { ...values },
        }));
      }
    } catch (error) {
      // handle error
    }
  };

  if (isLoading || !diningData) {
    return <Spinner />;
  }

  return (
    <Box
      p="1vw"
      sx={{
        background: "linear-gradient(135deg, #f5f7fa 0%, #e3f0ff 100%)",
        minHeight: "80vh",
        maxWidth: 1200,
        mx: "auto",
      }}
    >
      {/* Header */}
      <Stack alignItems="center" spacing={2} mb={4}>
        {/* <Avatar sx={{ bgcolor: "#1976d2", width: 50, height: 50 }}>
        <RestaurantIcon fontSize="large" />
      </Avatar> */}
        <Typography variant="h5" fontWeight={700} color="#1976d2">
          {diningData?.diningName}
        </Typography>
      </Stack>

      {/* Dining Policies */}
      <Card sx={{ borderRadius: 3, boxShadow: 4, mb: 4 }}>
        <CardContent>
          <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
            <MonetizationOnIcon sx={{ color: "#1976d2" }} />
            <Typography variant="h6" fontWeight={600}>
              Dining Policies
            </Typography>
          </Stack>
          <Divider sx={{ mb: 2 }} />
          <HmForm
            onSubmit={handleSave}
            defaultValues={diningData.diningPolicies}
          >
            <Grid2 container size={12} spacing={2} alignItems="center">
              <Grid2 size={2.4}>
                <HmInput
                  name="mealCharge"
                  label="Meal Charge"
                  type="number"
                  size="small"
                  fullWidth
                />
              </Grid2>
              <Grid2 size={2.4}>
                <HmInput
                  name="specialMealCharge"
                  label="Special Meal Charge"
                  type="number"
                  size="small"
                  fullWidth
                />
              </Grid2>
              <Grid2 size={2.4}>
                <HmInput
                  name="minimumDeposit"
                  label="Minimum Deposit"
                  type="number"
                  size="small"
                  fullWidth
                />
              </Grid2>
              <Grid2 size={2.4}>
                <HmInput
                  name="reservedSafetyDeposit"
                  label="Reserved Safety Deposit"
                  type="number"
                  size="small"
                  fullWidth
                />
              </Grid2>
              <Grid2 size={2.4}>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{ fontWeight: 600 }}
                >
                  Save Settings
                </Button>
              </Grid2>
            </Grid2>
          </HmForm>
        </CardContent>
      </Card>

      <Card sx={{ borderRadius: 3, boxShadow: 4 }}>
        <CardContent>
          <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
            <DinnerDiningIcon sx={{ color: "#388e3c" }} />
            <Typography variant="h6" fontWeight={600}>
              Dining Summary
            </Typography>
          </Stack>
          <Divider sx={{ mb: 2 }} />

          <Grid2 container spacing={2}>
            {[
              {
                label: "Deposited",
                value: `৳${diningData.diningSummary.totalDepositedAmount}`,
                icon: "💰",
                color: "#1976d2",
              },
              {
                label: "Expended",
                value: `৳${diningData.diningSummary.totalExpendedAmount}`,
                icon: "🧾",
                color: "#e91e63",
              },
              {
                label: "Remaining",
                value: `৳${diningData.diningSummary.remainingAmount}`,
                icon: "🟢",
                color: "#388e3c",
              },
              {
                label: "Total Meals",
                value: diningData.diningSummary.totalMeals,
                icon: "🍽️",
              },
              {
                label: "Special Meals",
                value: diningData.diningSummary.totalSpecialMeals,
                icon: "⭐",
              },
            ].map((item, index) => (
              <Grid2 size={2.4} key={index}>
                <Box
                  sx={{
                    p: 1,
                    borderRadius: 2,
                    textAlign: "center",
                    backgroundColor: "#f9f9f9",
                    boxShadow: 2,
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    gutterBottom
                    color="text.primary"
                    sx={{ fontSize: "1.1rem" }}
                  >
                    {item.icon} {item.label}
                  </Typography>
                  <Typography
                    variant="h5"
                    fontWeight={600}
                    color={item.color || "text.secondary"}
                  >
                    {item.value}
                  </Typography>
                </Box>
              </Grid2>
            ))}
          </Grid2>

          {/* Example Chart (You can replace with your preferred library) */}
          <Box mt={4}>
            <Typography variant="h6" fontWeight={600} gutterBottom>
              Analysis
            </Typography>
            {/* Placeholder for a graph – you can use Recharts, Chart.js, etc. */}
            <Box
              sx={{
                height: 300,
                borderRadius: 2,
                backgroundColor: "#f1f1f1",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#888",
              }}
            >
              📊 Graph Coming Soon (e.g., Doughnut, Bar, Line)
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Snackbar */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={2500}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          Settings saved successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default DiningPage;

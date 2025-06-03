"use client";
import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Divider,
  Button,
  Stack,
  Grid2,
  IconButton,
} from "@mui/material";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import DinnerDiningIcon from "@mui/icons-material/DinnerDining";
import HmForm from "@/components/Form/HmForm";
import HmInput from "@/components/Form/HmInput";
import EditIcon from "@mui/icons-material/Edit";
import { toast } from "sonner";
import Spinner from "@/components/Shared/Spinner/Spinner";
import {
  useGetAllHallsQuery,
  useUpdateHallMutation,
} from "@/redux/api/hallApi";
import HmDatePicker from "@/components/Form/HmDatePicker";
import Link from "next/link";

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-GB"); // Outputs: dd/mm/yyyy
};

const HallPage = () => {
  const { data, isLoading } = useGetAllHallsQuery({});
  const [hallData, setHallData] = useState(null) as any;
  // const [value, setValue] = useState<DateRange<Date>>([null, null]);
  const [updateHall] = useUpdateHallMutation();


  useEffect(() => {
    if (data) {
      setHallData({
        hallName: data.hallName || "The hall of Nazrul Hall",
        // phoneNumber: data.phoneNumber || "+888 123 456 7890",
        // email: data.email || "superAdmin@gmail.com",
        numberOfSeats: data.numberOfSeats || "500",
        applicationStartDate:
          data.applicationStartDate || new Date().toISOString().split("T")[0],
        applicationEndDate:
          data.applicationEndDate || new Date().toISOString().split("T")[0],
        hallPolicies: {
          admissionCharge: data.hallPolicies?.admissionCharge || 100,
          maintenanceCharge: data.hallPolicies?.maintenanceCharge || 200,
          festivalCharge: data.hallPolicies?.festivalCharge || 1000,
        },
        hallSummary: {
          totalMaintenanceFee: data.hallSummary?.totalMaintenanceFee || 150,
          dueMaintenanceFee: data.hallSummary?.dueMaintenanceFee || 30,
          totalfestivalFee: data.hallSummary?.totalfestivalFee || 20000,
          dueFestivalFee: data.hallSummary?.dueFestivalFee || 15000,
        },
      });
    }
  }, [data]);

  const handleSave = async (values: any) => {
    console.log("values", values);
    const hallDataToUpdate = {
      id: data?._id,
      body: values,
    };
    try {
      const res = await updateHall(hallDataToUpdate).unwrap();
      if (res?._id) {
        toast.success("hall settings saved successfully!");
        setHallData((prev: any) => ({
          ...prev,
          hallPolicies: { ...values },
        }));
      }
    } catch (error) {
      // handle error
    }
  };

  if (isLoading || !hallData) {
    return <Spinner />;
  }

  return (
    <Box
      p="1vw"
      bgcolor="primary.light"
      borderRadius={2}
      display="flex"
      gap={1}
      flexDirection={"column"}
      sx={{
        minHeight: "80vh",
        maxWidth: 1200,
        mx: "auto",
      }}
    >
      <Box borderRadius={2} display="flex" gap={1}>
        <Box width="100%">
          <Card sx={{ borderRadius: 2, mb: 1 }}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              py={2}
              px={3}
            >
              <Typography fontSize='1.2vw' fontWeight={600}>
                Phone Number:{" "}
                <Box component="span" color="text.secondary" fontSize='1.5vw'>
                  {data.phoneNumber || "N/A"}
                </Box>
              </Typography>

              <Typography fontSize='1.2vw' fontWeight={600}>
                Email:{" "}
                <Box component="span" color="text.secondary" fontSize='1.5vw'>
                  {data?.email || "N/A"}
                </Box>
              </Typography>

              <Link href={`/dashboard/superAdmin/hall/edit/${data?._id}`}>
                <IconButton>
                  <EditIcon />
                </IconButton>
              </Link>
            </Stack>
          </Card>

          <Card sx={{ borderRadius: 2, width: "100%" }}>
            <CardContent>
              <Stack
                direction="row"
                alignItems="center"
                spacing={1}
                sx={{ mb: 1 }}
              >
                <DinnerDiningIcon sx={{ color: "#388e3c" }} />
                <Typography variant="h6" fontWeight={600}>
                  Hall Summary
                </Typography>
              </Stack>
              <Divider sx={{ mb: 2 }} />

              <Grid2 container spacing={2}>
                <Box
                  display="flex"
                  flexWrap="wrap"
                  gap={2}
                  justifyContent="flex-start"
                >
                  {[
                    {
                      label: "Number of Seats",
                      value: hallData?.numberOfSeats,
                      icon: "🪑",
                      color: "#388e3c",
                    },
                    {
                      label: "Maintenance Fee",
                      value: hallData?.hallPolicies?.maintenanceCharge,
                      icon: "🪑",
                      color: "#388e3c",
                    },
                    {
                      label: "Admission Charge",
                      value: `৳${hallData.hallPolicies?.admissionCharge}`,
                      icon: "💸",
                    },
                    {
                      label: "Festival Charge",
                      value: `৳${hallData.hallPolicies?.festivalCharge}`,
                      icon: "🎉",
                    },
                    {
                      label: "Application Start",
                      value: formatDate(hallData?.applicationStartDate),
                      icon: "🗓️",
                    },
                    {
                      label: "Application End",
                      value: formatDate(hallData?.applicationEndDate),
                      icon: "🗓️",
                    },

                    {
                      label: "Total Maintenance Fee",
                      value: `৳${hallData.hallSummary?.totalMaintenanceFee}`,
                      icon: "🧾",
                    },
                    {
                      label: "Due Maintenance Fee",
                      value: `৳${hallData.hallSummary?.dueMaintenanceFee}`,
                      icon: "🧾",
                    },
                    {
                      label: "Total Festival Fee",
                      value: `৳${hallData.hallSummary?.totalfestivalFee}`,
                      icon: "🏮",
                    },
                    {
                      label: "Due Festival Fee",
                      value: `৳${hallData.hallSummary?.dueFestivalFee}`,
                      icon: "🏮",
                    },
                  ].map((item, index) => (
                    <Box
                      key={index}
                      sx={{
                        minWidth: 200,
                        px: 2,
                        py: 1,
                        borderRadius: 2,
                        backgroundColor: "#f9f9f9",
                        boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)", // shadow on all sides
                        textAlign: "center",
                        flex: "1 0 auto",
                      }}
                    >
                      <Typography
                        variant="subtitle1"
                        fontWeight="bold"
                        gutterBottom
                        sx={{ fontSize: "1rem" }}
                      >
                        {item.icon} {item.label}
                      </Typography>
                      <Typography
                        variant="h6"
                        fontWeight={600}
                        color={item.color || "text.secondary"}
                      >
                        {item.value}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Grid2>
            </CardContent>
          </Card>
        </Box>

        {/* Hall Policies */}
        <Card sx={{ borderRadius: 2, width: "20vw" }}>
          <CardContent>
            <Stack direction="row" alignItems="center" spacing={1} mb={1}>
              <MonetizationOnIcon sx={{ color: "#1976d2" }} />
              <Typography variant="h6" fontWeight={600}>
                Hall Policies
              </Typography>
            </Stack>
            <Divider sx={{ mb: 3 }} />
            <HmForm onSubmit={handleSave} defaultValues={hallData}>
              <Grid2 container size={12} spacing={3} alignItems="center">
                <Grid2 size={12}>
                  <HmInput
                    name="numberOfSeats"
                    label="Number of Seats"
                    type="number"
                    size="small"
                    fullWidth
                  />
                </Grid2>

                <Grid2 size={12}>
                  <HmInput
                    name="hallPolicies.maintenanceCharge"
                    label="Maintenance Fee"
                    type="number"
                    size="small"
                    fullWidth
                  />
                </Grid2>

                <Grid2 size={12}>
                  <HmInput
                    name="hallPolicies.admissionCharge"
                    label="Addmission Charge"
                    type="number"
                    size="small"
                    fullWidth
                  />
                </Grid2>

                <Grid2 size={12}>
                  <HmInput
                    name="hallPolicies.festivalCharge"
                    label="Festival Charge"
                    type="number"
                    size="small"
                    fullWidth
                  />
                </Grid2>

                <Grid2 size={12}>
                  <HmDatePicker
                    name="applicationStartDate"
                    label="Application Start Date"
                  />
                </Grid2>
                <Grid2 size={12}>
                  <HmDatePicker
                    name="applicationEndDate"
                    label="Application End Date"
                  />
                </Grid2>

                <Grid2 size={12}>
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
      </Box>

      <Card sx={{ borderRadius: 2 }}>
        {/* Example Chart (You can replace with your preferred library) */}
        <Box p={2}>
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
      </Card>
    </Box>
  );
};

export default HallPage;

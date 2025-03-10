/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  Avatar,
  Box,
  IconButton,
  Stack,
  Switch,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";

// import { useDeleteManagerMutation } from "@/redux/api/managerApi";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Image from "next/image";
import AddCardIcon from "@mui/icons-material/AddCard";
// import { toast } from "sonner";
import {
  useGetAllMealQuery,
  // useUpdateMealStatusMutation,
} from "@/redux/api/mealApi";
import { currentDateBD } from "@/utils/currentDateBD";
import { useState } from "react";
import { useDebounced } from "@/redux/hooks";

const { currentYear, currentMonth } = currentDateBD();

const DiningTable = () => {
  const query: Record<string, any> = {};
  const [searchTerm, setSearchTerm] = useState("");

  const debouncedTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  if (!!debouncedTerm) {
    query["searchTerm"] = searchTerm;
  }

  const { data, isLoading } = useGetAllMealQuery({ ...query });
  const meals = data?.meals;
  // const meta = data?.meta;

  console.log("mealssssssssss", data);

  // const [updateMealStatus] = useUpdateMealStatusMutation();
  // const handleUpdateMealStatus = async (id: string) => {
  //   const res = await updateMealStatus(id).unwrap();

  //   console.log("ddddddddddddd", res);
  //   if (res?.id) {
  //     toast.success("deleted successfully");
  //   }

  //   try {
  //   } catch (error) {
  //     console.log("error", error);
  //   }
  // };

  const columns: GridColDef[] = [
    {
      field: "mealStatus",
      headerName: "ON/OFF",
      width: 100,
      renderCell: ({ row }) => (
        <Switch
          checked={row.mealStatus}
          color={row?.mealStatus === "off" ? "success" : "error"}
        />
      ),
    },

    {
      field: "student",
      headerName: "Name",
      sortable: false,
      width: 220,
      renderCell: ({ row }) => (
        <Box
          display="flex"
          alignItems="center"
          // justifyContent="center"
          gap={1}
          sx={{ width: "100%", height: "100%" }}
        >
          {row.student.profileImg !== "" ? (
            <Box sx={{ borderRadius: "50%" }}>
              <Image
                src={row.student.profileImg}
                width={50}
                height={50}
                alt="img"
              />
            </Box>
          ) : (
            <Avatar src="/profile.png" />
          )}

          <Box display="flex" flexDirection="column">
            <Typography variant="body2">
              {row.student.name.firstName} {row.student.name.middleName}{" "}
              {row.student.name.lastName}
            </Typography>
            <Typography variant="caption" color="textSecondary">
              ROOM - {row.student.roomNumber} | SEAT - {row.student.seatNumber}
            </Typography>
          </Box>
        </Box>
      ),
    },

    {
      field: "maintenanceFee",
      headerName: "Maintenance Fee",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
      renderCell: ({ row }) => (
        <Tooltip title="More other month." arrow>
          <Box
            display="flex"
            alignItems="center"
            // justifyContent="center"
            gap={1}
            sx={{ width: "100%", height: "100%" }}
          >
            <Box display="flex" flexDirection="column">
              <Typography variant="body2">
                {row && row.mealInfo["2025"] ? (
                  row.mealInfo[currentYear][currentMonth]?.maintenanceFee ===
                  row.student.hallId.hallPolicies.maintenanceCharge ? (
                    "Paid"
                  ) : (
                    <Typography color={"error"} display="inline">
                      Unpaid
                    </Typography>
                  )
                ) : (
                  ""
                )}{" "}
                {" | "} {row.student.hallId.hallPolicies.maintenanceCharge}
              </Typography>
              <Typography
                variant="caption"
                color={
                  row.mealInfo[currentYear][currentMonth]?.dueMaintenanceFee > 0
                    ? "error"
                    : "textSecondary"
                }
              >
                DUE -
                {row &&
                  row.mealInfo["2025"] &&
                  row.mealInfo[currentYear][currentMonth]
                    ?.dueMaintenanceFee}{" "}
                | Jan | Feb | Mar
              </Typography>
            </Box>
          </Box>
        </Tooltip>
      ),
    },
    {
      field: "currentDeposit",
      headerName: "Deposit Status",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 150,
      renderCell: ({ row }) => (
        <Box
          display="flex"
          alignItems="center"
          gap={1}
          sx={{ width: "100%", height: "100%" }}
        >
          <Box display="flex" flexDirection="column">
            <Typography variant="body2">
              {row && row.mealInfo["2025"]
                ? row.mealInfo[currentYear][currentMonth] && (
                    <Typography
                      color={
                        row.mealInfo[currentYear][currentMonth]
                          ?.currentDeposit === 0
                          ? "error"
                          : "success"
                      }
                      display="inline"
                    >
                      Currently -{" "}
                      {row.mealInfo[currentYear][currentMonth]?.currentDeposit}
                    </Typography>
                  )
                : ""}
            </Typography>

            <Typography
              variant="caption"
              color={
                row.mealInfo[currentYear][currentMonth]?.totalDeposit === 0
                  ? "error"
                  : "textSecondary"
              }
            >
              TOTAL -{" "}
              {row &&
                row.mealInfo["2025"] &&
                row.mealInfo[currentYear][currentMonth]?.totalDeposit}
            </Typography>
          </Box>
        </Box>
      ),
    },
    {
      field: "totalMeals",
      headerName: "Total Meals",
      width: 120,
      renderCell: ({ row }) => (
        <Box
          display="flex"
          alignItems="center"
          gap={1}
          sx={{ width: "100%", height: "100%" }}
        >
          <Box display="flex" flexDirection="column">
            <Typography variant="body2">
              {row && row.mealInfo["2025"]
                ? row.mealInfo[currentYear][currentMonth] && (
                    <Typography
                      color={
                        row.mealInfo[currentYear][currentMonth]?.totalMeals ===
                        0
                          ? "error"
                          : "success"
                      }
                      display="inline"
                    >
                      Regular -{" "}
                      {row.mealInfo[currentYear][currentMonth]?.totalMeals}
                    </Typography>
                  )
                : ""}
            </Typography>

            <Typography
              variant="caption"
              color={
                row.mealInfo[currentYear][currentMonth]?.totalSpecialMeals === 0
                  ? "error"
                  : "textSecondary"
              }
            >
              SPECIAL -{" "}
              {row &&
                row.mealInfo["2025"] &&
                row.mealInfo[currentYear][currentMonth]?.totalSpecialMeals}
            </Typography>
          </Box>
        </Box>
      ),
    },

    {
      field: "totalCost",
      headerName: "Total Cost",
      width: 150,
      renderCell: ({ row }) => {
        console.log("dddddddddddd", row);
        const regularMealCharge =
          row.student.diningId.diningPolicies.mealCharge;
        const speacialMealCharge =
          row.student.diningId.diningPolicies.specialMealCharge;

        return (
          <Box
            display="flex"
            alignItems="center"
            gap={1}
            sx={{ width: "100%", height: "100%" }}
          >
            <Box display="flex" flexDirection="column">
              <Typography variant="body2">
                {row && row.mealInfo["2025"]
                  ? row.mealInfo[currentYear][currentMonth] && (
                      <Typography
                        color={
                          row.mealInfo[currentYear][currentMonth]?.totalCost ===
                          0
                            ? "error"
                            : "success"
                        }
                        display="inline"
                      >
                        Total -{" "}
                        {row.mealInfo[currentYear][currentMonth]?.totalCost}
                        {/* |{" "} Rate- {regularMealCharge} */}
                      </Typography>
                    )
                  : ""}
              </Typography>

              <Typography
                variant="caption"
                color={
                  row.mealInfo[currentYear][currentMonth]?.totalCost === 0
                    ? "error"
                    : "textSecondary"
                }
              >
                {/* Regular-{" "} */}
                Regu.-{" "}
                {row.mealInfo[currentYear][currentMonth]?.totalMeals *
                  regularMealCharge}{" "}
                + {""}
                {/* Special-{" "} */}
                Spec.-{" "}
                {row.mealInfo[currentYear][currentMonth]?.totalSpecialMeals *
                  speacialMealCharge}
              </Typography>
            </Box>
          </Box>
        );
      },
    },

    {
      field: "previousRefunded",
      headerName: "Deposit Adjustments",
      width: 170,
      renderCell: ({ row }) => {
        // const regularMealCharge =
        //   row.student.diningId.diningPolicies.mealCharge;
        // const speacialMealCharge =
        //   row.student.diningId.diningPolicies.specialMealCharge;

        return (
          <Box
            display="flex"
            alignItems="center"
            gap={1}
            sx={{ width: "100%", height: "100%" }}
          >
            <Box display="flex" flexDirection="column">
              <Typography variant="body2">
                {row && row.mealInfo["2025"]
                  ? row.mealInfo[currentYear][currentMonth] && (
                      <Typography
                        color={
                          row.mealInfo[currentYear][currentMonth]?.totalCost ===
                          0
                            ? "error"
                            : "success"
                        }
                        display="inline"
                      >
                        Refunded -{" "}
                        {row.mealInfo[currentYear][currentMonth]?.totalCost}
                        {/* |{" "} Rate- {regularMealCharge} */}
                      </Typography>
                    )
                  : ""}
              </Typography>

              <Typography
                variant="caption"
                color={
                  row.mealInfo[currentYear][currentMonth]?.totalCost === 0
                    ? "error"
                    : "textSecondary"
                }
              >
                {/* Regular-{" "} */}
                Transferred Success {/* Transferred success{" "} */}
                {/* {row.mealInfo[currentYear][currentMonth]?.totalMeals *
                  regularMealCharge}{" "} */}
                {/* + {""} */}
                {/* Special-{" "} */}
                {/* Spec.-{" "} */}
                {/* {row.mealInfo[currentYear][currentMonth]?.totalSpecialMeals *
                  speacialMealCharge} */}
              </Typography>
            </Box>
          </Box>
        );
      },
    },

    {
      field: "diningPolicies",
      headerName: "Meal Rate",
      width: 120,
      renderCell: ({ row }) => {
        const regularMealCharge =
          row.student.diningId.diningPolicies.mealCharge;
        const speacialMealCharge =
          row.student.diningId.diningPolicies.specialMealCharge;

        return (
          <Box
            display="flex"
            alignItems="center"
            gap={1}
            sx={{ width: "100%", height: "100%" }}
          >
            <Box display="flex" flexDirection="column">
              <Typography variant="body2">
                {row && row.mealInfo["2025"]
                  ? row.mealInfo[currentYear][currentMonth] && (
                      <Typography
                        color={
                          row.mealInfo[currentYear][currentMonth]?.totalCost ===
                          0
                            ? "error"
                            : "success"
                        }
                        display="inline"
                      >
                        Regular - {regularMealCharge}
                        {/* |{" "} Rate- {regularMealCharge} */}
                      </Typography>
                    )
                  : ""}
              </Typography>

              <Typography
                variant="caption"
                color={
                  row.mealInfo[currentYear][currentMonth]?.totalCost === 0
                    ? "error"
                    : "textSecondary"
                }
              >
                {/* Regular-{" "} */}
                Special- {speacialMealCharge} {/* + {""} */}
                {/* Special-{" "} */}
                {/* Spec.-{" "} */}
                {/* {row.mealInfo[currentYear][currentMonth]?.totalSpecialMeals *
                  speacialMealCharge} */}
              </Typography>
            </Box>
          </Box>
        );
      },
    },
    {
      field: "action",
      headerName: "Deposit",
      width: 80,
      renderCell: ({ row }) => {
        return (
          <IconButton onClick={() => console.log(row)} aria-label="delete">
            <AddCardIcon />
          </IconButton>
        );
      },
    },
  ];

  return (
    <Box>
      <Stack alignItems="center" py={2}>
        <TextField
          onChange={(e) => setSearchTerm(e.target.value)}
          size="small"
          placeholder="Search Manager"
        />
      </Stack>
      {!isLoading ? (
        <Box>
          <DataGrid rows={meals ?? []} columns={columns} rowHeight={70} />
        </Box>
      ) : (
        <h1>Loading.......</h1>
      )}
    </Box>
  );
};

export default DiningTable;

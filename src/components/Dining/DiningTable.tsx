/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Avatar, Box, IconButton, Switch, Typography } from "@mui/material";

import { useDeleteManagerMutation } from "@/redux/api/managerApi";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Image from "next/image";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "sonner";
import { useGetAllMealQuery } from "@/redux/api/mealApi";

const DiningTable = () => {
  const { data, isLoading } = useGetAllMealQuery({});
  const [deleteManager] = useDeleteManagerMutation();

  const handleDelete = async (id: string) => {
    const res = await deleteManager(id).unwrap();

    console.log("ddddddddddddd", res);
    if (res?.id) {
      toast.success("deleted successfully");
    }

    try {
    } catch (error) {
      console.log("error", error);
    }
  };

  console.log("mealssssssssss", data);

  const columns: GridColDef[] = [
    {
      field: "mealStatus",
      headerName: "ON/OFF",
      width: 100,
      renderCell: ({ row }) => <Switch checked={row.mealStatus} />,
    },

    {
      field: "student",
      headerName: "Name",
      sortable: false,
      width: 200,
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
              {row.student.roomNumber} | {row.student.seatNumber}
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
                row.mealInfo["2025"]["February"]?.maintenanceFee ===
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
                row.mealInfo["2025"]["February"]?.dueMaintenanceFee > 0
                  ? "error"
                  : "textSecondary"
              }
            >
              DUE -{" "}
              {row && row.mealInfo["2025"]
                ? row.mealInfo["2025"]["February"]?.dueMaintenanceFee
                : ""}
            </Typography>
          </Box>
        </Box>
      ),
    },
    {
      field: "currentDeposit",
      headerName: "Deposit",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
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
                ? row.mealInfo["2025"]["February"]?.currentDeposit && (
                    <Typography
                      color={
                        row.mealInfo["2025"]["February"]?.currentDeposit === 0
                          ? "error"
                          : "success"
                      }
                      display="inline"
                    >
                      Currently -{" "}
                      {row.mealInfo["2025"]["February"]?.currentDeposit}
                    </Typography>
                  )
                : ""}
            </Typography>

            <Typography
              variant="caption"
              color={
                row.mealInfo["2025"]["February"]?.totalDeposit === 0
                  ? "error"
                  : "textSecondary"
              }
            >
              TOTAL -{" "}
              {row &&
                row.mealInfo["2025"] &&
                row.mealInfo["2025"]["February"]?.totalDeposit}
            </Typography>
          </Box>
        </Box>
      ),
    },
    {
      field: "totalMeals",
      headerName: "Meal Information",
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
                ? row.mealInfo["2025"]["February"]?.currentDeposit && (
                    <Typography
                      color={
                        row.mealInfo["2025"]["February"]?.totalMeals === 0
                          ? "error"
                          : "success"
                      }
                      display="inline"
                    >
                      Regular - {row.mealInfo["2025"]["February"]?.totalMeals}
                    </Typography>
                  )
                : ""}
            </Typography>

            <Typography
              variant="caption"
              color={
                row.mealInfo["2025"]["February"]?.totalSpecialMeals === 0
                  ? "error"
                  : "textSecondary"
              }
            >
              SPECIAL -{" "}
              {row &&
                row.mealInfo["2025"] &&
                row.mealInfo["2025"]["February"]?.totalSpecialMeals}
            </Typography>
          </Box>
        </Box>
      ),
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: ({ row }) => {
        return (
          <IconButton onClick={() => handleDelete(row.id)} aria-label="delete">
            <DeleteIcon />
          </IconButton>
        );
      },
    },
  ];

  return (
    <Box>
      {!isLoading ? (
        <Box>
          <DataGrid rows={data} columns={columns} rowHeight={70} />
        </Box>
      ) : (
        <h1>Loading.......</h1>
      )}
    </Box>
  );
};

export default DiningTable;

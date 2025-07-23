 
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
import {
  useGetAllMealQuery,
  useUpdateMealStatusMutation,
  // useUpdateMealStatusMutation,
} from "@/redux/api/mealApi";
import { currentDateBD } from "@/utils/currentDateBD";
import { useEffect, useState } from "react";
import { useDebounced } from "@/redux/hooks";
// import { useGetAllHallsQuery } from "@/redux/api/hallApi";
import { useGetAllDiningsQuery } from "@/redux/api/diningApi";

import { useGetAllHallsQuery } from "@/redux/api/hallApi";
import { toast } from "sonner";
import DiningModal from "@/app/(withCommonLayout)/dining/components/DiningModal";
import { calculateTotalmaintenanceFee } from "./calculateTotalmaintenanceFee";
import Spinner from "../Shared/Spinner/Spinner";
import Link from "next/link";
import { useRouter } from "next/navigation";

const { currentYear, currentMonth } = currentDateBD();

const DiningTable = () => {
  const query: Record<string, any> = {};
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [mealSelectedId, setMealSelectedId] = useState(null);

  const debouncedTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  if (!!debouncedTerm) {
    query["searchTerm"] = searchTerm;
  }

  const { data: hallData, isLoading: isHallLoading } = useGetAllHallsQuery({});
  const { data: diningData, isLoading: isDiningLoading } =
    useGetAllDiningsQuery({});
  const { data, isLoading, refetch } = useGetAllMealQuery<any>({ ...query });

  
  useEffect(() => {
    // const mealCharge = diningData?.diningPolicies?.mealCharge;
    
    // const reservedSafetyDeposit =
    //   diningData?.diningPolicies?.reservedSafetyDeposit;
    
    // if (
      //   data?.meals &&
      //   data?.meals?.some(
        //     (meal:any) =>
        //       meal.mealStatus === "on" &&
        //       meal.mealInfo[currentYear][currentMonth]?.currentDeposit >=
        //         mealCharge + (mealCharge / 100) * reservedSafetyDeposit
        //   )
        // ) {
    const intervalId = setInterval(() => {
      refetch();
    }, 2000);

    return () => clearInterval(intervalId);
    // }
  }, [data, refetch, diningData]);
  
  const meals = data?.meals;
  

  const [updateMealStatus] = useUpdateMealStatusMutation();
  // const meta = data?.meta;


  const handleMealStatus = async (id: string, checked: boolean) => {
    const updatedMealStatus = checked ? "on" : "off";

    const mealData = {
      id,
      body: { mealStatus: updatedMealStatus },
    };

    try {
      const res = await updateMealStatus(mealData).unwrap();
      if (res?.id) {
        toast.success(`Meal is ${res?.mealStatus}`);
      }

      refetch();
    } catch (error) {
      console.log("got and error", error);
    }
  };

  console.log("search resulttttttttt", searchTerm);

  const router = useRouter();
  

  const columns: GridColDef[] = [
    {
      field: "mealStatus",
      headerName: "ON/OFF",
      width: 100,
      renderCell: ({ row }) => {
  
        const baseMealObj = row.mealInfo?.[currentYear]?.[currentMonth] || {};
        const mealCharge = diningData?.diningPolicies?.mealCharge;
        const maintenanceCharge = hallData?.hallPolicies?.maintenanceCharge;

        const reservedSafetyDeposit =
          diningData?.diningPolicies?.reservedSafetyDeposit;

        const isAvaiableCurrentDeposite =
          isLoading || isDiningLoading || isHallLoading
            ? "...Loading"
            : baseMealObj?.currentDeposit >=
              mealCharge + (mealCharge / 100) * reservedSafetyDeposit;
        return (
            <Link href={`/mealOverview/${row?._id}`}>
          <Box
            width="100%"
            height="100%"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            {row?.student?.user?.status === "active" ? (
              <Switch
                onClick={(e:any) => {
                  if (isAvaiableCurrentDeposite) {
                    handleMealStatus(row._id, e.target.checked);
                  }
                   e.stopPropagation();
                }}
                checked={isAvaiableCurrentDeposite && row.mealStatus === "on"}
                disabled={
                  !isAvaiableCurrentDeposite ||
                  maintenanceCharge < baseMealObj?.maintenanceFee
                }
                color={row?.mealStatus === "off" ? "success" : "error"}
              />
            ) : (
              <Typography
                variant="body2"
                bgcolor="error.light"
                sx={{ px: 0.5 }}
                color="white"
              >
                {(row?.student?.user?.status)?.toUpperCase()}
              </Typography>
            )}
          </Box>
     </Link>
        );
      },
    },

    {
      field: "student",
      headerName: "Name",
      sortable: false,
      width: 220,
      renderCell: ({ row }) => (
         <Link href={`/mealOverview/${row?._id}`}>
          
   
        <Box
          display="flex"
          alignItems="center"
          // justifyContent="center"
          gap={1}
          sx={{ width: "100%", height: "100%" }}
        >
          {row?.student?.profileImg ? (
  <Box
    sx={{
      width: 50,
      height: 50,
      borderRadius: '50%',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <Image
      src={row.student.profileImg}
      alt="Profile"
      width={50}
      height={50}
      objectFit="cover"
      style={{
        objectFit: 'cover',
        width: '100%',
        height: '100%',
        borderRadius: '50%',
      }}
    />
  </Box>
) : (
  <Avatar src="/profile.png" />
)}


          <Box display="flex" flexDirection="column">
            <Typography variant="body2">
              {row?.student?.name?.firstName} {row?.student?.name?.middleName}{" "}
              {row?.student?.name?.lastName}
            </Typography>
            <Typography variant="caption" color="textSecondary">
              ROOM - {row.student.roomNumber} | SEAT - {row.student.seatNumber}
            </Typography>
          </Box>
        </Box>
              </Link>
      ),
    },

    {
      field: "maintenanceFee",
      headerName: "Maintenance Fee",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
      renderCell: ({ row }) => {


          const {monthsWithZeroMaintenance, monthsArray} = calculateTotalmaintenanceFee(row)
         

        return (
          <Link href={`/mealOverview/${row?._id}`}>
          <Tooltip
            title={Object.entries(monthsWithZeroMaintenance).map(
              ([year, months], index) => (
                <Typography variant="caption" display="inline" key={index}>
                  {year}:-{" "}
                  {months.map((data, monthIndex) => (
                    <>
                      <span key={monthIndex}>{data} </span>
                      {/* Add divider except after the last month */}
                      {monthIndex === months.length - 1 ? ",   " : "| "}
                    </>
                  ))}
                </Typography>
              )
            )}
            arrow
          >
            <Box
              display="flex"
              alignItems="center"
              // justifyContent="center"
              gap={1}
              sx={{ width: "100%", height: "100%" }}
            >
              <Box display="flex" flexDirection="column">
                <Typography variant="body2">
                  {row && row.mealInfo[currentYear] ? (
                    row.mealInfo[currentYear][currentMonth]?.maintenanceFee ===
                    row.student.hall?.hallPolicies?.maintenanceCharge ? (
                      <Typography color={"success"} display="inline">
                        Paid
                      </Typography>
                    ) : (
                      <Typography color={"error"} display="inline">
                        Unpaid
                      </Typography>
                    )
                  ) : (
                    ""
                  )}{" "}
                  {" | "} {row.student.hall.hallPolicies.maintenanceCharge}
                </Typography>
                <Typography
                  variant="caption"
                  color={
                    row.mealInfo[currentYear][currentMonth]?.dueMaintenanceFee >
                    0
                      ? "error"
                      : "textSecondary"
                  }
                >
                  DUE -
                  {row &&
                    row.mealInfo["2025"] &&
                    row.mealInfo[currentYear][currentMonth]
                      ?.dueMaintenanceFee}{" "}
                  |{" "}
                  {monthsArray.map((data, index) => (
                    <Typography variant="caption" display="inline" key={index}>
                      {data?.month.slice(0, 3)} |{" "}
                    </Typography>
                  ))}
                </Typography>
              </Box>
            </Box>
          </Tooltip>
            </Link>
        );
      },
    },
    {
      field: "currentDeposit",
      headerName: "Deposit Status",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 150,
      renderCell: ({ row }) => (
         <Link href={`/mealOverview/${row?._id}`}>
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
                          : ""
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
              </Link>
      ),
    },
    {
      field: "totalMeals",
      headerName: "Total Meals",
      width: 120,
      renderCell: ({ row }) => (
        <Link href={`/mealOverview/${row?._id}`}>
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
                          : ""
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
              </Link>
      ),
    },

    {
      field: "totalCost",
      headerName: "Total Cost",
      width: 150,
      renderCell: ({ row }) => {
        const regularMealCharge = row.student.dining.diningPolicies.mealCharge;
        const speacialMealCharge =
          row.student.dining.diningPolicies.specialMealCharge;

        return (
          <Link href={`/mealOverview/${row?._id}`}>
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
                            : ""
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
                </Link>
        );
      },
    },

    {
      field: "refunded",
      headerName: "Deposit Adjustments",
      width: 170,
      renderCell: ({ row }) => {
        // const regularMealCharge =
        //   row.student.dining.diningPolicies.mealCharge;
        // const speacialMealCharge =
        //   row.student.dining.diningPolicies.specialMealCharge;

        return (
          <Link href={`/mealOverview/${row?._id}`}>
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
                      <Typography display="inline">
                        Refunded -{" "}
                        {row.mealInfo[currentYear][currentMonth]?.refunded}
                        {/* |{" "} Rate- {regularMealCharge} */}
                      </Typography>
                    )
                  : ""}
              </Typography>

              <Typography
                variant="caption"
                color={
                  row.mealInfo[currentYear][currentMonth]?.refunded === 0
                    ? "error"
                    : "success"
                }
              >
                {row.mealInfo[currentYear][currentMonth]?.refunded === 0
                  ? "Have no Refunded."
                  : "Refunded Success."}
              </Typography>
            </Box>
          </Box>
                </Link>
        );
      },
    },

    {
      field: "diningPolicies",
      headerName: "Meal Rate",
      width: 120,
      renderCell: ({ row }) => {
        const regularMealCharge = row.student.dining.diningPolicies.mealCharge;
        const speacialMealCharge =
          row.student.dining.diningPolicies.specialMealCharge;

        return (
          <Link href={`/mealOverview/${row?._id}`} >
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
                            : ""
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
                </Link>
        );
      },
    },
    {
      field: "action",
      headerName: "Deposit",
      width: 80,
      renderCell: ({ row }) => (
        <Box>
          <IconButton
            onClick={(e) => {
              setIsModalOpen(true);
              setMealSelectedId(row?._id);
               e.stopPropagation();
            }}
            aria-label="delete"
          >
            <AddCardIcon />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <Box>
      <Stack>
        <DiningModal
          open={isModalOpen}
          setOpen={setIsModalOpen}
          mealId={mealSelectedId}
        />
      </Stack>

      <Stack
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        py={2}
        px={6}
        width="100%"
      >
        <Box>Show Total Meal Details</Box>
        <TextField
          onChange={(e) => setSearchTerm(e.target.value)}
          size="small"
          placeholder="Search Manager"
        />

        <Box>Today Meals</Box>
      </Stack>

      {!isLoading ? (
        <Box>
          <DataGrid rows={meals ?? []} columns={columns} rowHeight={70}  onRowClick={(params) => router.push(`/mealOverview/${params.row._id}`)} />
        </Box>
      ) : (
       <Spinner/>
      )}
    </Box>
  );
};

export default DiningTable;

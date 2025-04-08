/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

// import {
//   useDeleteManagerMutation,
//   useGetAllManagerQuery,
// } from "@/redux/api/managerApi";
import {
  // Avatar,
  Box,
  Button,
  Collapse,
  IconButton,
  MenuItem,
  Paper,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
// import { toast } from "sonner";

import { useGetAllNoticesQuery } from "@/redux/api/noticeApi";
import Link from "next/link";

import { toast } from "sonner";
import { useUpdateUserStatusMutation } from "@/redux/api/userApi";
import EditIcon from "@mui/icons-material/Edit";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import {
  NoticeAudience,
  NoticePriority,
  NoticeStatus,
  NoticeType,
} from "@/constant/common.constant";
import NoticeModal from "./components/NoticeModal";

// Table Row Component
const Row = ({
  row,
  refetch,
  isExpendDefault,
}: {
  row: any;
  refetch: any;
  isExpendDefault: any;
}) => {
  const [open, setOpen] = useState(isExpendDefault);
  console.log("11111111111111111", isExpendDefault);
  const [updateUserStatus] = useUpdateUserStatusMutation();

  const handleUserStatus = async (status: string, id: string) => {
    if (!id || !status) {
      console.error("User ID or status is missing");
      return;
    }
    const userStatus = {
      id,
      body: { status },
    };

    try {
      const res = (await updateUserStatus(userStatus).unwrap()) as any;
      console.log("hhhhhhhhhhhhhhhh", res);
      if (res?.id) {
        toast.success(`User status has been upadated ${res?.status}`);
      }

      refetch();
    } catch (error) {
      console.log("got and error", error);
    }
  };

  return (
    <>
      <TableRow
        onClick={() => setOpen(!open)}
        sx={{ cursor: "pointer", "&:hover": { bgcolor: "action.hover" } }}
      >
        <TableCell>
          <Box
            display="flex"
            alignItems="center"
            // justifyContent="center"
            gap={1}
            sx={{ width: "100%", height: "100%" }}
          >
            <Box display="flex" flexDirection="column">
              <Typography variant="body2">{row?.title}</Typography>
            </Box>
          </Box>
        </TableCell>

        <TableCell>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="start"
            justifyContent="center"
          >
            <Typography
              color={`${"active" === "active" ? "textSecondary" : "error"}`}
            >
              {row?.creatorInfo?.designation || row?.creatorInfo?.role}{" "}
              {row?.creatorInfo?.user?.role}
            </Typography>
          </Box>
        </TableCell>

        <TableCell>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="start"
            justifyContent="center"
          >
            <Typography
              color={`${"active" === "active" ? "textSecondary" : "error"}`}
            >
              {row?.audience}
              <Select
                onClick={(e) => e.stopPropagation()}
                onChange={(e) => {
                  e.stopPropagation();
                  handleUserStatus(e.target.value, row?.user?._id);
                }}
                value={row?.audience}
                sx={{
                  "&.MuiOutlinedInput-root": {
                    "& fieldset": {
                      border: "none",
                    },
                    "& .MuiSelect-select": {
                      paddingLeft: 0,
                    },
                    height: 0,
                  },
                  color: "active" === "active" ? "inherit" : "red",
                }}
              >
                {NoticeAudience.map((item, index) => (
                  <MenuItem key={index}>{item}</MenuItem>
                ))}
              </Select>
            </Typography>
          </Box>
        </TableCell>

        <TableCell>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="start"
            justifyContent="center"
          >
            <Typography
              color={`${"active" === "active" ? "textSecondary" : "error"}`}
            >
              {row?.type}
              <Select
                onClick={(e) => e.stopPropagation()}
                onChange={(e) => {
                  e.stopPropagation();
                  handleUserStatus(e.target.value, row?.user?._id);
                }}
                value={row?.type}
                sx={{
                  "&.MuiOutlinedInput-root": {
                    "& fieldset": {
                      border: "none",
                    },
                    "& .MuiSelect-select": {
                      paddingLeft: 0,
                    },
                    height: 0,
                  },
                  color: "active" === "active" ? "inherit" : "red",
                }}
              >
                {NoticeType.map((item, index) => (
                  <MenuItem key={index}>{item}</MenuItem>
                ))}
              </Select>
            </Typography>
          </Box>
        </TableCell>

        <TableCell>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="start"
            justifyContent="center"
          >
            <Typography
              color={`${"active" === "active" ? "textSecondary" : "error"}`}
            >
              {row?.priority}
              <Select
                onClick={(e) => e.stopPropagation()}
                onChange={(e) => {
                  e.stopPropagation();
                  handleUserStatus(e.target.value, row?.user?._id);
                }}
                value={row?.priority}
                sx={{
                  "&.MuiOutlinedInput-root": {
                    "& fieldset": {
                      border: "none",
                    },
                    "& .MuiSelect-select": {
                      paddingLeft: 0,
                    },
                    height: 0,
                  },
                  color: "active" === "active" ? "inherit" : "red",
                }}
              >
                {NoticePriority.map((item, index) => (
                  <MenuItem key={index}>{item}</MenuItem>
                ))}
              </Select>
            </Typography>
          </Box>
        </TableCell>

        <TableCell>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="start"
            justifyContent="center"
          >
            <Typography
              color={`${"active" === "active" ? "textSecondary" : "error"}`}
            >
              {row?.status}
              <Select
                onClick={(e) => e.stopPropagation()}
                onChange={(e) => {
                  e.stopPropagation();
                  handleUserStatus(e.target.value, row?.user?._id);
                }}
                value={row?.status}
                sx={{
                  "&.MuiOutlinedInput-root": {
                    "& fieldset": {
                      border: "none",
                    },
                    "& .MuiSelect-select": {
                      paddingLeft: 0,
                    },
                    height: 0,
                  },
                  color: "active" === "active" ? "inherit" : "red",
                }}
              >
                {NoticeStatus.map((item, index) => (
                  <MenuItem key={index}>{item}</MenuItem>
                ))}
              </Select>
            </Typography>
          </Box>
        </TableCell>

        <TableCell sx={{ px: 0 }}>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            // gap={1}
            sx={{ width: "100%", height: "100%" }}
          >
            <Link
              href={`/dashboard/admin/student/edit/${row?._id}`}
              onClick={(e) => e.stopPropagation()}
            >
              <IconButton
                // onClick={() => handleDelete(row.id)}
                aria-label="delete"
              >
                <EditIcon />
              </IconButton>
            </Link>

            {/* <IconButton
              // onClick={() => handleDelete(row.id)}
              aria-label="delete"
            >
              <DeleteIcon color="error" />
            </IconButton> */}
          </Box>
        </TableCell>

        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell sx={{ p: 0 }} colSpan={8}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ p: 2, bgcolor: "grey.100", borderRadius: 1 }}>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                OTHERS INFORMATION
              </Typography>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    {[
                      "CreatedBy",
                      "Alliance",
                      "Sub District",
                      "District",
                      "Division",
                    ].map((key, index) => (
                      <TableCell key={index} sx={{ fontWeight: "bold" }}>
                        {key}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    {" "}
                    <TableCell>{row?.permanentAddress?.village}</TableCell>
                    <TableCell>{row?.permanentAddress?.alliance}</TableCell>
                    <TableCell>{row?.permanentAddress?.subDistrict}</TableCell>
                    <TableCell>{row?.permanentAddress?.district}</TableCell>
                    <TableCell>{row?.permanentAddress?.division}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

const AdminNotice = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { data, isLoading, refetch } = useGetAllNoticesQuery({});

  if (isLoading) {
    return "Loading...";
  }

  const hasFirstNotice = data?.[0];
  console.log("ddddddddddddddddddddddddgggggggggggggggggg", hasFirstNotice);

  // const [deleteManager] = useDeleteManagerMutation();

  // const handleDelete = async (id: string) => {
  //   const res = await deleteManager(id).unwrap();

  //   if (res?.id) {
  //     toast.success("deleted successfully");
  //   }

  //   try {
  //   } catch (error) {
  //     console.log("error", error);
  //   }
  // };
  // console.log("managerrrrrrr", data);

  return (
    <Box>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Button onClick={() => setIsModalOpen(true)}>Create Notice</Button>
        <NoticeModal
          open={isModalOpen}
          setOpen={setIsModalOpen}
          refetch={refetch}
        />
        <TextField size="small" placeholder="Search Student" />
      </Stack>

      <TableContainer
        component={Paper}
        sx={{
          width: "100%",
          minWidth: 800,
          mx: "auto",
          mt: 3,
          // maxHeight: "500px", // Set a max height to enable vertical scrolling
          // overflowX: "auto",
        }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: "primary.main", color: "white" }}>
              {[
                "Title of Notice",
                "CreatedBy",
                "Audience",
                "Type",
                "Priority",
                "Status",
                "Action",
                "",
              ].map((data, index) => (
                <TableCell
                  key={index}
                  sx={{
                    fontWeight: "bold",
                    fontSize: "1rem",
                    color: "white",
                  }}
                  // colSpan={0}
                >
                  {data}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {isLoading
              ? "Loading..."
              : data?.map((row: any, index: number) => (
                  <Row
                    key={row.id}
                    row={row}
                    refetch={refetch}
                    isExpendDefault={index === 0}
                  />
                ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AdminNotice;

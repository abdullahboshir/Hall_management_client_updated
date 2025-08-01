 
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
import Spinner from "@/components/Shared/Spinner/Spinner";
import Image from "next/image";

// Table Row Component
const Row = ({
  row,
  refetch,
  isExpendDefault,
}: {
  row:any;
  refetch:any;
  isExpendDefault:any;
}) => {
  const [open, setOpen] = useState(isExpendDefault);
  const [updateUserStatus] = useUpdateUserStatusMutation();

  console.log("rowwwwwwwwwwwww", row);

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
              <Typography variant="body2" fontWeight='bold'>{row?.title}</Typography>
            </Box>
          </Box>
        </TableCell>

        {/* <TableCell>
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
        </TableCell> */}

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
              {row?.noticeType}
              <Select
                onClick={(e) => e.stopPropagation()}
                onChange={(e) => {
                  e.stopPropagation();
                  handleUserStatus(e.target.value, row?.user?._id);
                }}
                value={row?.noticeType}
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
              <Typography fontSize={15} gutterBottom>
                {row?.description}
              </Typography>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom mt={5}>
                OTHERS INFORMATION
              </Typography>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    {[
                      "CreatedBy",
                      "Schedule Type",
                      "Attachments",
                  
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
                    <TableCell>
                      <Box display="flex" flexDirection="column">
                        <Typography>{row?.createdBy?.email}</Typography>
                        <Typography variant="caption">
                          {row?.createdBy?.fullName}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      {" "}
                      <Box display="flex" flexDirection="column">
                        <Typography>
                          Date: {new Date(row?.scheduleAt).getFullYear()} -{" "}
                          {new Date(row?.scheduleAt).getMonth()} -{" "}
                          {new Date(row?.expiryDate).getDate()}
                        </Typography>

                        <Typography variant="caption">
                          Time: {new Date(row?.scheduleAt).getUTCHours()}:{" "}
                          {new Date(row?.scheduleAt).getMinutes()}
                        </Typography>
                      </Box>
                    </TableCell>
<TableCell>
  <Box
    display="flex"
    justifyContent='end'
    gap={1}
    flexWrap="wrap"
    // maxWidth={300}
  >
    {row?.attachments?.length > 0 ? (
      row.attachments.map((img: any, index: number) => (
        <Box
          key={index}
          width={50}
          height={50}
          position="relative"
          borderRadius={1}
          overflow="hidden"
        >
          <Image
            src={img}
            alt={`img-${index}`}
            fill
            style={{ objectFit: 'cover' }}
          />
        </Box>
      ))
    ) : (
      <Typography>No Attachments</Typography>
    )}
  </Box>
</TableCell>
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

  console.log("checkkkkkkkkkkk", data);

  if (isLoading) {
    return   <Spinner/>
  }

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
                "Audience",
                "Notice Type",
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
              : data?.map((row:any, index: number) => (
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

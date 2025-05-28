/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import {
  Box,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  Avatar,
  Stack,
  Button,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";
// import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
// import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useGetAllStudentQuery } from "@/redux/api/studentApi";
import Image from "next/image";
import Link from "next/link";
import StudentModal from "./component/studentModal";
import { formattedDate } from "@/utils/currentDateBD";
import { useUpdateUserStatusMutation } from "@/redux/api/userApi";
import { toast } from "sonner";
import { IStudent } from "../../types/student.interface";
import { useDebounced } from "@/redux/hooks";
import Spinner from "@/components/Shared/Spinner/Spinner";

// Table Row Component
const Row = ({ row, refetch }: { row: IStudent; refetch: any }) => {
  const [open, setOpen] = useState(false);

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
            {row.profileImg !== "" ? (
              <Box width={50} height={50} overflow="hidden" borderRadius="50%">
                <Image
                  src={row.profileImg as string}
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
                {" "}
                {`${row.name.firstName || ""} ${row.name.middleName || ""}
              ${row.name.lastName || ""}`}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Room: {row?.roomNumber} | Seat: {row?.seatNumber}
                {/* | SEAT -{" "} {row.student.seatNumber} */}
              </Typography>
              <Typography variant="caption" color="textSecondary">
                ID: {row?.id}
                {/* | SEAT -{" "} {row.student.seatNumber} */}
              </Typography>
            </Box>
          </Box>
        </TableCell>

        <TableCell>
          {" "}
          <Box
            display="flex"
            flexDirection="column"
            // alignItems="center"
            justifyContent="center"
            // gap={1}
            sx={{ width: "100%", height: "100%" }}
          >
            <Typography> {`${row.email}`}</Typography>
            <Typography color="textSecondary" variant="body2">
              +88{row?.phoneNumber}
            </Typography>
            <Typography color="textSecondary" variant="caption">
              Imergency: {row?.emergencyContact}
            </Typography>
          </Box>
        </TableCell>

        <TableCell>
          <Box
            display="flex"
            flexDirection="column"
            // alignItems="center"
            justifyContent="center"
            // gap={1}
            sx={{ width: "100%", height: "100%" }}
          >
            <Typography>
              {" "}
              {`${row.academicDepartment}`} | {row.academicFaculty}
            </Typography>
            <Typography color="textSecondary" variant="caption">
              Roll: {row?.classRoll} | Session: {row?.session}
            </Typography>
            <Typography color="textSecondary" variant="caption">
              Birth:{" "}
              {row?.dateOfBirth ? formattedDate(row?.dateOfBirth) : "Add Date."}
            </Typography>
          </Box>
        </TableCell>

        <TableCell>
          {" "}
          <Box
            display="flex"
            flexDirection="column"
            // alignItems="center"
            justifyContent="center"
            // gap={1}
            sx={{ width: "100%", height: "100%" }}
          >
            <Typography> {`${row.gender}`}</Typography>
            <Typography color="textSecondary" variant="caption">
              B/G: ({row?.bloodGroup})
            </Typography>
          </Box>
        </TableCell>

        <TableCell>
          {" "}
          <Box
            display="flex"
            flexDirection="column"
            alignItems="start"
            justifyContent="center"
            // gap={1}
            sx={{ width: "100%", height: "100%" }}
          >
            {/* <Typography>
              {row?.dateOfBirth ? formattedDate(row?.dateOfBirth) : "Add Date."}
            </Typography> */}

            <Typography
              color={`${
                row?.user?.status === "active" ? "textSecondary" : "error"
              }`}
            >
              {/* {row?.user?.status?.toUpperCase()} */}
              <Select
                onClick={(e) => e.stopPropagation()}
                onChange={(e) => {
                  e.stopPropagation(); // Ensures row doesn't expand when selecting an option
                  handleUserStatus(e.target.value, row?.user?._id);
                  // setStatus(e.target.value);
                }}
                value={row?.user?.status}
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
                  color:
                    row?.user?.status === "active"
                      ? "inherit" // normal color for active
                      : "red",
                }}
              >
                <MenuItem value="active">ACTIVE</MenuItem>
                <MenuItem value="inactive">INACTIVE</MenuItem>
                <MenuItem value="blocked">BLOCKED</MenuItem>
              </Select>
            </Typography>

            <Typography color="textSecondary" variant="caption">
              {(row?.user?.role).toUpperCase()}
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
              href={`/dashboard/admin/student/edit/${row?.id}`}
              onClick={(e) => e.stopPropagation()}
            >
              <IconButton
              // onClick={() => handleDelete(row.id)}
              // aria-label="delete"
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

        {/* <TableCell sx={{ px: 0 }}>
          <Box>
            <IconButton size="small">
              {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
            </IconButton>
          </Box>
        </TableCell> */}
      </TableRow>

      <TableRow>
        <TableCell sx={{ p: 0 }} colSpan={8}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ p: 2, bgcolor: "grey.100", borderRadius: 1 }}>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Present Address
              </Typography>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    {[
                      "Village",
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
                    <TableCell>{row?.presentAddress?.village}</TableCell>
                    <TableCell>{row?.presentAddress?.alliance}</TableCell>
                    <TableCell>{row?.presentAddress?.subDistrict}</TableCell>
                    <TableCell>{row?.presentAddress?.district}</TableCell>
                    <TableCell>{row?.presentAddress?.division}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell sx={{ p: 0 }} colSpan={8}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ p: 2, bgcolor: "grey.100", borderRadius: 1 }}>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Permanent Address
              </Typography>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    {[
                      "Village",
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

      <TableRow>
        <TableCell sx={{ p: 0 }} colSpan={8}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ p: 2, bgcolor: "grey.100", borderRadius: 1 }}>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Guardians
              </Typography>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    {[
                      "Father Name",
                      "Father Occupation",
                      "Father Phone No.",
                      "Mother Name",
                      "Mother Occupation",
                      "Mother Phone No.",
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
                    <TableCell>{row?.guardian?.fatherName}</TableCell>
                    <TableCell>{row?.guardian?.fatherOccupation}</TableCell>
                    <TableCell>{row?.guardian?.fatherContactNo}</TableCell>
                    <TableCell>{row?.guardian?.motherName}</TableCell>
                    <TableCell>{row?.guardian?.motherOccupation}</TableCell>
                    <TableCell>{row?.guardian?.motherContactNo}</TableCell>
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

const StudentPage = () => {
  const query: Record<string, unknown> = {};
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const debouncedTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  if (!!debouncedTerm) {
    query["searchTerm"] = searchTerm;
  }

  const { data, isLoading, refetch } = useGetAllStudentQuery({ ...query });

  console.log("resulttttttttttt", searchTerm);
  return (
    <Box>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Button onClick={() => setIsModalOpen(true)}>Add Student</Button>
        <StudentModal open={isModalOpen} setOpen={setIsModalOpen} />
        <TextField
          onChange={(e) => setSearchTerm(e.target.value)}
          size="small"
          placeholder="Search Student"
        />
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
                "Name",
                "Contact",
                "Academic Info.",
                "Gender",
                // "Birth",
                "Status",
                "Action",
              ].map((data, index) => (
                <TableCell
                  key={index}
                  sx={{ fontWeight: "bold", fontSize: "1rem", color: "white" }}
                  // colSpan={0}
                >
                  {data}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {isLoading
              ?  <Spinner/>
              : data?.map((row: any) => (
                  <Row key={row.id} row={row} refetch={refetch} />
                ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default StudentPage;

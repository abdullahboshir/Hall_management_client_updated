"use client";
import { Box, Button, IconButton, Stack, TextField } from "@mui/material";
import React, { useState } from "react";

import { useDeleteManagerMutation } from "@/redux/api/managerApi";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Image from "next/image";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "sonner";
import { useGetAllStudentQuery } from "@/redux/api/studentApi";
import StudentModal from "./component/studentModal";

const StudentPage = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { data, isLoading } = useGetAllStudentQuery({});
  const [deleteManager] = useDeleteManagerMutation();

  const handleDelete = async (id: string) => {
    const res = await deleteManager(id).unwrap();

    if (res?.id) {
      toast.success("deleted successfully");
    }

    console.log("ddddddddddddd", res);

    try {
    } catch (error) {
      console.log("error", error);
    }
  };
  console.log("managerrrrrrr", data);

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 100 },
    {
      field: "fullName",
      headerName: "Full name",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
      valueGetter: (value, row) =>
        `${row.name.firstName || ""} ${row.name.middleName || ""} ${
          row.name.lastName || ""
        }`,
    },
    {
      field: "designation",
      headerName: "Designation",
      width: 100,
    },
    {
      field: "profileImg",
      headerName: "Photos",
      width: 150,
      renderCell: ({ row }) => {
        return (
          <Box sx={{ borderRadius: "50%" }}>
            <Image src={row.profileImg} width={50} height={50} alt="img" />
          </Box>
        );
      },
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
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Button onClick={() => setIsModalOpen(true)}>Add Student</Button>
        <StudentModal open={isModalOpen} setOpen={setIsModalOpen} />
        <TextField size="small" placeholder="Search Student" />
      </Stack>

      {!isLoading ? (
        <Box>
          <DataGrid rows={data} columns={columns} />
        </Box>
      ) : (
        <h1>Loading.......</h1>
      )}
    </Box>
  );
};

export default StudentPage;

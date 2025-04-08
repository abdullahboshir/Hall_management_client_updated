"use client";
import {
  Avatar,
  Box,
  Button,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Image from "next/image";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { toast } from "sonner";
import Link from "next/link";
import {
  useDeleteAdminMutation,
  useGetAllAdminQuery,
} from "@/redux/api/adminApi";
import AdminModal from "./components/AdminModal";

const AdminPage = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { data, isLoading } = useGetAllAdminQuery({});
  const [deleteAdmin] = useDeleteAdminMutation();

  const handleDelete = async (id: string) => {
    const res = await deleteAdmin(id).unwrap();

    if (res?.id) {
      toast.success("deleted successfully");
    }

    try {
    } catch (error) {
      console.log("error", error);
    }
  };

  const columns: GridColDef[] = [
    {
      field: "fullName",
      headerName: "Name",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 250,
      renderCell: ({ row }) => {
        return (
          <Box
            display="flex"
            alignItems="center"
            // justifyContent="center"
            gap={1}
            sx={{ width: "100%", height: "100%" }}
          >
            {row.profileImg !== "" ? (
              <Box width={50} height={50} overflow="hidden" borderRadius="50%">
                <Image src={row.profileImg} width={50} height={50} alt="img" />
              </Box>
            ) : (
              <Avatar src="/profile.png" />
            )}

            <Box display="flex" flexDirection="column">
              <Typography variant="body2">{row.fullName}</Typography>
              <Typography variant="caption" color="textSecondary">
                {row.designation} {row?.user?.role}
                {/* | SEAT -{" "} {row.student.seatNumber} */}
              </Typography>
            </Box>
          </Box>
        );
      },
    },
    {
      field: "email",
      headerName: "Email",
      width: 250,
    },
    {
      field: "phoneNumber",
      headerName: "Contact Number",
      width: 180,
    },
    {
      field: "gender",
      headerName: "Gender",
      width: 150,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: ({ row }) => {
        return (
          <Box>
            <IconButton
              onClick={() => handleDelete(row.id)}
              aria-label="delete"
            >
              <DeleteIcon color="error" />
            </IconButton>

            <Link href={`/dashboard/admin/admin/edit/${row?.id}`}>
              <IconButton>
                <EditIcon />
              </IconButton>
            </Link>
          </Box>
        );
      },
    },
  ];

  return (
    <Box>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        pb={2}
      >
        <Button onClick={() => setIsModalOpen(true)}>Add Admin</Button>
        <AdminModal open={isModalOpen} setOpen={setIsModalOpen} />
        <TextField size="small" placeholder="Search Manager" />
      </Stack>

      {!isLoading ? (
        <Box>
          <DataGrid rows={data} columns={columns} rowHeight={60} hideFooter />
        </Box>
      ) : (
        <h1>Loading.......</h1>
      )}
    </Box>
  );
};

export default AdminPage;

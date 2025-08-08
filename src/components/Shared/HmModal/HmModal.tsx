"use client";
import * as React from "react";
import { styled, SxProps } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

export const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
  "& .MuiDialog-paper": {
    margin: { xs: theme.spacing(1), sm: theme.spacing(2) },
    maxWidth: { xs: "95vw", sm: "90vw", md: "80vw", lg: "70vw" },
    width: { xs: "95vw", sm: "90vw", md: "80vw", lg: "70vw" },
  },
}));

type TModalProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setError?: React.Dispatch<React.SetStateAction<string>> | undefined;
  title: string;
  children: React.ReactNode;
  sx?: SxProps;
};

export default function HmModal({
  open = false,
  setOpen,
  setError,
  title = "",
  children,
  sx,
}: TModalProps) {
  const handleClose = () => {
    setOpen(false);
    setError?.("");
  };

  return (
    <React.Fragment>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        sx={{ ...sx }}
      >
        <DialogTitle 
          sx={{ 
            m: 0, 
            p: { xs: 1, sm: 2 },
            fontSize: { xs: "16px", sm: "18px", md: "20px" }
          }} 
          id="customized-dialog-title"
        >
          {title}
        </DialogTitle>

        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: "absolute",
            right: { xs: 4, sm: 8 },
            top: { xs: 4, sm: 8 },
            color: theme.palette.grey[500],
            "& svg": {
              fontSize: { xs: "20px", sm: "24px" }
            }
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent 
          dividers
          sx={{
            p: { xs: 1, sm: 2 }
          }}
        >
          {children}
        </DialogContent>
      </BootstrapDialog>
    </React.Fragment>
  );
}

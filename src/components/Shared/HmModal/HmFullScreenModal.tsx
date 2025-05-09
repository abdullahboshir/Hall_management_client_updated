import * as React from "react";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { DialogContent, DialogTitle, SxProps } from "@mui/material";
import { BootstrapDialog } from "./HmModal";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<unknown>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

type TModalProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setError?: React.Dispatch<React.SetStateAction<string>> | undefined;
  title: string;
  children: React.ReactNode;
  sx?: SxProps;
};

export default function HmFullScreenModal({
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
        fullScreen
        open={open}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        sx={{ ...sx }}
        slots={{
          transition: Transition,
        }}
      >
        <DialogTitle
          sx={{ m: 0, p: 2, fontSize: "30px", fontWeight: "bold" }}
          id="customized-dialog-title"
        >
          {title}
        </DialogTitle>

        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>

        <DialogContent>{children}</DialogContent>
      </BootstrapDialog>
    </React.Fragment>
  );
}

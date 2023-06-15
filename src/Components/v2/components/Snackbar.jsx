import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { Transition } from "./Transition";

const MuiSnackbar = () => {
  const [open, setOpen] = useState(false);
  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const action = (
    <div>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </div>
  );

  return (
    <Snackbar
      className="snack_bar_container"
      open={open}
      onClose={handleClose}
      autoHideDuration={10000}
      message="Note Archived"
      action={action}
      TransitionComponent={Transition}
    />
  );
};

export default MuiSnackbar;

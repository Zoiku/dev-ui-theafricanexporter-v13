import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Transition } from "./Transition";
import { MaterialAlert } from "../../../Material/Alert";

const MuiSnackbar = ({ open, handleClose, message, severity }) => {
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
      open={open}
      onClose={handleClose}
      autoHideDuration={5000}
      action={action}
      TransitionComponent={Transition}
    >
      <MaterialAlert
        onClose={handleClose}
        severity={severity}
        sx={{ width: "100%" }}
      >
        {message}
      </MaterialAlert>
    </Snackbar>
  );
};

export default MuiSnackbar;

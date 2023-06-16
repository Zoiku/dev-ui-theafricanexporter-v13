import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { Puller, iOS } from "./SwipeableDrawerComponents";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { IconButton, Stack } from "@mui/material";
import { Close } from "@mui/icons-material/";
import "../../../Styles/v2/DrawerModal.css";

const DrawerModal = ({
  openState,
  toggleOpenState,
  children,
  title,
  boxStyle,
}) => {
  return (
    <>
      <SwipeableDrawer
        className="DrawerComponent"
        keepMounted
        variant="temporary"
        anchor="bottom"
        open={openState}
        onOpen={toggleOpenState(true)}
        onClose={toggleOpenState(false)}
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
      >
        <Box>
          <div className="drawer-title-container">
            <Puller />
            <div>{title}</div>
          </div>
          <div className="drawer-body-container">{children}</div>
        </Box>
      </SwipeableDrawer>

      <Modal
        className="ModalComponent"
        open={openState}
        onClose={toggleOpenState(false)}
        keepMounted
      >
        <Box className="modal_container" sx={boxStyle}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            className="modal_title_container"
          >
            <div>{title}</div>
            <IconButton onClick={toggleOpenState(false)} sx={{ padding: 0.1 }}>
              <Close />
            </IconButton>
          </Stack>
          <div className="modal_body_container">{children}</div>
        </Box>
      </Modal>
    </>
  );
};

export default DrawerModal;

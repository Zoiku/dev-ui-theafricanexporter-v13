import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { Puller } from "./SwipeableDrawerComponents";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { IconButton, Stack } from "@mui/material";
import { Close } from "@mui/icons-material/";
import Slide from "@mui/material/Slide/Slide";
import "../../../Styles/v2/DrawerModal.css";

const DrawerModal = ({
  openState,
  toggleOpenState,
  children,
  title,
  boxStyle,
  showCloseButton = true,
  modalClassName = "modal_container",
  direction = "up",
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
        onClose={
          showCloseButton ? toggleOpenState(false) : toggleOpenState(true)
        }
      >
        <Box className="drawer_container">
          <div className="drawer-title-container">
            <Puller />
            <div className="drawer-title-text">{title}</div>
          </div>
          <div className="drawer-body-container">{children}</div>
        </Box>
      </SwipeableDrawer>

      <Modal
        className="ModalComponent"
        open={openState}
        onClose={
          showCloseButton ? toggleOpenState(false) : toggleOpenState(true)
        }
        keepMounted
      >
        <Slide style={boxStyle} in={openState} direction={direction}>
          <Box className={modalClassName}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              className="modal_title_container"
            >
              <div>{title}</div>
              {showCloseButton && (
                <IconButton
                  onClick={toggleOpenState(false)}
                  sx={{ padding: 0.1 }}
                >
                  <Close />
                </IconButton>
              )}
            </Stack>
            <div className="modal_body_container">{children}</div>
          </Box>
        </Slide>
      </Modal>
    </>
  );
};

export default DrawerModal;

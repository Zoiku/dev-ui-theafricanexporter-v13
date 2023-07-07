import React from "react";
import { Menu } from "@mui/material";

const MuiMenu = ({ anchorEl, toggleAnchorEl, children }) => {
  const open = Boolean(anchorEl);
  
  return (
    <Menu
      elevation={3}
      anchorEl={anchorEl}
      id="account-menu"
      open={open}
      onClose={toggleAnchorEl(false)}
      onClick={toggleAnchorEl(false)}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
    >
      {children}
    </Menu>
  );
};

export default MuiMenu;

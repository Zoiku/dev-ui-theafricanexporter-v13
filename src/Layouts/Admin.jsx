import "../Styles/AppLayout.css";
import { Outlet } from "react-router-dom";
import Nav from "../Components/Admin/Nav";
import { Box, Stack } from "@mui/material";
import AppMenu from "../Components/v2/components/AppMenu";

const AdminLayout = () => {
  return (
    <Stack direction="column" className="app-layout">
      <div className="app-layout-nav">
        <Nav />
      </div>
      <Stack className="app-layout-workspace" direction="row">
        <div className="app-layout-menu">
          <AppMenu />
        </div>
        <Stack
          direction="row"
          justifyContent="center"
          className="app-layout-body-container"
        >
          <div className="app-layout-body">
            <Outlet />
          </div>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default AdminLayout;

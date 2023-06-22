import "../Styles/AppLayout.css";
import { Outlet } from "react-router-dom";
import Nav from "../Components/Buyer/Nav";
// import Menu from "../Components/Buyer/Menu";
import { useState, useEffect } from "react";
import Tutorial from "../Components/Tutorial";
import AppMenu from "../Components/v2/components/AppMenu";
import { Stack } from "@mui/material";

const BuyerLayout = ({ session }) => {
  const { user } = session;
  const [notLoggedBefore, setNotLoggedBefore] = useState(false);

  useEffect(() => {
    if (user.hasOwnProperty("profile")) {
      const { isLoggedBefore } = user.profile;

      if (isLoggedBefore !== undefined) {
        if (isLoggedBefore) {
          setNotLoggedBefore(false);
        } else {
          setNotLoggedBefore(true);
        }
      }
    }
  }, [user]);

  return notLoggedBefore ? (
    <Tutorial user={user} openDrawer={notLoggedBefore} />
  ) : (
    <Stack direction="column" className="app-layout">
      <div className="app-layout-nav">
        <Nav session={session} />
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

export default BuyerLayout;
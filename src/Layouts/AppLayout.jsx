import "../Styles/v2/AppLayout.css";
import { Stack } from "@mui/material";
import AppMenu, { AppBottomMenu } from "../Components/v2/components/AppMenu";

const AppLayout = ({ nav, children, userType }) => {
  return (
    <Stack direction="column" className="app-layout">
      <div className="app-layout-nav">{nav}</div>
      <Stack className="app-layout-workspace" direction="row">
        <div className="app-layout-menu">
          <AppMenu base={userType} />
        </div>
        <Stack
          direction="row"
          justifyContent="center"
          className="app-layout-body-container"
        >
          <div className="app-layout-body">{children}</div>
        </Stack>
      </Stack>
      <div className="app-layout-bottom-menu">
        <AppBottomMenu base={userType} />
      </div>
    </Stack>
  );
};

export default AppLayout;

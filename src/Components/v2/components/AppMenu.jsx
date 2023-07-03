import "../../../Styles/v2/AppMenu.css";
import { Stack, Tooltip } from "@mui/material";
import { NavLink } from "react-router-dom";
import { menuList, bottomMenuList } from "./AppMenuLists";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { useState } from "react";
import { Link } from "react-router-dom";
import Tutorial from "../components/Tutorial";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";

const AppMenu = ({ base }) => {
  const [openTutorialView, setOpenTutorialView] = useState(false);
  const toggleOpenTutorialView = (open) => () => {
    setOpenTutorialView(open);
  };

  return (
    <menu className="app-menu">
      <div className="app-menu-items">
        {menuList[base]?.map((menuLink, index) => (
          <div key={index} style={{ marginBottom: 15 }}>
            <NavLink
              end
              className="app-menu-item"
              to={`/${base}/${menuLink.to}`}
            >
              <Stack direction="row" alignItems="center" spacing={2}>
                <Stack
                  className="app-menu-icon"
                  direction="row"
                  alignItems="center"
                >
                  {menuLink.icon}
                </Stack>
                <div className="app-menu-label">{menuLink.label}</div>
              </Stack>
            </NavLink>
          </div>
        ))}

        {base !== "Admin" && (
          <>
            <Tutorial
              openTutorialView={openTutorialView}
              setOpenTutorialView={setOpenTutorialView}
            />

            <Stack className="tutorial-app-menu-items">
              <Stack
                direction="row"
                alignItems="center"
                className="app-menu-item tutorial-app-menu-item"
                spacing={2}
                onClick={toggleOpenTutorialView(true)}
              >
                <Tooltip placement="right" title="Open Walkthrough">
                  <Stack
                    direction="row"
                    alignItems="center"
                    className="app-menu-icon tutorial-app-menu-icon"
                  >
                    <ContactSupportIcon />
                  </Stack>
                </Tooltip>
              </Stack>
            </Stack>
          </>
        )}
      </div>
    </menu>
  );
};

export const AppBottomMenu = ({ base }) => {
  const pathname = window.location.pathname;
  const [value, setValue] = useState(pathname);
  const handleChange = (_, newValue) => {
    setValue(newValue);
  };

  return (
    <menu
      className="app-bottom-menu"
      style={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
    >
      <BottomNavigation showLabels value={value} onChange={handleChange}>
        {bottomMenuList[base]?.map((menuLink, index) => (
          <BottomNavigationAction
            key={index}
            component={Link}
            to={`/${base}/${menuLink.to}`}
            value={`/${base}/${menuLink.to}`}
            label={menuLink.label}
            icon={menuLink.icon}
          />
        ))}
      </BottomNavigation>
    </menu>
  );
};

export default AppMenu;

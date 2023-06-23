import { Stack } from "@mui/material";
import { NavLink } from "react-router-dom";
import "../../../Styles/v2/AppMenu.css";
import { menuList } from "./AppMenuLists";

const AppMenu = ({ base }) => {
  return (
    <menu className="app-menu">
      <div className="app-menu-items">
        {menuList[base]?.map((menuLink, index) => (
          <div key={index} style={{ marginBottom: 15 }}>
            <NavLink className="app-menu-item" to={`/${base}/${menuLink.to}`}>
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
      </div>
    </menu>
  );
};

export default AppMenu;

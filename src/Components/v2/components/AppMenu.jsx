import BarChartRoundedIcon from "@mui/icons-material/BarChartRounded";
import RequestQuoteRoundedIcon from "@mui/icons-material/RequestQuoteRounded";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import ShoppingCartCheckoutRoundedIcon from "@mui/icons-material/ShoppingCartCheckoutRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import PeopleOutlineRoundedIcon from "@mui/icons-material/PeopleOutlineRounded";
import { Stack } from "@mui/material";
import { NavLink } from "react-router-dom";
import "../../../Styles/v2/AppMenu.css";

const AppMenu = ({ base }) => {
  const menuLinks = [
    { label: "Dashboard", icon: <BarChartRoundedIcon />, to: "dashboard" },
    { label: "Users", icon: <PeopleOutlineRoundedIcon />, to: "users" },
    { label: "Requests", icon: <DescriptionRoundedIcon />, to: "requests" },
    { label: "Quotation", icon: <RequestQuoteRoundedIcon />, to: "quotations" },
    {
      label: "Orders",
      icon: <ShoppingCartCheckoutRoundedIcon />,
      to: "orders",
    },
    { label: "Settings", icon: <SettingsRoundedIcon />, to: "settings" },
  ];

  return (
    <menu className="app-menu">
      <div className="app-menu-items">
        {menuLinks.map((menuLink) => (
          <div style={{ marginBottom: 15 }}>
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

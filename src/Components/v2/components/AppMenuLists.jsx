import BarChartRoundedIcon from "@mui/icons-material/BarChartRounded";
import RequestQuoteRoundedIcon from "@mui/icons-material/RequestQuoteRounded";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import ShoppingCartCheckoutRoundedIcon from "@mui/icons-material/ShoppingCartCheckoutRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import PeopleOutlineRoundedIcon from "@mui/icons-material/PeopleOutlineRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";

export const menuList = {
  buyer: [
    { label: "Home", icon: <HomeRoundedIcon />, to: "" },
    { label: "Dashboard", icon: <BarChartRoundedIcon />, to: "dashboard" },
    { label: "Requests", icon: <DescriptionRoundedIcon />, to: "requests" },
    {
      label: "Orders",
      icon: <ShoppingCartCheckoutRoundedIcon />,
      to: "orders",
    },
    { label: "Settings", icon: <SettingsRoundedIcon />, to: "settings" },
  ],
  merchant: [
    { label: "Dashboard", icon: <BarChartRoundedIcon />, to: "dashboard" },
    { label: "Requests", icon: <DescriptionRoundedIcon />, to: "requests" },
    {
      label: "Quotation",
      icon: <RequestQuoteRoundedIcon />,
      to: "quotations",
    },
    {
      label: "Orders",
      icon: <ShoppingCartCheckoutRoundedIcon />,
      to: "orders",
    },
    { label: "Settings", icon: <SettingsRoundedIcon />, to: "settings" },
  ],
  admin: [
    { label: "Dashboard", icon: <BarChartRoundedIcon />, to: "dashboard" },
    { label: "Users", icon: <PeopleOutlineRoundedIcon />, to: "users" },
    { label: "Requests", icon: <DescriptionRoundedIcon />, to: "requests" },
    {
      label: "Orders",
      icon: <ShoppingCartCheckoutRoundedIcon />,
      to: "orders",
    },
  ],
};

export const bottomMenuList = {
  buyer: [
    { label: "Home", icon: <HomeRoundedIcon />, to: "" },
    { label: "Dashboard", icon: <BarChartRoundedIcon />, to: "dashboard" },
    { label: "Requests", icon: <DescriptionRoundedIcon />, to: "requests" },
    {
      label: "Orders",
      icon: <ShoppingCartCheckoutRoundedIcon />,
      to: "orders",
    },
    { label: "Settings", icon: <SettingsRoundedIcon />, to: "settings" },
  ],
  merchant: [
    { label: "Dashboard", icon: <BarChartRoundedIcon />, to: "dashboard" },
    { label: "Requests", icon: <DescriptionRoundedIcon />, to: "requests" },
    {
      label: "Quotation",
      icon: <RequestQuoteRoundedIcon />,
      to: "quotations",
    },
    {
      label: "Orders",
      icon: <ShoppingCartCheckoutRoundedIcon />,
      to: "orders",
    },
    { label: "Settings", icon: <SettingsRoundedIcon />, to: "settings" },
  ],
  admin: [
    { label: "Home", icon: <HomeRoundedIcon />, to: "" },
    { label: "Dashboard", icon: <BarChartRoundedIcon />, to: "dashboard" },
    { label: "Users", icon: <PeopleOutlineRoundedIcon />, to: "users" },
    { label: "Requests", icon: <DescriptionRoundedIcon />, to: "requests" },
    {
      label: "Orders",
      icon: <ShoppingCartCheckoutRoundedIcon />,
      to: "orders",
    },
  ],
};

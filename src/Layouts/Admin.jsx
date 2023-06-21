import "../Styles/AppLayout.css";
import { Outlet } from "react-router-dom";
import Nav from "../Components/Admin/Nav";
import Menu from "../Components/Admin/Menu";
import AppNav from "../Components/Admin/AppNav";

const AdminLayout = () => {
  return (
    <div className="Admin-Layout App-Layout">
      <Nav />
      <div className="app-container">
        <div className="app-menu-container">
          <Menu />
        </div>
        <div className="app-body-container">
          <div className="app-body">
            <Outlet />
          </div>
        </div>
        <div className="app-bottom-navigation">
          <AppNav />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;

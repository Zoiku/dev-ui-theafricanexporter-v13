import { Outlet } from "react-router-dom";
import Nav from "../Components/Admin/Nav";
import AppLayout from "./AppLayout";

const AdminLayout = () => {
  return (
    <AppLayout nav={<Nav />} userType={"admin"}>
      <Outlet />
    </AppLayout>
  );
};

export default AdminLayout;

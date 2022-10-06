import { Outlet } from "react-router-dom"
import { ROLES } from "./Roles"
import Redirect from "../Components/Redirect";

const ProtectedBuyerRoutes = ({ session }) => session.isLogged && session.user.role === ROLES.BUYER ? <Outlet /> : <Redirect path="/login" />

export default ProtectedBuyerRoutes;
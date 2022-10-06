import { Outlet } from "react-router-dom"
import { ROLES } from "./Roles"
import Redirect from "../Components/Redirect";

const ProtectedAdminRoutes = ({ session }) => session.isLogged && session.user.role === ROLES.ADMIN ? <Outlet /> : <Redirect path="/login" />

export default ProtectedAdminRoutes;
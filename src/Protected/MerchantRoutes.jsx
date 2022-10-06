import { Outlet } from "react-router-dom"
import { ROLES } from "./Roles"
import Redirect from "../Components/Redirect";

const ProtectedMerchantRoutes = ({ session }) => session.isLogged && session.user.role === ROLES.MERCHANT ? <Outlet /> : <Redirect path="/login" />

export default ProtectedMerchantRoutes;
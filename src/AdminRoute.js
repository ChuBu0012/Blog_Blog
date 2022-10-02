import { getusername } from "./service/authorize";
import { Navigate, Outlet } from "react-router-dom";

const AdminRoute = () => {
    return getusername() ? <Outlet /> : <Navigate to="/login" />;
}

export default AdminRoute;

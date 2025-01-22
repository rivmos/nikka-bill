import useAuth from "@/utils/hooks/useAuth"
import { Navigate, Outlet } from "react-router"
import appConfig from "@/config/app.config";

const ProtectedRoute = () => {

    const { authenticated } = useAuth();

    return (
        authenticated ? <Outlet /> : <Navigate to={appConfig.unAuthenticatedEntryPath} />
    )
}

export default ProtectedRoute
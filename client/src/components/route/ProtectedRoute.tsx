import useAuth from "@/utils/hooks/useAuth"
import { Outlet } from "react-router"

const ProtectedRoute = () => {

    const { authenticated } = useAuth();

    return (
        authenticated ? <Outlet /> : <Outlet />
    )
}

export default ProtectedRoute
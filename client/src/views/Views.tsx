// import ProtectedRoute from "@/components/route/ProtectedRoute"
import PublicRoute from "@/components/route/PublicRoute"
import { protectedRoutes, publicRoutes } from "@/config/routes.config/routes.config"
import { Navigate, Route, Routes } from "react-router"
import Home from "./Home"
import ProtectedRoute from "@/components/route/ProtectedRoute"
import appConfig from "@/config/app.config"

const AllRoutes = () => {
  return (
    <Routes>

      <Route path="/" element={<ProtectedRoute />}>
        <Route
          path="/"
          element={<Navigate replace to={appConfig.authenticatedEntryPath} />}
        />
        {
          protectedRoutes.map(publicRoute => <Route path={publicRoute.path} key={publicRoute.key} element={<publicRoute.component />} />)
        }
      </Route>

      <Route path="/" element={<PublicRoute />}>
        <Route />
        <Route index element={<Home />} />
        {
          publicRoutes.map(publicRoute => <Route path={publicRoute.path} key={publicRoute.key} element={<publicRoute.component />} />)
        }
      </Route>

    </Routes>
  )
}

const Views = () => {
  return (
    <AllRoutes />
  )
}

export default Views
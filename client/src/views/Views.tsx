// import ProtectedRoute from "@/components/route/ProtectedRoute"
import PublicRoute from "@/components/route/PublicRoute"
import { publicRoutes } from "@/config/routes.config/routes.config"
import { Route, Routes } from "react-router"
import Home from "./Home"

const AllRoutes = () => {
  return (
    <Routes>

      {/* <Route path="/" element={<ProtectedRoute />}>

      </Route> */}

      <Route path="/" element={<PublicRoute />}>
      <Route />
        <Route index element={<Home />}/>
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
import { Route } from "@/@types/routes";
import authRoutes from "./authRoutes";
import appRoutes from "./appRoutes";

export const publicRoutes: Route[] = [
    ...authRoutes
]
export const protectedRoutes: Route[] = [
    ...appRoutes
]


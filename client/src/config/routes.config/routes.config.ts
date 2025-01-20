import { Route } from "@/@types/routes";
import authRoutes from "./authRoutes";

export const publicRoutes: Route[] = [
    ...authRoutes
]
export const protectedRoutes: Route[] = []


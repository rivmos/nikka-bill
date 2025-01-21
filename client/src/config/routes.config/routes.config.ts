import { Route } from "@/@types/routes";
import authRoutes from "./authRoutes";
import { lazy } from "react";

export const publicRoutes: Route[] = [
    ...authRoutes,
    {
        key:'invoice.create',
        authority:[],
        component: lazy(() => import('@/views/app/invoices/create/CreateInvoice')),
        path:'/create'
    }
]
export const protectedRoutes: Route[] = []


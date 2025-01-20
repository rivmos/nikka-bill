import { Route } from "@/@types/routes";
import { lazy } from "react";

const authRoutes:Route[] = [
    {
        key:"auth.signup",
        path:'/signup',
        component: lazy(() => import('@/views/auth/Signup')),
        authority:[],
    }
];

export default authRoutes;
import { Route } from "@/@types/routes";
import { lazy } from "react";

const authRoutes:Route[] = [
    {
        key:"auth.signup",
        path:'/sign-up',
        component: lazy(() => import('@/views/auth/Signup')),
        authority:[],
    },
    {
        key:"auth.signin",
        path:'/sign-in',
        component: lazy(() => import('@/views/auth/Login')),
        authority:[],
    }
];

export default authRoutes;
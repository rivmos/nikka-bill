import { Route } from "@/@types/routes";
import { lazy } from "react";

const authRoutes:Route[] = [
    {
        key:"auth.signup",
        path:'/sign-up',
        component: lazy(() => import('@/views/auth/CompanySignUp')),
        authority:[],
    },
    {
        key:"auth.signin",
        path:'/sign-in',
        component: lazy(() => import('@/views/auth/SignIn')),
        authority:[],
    },
    {
        key:"auth.signup.user",
        path:'/sign-up/user',
        component: lazy(() => import('@/views/auth/UserSignup')),
        authority:[],
    }
];

export default authRoutes;
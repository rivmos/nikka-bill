import { Route } from "@/@types/routes";
import { lazy } from "react";

const appRoutes:Route[] = [
    {
        key:'invoice.create',
        authority:[],
        component: lazy(() => import('@/views/app/invoices/create/CreateInvoice')),
        path:'/create-invoice'
    },
    {
        key:'products.add',
        authority:[],
        component: lazy(() => import('@/views/app/products/add/ProductForm')),
        path:'/add-product'
    },
    {
        key:'products.list',
        authority:[],
        component: lazy(() => import('@/views/app/products/list/ProductList')),
        path:'/products-list'
    },
    {
        key:'customers.add',
        authority:[],
        component: lazy(() => import('@/views/app/customers/add/CustomerForm')),
        path:'/add-customer'
    },
    {
        key:'customers.list',
        authority:[],
        component: lazy(() => import('@/views/app/customers/list/CustomerList')),
        path:'/customers-list'
    },
    {
        key:'users.list',
        authority:[],
        component: lazy(() => import('@/views/app/users/list/UserList')),
        path:'/users-list'
    }
];

export default appRoutes;
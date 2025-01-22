import useAuth from "@/utils/hooks/useAuth";
import { lazy, Suspense, useEffect, useState } from "react";

const layouts = {
    auth: lazy(() => import('./AuthLayout')),
    app: lazy(() => import('./ModernLayout')),
}

const Layout = () => {

    const { authenticated } = useAuth();

    const [AppLayout, setAppLayout] = useState<React.LazyExoticComponent<any> | null>(null);

    useEffect(() => {

        let newLayout: React.LazyExoticComponent<any> | null = null

        if (authenticated) {
            newLayout = layouts['app']
        } else {
            newLayout = layouts['auth']
        }

        setAppLayout(newLayout)

    }, [authenticated])

    if(!AppLayout) {
        return <div>Loading....</div>
    }

    return (
        <Suspense fallback={<div className="flex flex-auto flex-col h-screen">Loading....</div>}>
            <AppLayout />
        </Suspense>
    )
}

export default Layout
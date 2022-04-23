import React from "react"
import Dashboard from "../pages/Dashboard"
import Home from "../pages/Home"
import Ping from "../pages/Ping"

interface Route {
    path: string
    component: (any: any) => JSX.Element
}


const routes: Route[] = [
    {
        path: "/ping",
        component: Ping,
    },
    {
        path: "/",
        component: Home
    },
    {
        path: "/dashboard",
        component: Dashboard
    }
]

export default routes
import React from "react"
import Ping from "../pages/Ping"

interface Route {
    path: string
    component: () => JSX.Element
    exact?: boolean // defaults to true
}


const routes: Route[] = [
    {
        path: "/ping",
        component: Ping,
    }
]

export default routes
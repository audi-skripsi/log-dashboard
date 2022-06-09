import React from "react";
import Analytics from "../pages/Analytics";
import Dashboard from "../pages/Dashboard";
import Home from "../pages/Home";
import Ping from "../pages/Ping";

interface Route {
  path: string;
  component: (any: any) => JSX.Element;
  index?: boolean;
  title?: string;
}

export const routes: Route[] = [
  {
    path: "/ping",
    component: Ping,
  },
  {
    path: "/",
    component: Home,
  },
];

export const dashboardRoutes: Route[] = [
  {
    path: "",
    component: Dashboard,
    index: true,
    title: "Dashboard",
  },
  {
    path: "analytics",
    component: Analytics,
    index: true,
    title: "Analytics",
  },
];

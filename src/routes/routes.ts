import React from "react";
import Dashboard from "../pages/Dashboard";
import Home from "../pages/Home";
import Microservice from "../pages/Microservice";
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
    path: ":microserviceId",
    component: Microservice,
    index: true,
    title: "Microservice Data",
  },
];

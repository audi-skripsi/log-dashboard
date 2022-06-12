import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashboardContentLayout from "./layouts/DashboardContentLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import { routes, dashboardRoutes } from "./routes/routes";
import MicroserviceDataProvider from "./services/providers/MicroserviceDataProvider";

function App() {
  return (
    <div className="App">
      <ChakraProvider>
        <MicroserviceDataProvider>
          <BrowserRouter>
            <Routes>
              {routes.map((route, i) => (
                <Route
                  key={i}
                  path={route.path}
                  element={<route.component />}
                />
              ))}
              <Route path="/dashboard" element={<DashboardLayout />}>
                {dashboardRoutes.map((route, i) => (
                  <Route
                    index={route.index}
                    key={i}
                    path={route.path}
                    element={
                      <DashboardContentLayout title={route.title}>
                        <route.component />
                      </DashboardContentLayout>
                    }
                  />
                ))}
              </Route>
            </Routes>
            <Routes></Routes>
          </BrowserRouter>
        </MicroserviceDataProvider>
      </ChakraProvider>
    </div>
  );
}

export default App;

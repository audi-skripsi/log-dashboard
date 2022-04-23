import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import routes from "./routes/routes";

function App() {
  return (
    <div className="App">
      <ChakraProvider>
        <BrowserRouter>
          <Routes>
            {routes.map((route, i) => (
              <Route key={i} path={route.path} element={<route.component />} />
            ))}
          </Routes>
        </BrowserRouter>
      </ChakraProvider>
    </div>
  );
}

export default App;

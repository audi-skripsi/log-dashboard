import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import routes from './routes/routes';


function App() {
  return (
    <div className="App">
      <ChakraProvider>
        <BrowserRouter>
          <Switch>
            {
              routes.map((route, i) => (
                <Route
                  path={route.path}
                  component={route.component}
                  exact={route.exact? route.exact : route.exact === undefined && true}
                />
              ))
            }
          </Switch>
        </BrowserRouter>
      </ChakraProvider>
    </div>
  );
}

export default App;

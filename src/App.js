import Register from "./components/Register";
import ipConfig from "./ipConfig.json";
import { Route, Switch } from "react-router-dom";
import Login from "./components/Login";
import Products from "./components/Products";
import checkout from "./components/Checkout";
import { ThemeProvider } from "@mui/system";
import theme from "./theme";
import React from 'react';
import { BrowserRouter as Router} from "react-router-dom";
export const config = {
  endpoint: `https://onlinestore123456.herokuapp.com/api/v1`,
};

function App() {
  return (
    <React.StrictMode>
    <ThemeProvider theme={theme}>
    <div className="App">
      <Router>
      
      {/* TODO: CRIO_TASK_MODULE_LOGIN - To add configure routes and their mapping */}
      <Switch>
      <Route path="/" exact component={Products}></Route>
          <Route path="/login" component={Login}></Route>
          <Route path="/register" component={Register}></Route>
          <Route path="/checkout" component={checkout}></Route>
      </Switch>
       </Router>
    </div>
    </ThemeProvider>
    </React.StrictMode>
  );
}

export default App;

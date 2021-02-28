import React from "react";
import { Route } from "react-router-dom";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { PRIMARY_COLOR } from "./config";
import Login from "./containers/Login";
import Register from "./containers/Register";
import Dashboard from "./containers/Dashboard";


import { BrowserRouter } from "react-router-dom";

export default function App() {
  let DashboardTheme = createMuiTheme({
    palette: {
      primary: {
        main: PRIMARY_COLOR,
      },
      // secondary: {
      //   main: "#db0007",
      // },
    },
  });

  return (
    <ThemeProvider theme={DashboardTheme}>
      <BrowserRouter basename={"/"}>
        <div>
          <Route exact path="/" component={Login} />
          <Route exact path="/Register" component={Register} />
          <Route exact path="/Dashboard" component={Dashboard} />
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

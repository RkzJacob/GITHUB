import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/styles/tailwind.css";
import { DataContextProvider } from "components/Funciones/context";
// layouts

import Admin from "layouts/Admin.js";

// views without layouts

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <DataContextProvider>
      {/* add routes with layouts */}
      <Route path="/admin" component={Admin} />
      {/* add routes without layouts */}
      <Route path="/" exact component={Admin} />
      {/* add redirect for first page */}
      <Redirect from="*" to="/admin/dashboard" />
      </DataContextProvider>
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);

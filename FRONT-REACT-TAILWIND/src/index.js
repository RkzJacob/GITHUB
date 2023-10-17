import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/styles/tailwind.css";
import { DataContextProvider } from "components/Funciones/context";
import { AuthProvider } from "components/Funciones/authContext";
// layouts

import Admin from "layouts/Admin.js";
import LoginForm from "components/login/login";
import PrivateRoute from "components/Funciones/privateRoute";
import { PermisoProvider } from "components/Funciones/Permisos";

// views without layouts

ReactDOM.render(
  <BrowserRouter>
    <Switch>
    <AuthProvider>
    <PermisoProvider>
      <DataContextProvider>
      {/* add routes with layouts */}
      <Route path="/login" component={LoginForm} />
      {/* add routes without layouts */}
      <PrivateRoute path="/admin" component={Admin} />
      <Route path="/" exact component={LoginForm} />
      {/* add redirect for first page */}
      <Redirect from="*" to="/" />
      </DataContextProvider>
      </PermisoProvider>
      </AuthProvider>
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);

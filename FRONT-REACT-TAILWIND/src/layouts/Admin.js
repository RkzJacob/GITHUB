import React from "react";
import { Switch,  Redirect } from "react-router-dom";

// components


import Sidebar from "components/Sidebar/Sidebar.js";
import HeaderStats from "components/Headers/HeaderStats.js";
import FooterAdmin from "components/Footers/FooterAdmin.js";

// views

import Dashboard from "views/admin/Dashboard.js";
import Tables from "views/admin/Tables.js";
import Tables2 from "views/admin/TableXLS";
import NavbarHome from "components/Navbars/HomeNavbar";
import PrivateRoute from "components/Funciones/privateRoute";

export default function Admin() {

  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-black">
      <NavbarHome/>
      
        {/* Header */}
        <HeaderStats />
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          <Switch>
            <PrivateRoute path="/admin/dashboard" exact component={Dashboard} />
            <PrivateRoute path="/admin/tables" exact component={Tables} />
            <PrivateRoute path="/admin/tableXLS" exact component={Tables2} />
            <Redirect from="/admin" to="/admin/dashboard" />
            <Redirect from="*" to="/admin/dashboard" />
          </Switch>
          <FooterAdmin />
        </div>
      </div>
    </>
  );
}

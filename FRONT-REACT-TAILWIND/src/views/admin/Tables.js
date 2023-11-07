import React from "react";

// components

import CardTable from "components/Cards/CardTable.js";
import NavbarHome from "components/Navbars/HomeNavbar";

export default function Tables() {
  return (
    <>
      <div className="flex flex-wrap mt-4 fullscreen3">

      <div className="w-full">
          <NavbarHome />
        </div>

        
        <div className="w-full xl:w-14/14 px-14 mt-20">
          <CardTable color="dark" />
        </div>
        
      </div>
    </>
  );
}

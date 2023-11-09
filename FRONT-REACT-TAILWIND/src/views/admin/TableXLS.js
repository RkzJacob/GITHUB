import React from "react";

// components


import GenerarXLS from "components/Cards/GenerarXLS";
import NavbarHome from "components/Navbars/HomeNavbar";




export default function Tables2() {
  return (
    <>
      <div className="flex flex-wrap mt-4 fullscreen3">

      <div className="w-full">
          <NavbarHome/>
        </div>

        

        <div className="w-full xl:w-14/14 px-14 mt-20">
          <GenerarXLS color="dark" />
        </div>

      </div>

    </>
  );
}

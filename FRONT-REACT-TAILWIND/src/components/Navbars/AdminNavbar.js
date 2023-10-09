import React, { useState } from "react";
import { ConsumirApi } from "components/Funciones/api";


export default function Navbar(changeKPI) {

  return (
    <>
      {/* Navbar */}
      <nav className="absolute top-0 left-0 w-full z-10 bg-transparent md:flex-row md:flex-nowrap md:justify-start flex items-center p-4">
      <ConsumirApi changeKPI={changeKPI} />
      </nav>
      {/* End Navbar */}
    </>
  );
}

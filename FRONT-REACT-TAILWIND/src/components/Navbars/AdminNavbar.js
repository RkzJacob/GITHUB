import React, { useState } from "react";
import { ConsumirApi } from "components/Funciones/api";


export default function Navbar({chartsData}) {
  

  const [datosA, estableceDatos] = useState('');

  const datosApi = (datos) => {
    estableceDatos(datos);
    console.log(datosA);
    chartsData(datosA)
  }

  return (
    <>
      {/* Navbar */}
      <nav className="absolute top-0 left-0 w-full z-10 bg-transparent md:flex-row md:flex-nowrap md:justify-start flex items-center p-4">
      <ConsumirApi datosApi={datosApi} />

      </nav>
      {/* End Navbar */}
    </>
  );
}

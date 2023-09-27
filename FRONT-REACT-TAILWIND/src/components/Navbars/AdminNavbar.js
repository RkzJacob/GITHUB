import React, { useState } from "react";

export default function AdminNavbar({ onKPIChange }) {
  const [selectedKPI, setSelectedKPI] = useState("Defectos por Tipo");

  const handleKPIChange = (event) => {
    const newKPI = event.target.value;
    setSelectedKPI(newKPI);
    onKPIChange(newKPI);
  };
  
  return (
    <>
      <nav className="absolute top-0 left-0 w-full z-10 bg-transparent md:flex-row md:flex-nowrap md:justify-start flex items-center p-4">
        <div className="w-full mx-auto items-center flex justify-between md:flex-nowrap flex-wrap md:px-10 px-4">
          {/* ... Otro contenido ... */}

          {/* Selector de KPI */}
          <div className="md:w-1/3 w-full px-4">
            <label className="block uppercase text-white text-xs font-bold mb-2">
              Seleccionar KPI
            </label>
            <select
              className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring w-full"
              onChange={handleKPIChange}
              value={selectedKPI}
            >
              <option value="Defectos por Tipo">Defectos por Tipo</option>
              <option value="Defectos por Sector">Defectos por Sector</option>
            </select>
          </div>

          {/* Nombre del KPI seleccionado */}
          <div className="md:w-1/3 w-full text-center">
            <h2 className="text-white text-xl font-semibold">{selectedKPI}</h2>
          </div>

          {/* Resto del contenido */}
        </div>
      </nav>
      {/* End Navbar */}
    </>
  );

}

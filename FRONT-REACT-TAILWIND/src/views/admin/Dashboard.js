import React from "react";
// components
import AdminNavbar from "components/Navbars/AdminNavbar";
import GraficoBarrasCompleto from "components/Cards/GraficoBarrasCompleto.js";
import TablaDatos from "components/Cards/TablaDatos.js";
import PieChart from "components/Cards/PieChart.js"


export default function Dashboard() {
  return (
    // Sección principal del dashboard
    <>

      <div className="flex flex-wrap">
        <div className="w-full">
          {/* Navbar para la administración */}
          <AdminNavbar />
        </div>
        {/* Sección para el gráfico de pastel (PieChart) */}
        <div className="w-1/2 xl:w-1/2 px-4 mt-20 bg-neutral">
          <PieChart />
        </div>

        {/* Sección para la tabla de datos (TablaDatos) */}
        <div className="w-1/2 xl:w-1/2 px-4 mt-20 ">
          <TablaDatos />
        </div>
        <div className="w-1/2 xl:w-1/2 px-4 mt-10 ">
        </div>
        {/* Sección para el gráfico de barras completo (GraficoBarrasCompleto) */}
        <div className="w-full xl:w-1/2 px-4 bg-neutral">
          <GraficoBarrasCompleto />
        </div>


      </div>

      {/* ------------------- */}



    </>

  );
}
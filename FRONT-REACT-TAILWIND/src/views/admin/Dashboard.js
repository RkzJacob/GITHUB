import React from "react";
// components
import AdminNavbar from "components/Navbars/AdminNavbar";
import GraficoBarrasCompleto from "components/Cards/GraficoBarrasCompleto.js";

import TablaDatos from "components/Cards/TablaDatos.js";
import PieChart from "components/Cards/PieChart.js"


export default function Dashboard() {
  return (

    <>

      <div className="flex flex-wrap">
        <div className="w-full">
          <AdminNavbar />
        </div>

        <div className="w-1/2 xl:w-1/2 px-4 mt-20 bg-neutral">
          <PieChart/>
        </div>


        <div className="w-1/2 xl:w-1/2 px-4 mt-20 ">
          <TablaDatos/>
        </div>
        <div className="w-1/2 xl:w-1/2 px-4 mt-10 ">

        </div>
        <div className="w-full xl:w-1/2 px-4 bg-neutral">
          <GraficoBarrasCompleto/>
        </div>


      </div>

      {/* ------------------- */}



    </>

  );
}
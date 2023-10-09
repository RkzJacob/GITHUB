import React, { useState, useEffect } from "react";
// components
import AdminNavbar from "components/Navbars/AdminNavbar";
import GraficoBarrasCompleto from "components/Cards/GraficoBarrasCompleto.js";
import CardLineChart from "components/Cards/CardLineChart.js";
import PieChart from "components/Cards/PieChart.js"

export default function Dashboard() {
  
  return (
    <>
      <AdminNavbar />
      <div className="flex flex-wrap">
      
      <div className="w-full xl:w-14/14 px-14">
        <GraficoBarrasCompleto />
      </div>

      <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
        <CardLineChart />
      </div>

      <div className="w-full xl:w-4/12 px-4">
        <PieChart />
      </div>   
        

      </div>

      {/* ------------------- */}

      <div className="flex flex-wrap mt-4">

      </div>
    </>
  );
}
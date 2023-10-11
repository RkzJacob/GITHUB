import React, { useState, useEffect } from "react";
// components
import AdminNavbar from "components/Navbars/AdminNavbar";
import GraficoBarrasCompleto from "components/Cards/GraficoBarrasCompleto.js";
import CardLineChart from "components/Cards/CardLineChart.js";
import PieChart from "components/Cards/PieChart.js"
import ConsumirApi from "components/Funciones/api";

export default function Dashboard() {

  const [pieChartData, setPieChartData] = useState([]); // Sirve para cargar el estado en piechart.
  
  const updatePieChartData = (data) => {
    setPieChartData(data);
  };

  const chartsData = (datos) => {
    console.log('entre2')
    //console.log(datos);
  };
  
  return (
    <>
      <AdminNavbar 
        chartsData = {chartsData}
      />
      <div className="flex flex-wrap">
      
      <div className="w-full xl:w-14/14 px-14">
        <GraficoBarrasCompleto />
      </div>

      <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
        <CardLineChart />
      </div>

      <div>
      <PieChart data={pieChartData} /> {/* Pass data as a prop to PieChart */}
    </div>
        

      </div>

      {/* ------------------- */}

      <div className="flex flex-wrap mt-4">

      </div>
    </>
  );
}
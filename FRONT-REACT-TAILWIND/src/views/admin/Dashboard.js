import React, { useState, useEffect, useContext } from "react";
// components
import AdminNavbar from "components/Navbars/AdminNavbar";
import GraficoBarrasCompleto from "components/Cards/GraficoBarrasCompleto.js";
import CardLineChart from "components/Cards/CardLineChart.js";
import TablaDatos from "components/Cards/TablaDatos.js";
import PieChart from "components/Cards/PieChart.js"
import ConsumirApi from "components/Funciones/api";
import { fetchData } from "components/Funciones/api";

import { DataContext } from "components/Funciones/context";

export default function Dashboard() {

  const [pieChartData, setPieChartData] = useState([]);
  const [barChartData, setBarChartData] = useState([]);
  const [tablaChartData, setTablaChartData] = useState([]);

  const { data } = useContext(DataContext)


  const chartsData = (datos) => {
    console.log('Dashboard.js !!!')
    console.log(datos);
  };
  const handleGetData = async () => {

    console.log('data', data)
  };


  return (

    <>

      <div className="flex flex-wrap">
        <div className="w-full">
          <AdminNavbar />
        </div>

        <div className="w-1/2 xl:w-1/2 px-4 mt-20 bg-neutral">
          <PieChart data={pieChartData} />
        </div>


        <div className="w-1/2 xl:w-1/2 px-4 mt-20 ">
          <TablaDatos data={tablaChartData} />
        </div>
        <div className="w-1/2 xl:w-1/2 px-4 mt-10 ">

        </div>
        <div className="w-full xl:w-1/2 px-4 bg-neutral">
          <GraficoBarrasCompleto data={barChartData} />
        </div>


      </div>

      {/* ------------------- */}



    </>

  );
}
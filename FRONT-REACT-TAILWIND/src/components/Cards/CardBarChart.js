import React, { useState, useEffect } from 'react';
import Chart from "chart.js";
import axios from "axios";
import AdminNavbar from "../Navbars/AdminNavbar.js"

export default function CardBarChart() {
  const [defects, setDefects] = useState([]);//Constante para guardar la respuesta de la api
  const [loading, setLoading] = useState(true);//Constante para el estado del spinner
  const [selectedKPI, setSelectedKPI] = useState("Defectos por Tipo");
  const [selectedApiUrl, setSelectedApiUrl] = useState("http://localhost:3000/formSprinkler/Conteo-Todos-Los-Defectos"); // Agrega esta línea para definir selectedApiUrl
  const apiUrl1 = 'http://localhost:3000/formSprinkler/Conteo-Todos-Los-Defectos'; // Ruta de la respuesta de la api(PrimerKPI)
  const apiUrl2 = 'http://localhost:3000/formSprinkler/Conteo-Defectos-Por-Sector';
    
  useEffect(() => {
    setLoading(true);

    axios.get(selectedApiUrl)
      .then(response => {
        setDefects(response.data);
      })
      .catch(error => {
        console.error('Error al obtener datos:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [selectedApiUrl]);
       
  const labels = selectedKPI === 'Defectos por Tipo' ? defects.map(defect => defect.defect) : defects.map(defect => defect.sector);//se realiza un for each en el campo defect del respuesta obtenida por el api
  const data = defects.map(defect => defect.cantidad);//se realiza un for each en el campo cantidad del respuesta obtenida por el api
  
  useEffect(() => {//utilización de un hook junto utilizacion de codigo
    if (!loading) {//si la carga no esta en curso se ejecuta el grafico
    var config = {
      type: "bar",
      data: {
        labels: 
          labels,
        datasets: [
          {
            label: 'Tipo de Defecto',
            backgroundColor: "#e5ead4",
            borderColor: "#e5ead4",
            data: data,
          },
          
        ],
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        title: {
          display: true,
          text: selectedKPI, // Utiliza el nombre del KPI seleccionado como título
          fontColor: "white", // Cambia el color del título a blanco
        },
        legend: { //leyenda del grafico
          labels: { //personalizacion de la leyenda
            fontColor: "white",//color de las leyendas
          },
          align: "end",//alinea la leyenda al final del grafico
          position: "bottom",//coloca la leyenda al final del grafico
        },
        tooltips: {//controla el punto de datos en el eje x
          mode: "index",//permite mostrar informacion de cada barra
          intersect: false,//Evita que los tooltips se superpongan
        },
        hover: {//controla el comportamiento cuando se pasa el ratón sobre el grafico
          mode: "nearest",
          intersect: true,//
        },
        scales: {
          xAxes: [
            {
              ticks: {
                fontColor: "white",
              },
              display: true,
              scaleLabel: {
                display: false,
                labelString: "Nombre defecto",
                fontColor: "white",
              },
              gridLines: {
                display: false,
                borderDash: [2],
                borderDashOffset: [2],
                color: "rgba(33, 37, 41, 0.3)",
                zeroLineColor: "rgba(0, 0, 0, 0)",
                zeroLineBorderDash: [2],
                zeroLineBorderDashOffset: [2],
              },
            },
          ],
          yAxes: [
            {
              ticks: {
                fontColor: "rgba(255,255,255,.7)",
              },
              display: true,
              scaleLabel: {
                display: false,
                labelString: "Value",
                fontColor: "white",
              },
              gridLines: {
                borderDash: [3],
                borderDashOffset: [3],
                drawBorder: false,
                color: "rgba(229, 234, 212,0.3)",
                zeroLineColor: "rgba(33, 37, 41, 0)",
                zeroLineBorderDash: [2],
                zeroLineBorderDashOffset: [2],
              },
            },
          ],
        },
      },
    };
    var ctx = document.getElementById("line-chart2").getContext("2d");
    window.myLine = new Chart(ctx, config);
    }
  }, [defects,loading, selectedKPI]);

  // Función para cambiar el KPI seleccionado desde el Navbar
  const changeKPIBar = (newKPI) => {
    // Actualiza la URL de la API según el nuevo KPI seleccionado
    if (newKPI === "Defectos por Tipo") {
      setSelectedApiUrl(apiUrl1);
      setSelectedKPI("Defectos por Tipo");
    } else if (newKPI === "Defectos por Sector") {
      setSelectedApiUrl(apiUrl2);   
      setSelectedKPI("Defectos por Sector");
    }
  };


  return (
    <>
    <AdminNavbar changeKPIBar={changeKPIBar} />
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-blueGray-600">
        <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full max-w-full flex-grow flex-1">
              <h6 className="uppercase text-blueGray-100 mb-1 text-xs font-semibold">
                Vista general
              </h6>
              <h2 className="text-white text-xl font-semibold"></h2>
            </div>
          </div>
        </div>
        <div className="p-4 flex-auto">
          {/* Chart2 */}
          <div className="relative h-350-px">
          {loading ? (
            // Si la carga está en progreso, muestra el spinner
            <div className="text-center">
            <div className="spinner-border" role="status">
              <span className="sr-only">Cargando...</span>
            </div>
          </div>
          ) : (// y si esta en false se carga el grafico
            <canvas id="line-chart2"></canvas>
          )}
          </div>
        </div>
      </div>
    </>
  );
}

import React, { useState, useEffect } from 'react';
import Chart from "chart.js";
import axios from "axios";

export default function CardLineChart2() {
  const [defects, setDefects] = useState([]);

  const apiUrl = 'http://localhost:3000/formSprinkler/Conteo-Todos-Los-Defectos'; // Ruta a tu API
    
  useEffect(() => {
    axios.get(apiUrl)
      .then(response => {
        setDefects(response.data);
      })
      .catch(error => {
        console.error('Error al obtener datos:', error);
      });
    }, []);
      
    
    const lables = defects.map(defect => defect.defect);
    const setDatos = defects.map(defect => defect.cantidad);
  
  useEffect(() => {
    var config = {
      type: "bar",
      data: {
        labels: 
          lables,
        datasets: [
          {
            label: 'Cantidad de Defectos',
            backgroundColor: "#4c51bf",
            borderColor: "#4c51bf",
            data: setDatos,
          },
          
        ],
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        title: {
          display: false,
          text: "Sales Charts",
          fontColor: "white",
        },
        legend: {
          labels: {
            fontColor: "white",
          },
          align: "end",
          position: "bottom",
        },
        tooltips: {
          mode: "index",
          intersect: false,
        },
        hover: {
          mode: "nearest",
          intersect: true,
        },
        scales: {
          xAxes: [
            {
              ticks: {
                fontColor: "rgba(255,255,255,.7)",
              },
              display: true,
              scaleLabel: {
                display: false,
                labelString: "Month",
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
                color: "rgba(255, 255, 255, 0.15)",
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
  }, [defects]);
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-blueGray-700">
        <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full max-w-full flex-grow flex-1">
              <h6 className="uppercase text-blueGray-100 mb-1 text-xs font-semibold">
                Vista general
              </h6>
              <h2 className="text-white text-xl font-semibold">Datos de prueba</h2>
            </div>
          </div>
        </div>
        <div className="p-4 flex-auto">
          {/* Chart2 */}
          <div className="relative h-350-px">
            <canvas id="line-chart2"></canvas>
          </div>
        </div>
      </div>
    </>
  );
}

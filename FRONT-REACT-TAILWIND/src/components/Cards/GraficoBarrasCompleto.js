import React, { useState, useEffect, useContext, useRef } from 'react';
import Chart from "chart.js";
import axios from "axios";
import { DataContext } from 'components/Funciones/context.js';
import { useDataContext } from 'components/Funciones/context';

export default function GraficoBarrasCompleto() {
  const [loading, setLoading] = useState(true);
  const [defects, setDefects] = useState([]);
  
  const chartRef = useRef(null);
  const legendRef = useRef(); // Initialize with an empty ref

  const contextData = useContext(DataContext);
  const { selectedKPI } = useDataContext();

  useEffect(() => {
    if (contextData && contextData.data) { 
      const data = contextData.data; 

      // Destruye el gráfico anterior si existe
      if (chartRef.current) {
        chartRef.current.destroy();
      }
      
      // Ordena los datos de mayor a menor según la cantidad
      data.sort((a, b) => parseInt(b.cantidad, 10) - parseInt(a.cantidad, 10));

      setDefects(data);
      setLoading(false);
    }
  }, [contextData]);

  useEffect(() => {
    if (!loading && contextData && contextData.data) {
      const data = contextData.data;

      // Inicializa un objeto para almacenar labels para que no se repitan
      const uniqueLabels = {};

      data.forEach(defect => {
        const cantidad = parseInt(defect.cantidad, 10); // Convierte a número
        let labelKey; 

        if (selectedKPI === "defectos") {
          labelKey = defect.defect;
        } else if (selectedKPI === "sector") {
          labelKey = defect.sector;
        } else if (selectedKPI === "Seleccionar KPI") {
          labelKey = null;
        } else {
          labelKey = defect.sector;
        }
        
        if (!isNaN(cantidad)) {
          if (uniqueLabels[labelKey]) {
            uniqueLabels[labelKey] += cantidad; // Suma números en lugar de concatenar
          } else {
            uniqueLabels[labelKey] = cantidad;
          }
        }
      });

      const labelbar = Object.keys(uniqueLabels);
      const dataValues = Object.values(uniqueLabels);

      var config = {
        type: "bar",
        data: {
          labels: labelbar,
          datasets: [
            {
              backgroundColor: "#e5ead4",
              borderColor: "#e5ead4",
              data: dataValues,
            },
          ],
        },
        options: {
          maintainAspectRatio: false,
          responsive: true,
          title: {
            display: false,
            text: 'nada',
            fontColor: "black",
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
                  fontColor: "white",
                  beginAtZero: true,
                },
                display: true,
                scaleLabel: {
                  display: false,
                  labelString: "Nombre defecto",
                  fontColor: "black",
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
                  beginAtZero: true,
                  maxTicksLimit: 5,
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

      const ctx = document.getElementById("line-chart2").getContext("2d");
      chartRef.current = new Chart(ctx, config);
      const legend = chartRef.current.generateLegend();

      if (legendRef.current) {
        legendRef.current.innerHTML = legend;
      }
    }
  }, [contextData, loading, selectedKPI]);

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-VerdeSemiOscuro">
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
              <div className="text-center">
                <div className="spinner-border" role="status">
                  <span className="sr-only">Cargando...</span>
                </div>
              </div>
            ) : (
              <canvas id="line-chart2"></canvas>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

import React, { useState, useEffect, useContext, useRef } from 'react';
import Chart from "chart.js";

import { DataContext } from 'components/Funciones/context.js';
import { useDataContext } from 'components/Funciones/context';
import { defectColors, sectorColors, faunaColors, plagaColors, diseasesColors } from 'assets/colors/colorMapping';


export default function GraficoBarrasCompleto() {
  const [loading, setLoading] = useState(true);
  const chartRef = useRef(null);
  const legendRef = useRef(); // Initialize with an empty ref

  const contextData = useContext(DataContext);
  const { selectedKPI } = useDataContext();

  const [numResults, setNumResults] = useState(10);

  const dataColors = {
    ...defectColors,
    ...sectorColors,
    ...faunaColors,
    ...plagaColors,
    ...diseasesColors
  }

  useEffect(() => {
    if (contextData && contextData.data) {
      const data = contextData.data;


      // Ordena los datos de mayor a menor según la cantidad
      data.sort((a, b) => parseInt(b.cantidad, 10) - parseInt(a.cantidad, 10));
      setLoading(false);
    }
  }, [contextData]);

  useEffect(() => {
    if (!loading && contextData && contextData.data) {
      const data = contextData.data;

            // Destruye el gráfico anterior si existe
            if (chartRef.current) {
              chartRef.current.destroy();
            }

      // Inicializa un objeto para almacenar labels para que no se repitan
      const uniqueLabels = {};

      data.forEach(defect => {
        const cantidad = parseInt(defect.cantidad, 10); // Convierte a número
        let labelKey;

        if (selectedKPI === "defectos") {
          labelKey = defect.defect;
        } else if (selectedKPI === "sector") {
          labelKey = defect.sector;
        } else if (selectedKPI === "Fauna") {
          labelKey = defect.fauna;
        } else if (selectedKPI === "Plaga") {
          labelKey = defect.plaga;
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


      // Ordenar de mayor a menor
      let sortedData = labelbar.map((label, index) => ({

        value: dataValues[index],
        color: dataColors[label] || '#FF5733',
        label,
      })).sort((a, b) => b.value - a.value);

      if (numResults !== "all") {
        sortedData = sortedData.slice(0, numResults);
      }

      const sortedLabelbar = sortedData.map(item => item.label);
      const sortedDataValues = sortedData.map(item => item.value);
      const sortedDataColors = sortedData.map(item => item.color);

      const capitalizedLabels = sortedData.map(item => item.label.charAt(0).toUpperCase() + item.label.slice(1))
      function generateLabels(sortedLabelbar) {
        return sortedLabelbar.map((label, index) => ({
          text: label.charAt(0).toUpperCase() + label.slice(1),// Capitaliza la primera letra del texto// El texto específico de cada etiqueta en la leyenda
          fillStyle: dataColors[label] || '#FF5733', // Color correspondiente para cada etiqueta
          hidden: false, // Indica si la etiqueta está oculta o visible
          index: index,
          datasetIndex: 0,
        }));
      }


      var config = {
        type: "bar",
        data: {
          labels: capitalizedLabels,
          datasets: [
            {
              backgroundColor: sortedDataColors,
              borderColor: "#e5ead4",
              data: sortedDataValues,
            },
          ],
        },
        options: {
          maintainAspectRatio: false,
          responsive: true,
          title: {
            display: false,
            text: ' a ',
            fontColor: "black",
          },
          legend: {
            align: "end",
            position: "bottom",
            display: true,
            labels: {
              fontColor: "black",
              text: capitalizedLabels,
              fillStyle: sortedDataColors || '#FF5733', // Color correspondiente
              generateLabels: function () {
                return generateLabels(sortedLabelbar);
              },

            },
            onClick: null
          },
          tooltips: {
            mode: "index",
            intersect: true,
          },
          hover: {
            mode: "nearest",
            intersect: true,
          },
          scales: {



            xAxes: [
              {

                ticks: {
                  fontColor: "black",
                  beginAtZero: true,
                  min: 0, // Valor mínimo del eje X
                  max: 9, // Valor máximo del eje X (10 - 1 para mostrar 10 barras)
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
                  color: "rgba(2,1,4, 0.6)",
                  zeroLineColor: "rgba(2,1,4, 0.6)",
                  zeroLineBorderDash: [2],
                  zeroLineBorderDashOffset: [2],
                },
              },
            ],
            yAxes: [
              {
                ticks: {
                  fontColor: "rgba(2,1,4, 0.6)",
                  beginAtZero: true,
                  maxTicksLimit: 5,
                },
                display: true,
                scaleLabel: {
                  display: false,
                  labelString: "Value",
                  fontColor: "black",
                },
                gridLines: {
                  borderDash: [3],
                  borderDashOffset: [3],
                  drawBorder: false,
                  color: "rgba(2,1,4, 0.3)",
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
  }, [contextData, loading, selectedKPI,dataColors,numResults]);

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6   shadow-2xl rounded bg-light">
        <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
          <div className="flex flex-wrap items-center justify-end">
            <div className="relative w-full max-w-full flex-grow flex-1">
              <h6 className="uppercase text-black-100 mb-1 text-xs font-semibold flex top-0 left-0">
                Gráfico de barras
              </h6>
            </div>
            <div className="text-right ml-auto uppercase text-black-100 mb-1 text-xs font-semibold">
              <h1>Cantidad de resultados</h1>
              <select value={numResults} onChange={(e) => setNumResults(e.target.value)} class="bg-gray-50 border border-gray-300">
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
                <option value="all">Todos</option>
              </select>
            </div>

          </div>
        </div>
        <div className="p-4 flex-auto chart-container">
          {/* Chart2 */}
          <div className="relative h-350-px overflow-y-auto">

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

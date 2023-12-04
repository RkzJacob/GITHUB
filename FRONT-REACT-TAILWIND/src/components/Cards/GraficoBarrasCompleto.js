import React, { useState, useEffect, useContext, useRef,useMemo } from 'react';
import Chart from "chart.js";

import { DataContext } from 'components/Funciones/context.js';
import { useDataContext } from 'components/Funciones/context';
import { defectColors, sectorColors, faunaColors, plagaColors, diseasesColors, damageColors } from 'assets/colors/colorMapping'; // Importación de colores definidos para cada categoría


export default function GraficoBarrasCompleto() {
  const [loading, setLoading] = useState(true); // Estado para controlar la carga
  const chartRef = useRef(null); // Referencia al elemento de gráfico
  const legendRef = useRef(); // Initialize with an empty ref // Referencia al elemento de leyenda

  // Uso de contextos y estados compartidos
  const contextData = useContext(DataContext);
  const { selectedKPI, reloadChart2, setReloadChart2 } = useDataContext();

  const [numResults, setNumResults] = useState(10); // Estado para controlar la cantidad de resultados mostrados

  // Objeto que contiene los colores para diferentes categorías
  const dataColors = useMemo(() => {
    return {
      ...defectColors,
      ...sectorColors,
      ...faunaColors,
      ...plagaColors,
      ...diseasesColors,
      ...damageColors
    };
  }, []); // Dependencia vacía para inicializar una sola vez
  // Primer efecto para manejar los datos y la carga inicial
  useEffect(() => {
    if (contextData && contextData.data) {
      const data = contextData.data;


      // Ordena los datos de mayor a menor según la cantidad
      data.sort((a, b) => parseInt(b.cantidad, 10) - parseInt(a.cantidad, 10));
      setLoading(false);
    }
  }, [contextData]);


  // Segundo efecto para generar el gráfico cuando los datos y el estado cambian
  useEffect(() => {
    // Verifica si los datos no están cargando y existen datos en el contexto
    if (!loading && contextData && contextData.data && reloadChart2) {
      const data = contextData.data;

      // Restablece el estado de recarga a falso
      setReloadChart2(false);

      // Destruye el gráfico anterior si existe
      if (chartRef.current) {
        chartRef.current.destroy();
      }

      // Inicializa un objeto para almacenar labels para que no se repitan
      const uniqueLabels = {};

      // Recorre los datos para generar las etiquetas y sus valores correspondientes
      data.forEach(defect => {
        const cantidad = parseInt(defect.cantidad, 10); // Convierte a número

        // Determina la etiqueta dependiendo del KPI seleccionado
        let labelKey;
        if (selectedKPI === "defectos") {
          labelKey = defect.defect;
        } else if (selectedKPI === "sector") {
          labelKey = defect.sector;
        } else if (selectedKPI === "Fauna") {
          labelKey = defect.fauna;
        } else if (selectedKPI === "Plaga") {
          labelKey = defect.plaga;
        } else if (selectedKPI === "Diseases") {
          labelKey = defect.diseases;
        } else if (selectedKPI === "Damage") {
          labelKey = defect.damage;
        } else if (selectedKPI === "Seleccionar KPI") {
          labelKey = null;
        } else {
          labelKey = defect.sector;
        }
        // Verifica si la cantidad es un número y asigna los valores
        if (!isNaN(cantidad)) {
          if (uniqueLabels[labelKey]) {
            uniqueLabels[labelKey] += cantidad; // Suma números en lugar de concatenar
          } else {
            uniqueLabels[labelKey] = cantidad;
          }
        }
      });
      // Obtiene las etiquetas y valores
      const labelbar = Object.keys(uniqueLabels);
      const dataValues = Object.values(uniqueLabels);


      // Ordena los datos de mayor a menor según los valores
      let sortedData = labelbar.map((label, index) => ({

        value: dataValues[index],
        color: dataColors[label] || '#FF5733', // Asigna un color por defecto si no hay uno definido
        label,
      })).sort((a, b) => b.value - a.value);
      // Limita los resultados mostrados si no se elige mostrar todos
      if (numResults !== "all") {
        sortedData = sortedData.slice(0, numResults);
      }
      // Obtiene las etiquetas, valores y colores ordenados
      const sortedLabelbar = sortedData.map(item => item.label);
      const sortedDataValues = sortedData.map(item => item.value);
      const sortedDataColors = sortedData.map(item => item.color);

      // Capitaliza las etiquetas para mostrarlas correctamente
      const capitalizedLabels = sortedData.map(item => item.label.charAt(0).toUpperCase() + item.label.slice(1))

      // Función para generar las etiquetas en la leyenda
      function generateLabels(sortedLabelbar) {
        return sortedLabelbar.map((label, index) => ({
          text: label.charAt(0).toUpperCase() + label.slice(1),// Capitaliza la primera letra del texto// El texto específico de cada etiqueta en la leyenda
          fillStyle: dataColors[label] || '#FF5733', // Color correspondiente para cada etiqueta
          hidden: false, // Indica si la etiqueta está oculta o visible
          index: index,
          datasetIndex: 0,
        }));
      }

      // Configuración del gráfico de barras
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
      // Creación del gráfico usando Chart.js y la referencia al elemento del canvas
      const ctx = document.getElementById("line-chart2").getContext("2d");
      chartRef.current = new Chart(ctx, config);
      // Generación de la leyenda y su inserción en el elemento correspondiente
      const legend = chartRef.current.generateLegend();

      if (legendRef.current) {
        legendRef.current.innerHTML = legend;
      }
    }
  }, [contextData, loading, selectedKPI, dataColors, numResults, reloadChart2]);

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

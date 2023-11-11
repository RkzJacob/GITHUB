import React, { useState, useEffect, useRef, useContext } from 'react';
import Chart from "chart.js";
import { DataContext, useDataContext } from "components/Funciones/context";
import { defectColors } from 'assets/colors/colorMapping';

export default function CardPieChart({ fetchData }) {
  const [defects, setDefects] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [selectedKPI, setSelectedKPI] = useState("");
  const chartRef = useRef(null);
  const legendRef = useRef(null);


  const contextData = useContext(DataContext);
  const { selectedKPI } = useDataContext();

  useEffect(() => {
    if (contextData && contextData.data) {
      const data = contextData.data;

      setDefects(data);
      setLoading(false);
    }
  }, [contextData]);

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

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
        } else if (selectedKPI === "Fruit") {
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

      const labels = Object.keys(uniqueLabels);
      const dataValues = Object.values(uniqueLabels);

      const dataObjects = labels.map((label, index) => ({
        label,
        value: dataValues[index],
        color: defectColors[label] || '#FF5733',
      }));

      // Ordenar el array de objetos en función de los valores (de mayor a menor)
      const sortedDataObjects = dataObjects.sort((a, b) => b.value - a.value);

      // Extraer las etiquetas y los valores ordenados
      const sortedLabels = sortedDataObjects.map(item => item.label);
      const sortedDataValues = sortedDataObjects.map(item => item.value);
      const sortedDataColors = sortedDataObjects.map(item => item.color);


      if (chartRef.current) {
        chartRef.current.destroy();
      }

      const ctx = document.getElementById("pie-chart").getContext("2d");
      const config = {
        type: "pie",
        data: {
          labels: sortedLabels, // Usa chartLabels en lugar de labels
          datasets: [
            {
              data: sortedDataValues,
              backgroundColor: sortedDataColors,
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          title: {
            display: true,
            text: selectedKPI,
            fontColor: "black",
          },
          legend: {
            display: false,
            labels: {
              fontColor: "black",
            },
          },
          legendCallback: function (chart) {
            const labels = chart.data.labels;
            const datasets = chart.data.datasets[0].data;
            let legendHTML = '';

            labels.forEach((label, index) => {
              legendHTML += `<li>${label}: ${datasets[index]}</li>`;
            });

            return `<ul>${legendHTML}</ul>`;
          },
        },
      };

      chartRef.current = new Chart(ctx, config);
      const legend = chartRef.current.generateLegend();
      legendRef.current.innerHTML = legend;
    }
  }, [contextData, loading, selectedKPI]);

  return (
    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-2xl rounded  bg-light ">
      <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
        <div className="flex flex-wrap items-center">
          <div className="relative w-full max-w-full flex-grow flex-1">
            <h6 className="uppercase text-blueGray-100 mb-1 text-xs font-semibold">
              Vista general
            </h6>
            <h2 className="text-black text-xl font-semibold"></h2>
          </div>
        </div>
      </div>
      <div className="p-4 flex-auto">

        <div className="relative h-500-px w-700-px" id="pie-chart-container">
          <div className="legend-container" ref={legendRef}></div>

          {loading ? (
            <div className="text-center">
              <div className="spinner-border" role="status">
                <span className="sr-only">Cargando...</span>
              </div>
            </div>
          ) : (
            <canvas id="pie-chart"></canvas>
          )}
        </div>
      </div>
    </div>
  );

}

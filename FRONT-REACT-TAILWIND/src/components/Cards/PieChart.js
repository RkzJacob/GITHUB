import React, { useState, useEffect, useRef, useContext } from 'react';
import Chart from "chart.js";
import { DataContext, useDataContext } from "components/Funciones/context";
import { defectColors, sectorColors } from 'assets/colors/colorMapping';

export default function CardPieChart({ fetchData }) {
  const [defects, setDefects] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [selectedKPI, setSelectedKPI] = useState("");
  const chartRef = useRef(null);
  const legendRef = useRef(null);


  const contextData = useContext(DataContext);
  const { selectedKPI } = useDataContext();

  const [numResults, setNumResults] = useState(10);


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

  const dataColors = {
    ...defectColors,
    ...sectorColors
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

      let dataObjects = labels.map((label, index) => ({
        label,
        value: dataValues[index],
        color: dataColors[label] || '#FF5733',
      })).sort((a, b) => b.value - a.value);

      if (numResults !== "all") {
        dataObjects = dataObjects.slice(0, numResults);
      }

      // Ordenar el array de objetos en función de los valores (de mayor a menor)
      const sortedDataObjects = dataObjects;

      // Extraer las etiquetas y los valores ordenados
      const sortedLabels = sortedDataObjects.map(item => item.label.charAt(0).toUpperCase() + item.label.slice(1));
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
            display: false,
            text: selectedKPI,
            fontColor: "black",
          },
          legend: {
            display: true,
            position: 'bottom',
            labels: {
              fontColor: "black",
            },
          },

        },
      };

      chartRef.current = new Chart(ctx, config);

    }
  }, [contextData, loading, selectedKPI]);

  return (
    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-2xl rounded  bg-neutral h-full ">

      <div className="p-4 flex-auto">
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
        <div className="relative h-500-px w-700-px" id="pie-chart-container">


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

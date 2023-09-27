import React, { useState, useEffect } from 'react';
import Chart from "chart.js";
import axios from "axios";

export default function CardPieChart() {
  const [defects, setDefects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedApiUrl, setSelectedApiUrl] = useState('http://localhost:3000/formSprinkler/Conteo-Todos-Los-Defectos'); // Inicialmente selecciona el primer KPI
  const [selectedKPI, setSelectedKPI] = useState('Defectos por Tipo'); // Nombre del KPI seleccionado

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

  const labels = defects.map(defect => defect.defect);
  const data = defects.map(defect => defect.cantidad);

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  useEffect(() => {
    if (!loading) {
      // Generar colores aleatorios
      const uniqueColors = new Set();
      const backgroundColors = labels.map(() => {
        let color;
        do {
          color = getRandomColor();
        } while (uniqueColors.has(color)); // Comprobar si el color ya existe en el conjunto
        uniqueColors.add(color); 
        return color;
      });

      var config = {
        type: "pie",
        data: {
          labels: labels,
          datasets: [
            {
              data: data,
              backgroundColor: backgroundColors,
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          title: {
            display: true,
            text: selectedKPI, // Utiliza el nombre del KPI seleccionado como título
            fontColor: "white", 
          },
          legend: {
            labels: {
              fontColor: "white",
            },
          },
        },
      };

      var ctx = document.getElementById("pie-chart").getContext("2d");

      var container = document.getElementById("pie-chart-container");
      container.style.width = "80%";

      var pieChart = new Chart(ctx, config);
      pieChart.canvas.parentNode.style.width = '100%';
      pieChart.canvas.parentNode.style.height = '400px';

      window.myPie = pieChart;
    }
  }, [defects, loading, selectedKPI]);

  // Función para cambiar el KPI seleccionado
  const handleKPIChange = (event) => {
    const selectedKPI = event.target.value;
    setSelectedKPI(selectedKPI);
    // Cambia la URL de la API según el KPI seleccionado
    if (selectedKPI === "Defectos por Tipo") {
      setSelectedApiUrl('http://localhost:3000/formSprinkler/Conteo-Todos-Los-Defectos');
    } else if (selectedKPI === "Defectos por Sector") {
      setSelectedApiUrl('http://localhost:3000/formSprinkler/Conteo-Defectos-Por-Sector');
    }
    // Puedes agregar más opciones aquí según tus KPIs
  };

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-blueGray-600">
        <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full max-w-full flex-grow flex-1">
              <h6 className="uppercase text-blueGray-100 mb-1 text-xs font-semibold">
                Vista general
              </h6>
            </div>
          </div>
        </div>
        <div className="p-4 flex-auto">
          <div className="relative h-400-px" id="pie-chart-container">
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
    </>
  );
}

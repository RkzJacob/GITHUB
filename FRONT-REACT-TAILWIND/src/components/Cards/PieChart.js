import React, { useState, useEffect } from 'react';
import Chart from "chart.js";
import axios from "axios";

export default function CardPieChart() {
  const [defects, setDefects] = useState([]);
  const [loading, setLoading] = useState(true);
  const apiUrl = 'http://localhost:3000/formSprinkler/Conteo-Todos-Los-Defectos';
  
  useEffect(() => {
    setLoading(true);

    axios.get(apiUrl)
      .then(response => {
        setDefects(response.data);
      })
      .catch(error => {
        console.error('Error al obtener datos:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
    
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
      // Generar colores aleatorios únicos
      const uniqueColors = new Set();
      const backgroundColors = labels.map(() => {
        let color;
        do {
          color = getRandomColor();
        } while (uniqueColors.has(color)); // Comprobar si el color ya existe en el conjunto
        uniqueColors.add(color); // Agregar el color al conjunto para evitar repeticiones
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
            text: "Defectos por Tipo",
            fontColor: "white",
          },
          legend: {
            labels: {
              fontColor: "white", // Cambiar el color de las etiquetas a blanco
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
  }, [defects, loading]);

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-blueGray-600">
        <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full max-w-full flex-grow flex-1">
              <h6 className="uppercase text-blueGray-100 mb-1 text-xs font-semibold">
                Vista general
              </h6>
              <h2 className="text-white text-xl font-semibold">Cantidad por tipo de defecto</h2>
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

import React, { useState, useEffect } from 'react';
import Chart from "chart.js";
import axios from "axios";
import AdminNavbar from "../Navbars/AdminNavbar.js"

export default function CardPieChart() {
  const [defects, setDefects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedKPI, setSelectedKPI] = useState("Defectos por Tipo");
  const [selectedApiUrl, setSelectedApiUrl] = useState("http://localhost:3000/formSprinkler/Conteo-Todos-Los-Defectos"); // Agrega esta línea para definir selectedApiUrl
  const apiUrl1 = 'http://localhost:3000/formSprinkler/Conteo-Todos-Los-Defectos';
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

  const labels = selectedKPI === 'Defectos por Tipo' ? defects.map(defect => defect.defect) : defects.map(defect => defect.sector);
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
            text: selectedKPI, // Utiliza el nombre del KPI seleccionado como título
            fontColor: "white", // Cambia el color del título a blanco
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

  // Función para cambiar el KPI seleccionado desde el Navbar
  const changeKPI = (newKPI) => {
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
      <AdminNavbar changeKPI={changeKPI} />
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
          <div className="relative h-400-px" id="pie-chart-container" style={{ overflowY: 'scroll'}}>
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

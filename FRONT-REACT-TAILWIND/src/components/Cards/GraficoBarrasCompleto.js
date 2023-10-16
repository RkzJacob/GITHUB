import React, { useState, useEffect, useContext } from 'react';
import Chart from "chart.js";
import axios from "axios";
import { DataContext } from 'components/Funciones/context.js';

export default function GraficoBarrasCompleto() {
  const [loading, setLoading] = useState(true);
  const { data } = useContext(DataContext);

  useEffect(() => {
    if (data && data.length > 0) {
      setLoading(false);

      const sectors = [];
      const defectCounts = [];

      data.forEach(defect => {
        if (!sectors.includes(defect.defect)) {
          sectors.push(defect.defect);
          defectCounts.push(1);
        } else {
          const index = sectors.indexOf(defect.defect);
          defectCounts[index] += 1;
        }
      });

      var config = {
        type: "bar",
        data: {
          labels: sectors,
          datasets: [
            {
              label: 'Tipo de Defecto',
              backgroundColor: "#e5ead4",
              borderColor: "#e5ead4",
              data: defectCounts,
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

      var ctx = document.getElementById("line-chart2");
      if (ctx) {
        var chart = new Chart(ctx, config);
      }
    }
  }, [data]);

  return (
    <>
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

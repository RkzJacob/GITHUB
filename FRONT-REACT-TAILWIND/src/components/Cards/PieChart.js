import React, { useEffect } from "react";
import Chart from "chart.js";

export default function PieChart() {
  useEffect(() => {
    const config = {
      type: 'pie',
      data: {
        labels: ['Red', 'Orange', 'Yellow'],
        datasets: [{
          label: 'Dataset 1',
          data: [300, 50, 100],
          backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)'],
          hoverOffset: 4,
        }],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top', // 'positon' should be 'position'
          },
          title: {
            display: true,
            text: 'Chart.js Pie Chart',
          },
        },
      },
    };

    const canvas = document.getElementById("pie-chart");

    if (canvas) {
      const ctx = canvas.getContext("2d");
      window.myPie = new Chart(ctx, config);
    }
  }, []);

  return (
    <div>
      <canvas id="pie-chart" width="100" height="100"></canvas>
    </div>
  );
}
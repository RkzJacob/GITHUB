import React, { useContext, useState, useMemo } from 'react';
import { DataContext } from 'components/Funciones/context.js';
import { capitalizeText } from 'components/Funciones/capitalize';
import { defectColors, sectorColors, faunaColors, plagaColors, diseasesColors, damageColors } from 'assets/colors/colorMapping'; // Importación de colores definidos para cada categoría

export default function TablaDatos() {
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc'); // 'asc' para ascendente, 'desc' para descendente
  const { data, selectedKPI } = useContext(DataContext);

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

  const handleSort = (columnName) => {
    if (sortColumn === columnName) {
      // Si se hace clic en la misma columna, cambia la dirección de clasificación
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // Si se hace clic en una nueva columna, ordena por esa columna en orden ascendente
      setSortColumn(columnName);
      setSortDirection('asc');
    }
  };

  const calcularTotales = () => {
    const totales = {};
    let sumaTotalCantidad = 0;

    data.forEach(defect => {
      if (selectedKPI === "defectos") {
        // Agrupar por tipo de defecto
        if (!totales[defect.defect]) {
          totales[defect.defect] = parseInt(defect.cantidad, 10);
        } else {
          totales[defect.defect] += parseInt(defect.cantidad, 10);
        }
        sumaTotalCantidad += parseInt(defect.cantidad, 10);
      } else if (selectedKPI === "Fauna") {
        // Agrupar por tipo de fauna
        if (!totales[defect.fauna]) {
          totales[defect.fauna] = parseInt(defect.cantidad, 10);
        } else {
          totales[defect.fauna] += parseInt(defect.cantidad, 10);
        }
        sumaTotalCantidad += parseInt(defect.cantidad, 10);
      } else if (selectedKPI === "Plaga") {
        // Agrupar por tipo de plaga
        if (!totales[defect.plaga]) {
          totales[defect.plaga] = parseInt(defect.cantidad, 10);
        } else {
          totales[defect.plaga] += parseInt(defect.cantidad, 10);
        }
        sumaTotalCantidad += parseInt(defect.cantidad, 10);
      } else if (selectedKPI === "Diseases") {
        // Agrupar por tipo de diseases
        if (!totales[defect.diseases]) {
          totales[defect.diseases] = parseInt(defect.cantidad, 10);
        } else {
          totales[defect.diseases] += parseInt(defect.cantidad, 10);
        }
        sumaTotalCantidad += parseInt(defect.cantidad, 10);
      } else if (selectedKPI === "Damage") {
        // Agrupar por tipo de damage
        if (!totales[defect.damage]) {
          totales[defect.damage] = parseInt(defect.cantidad, 10);
        } else {
          totales[defect.damage] += parseInt(defect.cantidad, 10);
        }
        sumaTotalCantidad += parseInt(defect.cantidad, 10);
      } else {
        // Agrupar por sector
        if (!totales[defect.sector]) {
          totales[defect.sector] = parseInt(defect.cantidad, 10);
        } else {
          totales[defect.sector] += parseInt(defect.cantidad, 10);
        }
        sumaTotalCantidad += parseInt(defect.cantidad, 10);
      }
    });

    if (sortColumn) {
      // Ordenar los totales según la columna seleccionada
      const sortedTotales = Object.entries(totales).sort((a, b) => {
        const [keyA, valueA] = a;
        const [keyB, valueB] = b;

        if (sortColumn === 'etiqueta') {
          return sortDirection === 'asc' ? keyA.localeCompare(keyB) : keyB.localeCompare(keyA);
        } else if (sortColumn === 'totalCantidad') {
          return sortDirection === 'asc' ? valueA - valueB : valueB - valueA;
        } else if (sortColumn === 'porcentajeTotal') {
          const porcentajeA = (valueA / sumaTotalCantidad) * 100;
          const porcentajeB = (valueB / sumaTotalCantidad) * 100;
          return sortDirection === 'asc' ? porcentajeA - porcentajeB : porcentajeB - porcentajeA;
        }

        return 0; // En caso de que la columna de clasificación no se reconozca
      });

      return { totales: Object.fromEntries(sortedTotales), sumaTotalCantidad };
    }

    return { totales, sumaTotalCantidad };
  };

  const { totales, sumaTotalCantidad } = calcularTotales();

  return (
    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 p-6 shadow-md rounded h-full">
      <div className="rounded-t mb-0 px-4 py-3 bg-VerdeSemiOscuro">
        <div className="flex flex-wrap items-center ">
          <h6 className="uppercase text-white  text-xs font-semibold">
            Tabla
          </h6>

        </div>
      </div>
      <div className="p-4 flex-auto ">
        <div className="relative h-600-px" style={{ maxHeight: '600px', overflowY: 'auto' }}>
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left text-black" onClick={() => handleSort('etiqueta')}>
                  Etiqueta
                  {sortColumn === 'etiqueta' ? (sortDirection === 'asc' ? ' ▲' : ' ▼') : ''}
                </th>
                <th className="text-left text-black" onClick={() => handleSort('totalCantidad')}>
                  Total Cantidad
                  {sortColumn === 'totalCantidad' ? (sortDirection === 'asc' ? ' ▲' : ' ▼') : ''}
                </th>
                <th className="text-left text-black" onClick={() => handleSort('porcentajeTotal')}>
                  % del Total
                  {sortColumn === 'porcentajeTotal' ? (sortDirection === 'asc' ? ' ▲' : ' ▼') : ''}
                </th>
              </tr>
            </thead>
            <tbody>
              {totales && Object.keys(totales).map(etiqueta => (
                <tr key={etiqueta}>
                  <td className="text-black">{capitalizeText(etiqueta)}</td>
                  <td className="text-black">{totales[etiqueta]}</td>
                  <td className="text-black">
                    {((totales[etiqueta] / sumaTotalCantidad) * 100).toFixed(2)}%
                  </td>
                  <td>
                    <div style={{ width: '20px', height: '20px', backgroundColor: dataColors[etiqueta] }} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

import React, { useContext, useState } from 'react';
import { DataContext } from 'components/Funciones/context.js';
import { capitalizeText } from 'components/Funciones/capitalize';
export default function TablaDatos() {
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc'); // 'asc' para ascendente, 'desc' para descendente
  const { data, selectedKPI } = useContext(DataContext);

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
    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 p-6 shadow-lg rounded bg-VerdeSemiOscuro h-full">
      <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
        <div className="flex flex-wrap items-center">
          <div className="relative w-full max-w-full flex-grow flex-1">
            <h6 className="uppercase text-white mb-1 text-xs font-semibold">
              Tabla
            </h6>
          </div>
        </div>
      </div>
      <div className="p-4 flex-auto">
        <div className="relative h-350-px" style={{ maxHeight: '350px', overflowY: 'auto' }}>
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left text-white" onClick={() => handleSort('etiqueta')}>
                  Etiqueta
                  {sortColumn === 'etiqueta' ? (sortDirection === 'asc' ? ' ▲' : ' ▼') : ''}
                </th>
                <th className="text-left text-white" onClick={() => handleSort('totalCantidad')}>
                  Total Cantidad
                  {sortColumn === 'totalCantidad' ? (sortDirection === 'asc' ? ' ▲' : ' ▼') : ''}
                </th>
                <th className="text-left text-white" onClick={() => handleSort('porcentajeTotal')}>
                  % del Total
                  {sortColumn === 'porcentajeTotal' ? (sortDirection === 'asc' ? ' ▲' : ' ▼') : ''}
                </th>
              </tr>
            </thead>
            <tbody>
            {totales && Object.keys(totales).map(etiqueta => (
              <tr key={etiqueta}>
                <td className="text-white">{capitalizeText(etiqueta)}</td>
                <td className="text-white">{totales[etiqueta]}</td>
                <td className="text-white">
                  {((totales[etiqueta] / sumaTotalCantidad) * 100).toFixed(2)}%
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

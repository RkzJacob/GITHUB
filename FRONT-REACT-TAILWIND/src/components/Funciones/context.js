import React, { createContext, useContext, useState } from 'react';

// Crear un contexto para el gráfico
const ChartContext = createContext();

// Un componente proveedor para el contexto del gráfico
export function ChartProvider({ children }) {
  const [data, setData] = useState([]); // Datos para el gráfico
  const [fetchData, setFetchData] = useState(null); // Método para obtener datos

  return (
    <ChartContext.Provider value={{ data, setData, fetchData, setFetchData }}>
      {children}
    </ChartContext.Provider>
  );
}

// Un gancho personalizado para acceder al contexto del gráfico
export function useChart() {
  return useContext(ChartContext);
}

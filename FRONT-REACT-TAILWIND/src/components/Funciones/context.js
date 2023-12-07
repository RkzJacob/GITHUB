import React, { createContext, useContext, useState } from 'react';

// Crea el contexto con valores iniciales
export const DataContext = createContext();

// Crea el proveedor personalizado para el contexto
export const DataContextProvider = ({ children }) => {
  const [data, setData] = useState([]); // Datos iniciales del contexto
  const [selectedKPI, setSelectedKPI] = useState(""); // Agregar estado para SelectedKPI
  const [selectedKPI2, set2SelectedKPI] = useState(""); // Agregar estado para 2SelectedKPI
  const [reloadChart, setReloadChart] = useState(false); //Para que graficos no se actualicen solos
  const [reloadChart2, setReloadChart2] = useState(false); //Para que graficos no se actualicen solos
  const [ReloadChart3, setReloadChart3] = useState(false); //Para que graficos no se actualicen solos

  return (
    <DataContext.Provider value={{ data, setData, selectedKPI, setSelectedKPI,  selectedKPI2, set2SelectedKPI,reloadChart, setReloadChart, reloadChart2, setReloadChart2, ReloadChart3, setReloadChart3  }}>
      {children}
    </DataContext.Provider>
  );
};

// Hook personalizado para consumir el contexto
export const useDataContext = () => {
  return useContext(DataContext);
};

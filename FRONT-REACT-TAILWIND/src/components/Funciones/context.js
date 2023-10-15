import React, { createContext, useContext, useState } from 'react';

// Crea el contexto con valores iniciales
export const DataContext = createContext();

// Crea el proveedor personalizado para el contexto
export const DataContextProvider = ({ children }) => {
  const [data, setData] = useState([]); // Datos iniciales del contexto


  return (
    <DataContext.Provider value={{ data, setData }} >
      {children}
    </DataContext.Provider>
  );
};

// Hook personalizado para consumir el contexto
export const useDataContext = () => {
  return useContext(DataContext);
};
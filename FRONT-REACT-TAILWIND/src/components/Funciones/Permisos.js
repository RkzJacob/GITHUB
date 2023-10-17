import React, { createContext, useContext } from 'react';

const PermisoContext = createContext();

export const PermisoProvider = ({ children }) => {

  // Actualizar el rol
  const Rol = (rol) => {
    localStorage.setItem('role', rol);
  };

  return (
    <PermisoContext.Provider value={{ Rol }}>
      {children}
    </PermisoContext.Provider>
  );
};

export const usePermiso = () => {
  return useContext(PermisoContext);
 
};
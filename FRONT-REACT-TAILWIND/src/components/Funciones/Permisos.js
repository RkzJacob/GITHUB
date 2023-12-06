import React, { createContext, useContext } from 'react';
//obtiene el rol del usuario al loguear 
const PermisoContext = createContext();

export const PermisoProvider = ({ children }) => {
  
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
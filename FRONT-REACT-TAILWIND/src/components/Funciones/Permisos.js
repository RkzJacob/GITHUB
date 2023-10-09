import React, { createContext, useContext, useState } from 'react';

const PermisoContext = createContext();

export const PermisoProvider = ({ children }) => {
  const [userRoles, setUserRoles] = useState([]);

  return (
    <PermisoContext.Provider value={{ userRoles, setUserRoles }}>
      {children}
    </PermisoContext.Provider>
  );
};

export const usePermiso = () => {
  const context = useContext(PermisoContext);
  if (!context) {
    throw new Error('usePermiso debe ser usado dentro de PermisoProvider');
  }
  return context;
};
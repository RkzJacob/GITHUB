import React, { useState, useEffect } from "react";
import axios from 'axios';

const ObtenerTodos = (initialApiUrl) => {
  const [defects, setDefects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedKPI, setSelectedKPI] = useState("Defectos por Tipo");
  const [selectedApiUrl, setSelectedApiUrl] = useState(initialApiUrl);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(selectedApiUrl);
        setDefects(response.data);
      } catch (error) {
        console.error('Error al obtener datos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedApiUrl]);

  const labels = selectedKPI === 'Defectos por Tipo' ? defects.map(defect => defect.defect) : defects.map(defect => defect.sector);

  const data2 = defects.map(defect => ({
    Sectores: defect.sector,
    TipoDeDefecto: defect.defecto,
    Cantidad: defect.cantidad
  }));

  const setDatos = defects.map(defect => defect.cantidad);

  return { defects, loading, selectedKPI, selectedApiUrl, labels, setDatos, setSelectedKPI, setSelectedApiUrl ,data2};
};

export default ObtenerTodos;
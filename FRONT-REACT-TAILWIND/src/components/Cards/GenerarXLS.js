import React, { useState,useEffect } from "react";
import PropTypes from "prop-types";
import axios from 'axios';
import aspersores from '../../assets/img/aspersores.png';
import  { ObtenerDataApi } from "components/Funciones/pruebaFuncion2";





//llamo a las urls definidas
import { apiUrl1 ,apiUrl2  } from "components/urls/apiUrls";
//alertas
import { Alertas } from "components/Funciones/generarAlertas";
import { apiUrlC1 } from "components/urls/apiUrls";


export default function GenerarXLS({ color , selectedOption}) {
  
  const [defects, setDefects] = useState([]);//Constante para guardar la respuesta de la api KPI 1
  const [defects2, setDefects2] = useState([]); // KPI 2
  const [defects3, setDefects3] = useState([]); // KPI con parametros
  const [defects4, setDefects4] = useState([]);//parametros
  const [selectedParameter, setSelectedParameter] = useState("");
  
  //const { userRoles } = usePermiso();
  //const isAdmin = userRoles.includes('user'); 
  //console.log(isAdmin)
  useEffect(() => { 
    //guardo el token en el localStorage
    const token = localStorage.getItem('token');

    ObtenerDataApi(apiUrl1,  setDefects,token);
    ObtenerDataApi(apiUrl2, setDefects2,token);
    ObtenerDataApi(apiUrlC1,  setDefects4,token);
}, []);

const handleParameterSelect = (event) => {
  const parametroSeleccionado = event.target.value;
  console.log('Parametro seleccionado:', parametroSeleccionado);
  setSelectedParameter(parametroSeleccionado);
  
  const token = localStorage.getItem('token');

    const headers = {
      Authorization: `Bearer ${token}`,
    };

  // Realizar la consulta al API con el parámetro seleccionado
  axios.get(`${apiUrl2}${parametroSeleccionado}`, {headers})
    .then(response => {
      // Aquí puedes manejar la respuesta del API con el parámetro seleccionado
      setDefects3(response.data);
    })
    .catch(error => {
      console.error('Error al obtener datos con parámetro:', error);
    });

  };

  const handleGenerateExcel = () => {
    Alertas.generarExcelYMostrarAlerta(defects);
  };

    const handleGenerateExcel2 = () => {
      Alertas.generarExcelYMostrarAlerta2(defects2);
  };

  const handleGenerateExcel3 = () => {
    Alertas.generarExcelYMostrarAlerta3(defects3);
};

  
  return (
    <>
      <div
        className={
          "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-2xl rounded " +
          (color === "light" ? "bg-white" : "bg-lightBlue-900 text-white")
        }
      >
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3
                className={
                  "font-semibold text-lg " +
                  (color === "light" ? "text-blueGray-700" : "text-white")
                }
              >
                DESCARGAR INFORMES EN FORMATO EXCEL
              </h3>
            </div>
          </div>
        </div>
        
        <div className="block w-full overflow-x-auto">
          {/* Projects table */}
          <table className="items-center w-full bg-transparent border-collapse">
            <thead>
              <tr>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  TIPO DE INFORME
                </th>
               
                
                
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  PARAMETRO
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  FORMATO
                </th>
                
              </tr>
            </thead>
            <tbody>
            {selectedOption === "administracion" && (
             <tr>
                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                  <img
                    src={aspersores}
                    className="h-12 w-12 bg-white rounded-full border"
                    alt="ASPERSOR"
                  ></img>
                  <span
                    className={
                      "ml-3 font-bold " +
                      +(color === "light" ? "text-blueGray-600" : "text-white")
                    }
                  >
                    CONTEO DE TODOS LOS DEFECTOS REGISTRADOS
                  </span>
                </th>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                XLS
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  <i className="fas fa-circle text-emerald-500 mr-2">
                  </i> <button onClick={handleGenerateExcel} > Generar EXCEL </button>
                </td>
                
              </tr>
              )}
              {selectedOption === "formularios" && (
              <tr>
                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                  <img
                    src={aspersores}
                    className="h-12 w-12 bg-white rounded-full border"
                    alt="..."
                  ></img>
                  <span
                    className={
                      "ml-3 font-bold " +
                      +(color === "light" ? "text-blueGray-600" : "text-white")
                    }
                  >
                    CONTEO DE DEFECTOS POR SECTOR
                  </span>
                </th>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                XLS
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  <i className="fas fa-circle text-emerald-500 mr-2"></i><button onClick={handleGenerateExcel2}>Generar EXCEL</button>
               
                </td>
              </tr>
              )}
              {selectedOption === "formularios" && (
              <tr>
                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                <img
                    src={aspersores}
                    className="h-12 w-12 bg-white rounded-full border"
                    alt="..."
                  ></img>
                  <span
                    className={
                      "ml-3 font-bold " +
                      +(color === "light" ? "text-blueGray-600" : "text-white")
                    }
                  >
                    DEFECTOS POR SECTOR
                  </span>
                </th>
                <td className="border-t-0 px-6 align-middle  border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                <select className="bg-light" value={selectedParameter} onChange={handleParameterSelect}>
                  <option  value="">SELECCIONAR UN SECTOR</option>
                    {defects4.map(parametro => (
                      <option key={parametro} value={parametro}>
                      {parametro}
                  </option>
                  ))}
                  </select>
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  <i className="fas fa-circle text-emerald-500 mr-2"></i>
                  <button onClick={handleGenerateExcel3}>Generar EXCEL</button>
                </td>
              </tr>
              )}
              
            </tbody>
          </table>
        </div>
        
      </div>
    </>
  );
}

GenerarXLS.defaultProps = {
  color: "light",
};

GenerarXLS.propTypes = {
  color: PropTypes.oneOf(["dark", "dark"]),
};

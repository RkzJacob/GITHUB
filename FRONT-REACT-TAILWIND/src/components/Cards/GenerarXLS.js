import React, { useState,useEffect } from "react";
import PropTypes from "prop-types";
import axios from 'axios';
import aspersores from '../../assets/img/aspersores.png';
import  { ObtenerDataApi } from "components/Funciones/pruebaFuncion2";
import enfermedades from '../../assets/img/diseases.png';
import damage from '../../assets/img/damage.png';
import plaga from '../../assets/img/Plaga.png';
import fauna from '../../assets/img/fauna.png';





//llamo a las urls definidas
import { apiUrl1 ,apiUrl2  } from "components/urls/apiUrls";
//alertas
import { Alertas } from "components/Funciones/generarAlertas";
import { apiUrlC1 } from "components/urls/apiUrls";
import { apiUrlE1 } from "components/urls/apiUrls";
import { apiUrlE2 } from "components/urls/apiUrls";
import { apiUrlE3 } from "components/urls/apiUrls";
import { apiUrlD1 } from "components/urls/apiUrls";
import { apiUrlD2 } from "components/urls/apiUrls";
import { apiUrlD3 } from "components/urls/apiUrls";
import { apiUrlF1 } from "components/urls/apiUrls";
import { apiUrlF2 } from "components/urls/apiUrls";
import { apiUrlF3 } from "components/urls/apiUrls";
import { apiUrlP1 } from "components/urls/apiUrls";
import { apiUrlP2 } from "components/urls/apiUrls";
import { apiUrlP3 } from "components/urls/apiUrls";


export default function GenerarXLS({ color , selectedOption}) {
  
  const [defects, setDefects] = useState([]);//Constante para guardar la respuesta de la api KPI 1
  const [defects2, setDefects2] = useState([]); // KPI 2
  const [defects3, setDefects3] = useState([]); // KPI con parametros
  const [defects4, setDefects4] = useState([]);//parametros

  //KPI ENFERMEDADES
  const [defects9, setDefects9] = useState([]);//parametros
  const [defects10, setDefects10] = useState([]);//parametros
  const [defects11, setDefects11] = useState([]);//parametros

  //KPI DAMAGE
  const [defects12, setDefects12] = useState([]);//parametros
  const [defects13, setDefects13] = useState([]);//parametros
  const [defects14, setDefects14] = useState([]);//parametros

  //KPI FAUNA
  const [defects15, setDefects15] = useState([]);//parametros
  const [defects16, setDefects16] = useState([]);//parametros
  const [defects17, setDefects17] = useState([]);//parametros

  //KPI PLAGA 
  const [defects18, setDefects18] = useState([]);//parametros
  const [defects19, setDefects19] = useState([]);//parametros
  const [defects20, setDefects20] = useState([]);//parametros

  const [selectedParameter, setSelectedParameter] = useState("");
  const token = localStorage.getItem('token');
  const rol = localStorage.getItem('role');

  //validar si tiene tal rol
  const isUser = (rol === 'user');
  const isAdmin = (rol === 'Admin');
  
  
  useEffect(() => { 
    //guardo el token en el localStorage
    const token = localStorage.getItem('token');
    //KPI SPRINKLER
    ObtenerDataApi(apiUrl1,  setDefects,token);
    ObtenerDataApi(apiUrl2, setDefects2,token);
    ObtenerDataApi(apiUrlC1,  setDefects4,token);

    //KPI ENFERMEDADES
    ObtenerDataApi(apiUrlE1,setDefects9,token);
    ObtenerDataApi(apiUrlE2,setDefects10,token);
    ObtenerDataApi(apiUrlE3,setDefects11,token);

    //KPI DAÑOS
    ObtenerDataApi(apiUrlD1,setDefects12,token);
    ObtenerDataApi(apiUrlD2,setDefects13,token);
    ObtenerDataApi(apiUrlD3,setDefects14,token);

    //KPI FAUNA
    ObtenerDataApi(apiUrlF1,setDefects15,token);
    ObtenerDataApi(apiUrlF2,setDefects16,token);
    ObtenerDataApi(apiUrlF3,setDefects17,token);

    //KPI PLAGA
    ObtenerDataApi(apiUrlP1,setDefects18,token);
    ObtenerDataApi(apiUrlP2,setDefects19,token);
    ObtenerDataApi(apiUrlP3,setDefects20,token);


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

//KPI
const handleGenerateExcel4 = () => {
  Alertas.generarExcelYMostrarAlerta4(defects9);
};

const handleGenerateExcel5 = () => {
  Alertas.generarExcelYMostrarAlerta4(defects10);
};

const handleGenerateExcel6 = () => {
  Alertas.generarExcelYMostrarAlerta4(defects11);
};

//KPI 

const handleGenerateExcel7 = () => {
  Alertas.generarExcelYMostrarAlerta5(defects12);
};

const handleGenerateExcel8 = () => {
  Alertas.generarExcelYMostrarAlerta5(defects13);
};

const handleGenerateExcel9 = () => {
  Alertas.generarExcelYMostrarAlerta5(defects14);
};

//KPI

const handleGenerateExcel10 = () => {
  Alertas.generarExcelYMostrarAlerta6(defects15);
};

const handleGenerateExcel11= () => {
  Alertas.generarExcelYMostrarAlerta6(defects16);
};

const handleGenerateExcel12= () => {
  Alertas.generarExcelYMostrarAlerta6(defects17);
};

//KPI

const handleGenerateExcel13 = () => {
  Alertas.generarExcelYMostrarAlerta7(defects18);
};

const handleGenerateExcel14 = () => {
  Alertas.generarExcelYMostrarAlerta8(defects19);
};

const handleGenerateExcel15 = () => {
  Alertas.generarExcelYMostrarAlerta9(defects20);
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
                  </i> <button onClick={handleGenerateExcel} > Generar XLS </button>
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
                  <i className="fas fa-circle text-emerald-500 mr-2"></i><button onClick={handleGenerateExcel2}>Generar XLS</button>
               
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
                  <button onClick={handleGenerateExcel3}>Generar XLS</button>
                </td>
              </tr>
              )}

          {selectedOption === "formularios" && isUser &&(
              <tr>
                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                  <img
                    src={enfermedades}
                    className="h-12 w-12 bg-white rounded-full border"
                    alt="..."
                  ></img>
                  <span
                    className={
                      "ml-3 font-bold " +
                      +(color === "light" ? "text-blueGray-600" : "text-white")
                    }
                  >
                    CONTEO DE ENFERMEDADES DEL [[[CERRO TUNEL]]]
                  </span>
                </th>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                XLS
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  <i className="fas fa-circle text-emerald-500 mr-2"></i><button onClick={handleGenerateExcel4}> Generar XLS </button>
               
                </td>
              </tr>
              )}

              {selectedOption === "formularios" && isUser &&(
              <tr>
                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                  <img
                    src={enfermedades}
                    className="h-12 w-12 bg-white rounded-full border"
                    alt="..."
                  ></img>
                  <span
                    className={
                      "ml-3 font-bold " +
                      +(color === "light" ? "text-blueGray-600" : "text-white")
                    }
                  >
                    CONTEO DE ENFERMEDADES DEL [[[CERRO CASA]]]
                  </span>
                </th>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                XLS
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  <i className="fas fa-circle text-emerald-500 mr-2"></i><button onClick={handleGenerateExcel5}> Generar XLS </button>
               
                </td>
              </tr>
              )}

            {selectedOption === "formularios" && isUser &&(
              <tr>
                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                  <img
                    src={enfermedades}
                    className="h-12 w-12 bg-white rounded-full border"
                    alt="..."
                  ></img>
                  <span
                    className={
                      "ml-3 font-bold " +
                      +(color === "light" ? "text-blueGray-600" : "text-white")
                    }
                  >
                    CONTEO DE ENFERMEDADES DEL [[[CERRO ESPERANZA]]]
                  </span>
                </th>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                XLS
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  <i className="fas fa-circle text-emerald-500 mr-2"></i><button onClick={handleGenerateExcel6}> Generar XLS </button>
               
                </td>
              </tr>
              )}

            {selectedOption === "formularios" && isUser &&(
              <tr>
                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                  <img
                    src={damage}
                    className="h-12 w-12 bg-white rounded-full border"
                    alt="..."
                  ></img>
                  <span
                    className={
                      "ml-3 font-bold " +
                      +(color === "light" ? "text-blueGray-600" : "text-white")
                    }
                  >
                    CONTEO DE TIPOS DE DAÑOS DEL [[[CERRO ESPERANZA]]]
                  </span>
                </th>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                XLS
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  <i className="fas fa-circle text-emerald-500 mr-2"></i><button onClick={handleGenerateExcel7}> Generar XLS </button>
               
                </td>
              </tr>
              )}

            {selectedOption === "formularios" && isUser &&(
              <tr>
                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                  <img
                    src={damage}
                    className="h-12 w-12 bg-white rounded-full border"
                    alt="..."
                  ></img>
                  <span
                    className={
                      "ml-3 font-bold " +
                      +(color === "light" ? "text-blueGray-600" : "text-white")
                    }
                  >
                    CONTEO DE TIPOS DE DAÑOS [[[CERRO ESPERANZA]]]
                  </span>
                </th>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                XLS
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  <i className="fas fa-circle text-emerald-500 mr-2"></i><button onClick={handleGenerateExcel8}> Generar XLS </button>
               
                </td>
              </tr>
              )}

        {selectedOption === "formularios" && isUser &&(
              <tr>
                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                  <img
                    src={damage}
                    className="h-12 w-12 bg-white rounded-full border"
                    alt="..."
                  ></img>
                  <span
                    className={
                      "ml-3 font-bold " +
                      +(color === "light" ? "text-blueGray-600" : "text-white")
                    }
                  >
                    CONTEO DE TIPOS DE DAÑOS [[[CERRO ESPERANZA]]]
                  </span>
                </th>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                XLS
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  <i className="fas fa-circle text-emerald-500 mr-2"></i><button onClick={handleGenerateExcel9}> Generar XLS </button>
               
                </td>
              </tr>
              )}

            {selectedOption === "formularios" && isUser &&(
              <tr>
                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                  <img
                    src={fauna}
                    className="h-12 w-12 bg-white rounded-full border"
                    alt="..."
                  ></img>
                  <span
                    className={
                      "ml-3 font-bold " +
                      +(color === "light" ? "text-blueGray-600" : "text-white")
                    }
                  >
                    CONTEO DE TIPOS DE FAUNA [[[CERRO ESPERANZA]]]
                  </span>
                </th>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                XLS
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  <i className="fas fa-circle text-emerald-500 mr-2"></i><button onClick={handleGenerateExcel10}> Generar XLS </button>
               
                </td>
              </tr>
              )}

            {selectedOption === "formularios" && isUser &&(
              <tr>
                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                  <img
                    src={fauna}
                    className="h-12 w-12 bg-white rounded-full border"
                    alt="..."
                  ></img>
                  <span
                    className={
                      "ml-3 font-bold " +
                      +(color === "light" ? "text-blueGray-600" : "text-white")
                    }
                  >
                    CONTEO DE TIPOS DE FAUNA [[[CERRO ESPERANZA]]]
                  </span>
                </th>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                XLS
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  <i className="fas fa-circle text-emerald-500 mr-2"></i><button onClick={handleGenerateExcel11}> Generar XLS </button>
               
                </td>
              </tr>
              )}

              {selectedOption === "formularios" && isUser &&(
              <tr>
                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                  <img
                    src={fauna}
                    className="h-12 w-12 bg-white rounded-full border"
                    alt="..."
                  ></img>
                  <span
                    className={
                      "ml-3 font-bold " +
                      +(color === "light" ? "text-blueGray-600" : "text-white")
                    }
                  >
                    CONTEO DE TIPOS DE FAUNA [[[CERRO ESPERANZA]]]
                  </span>
                </th>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                XLS
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  <i className="fas fa-circle text-emerald-500 mr-2"></i><button onClick={handleGenerateExcel12}> Generar XLS </button>
               
                </td>
              </tr>
              )}

          {selectedOption === "formularios" && isUser &&(
              <tr>
                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                  <img
                    src={plaga}
                    className="h-12 w-12 bg-white rounded-full border"
                    alt="..."
                  ></img>
                  <span
                    className={
                      "ml-3 font-bold " +
                      +(color === "light" ? "text-blueGray-600" : "text-white")
                    }
                  >
                    CONTEO DE TIPOS DE PLAGA [[[CERRO ESPERANZA]]]
                  </span>
                </th>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                XLS
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  <i className="fas fa-circle text-emerald-500 mr-2"></i><button onClick={handleGenerateExcel13}> Generar XLS </button>
               
                </td>
              </tr>
              )}

          {selectedOption === "formularios" && isUser &&(
              <tr>
                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                  <img
                    src={plaga}
                    className="h-12 w-12 bg-white rounded-full border"
                    alt="..."
                  ></img>
                  <span
                    className={
                      "ml-3 font-bold " +
                      +(color === "light" ? "text-blueGray-600" : "text-white")
                    }
                  >
                    CONTEO DE TIPOS DE PLAGA [[[CERRO ESPERANZA]]]
                  </span>
                </th>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                XLS
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  <i className="fas fa-circle text-emerald-500 mr-2"></i><button onClick={handleGenerateExcel14}> Generar XLS </button>
               
                </td>
              </tr>
              )}

            {selectedOption === "formularios" && isUser &&(
              <tr>
                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                  <img
                    src={plaga}
                    className="h-12 w-12 bg-white rounded-full border"
                    alt="..."
                  ></img>
                  <span
                    className={
                      "ml-3 font-bold " +
                      +(color === "light" ? "text-blueGray-600" : "text-white")
                    }
                  >
                    CONTEO DE TIPOS DE PLAGA [[[CERRO ESPERANZA]]]
                  </span>
                </th>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                XLS
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  <i className="fas fa-circle text-emerald-500 mr-2"></i><button onClick={handleGenerateExcel15}> Generar XLS </button>
               
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

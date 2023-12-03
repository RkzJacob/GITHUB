import React, { useState,useEffect } from "react";
import PropTypes from "prop-types";
import axios from 'axios';
import "jspdf-autotable";
import aspersores from '../../assets/img/aspersores.png';
import enfermedades from '../../assets/img/diseases.png';
import damage from '../../assets/img/damage.png';
import plaga from '../../assets/img/Plaga.png';
import fauna from '../../assets/img/fauna.png';

import { apiUrl1,apiUrl2,apiUrl4 } from "components/urls/apiUrls";
import { Alertas } from "components/Funciones/generarAlertas";
import  { ObtenerDataApi,ObtenerDataApiParametros } from "components/Funciones/pruebaFuncion2";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { apiUrlC1 } from "components/urls/apiUrls";
import { apiUrlC2 } from "components/urls/apiUrls";
import { apiUrlC3 } from "components/urls/apiUrls";
import { apiUrlC4 } from "components/urls/apiUrls";
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

// components

const formatDate = (date) => {
      
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return  `${day}-${month}-${year}`;
};

export default function CardTable({ color, selectedOption}) {
  //const KPI SPRINKLERS
  const [defects, setDefects] = useState([]);//Constante para guardar la respuesta de la api KPI 1
  const [defects2, setDefects2] = useState([]); // KPI 2
  const [defects3, setDefects3] = useState([]); // KPI con parametros
  const [defects4, setDefects4] = useState([]);//parametros
  const [defects5, setDefects5] = useState([]);//parametros
  const [defects6, setDefects6] = useState([]);//parametros
  const [defects7, setDefects7] = useState([]);//parametros
  const [defects8, setDefects8] = useState([]);//parametros


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



  

  // fechas
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] =  useState(null);

  //obtener toke y rol
  const [selectedParameter, setSelectedParameter] = useState("");
  const token = localStorage.getItem('token');
  const rol = localStorage.getItem('role');

  //validar si tiene tal rol
  const isUser = (rol === 'user');
  const isAdmin = (rol === 'Admin');

  //utilización de un hook junto utilizacion de codigo
  useEffect(() => { 
    //KPI ASPERSORES
    ObtenerDataApi(apiUrl1,setDefects,token);
    ObtenerDataApi(apiUrl2,setDefects2,token);
    ObtenerDataApi(apiUrlC1,setDefects4,token);
    ObtenerDataApi(apiUrlC2,setDefects6,token);
    ObtenerDataApi(apiUrlC3,setDefects7,token);
    ObtenerDataApi(apiUrlC4,setDefects8,token);
    
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
    const onChange = (dates) => {
      const [start, end] = dates;
      setStartDate(start);
      setEndDate(end);

      
    };
   
    const GenerarPDF = () => {
      Alertas.generarPDFAlert1(defects);
    };

    const GenerarPDF2 = () => {
      Alertas.generarPDFAlert2(defects2);
    };

    const GenerarPDF3 = () => {
      Alertas.generarPDFAlert3(defects3,selectedParameter);
    };

    const GenerarPDF4 = async () => {
      try {
        // Esperar a que los datos se obtengan
        await ObtenerDataApiParametros(apiUrl4, setDefects5, token, startDate, endDate);
        // Después de obtener los datos, llamar a la función para generar el PDF
        Alertas.generarPDFAlert4(defects5);
      } catch (error) {
        console.error('Error al generar el PDF:', error);
        // Manejar el error si ocurre alguno
      }
    };

    const GenerarPDF5 = () => {
      Alertas.generarPDFAlert5(defects6);
    };

    const GenerarPDF6 = () => {
      Alertas.generarPDFAlert6(defects7);
    };

    const GenerarPDF7 = () => {
      Alertas.generarPDFAlert7(defects8);
    };

    //Diseases
    const GenerarPDF8 = () => {
      Alertas.generarPDFAlert8(defects9,'Reporte de Enfermedades por cada sector del CERRO TUNEL');
    };

    const GenerarPDF9 = () => {
      Alertas.generarPDFAlert8(defects10,'Reporte de Enfermedades por cada sector del CERRO CASA');
    };
    const GenerarPDF10 = () => {
      Alertas.generarPDFAlert8(defects11,'Reporte de Enfermedades por cada sector del CERRO ESPERANZA');
    };

     //damage
    const GenerarPDF11 = () => {
      Alertas.generarPDFAlert9(defects12,'Reporte de daños por cada sector del CERRO TUNEL');
    };

    const GenerarPDF12 = () => {
      Alertas.generarPDFAlert9(defects13,'Reporte de daños por cada sector del CERRO CASA');
    };
    const GenerarPDF13 = () => {
      Alertas.generarPDFAlert9(defects14,'Reporte de daños por cada sector del CERRO ESPERANZA');
    };

    //fauna
    const GenerarPDF14 = () => {
      Alertas.generarPDFAlert10(defects15,'Reporte de Fauna por cada sector del CERRO TUNEL');
    };

    const GenerarPDF15 = () => {
      Alertas.generarPDFAlert10(defects16,'Reporte de Fauna por cada sector del CERRO CASA');
    };
    const GenerarPDF16 = () => {
      Alertas.generarPDFAlert10(defects17,'Reporte de Fauna por cada sector del CERRO ESPERANZA');
    };

    //plagas
    const GenerarPDF17 = () => {
      Alertas.generarPDFAlert11(defects18,'Reporte de plagas por cada sector del CERRO TUNEL');
    };

    const GenerarPDF18 = () => {
      Alertas.generarPDFAlert11(defects19,'Reporte de plagas por cada sector del CERRO CASA');
    };
    const GenerarPDF19 = () => {
      Alertas.generarPDFAlert11(defects20,'Reporte de plagas por cada sector del CERRO ESPERANZA');
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
                DESCARGAR INFORMES EN FORMATO PDF
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
                    INFORME GENERAL DE ADMINISTRACIONES
                  </span>
                </th>
                <td className=" text-black  border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                
                <DatePicker className="md:w-2/12 w-2/12 px-2"
                    selected={startDate}
                    onChange={onChange}
                    startDate={startDate}
                    endDate={endDate}
                    selectsRange
                    showMonthDropdown
                    showYearDropdown
                    isClearable
                    dropdownMode="select"
                    dateFormat="dd/MM/yyyy"
                />
            
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  <i className="fas fa-circle text-emerald-500 mr-2">
                  </i> <button onClick={GenerarPDF4}> Generar PDF </button>
                </td>
                
              </tr>
             )}

        {selectedOption === "formularios" && isUser &&(
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
                PDF
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  <i className="fas fa-circle text-emerald-500 mr-2">
                  </i> <button onClick={GenerarPDF}> Generar PDF </button>
                </td>
                
              </tr>
              )}
              {selectedOption === "formularios" && isUser &&(
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
                  PDF
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  <i className="fas fa-circle text-emerald-500 mr-2"></i><button onClick={GenerarPDF2}> Generar PDF </button>
               
                </td>
              </tr>
              )}

              {selectedOption === "formularios" && isUser &&(
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
                    DEFECTOS POR SECTOR ESPECÍFICO
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
                  <button onClick={GenerarPDF3}>Generar PDF</button>
                </td>
              </tr>
              )}

              {selectedOption === "formularios" && isUser &&(
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
                    CONTEO DE DEFECTOS DEL [[[CERRO TUNEL]]]
                  </span>
                </th>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  PDF
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  <i className="fas fa-circle text-emerald-500 mr-2"></i><button onClick={GenerarPDF5}> Generar PDF </button>
               
                </td>
              </tr>
              )}

            {selectedOption === "formularios" && isUser &&(
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
                    CONTEO DE DEFECTOS DEL [[[CERRO CASA]]]
                  </span>
                </th>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  PDF
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  <i className="fas fa-circle text-emerald-500 mr-2"></i><button onClick={GenerarPDF6}> Generar PDF </button>
               
                </td>
              </tr>
              )}

              {selectedOption === "formularios" && isUser &&(
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
                    CONTEO DE DEFECTOS DEL [[[CERRO ESPERANZA]]]
                  </span>
                </th>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  PDF
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  <i className="fas fa-circle text-emerald-500 mr-2"></i><button onClick={GenerarPDF7}> Generar PDF </button>
               
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
                  PDF
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  <i className="fas fa-circle text-emerald-500 mr-2"></i><button onClick={GenerarPDF8}> Generar PDF </button>
               
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
                  PDF
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  <i className="fas fa-circle text-emerald-500 mr-2"></i><button onClick={GenerarPDF9}> Generar PDF </button>
               
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
                  PDF
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  <i className="fas fa-circle text-emerald-500 mr-2"></i><button onClick={GenerarPDF10}> Generar PDF </button>
               
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
                  PDF
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  <i className="fas fa-circle text-emerald-500 mr-2"></i><button onClick={GenerarPDF11}> Generar PDF </button>
               
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
                  PDF
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  <i className="fas fa-circle text-emerald-500 mr-2"></i><button onClick={GenerarPDF12}> Generar PDF </button>
               
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
                  PDF
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  <i className="fas fa-circle text-emerald-500 mr-2"></i><button onClick={GenerarPDF13}> Generar PDF </button>
               
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
                  PDF
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  <i className="fas fa-circle text-emerald-500 mr-2"></i><button onClick={GenerarPDF14}> Generar PDF </button>
               
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
                  PDF
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  <i className="fas fa-circle text-emerald-500 mr-2"></i><button onClick={GenerarPDF15}> Generar PDF </button>
               
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
                  PDF
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  <i className="fas fa-circle text-emerald-500 mr-2"></i><button onClick={GenerarPDF16}> Generar PDF </button>
               
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
                  PDF
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  <i className="fas fa-circle text-emerald-500 mr-2"></i><button onClick={GenerarPDF17}> Generar PDF </button>
               
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
                  PDF
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  <i className="fas fa-circle text-emerald-500 mr-2"></i><button onClick={GenerarPDF18}> Generar PDF </button>
               
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
                  PDF
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  <i className="fas fa-circle text-emerald-500 mr-2"></i><button onClick={GenerarPDF19}> Generar PDF </button>
               
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

CardTable.defaultProps = {
  color: "light",
};

CardTable.propTypes = {
  color: PropTypes.oneOf(["dark", "dark"]),
};

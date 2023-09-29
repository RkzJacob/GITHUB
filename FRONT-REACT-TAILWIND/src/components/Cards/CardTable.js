import React, { useState,useEffect } from "react";
import PropTypes from "prop-types";
import axios from 'axios';
import jsPDF from 'jspdf';
import "jspdf-autotable";
import aspersores from '../../assets/img/aspersores.png'
// components



export default function CardTable({ color }) {
  const [defects, setDefects] = useState([]);//Constante para guardar la respuesta de la api KPI 1
  const [defects2, setDefects2] = useState([]); // KPI 2
  const [defects3, setDefects3] = useState([]); // KPI con parametros
  const [defects4, setDefects4] = useState([]);//parametros
  const [selectedParameter, setSelectedParameter] = useState("");

  const apiUrl1 = 'http://localhost:3000/formSprinkler/Conteo-Todos-Los-Defectos'; // Ruta de la respuesta de la api(PrimerKPI)
  const apiUrl2 = 'http://localhost:3000/formSprinkler/Conteo-Defectos-Por-Sector'; // Ruta de la respuesta de la api(SegundoKPI)
  const apiUrl3 = 'http://localhost:3000/formSprinkler/Sectores'; // Ruta de la respuesta de la api con parametros

  useEffect(() => { //utilización de un hook junto utilizacion de codigo

    axios.get(apiUrl1)//se realiza una peticion get (usando la url de la respuesta que debe entregar en el backend)
      .then(response => {//si la petición es exitosa esta se guarda en response
        setDefects(response.data);//se actualizan los defectos utilizando la datos ya recibidos de response
      })
      .catch(error => {//si la petición falla se capta el error 
        console.error('Error al obtener datos:', error);// y se imprime por consola
      });

      axios.get(apiUrl2)//se realiza una peticion get (usando la url de la respuesta que debe entregar en el backend)
      .then(response => {//si la petición es exitosa esta se guarda en response
        setDefects2(response.data);//se actualizan los defectos utilizando la datos ya recibidos de response
      })
      .catch(error => {//si la petición falla se capta el error 
        console.error('Error al obtener datos:', error);// y se imprime por consola
      });
      
      axios.get(apiUrl3)//se realiza una peticion get (usando la url de la respuesta que debe entregar en el backend)
      .then(response => {//si la petición es exitosa esta se guarda en response
        setDefects4(response.data);//se actualizan los defectos utilizando la datos ya recibidos de response
      })
      .catch(error => {//si la petición falla se capta el error 
        console.error('Error al obtener datos:', error);// y se imprime por consola
      });
}, []);

const handleParameterSelect = (event) => {
  const parametroSeleccionado = event.target.value;
  console.log('Parametro seleccionado:', parametroSeleccionado);
  setSelectedParameter(parametroSeleccionado);

  // Realizar la consulta al API con el parámetro seleccionado
  axios.get(`http://localhost:3000/formSprinkler/Conteo-Defectos-Por-Sector/${parametroSeleccionado}`)
    .then(response => {
      // Aquí puedes manejar la respuesta del API con el parámetro seleccionado
      setDefects3(response.data);
    })
    .catch(error => {
      console.error('Error al obtener datos con parámetro:', error);
    });

  };

    const GenerarPDF = () => {
      const pdf = new jsPDF();
      pdf.text('Reporte de todos los Defectos', 10, 10);
      pdf.autoTable({
        head: [[ "Tipo de Defecto", "Cantidad"]],
        body: defects.map(defect => [defect.defect, defect.cantidad]),
        startY: 20, // Empieza la tabla a partir de esta coordenada
        margin: { top: 15 }, // Espacio entre el texto anterior y la tabla
      });
  
      pdf.save('reporte_defectos.pdf');
    };

    const GenerarPDF2 = () => {
      const pdf = new jsPDF();
      pdf.text('Reporte de Defectos por sector', 10, 10);
      pdf.autoTable({
        head: [["Sector", "Tipo de Defecto", "Cantidad"]],
        body: defects2.map(defect => [defect.sector, defect.defecto, defect.cantidad]),
        startY: 20, // Empieza la tabla a partir de esta coordenada
        margin: { top: 15 }, // Espacio entre el texto anterior y la tabla
      });
      pdf.save('reporte_defectos_por_sector.pdf');
    };

    const GenerarPDF3 = () => {
      const pdf = new jsPDF();
      pdf.text('Reporte de Datos', 10, 10);
      pdf.autoTable({
        head: [['Defecto', 'Cantidad']],
        body: defects3.map(item => [item.defecto, item.cantidad]),
        startY: 20,
        margin: { top: 15 },
      });

      pdf.save('reporte.pdf');
    };

    
  


  return (
    <>
      <div
        className={
          "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded " +
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
                Descarga de informes en PDF
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
                  Tipo de informe
                </th>
               
                
                
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  Tipo
                </th>
                <th
                  className={
                    "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                    (color === "light"
                      ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                      : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                  }
                >
                  Completion
                </th>
                
              </tr>
            </thead>
            <tbody>
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
                    Conteo de todos los defectos registrados
                  </span>
                </th>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                pdf
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  <i className="fas fa-circle text-emerald-500 mr-2">
                  </i> <button onClick={GenerarPDF}> Generar PDF </button>
                </td>
                
              </tr>
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
                    Conteo de todos los defectos de los aspersores por sector
                  </span>
                </th>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  PDF
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  <i className="fas fa-circle text-emerald-500 mr-2"></i><button onClick={GenerarPDF2}> Generar PDF </button>
               
                </td>
              </tr>
              <tr>
                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                  <img
                    src={require("assets/img/vue.jpg").default}
                    className="h-12 w-12 bg-white rounded-full border"
                    alt="..."
                  ></img>{" "}
                  <span
                    className={
                      "ml-3 font-bold " +
                      +(color === "light" ? "text-blueGray-600" : "text-white")
                    }
                  >
                    Defecto de aspersores por sector
                  </span>
                </th>
                <td className="border-t-0 px-6 align-middle  border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                <select className="bg-lightBlue-800" value={selectedParameter} onChange={handleParameterSelect}>
                  <option  value="">Selecciona un sector</option>
                  <option  value="">Sin sector</option>
                    {defects4.map(parametro => (
                      <option key={parametro.sector} value={parametro.sector}>
                      {parametro.sector}
                  </option>
                  ))}
                  </select>
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  <i className="fas fa-circle text-emerald-500 mr-2"></i>
                  <button onClick={GenerarPDF3}>Generar PDF</button>
                </td>
              </tr>
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

import React, { useState, useEffect } from 'react';
import axios from "axios";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
const moment = require('moment');
export function ConsumirApi({ formParam, KpiParam, startDateParam, endDateParam, changeKPI }) {
    const [startDate, setStartDate] = useState(startDateParam || '');
    const [endDate, setEndDate] = useState(endDateParam || '');
    const [form, setForm] = useState('formSprinkler');
    const [Kpi, setKpi] = useState('Conteo-Defectos-Por-Sector');
    const [data, setData] = useState([]);//Constante para guardar la respuesta de la api
    const [selectedApiUrl, setSelectedApiUrl] = useState("http://localhost:3000/formSprinkler/Conteo-Defectos-Por-Sector/")
    // = useState("http://localhost:3000/formSprinkler/Conteo-Todos-Los-Defectos"); // Agrega esta línea para definir selectedApiUrl
    const apiUrl1 = 'http://localhost:3000/formSprinkler/Conteo-Todos-Los-Defectos'; // Ruta de la respuesta de la api(PrimerKPI)
    const apiUrl2 = 'http://localhost:3000/formSprinkler/Conteo-Defectos-Por-Sector';

    const onChange = (dates) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
    };
 
    const handleKPIChange = (event) => {
        setSelectedApiUrl(event.target.value);
        changeKPI(event.target.value); // Llama a la función changeKPI con el nuevo valor
    };



    //*useEffect(() => { //utilización de un hook junto utilizacion de codigo
    //        axios.get(selectedApiUrl, {
    //            params: {
    //                form: formParam,
    //                kpi: KpiParam,
    //                start: startDate,
    //                end: endDate,
    //            },
    //        })//se realiza una peticion get (usando la url de la respuesta que debe entregar en el backend)
    //            .then(response => {//si la petición es exitosa esta se guarda en response
    //                setData(response.data);//se actualizan los datos
    //            })
    //            .catch(error => {//si la petición falla se capta el error 
    //                console.error('Error al obtener datos:', error);// y se imprime por consola
    //            })
    //            .finally(() => {//se ejecuta independiente si la peticion fue exitosa o falló
    //
    //            });
    //    }, [selectedApiUrl]);
    //

    const fetchData = async () => {
        try {
            const params = {};

            if (startDate) {
                params.Fecha1 = startDate
                // Formateamos la fecha usando moment.js
                const fechaFormateada = moment(startDate).format('DD/MM/YYYY');
                params.Fecha1 = fechaFormateada
            }

            if (endDate) {
                params.Fecha2 = endDate;
                // Formateamos la fecha usando moment.js
                const fechaFormateada2 = moment(endDate).format('DD/MM/YYYY');
                params.Fecha2 = fechaFormateada2
            }
            const response = await axios.get(selectedApiUrl,
                { params }).then(response => {//si la petición es exitosa esta se guarda en response
                    setData(response.data);//se actualizan los datos
                    console.log(response)
                })
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };



    return (

        <div className="w-full mx-autp items-center flex justify-between md:flex-nowrap flex-wrap md:px-10 px-4">
        <label className="block uppercase text-white text-xs font-bold mb-2">
              Seleccionar KPI
        </label>

          {/* Selector de KPI */}
          <div className="md:w-1/3 w-full px-4">

           <select
              className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring w-full"
              onChange={handleKPIChange}
              value={selectedApiUrl}>
              <option value="Seleccionar">Seleccionar</option>
              <option value="Defectos por Tipo">Defectos por Tipo</option>
              <option value="Defectos por Sector">Defectos por Sector</option>
            </select>

            <label>Kpi</label>
            <input type="text" value={Kpi} onChange={(e) => setKpi(e.target.value)} />

            <label>Seleccione Rango de fechas: </label>
                <DatePicker selected={startDate}
                    onChange={onChange}
                    startDate={startDate}
                    endDate={endDate}
                    selectsRange
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    dateFormat="dd/mm/yyyy" />

          </div>

          <div>
            <button onClick={fetchData}>Generar Dashboard</button>
          </div>
  
          {/* Nombre del KPI seleccionado */}

          <div className="md:w-1/3 w-full text-center">
            <h2 className="text-white text-xl font-semibold">Dashboard</h2>
          </div>

          {/* Resto del contenido */}
        </div>
    );
}
export default ConsumirApi;




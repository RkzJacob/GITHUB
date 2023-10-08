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
    const [firstSelectValue, setFirstSelectValue] = useState(""); // Estado para el primer select
    const [secondSelectOptions, setSecondSelectOptions] = useState([]); // Estado para el segundo select
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
        changeKPI(event.target.value);
        
        // Actualiza el estado de 'firstSelectValue'
        setFirstSelectValue(event.target.value);
      };

    
    

    // Luego, en función del valor de 'firstSelectValue', puedes actualizar 'secondSelectOptions'
    useEffect(() => {
        if (firstSelectValue === "formSprinkler") {
          setSecondSelectOptions(["Conteo de daños", "Conteo por Sector"]);
        } else if (firstSelectValue === "formCount") {
          setSecondSelectOptions(["Conteo de Paltas", "Conteo de Arboles"]);
        } else {
          setSecondSelectOptions([]); // Opciones vacías si no hay una opción válida seleccionada
        }
      }, [firstSelectValue]);
  
    



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
              className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring w-full">
              <option value="Seleccionar">Seleccionar</option>
              <option value="formCompaction">Compaction</option>
              <option value="formCount">Conteo</option>
              <option value="formDamage">Daños</option>
              <option value="formDiseases">Enfermedades</option>
              <option value="formFauna">Fauna</option>
              <option value="formGirdling">Localizacion</option>
              <option value="formHumidity">Humedad</option>
              <option value="formPlague">Plagas</option>
              <option value="formSprinkler">Aspersores</option>
            </select>

            <select
                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring w-full"
                value={Kpi}
                onChange={(e) => setKpi(e.target.value)}
                >
                <option value="">Seleccionar KPI</option>
                {secondSelectOptions.map((option) => (
                    <option key={option} value={option}>
                    {option}
                    </option>
                ))}
            </select>


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


        </div>
    );
}
export default ConsumirApi;





            //Dentro del select iba esto.
            {/*onChange={handleKPIChange}
            value={selectedApiUrl}*/}
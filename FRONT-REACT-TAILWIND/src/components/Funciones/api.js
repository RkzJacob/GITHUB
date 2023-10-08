import React, { useState, useEffect } from 'react';
import axios from "axios";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
const moment = require('moment');
export function ConsumirApi({ formParam, KpiParam, startDateParam, endDateParam, }) {
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
        <div>
            <div>
                <label>Form</label>
                <input type="text" value={form} onChange={(e) => setForm(e.target.value)} />
            </div>
            <div>
                <label>Kpi</label>
                <input type="text" value={Kpi} onChange={(e) => setKpi(e.target.value)} />
            </div>
            <div>
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

        </div>
    );
}
export default ConsumirApi;
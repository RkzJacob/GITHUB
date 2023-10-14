import React, { useState, useEffect } from 'react';
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useChart } from '../Funciones/context.js';


const moment = require('moment');
export function ConsumirApi({ formParam, KpiParam, startDateParam, endDateParam, changeKPI, datosApi, chartsData  }) {
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [form, setForm] = useState('formSprinkler');
    const [Kpi, setKpi] = useState(' ');
    const [data, setData] = useState([]);//Constante para guardar la respuesta de la api
    const [selectedApiUrl, setSelectedApiUrl] = useState("http://localhost:3000/formSprinkler/Conteo-Defectos-Por-Sector/")



    const [fechaFormateada, setfechaFormateada] = useState(); // Estado para el primer select
    const [fechaFormateada2, setfechaFormateada2] = useState(); // Estado para el primer select

    const [baseUrl, setBaseUrl] = useState("http://localhost:3000/");
    const [formName, setFormName] = useState("formSprinkler");
    const [KpiName, setKpiName] = useState("Conteo-Defectos-Por-Sector");
    // = useState("http://localhost:3000/formSprinkler/Conteo-Todos-Los-Defectos"); // Agrega esta línea para definir selectedApiUrl


    const [apiUrl, setapiUrl] = useState(" ")
    const apiUrl1 = 'http://localhost:3000/formSprinkler/Conteo-Todos-Los-Defectos'; // Ruta de la respuesta de la api(PrimerKPI
    const apiUrl2 = 'http://localhost:3000/formSprinkler/Conteo-Defectos-Por-Sector';

    const onChange = (dates) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
    };

    // Función para cambiar el nombre del formulario en la URL
    const changeFormName = (newFormName) => {
        setFormName(newFormName);
    };

    // Función para cambiar el nombre del kpi en la URL
    const changeKpiName = (newKpiName) => {
        setKpiName(newKpiName);
    };

    // Función para construir la URL completa
    const constructApiUrl = () => {
        return `${baseUrl}${formName}/${KpiName}/`;
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
            if (startDate && endDate) {
                const fecha1Encoded = encodeURIComponent(moment(startDate).format('DD/MM/YYYY'));
                const fecha2Encoded = encodeURIComponent(moment(endDate).format('DD/MM/YYYY'));
    
                const apiUrl = `${baseUrl}${formName}/${Kpi}/${fecha1Encoded}/${fecha2Encoded}`;
                setSelectedApiUrl(apiUrl); // Cambia esta línea
    
                const response = await axios.get(apiUrl);
                setData(response.data);
                datosApi(response.data);
                chartsData(response.data)
                console.log('Consulta exitosa', fecha1Encoded, fecha2Encoded, apiUrl);
                
            } else {
                console.error('Las fechas no están definidas');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };



    return (
        <div className="">
            {/* Esta parte no contiene elementos de interfaz de usuario */}
        </div>
    );
}
export default ConsumirApi;
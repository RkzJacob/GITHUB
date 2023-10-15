import React, { useState, useEffect } from 'react';
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useChart } from '../Funciones/context.js';


const moment = require('moment');
const baseUrl = "http://localhost:3000/"



const fetchData = async (formName,Kpi,startDate,endDate) => {
    try {
        if (startDate && endDate) {
            const fecha1Encoded = encodeURIComponent(moment(startDate).format('DD/MM/YYYY'));
            const fecha2Encoded = encodeURIComponent(moment(endDate).format('DD/MM/YYYY'));

            let apiUrl = `${baseUrl}${formName}/${Kpi}/${fecha1Encoded}/${fecha2Encoded}`;


<<<<<<< Updated upstream
            const response = await axios.get(apiUrl);
            console.log('Consulta exitosa', fecha1Encoded, fecha2Encoded, apiUrl);
            return response.data
=======
    const [apiUrl, setapiUrl] = useState(" ")

    const onChange = (dates) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
    };


    const handleFormChange = (event) => {
        setFirstSelectValue(event.target.value); //Actualiza el estado de firstSelectValue
        changeFormName(event.target.value)
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


    // Use useEffect to set options for the second select based on firstSelectValue
    useEffect(() => {
        if (firstSelectValue === "formSprinkler") {
            setSecondSelectOptions(["Conteo-Todos-Los-Defectos", "Conteo-Defectos-Por-Sector"]);
        } else if (firstSelectValue === "formCount") {
            setSecondSelectOptions(["Conteo de Paltas", "Conteo de Arboles"]);
        } else if (firstSelectValue === "Seleccionar") {
            setSecondSelectOptions(["Seleccione arriba primero"]);
>>>>>>> Stashed changes
        } else {
            console.error('Las fechas no están definidas');
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }

};
export {fetchData}





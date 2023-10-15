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


            const response = await axios.get(apiUrl);
            console.log('Consulta exitosa', fecha1Encoded, fecha2Encoded, apiUrl);
            return response.data
        } else {
            console.error('Las fechas no están definidas');
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }

};
export {fetchData}





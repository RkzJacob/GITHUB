import React, { useState, useEffect ,useContext} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ConsumirApi } from "../Funciones/api.js"; // Asegúrate de importar correctamente
import { fetchData } from "../Funciones/api.js";
import { DataContext } from "components/Funciones/context.js";

export default function AdminNavbar({ ongetData, chartsData }) {
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [Kpi, setKpi] = useState(' ');
    const [datosA, estableceDatos] = useState('');
    const [firstSelectValue, setFirstSelectValue] = useState("Seleccionar"); // Estado para el primer select
    const [secondSelectOptions, setSecondSelectOptions] = useState([]); // Estado para el segundo select
    const [formName, setFormName] = useState("");

    const {data} =  useContext( DataContext)
    const {setData} =  useContext( DataContext)


    useEffect(() => {
        if (firstSelectValue === "formSprinkler") {
            setSecondSelectOptions(["Conteo-Todos-Los-Defectos", "Conteo-Defectos-Por-Sector"]);
        } else if (firstSelectValue === "formCount") {
            setSecondSelectOptions(["Conteo de Paltas", "Conteo de Arboles"]);
        } else if (firstSelectValue === "Seleccionar") {
            setSecondSelectOptions(["Seleccione arriba primero"]);
        } else {
            setSecondSelectOptions([]); // Opciones vacías si no hay una opción válida seleccionada
        }
    }, [firstSelectValue]);

    const onChange = (dates) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
    };


    const handleFormChange = (event) => {
        setFirstSelectValue(event.target.value); //Actualiza el estado de firstSelectValue
        setFormName(event.target.value)
    };

    const handleKpiChange = (event) => {
        setKpi(event.target.value);
    };

    const datosApi = (datos) => {
        estableceDatos(datos);
        console.log(datosA);
        chartsData(datosA);
    }


    const handleGetData = async () => {
        const response = fetchData(formName,Kpi,startDate,endDate).then
        (response => setData(response))
        console.log('data',data)
    };




    return (
        <div className=" flex  md:justify-start border-b flex-wrap md:px-2 px-2">

            <div className="md:w-4/12 w-4/12  px-2">
                <select
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring w-full"
                    value={firstSelectValue}
                    onChange={handleFormChange}
                >
                    <option value="Seleccionar">Seleccionar</option>
                    <option value="formSprinkler">Aspersores</option>
                </select>
            </div>
            <div className="md:w-3/12 w-4/12 px-2">
                <select
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring w-full"
                    value={Kpi}
                    onChange={(e) => { setKpi(e.target.value)}}
                >
                    <option value="">Seleccionar KPI</option>
                    <option value="Conteo-Defectos-Por-Sector">Defectos Por Sector</option>
                </select>
            </div>
            <div className="md:w-3/12 w-3/12 px-2">
                <DatePicker className="md:w-2/12 w-2/12 px-2"
                    selected={startDate}
                    onChange={onChange}
                    startDate={startDate}
                    endDate={endDate}
                    selectsRange
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    dateFormat="dd/MM/yyyy"
                />
            </div>
            <div className="md:w-2/12 w-2/12 px-2">
            <button onClick={handleGetData} className=" px-2 placeholder-blueGray-300 text-blueGray-600 font-bold relative rounded bg-white ">
                    Cargar
                </button>
                 
            </div>
            </div>
            


        
    );
}


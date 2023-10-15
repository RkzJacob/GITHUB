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
        <div className="w-full items-left flex justify-between md:flex-nowrap flex-wrap md:px-10 px-4">
            <label className="block uppercase text-white text-xs font-bold mb-2">
                Seleccionar KPI
            </label>


            <div className="md:w-full w-full px-4">
                <select
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring w-full"
                    value={firstSelectValue}
                    onChange={handleFormChange}
                >
                    <option value="Seleccionar">Seleccionar</option>
                    <option value="formSprinkler">Aspersores</option>
                </select>

                <select
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring w-full"
                    value={Kpi}
                    onChange={(e) => { setKpi(e.target.value)}}
                >
                    <option value="">Seleccionar KPI</option>
                    <option value="Conteo-Defectos-Por-Sector">Defectos Por Sector</option>
                </select>

                <label>Seleccione Rango de fechas: </label>
                <DatePicker
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
                <button onClick={handleGetData} class="bg-blue-500  text-white font-bold py-16 px-4 rounded ">
                    Button
                </button>
            </div>


        </div>
    );
}


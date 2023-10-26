import React, { useState, useEffect, useContext } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ConsumirApi } from "../Funciones/api.js"; // Asegúrate de importar correctamente
import { fetchData } from "../Funciones/api.js";
import { DataContext, useDataContext } from "components/Funciones/context.js";
import Swal from 'sweetalert2';

export default function AdminNavbar({ ongetData, chartsData }) {
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [Kpi, setKpi] = useState(' ');
    const [datosA, estableceDatos] = useState('');
    const [firstSelectValue, setFirstSelectValue] = useState("Seleccionar"); // Estado para el primer select
    const [secondSelectOptions, setSecondSelectOptions] = useState([]); // Estado para el segundo select
    const [KpiOptions, setKpiOptions] = useState([]);

    const [secondSelectValue, setSecondSelectValue] = useState("");

    const [KpiValue, setKpiValue] = useState("");
    const [formName, setFormName] = useState("");

    const { data } = useContext(DataContext)
    const { setData } = useContext(DataContext)
    const { selectedKPI, setSelectedKPI } = useDataContext();


    useEffect(() => {
        if (firstSelectValue === "formSprinkler") {
            setKpiOptions([
                { value: "Conteo-Defectos-Por-Sector", label: "Defectos Por Sector" },
                { value: "Conteo-Todos-Los-Defectos", label: "Defectos Por Tipo" },
            ]);
        } else if (firstSelectValue === "formCount") {
            setKpiOptions([
                { value: "Conteo de Paltas", label: "Conteo de Paltas" },
                { value: "Conteo de Arboles", label: "Conteo de Arboles" },
            ]);
        } else {
            setKpiOptions([]);
        }
    }, [firstSelectValue]);

    const onChange = (dates) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
    };


    const handleFormChange = (event) => {
        setFirstSelectValue(event.target.value);
        setFormName(event.target.value);
        setSecondSelectValue(""); // Reiniciar el valor del segundo select al cambiar el primer select
    };

    const handleKpiChange = (event) => {
        setSecondSelectValue(event.target.value);
        setKpi(event.target.value);
        setSelectedKPI(event.target.value); // Actualiza el estado SelectedKPI en el contexto
    };

    const datosApi = (datos) => {
        estableceDatos(datos);
        console.log(datosA);
        chartsData(datosA);
    }


    const handleGetData = async () => {
        try {
            const response = await fetchData(formName, Kpi, startDate, endDate);

            if (response) {
                setData(response);
                console.log('Data:', response);
            } else {
                console.log('No data available');
                await Swal.fire({
                    icon: 'error',
                    title: 'Seleccione todos los datos para generar dashboard',
                  });
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

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
                    value={secondSelectValue}
                    onChange={handleKpiChange}>
                    <option value="">Seleccionar KPI</option>
                    {KpiOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
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
                    isClearable
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


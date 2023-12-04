/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { fetchData } from "../Funciones/api.js";
import { DataContext, useDataContext } from "components/Funciones/context.js";
import Swal from 'sweetalert2';

export default function AdminNavbar({ ongetData, chartsData }) {
    const [startDate, setStartDate] = useState(); // Estado para la fecha de inicio
    const [endDate, setEndDate] = useState(); // Estado para la fecha de fin
    const [Kpi, setKpi] = useState(' ');
    const [firstSelectValue, setFirstSelectValue] = useState("Seleccionar"); // Estado para el primer select
    const [secondSelectOptions, setSecondSelectOptions] = useState([]); // Estado para el segundo select
    const [KpiOptions, setKpiOptions] = useState([]);
    const [CerroValue, setCerroValue] = useState('');
    const [secondSelectValue, setSecondSelectValue] = useState("");
    const [formName, setFormName] = useState("");
    const { setData } = useContext(DataContext)
    const { selectedKPI, setSelectedKPI, setReloadChart, setReloadChart2, setReloadChart3 } = useDataContext();


    // Efecto secundario que se activa cuando el valor del primer select cambia (firstSelectValue)
    useEffect(() => {
        // Lógica para configurar las opciones del segundo select (KpiOptions) según el valor del primer select (firstSelectValue)
        if (firstSelectValue === "formSprinkler") {
            setKpiOptions([
                { value: "defectos", label: "Todos los defectos" },
                { value: "sector", label: "Defectos Por sector" },
            ]);
        } else if (firstSelectValue === "formFauna") {
            setKpiOptions([
                { value: "Fauna", label: "Conteo de animales" },
            ]);
        } else if (firstSelectValue === "formCount") {
            setKpiOptions([
                { value: "Fruit", label: "Conteo de frutas" },
            ]);
        } else if (firstSelectValue === "formPlague") {
            setKpiOptions([
                { value: "Plaga", label: "Conteo de Plagas" },
            ]);
        } else if (firstSelectValue === "formDamage") {
            setKpiOptions([
                { value: "Damage", label: "Conteo de daños" },
                { value: "SDamage", label: "Daños por sector" },
            ]);
        } else if (firstSelectValue === "formDiseases") {
            setKpiOptions([
                { value: "Diseases", label: "Conteo de enfermedades" },
            ]);
        } else {
            setKpiOptions([]);
        }
    }, [firstSelectValue]);

    // Función que se activa cuando cambian las fechas seleccionadas en el DatePicker
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
        setSelectedKPI(event.target.value);
    };
    /**/
    const handleCerroChange = (event) => {
        setCerroValue(event.target.value);
    };

    // Función para mostrar mensajes de error utilizando SweetAlert2
    const showErrorMessage = async (message) => {
        await Swal.fire({
            icon: 'error',
            title: message,
        });
    }

    // Función para obtener los datos según las selecciones hechas en los selects y las fechas
    const handleGetData = async () => {
        const finalValue = `${secondSelectValue}-${CerroValue}`;
        try {
            if (!formName || !finalValue || !startDate || !endDate) {
                if (!formName) {
                    showErrorMessage('Seleccione algún Form');
                }
                if (!finalValue) {
                    showErrorMessage('Seleccione algún KPI');
                }
                if (!startDate || !endDate) {
                    showErrorMessage('Seleccione Fechas');
                }
                return; // Evita continuar si hay errores
            }
            const response = await fetchData(formName, finalValue, startDate, endDate);

            if (response && response.length > 0) {
                setData(response);
                setReloadChart(true); // Para la recarga del grafico
                setReloadChart2(true)
                setReloadChart3(true)
            } else {
                showErrorMessage('No hay datos disponibles para las fechas seleccionadas');
            }
        } catch (error) {
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
                    <option value="formDamage">Daños</option>
                    <option value="formCount">Conteo</option>
                    <option value="formDiseases">Enfermedades</option>
                    <option value="formFauna">Fauna</option>
                    <option value="formPlague">Plagas</option>
                </select>
            </div>
            <div className="md:w-3/12 w-3/12 px-2">
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
            <div className="md:w-3/12 w-4/12 px-2">
                <select
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring w-full"
                    value={CerroValue}
                    onChange={handleCerroChange}
                >
                    <option value="Seleccionar">Seleccionar</option>
                    <option value="Todos">General</option>
                    <option value="Cerro-Tunel">Cerro Tunel</option>
                    <option value="Cerro-Casa">Cerro Casa</option>
                    <option value="Cerro-Esperanza">Cerro Esperanza</option>
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
            <div className="md:w-3/12 w-3/12 px-2">
                <button onClick={handleGetData} className="bg-green  text-white border border-gray font-bold relative rounded p-2 px-4 ">
                    Cargar
                </button>

            </div>
        </div>




    );
}


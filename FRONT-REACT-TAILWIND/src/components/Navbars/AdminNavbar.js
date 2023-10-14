import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ConsumirApi } from "../Funciones/api.js"; // Asegúrate de importar correctamente

export default function AdminNavbar({ formParam, KpiParam, startDateParam, endDateParam, changeKPI, chartsData }) {
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [Kpi, setKpi] = useState(' ');
    const [datosA, estableceDatos] = useState('');
    const [firstSelectValue, setFirstSelectValue] = useState("Seleccionar"); // Estado para el primer select
    const [secondSelectOptions, setSecondSelectOptions] = useState([]); // Estado para el segundo select
    const [formName, setFormName] = useState("formSprinkler");

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
          changeFormName(event.target.value)
      };

    const datosApi = (datos) => {
        estableceDatos(datos);
        console.log(datosA);
        chartsData(datosA);
    }

    const fetchData = async () => {
        // Implementa la lógica para llamar a la función fetchData aquí
    };

        // Función para cambiar el nombre del formulario en la URL
    const changeFormName = (newFormName) => {
        setFormName(newFormName);
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
    
              </select>
    
              <select
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring w-full"
                  value={Kpi}
                  onChange={(e) => setKpi(e.target.value)}
              >
                  <option value="">Seleccionar KPI</option>
    
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
          </div>
    
          <div>
              <button onClick={fetchData}>Generar Dashboard</button>
          </div>
      </div>
    ); 
}

{/* 



return (
  <div className="w-full items-center flex justify-between md:flex-nowrap flex-wrap md:px-10 px-4">
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

          </select>

          <select
              className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring w-full"
              value={Kpi}
              onChange={(e) => setKpi(e.target.value)}
          >
              <option value="">Seleccionar KPI</option>

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
      </div>

      <div>
          <button onClick={fetchData}>Generar Dashboard</button>
      </div>
  </div>
); 



*/}
import React, { useState } from "react";
export default function NavbarHome({ onSelectOption }) {

  const [selectedOption, setSelectedOption] = useState("Seleccionar");

  const handleSelectChange = (event) => {
    const option = event.target.value;
    setSelectedOption(option);
    onSelectOption(option); // Llamar a la función proporcionada por el padre
  };



  return (
    <>
      {/* Navbar */}
      <div className=" flex  md:justify-start border-b flex-wrap md:px-2 px-2">
      <div className="md:w-4/12 w-4/12  px-2 mt-2">
                <select
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring w-full"
                    value={selectedOption}
                    onChange={handleSelectChange}
                >
                    <option value="Seleccionar">Seleccionar</option>
                    <option value="administracion">Administración</option>
                    <option value="formularios">Formularios</option>
                </select>
            </div>
            </div>
      {/* End Navbar */}
    </>
  );
}

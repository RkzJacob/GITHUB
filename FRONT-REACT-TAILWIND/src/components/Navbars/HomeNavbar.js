import React from "react";
export default function NavbarHome() {

  return (
    <>
      {/* Navbar */}
      <div className=" flex  md:justify-start border-b flex-wrap md:px-2 px-2">
      <div className="md:w-4/12 w-4/12  px-2 mt-2">
                <select
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring w-full"
                >
                    <option value="Seleccionar">Seleccionar</option>
                    <option value="formSprinkler">Formularios</option>
                    <option value="formCompaction">Generales</option>
                </select>
            </div>
            </div>
      {/* End Navbar */}
    </>
  );
}

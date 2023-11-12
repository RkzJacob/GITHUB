import React, { useState } from "react";

// components


import GenerarXLS from "components/Cards/GenerarXLS";
import NavbarHome from "components/Navbars/HomeNavbar";




export default function Tables2() {
  const [selectedOption, setSelectedOption] = useState("Seleccionar");

  const handleSelectOption = (option) => {
    setSelectedOption(option);
  };
  return (
    <>
      <div className="flex flex-wrap ">

      <div className="w-full">
          <NavbarHome onSelectOption={handleSelectOption} />
        </div>

        

        <div className="w-full xl:w-14/14 px-14 mt-20">
          <GenerarXLS  selectedOption={selectedOption} color="light" />
        </div>

      </div>

    </>
  );
}

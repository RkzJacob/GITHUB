import React, { useState } from "react";

// components
import CardTable from "components/Cards/CardTable.js";
import NavbarHome from "components/Navbars/HomeNavbar";

export default function Tables() {
  const [selectedOption, setSelectedOption] = useState("Seleccionar");

  const handleSelectOption = (option) => {
    setSelectedOption(option);
  };

  return (
    <>
      <div className="flex flex-wrap  ">

      <div className="w-full">
          <NavbarHome onSelectOption={handleSelectOption} />
        </div>

        
        <div className="w-full xl:w-14/14 px-14 mt-20">
          <CardTable selectedOption={selectedOption}  color="light" />
        </div>
        
      </div>
    </>
  );
}

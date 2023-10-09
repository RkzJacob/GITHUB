import React from "react";

// components


import GenerarXLS from "components/Cards/GenerarXLS";
import LoginForm from "components/login/login";


export default function Tables2() {
  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <GenerarXLS color="dark" />
        </div>
        <div className="w-full mb-12 px-4">
          <LoginForm color="dark" />
        </div>  
      </div>

    </>
  );
}
